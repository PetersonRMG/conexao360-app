import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import globalStyle from "@/styles/globalStyles";
import { criarPostStyle } from "@/styles/criarPostStyles";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarPublicacao } from "@/services/publicacaoService";
import { getUrlFotoUsuario } from "@/services/usuarioService";
import HeaderScreen from "./header";
import MenuSreen from "./menu";

const LIMITE_LEGENDA = 2000;
const TAMANHO_MAXIMO_FOTO = 20 * 1024 * 1024;
const FORMATOS_ACEITOS = ["image/jpeg", "image/png", "image/webp"];

/** Publicações comuns aceitam uma única foto e legenda opcional. Enquetes têm fluxo próprio. */
export default function CriarPostScreen() {
  const { coresTema } = useTema();
  const styles = criarPostStyle(coresTema);
  const { token, usuario } = useAuth();
  const [legenda, setLegenda] = useState("");
  const [foto, setFoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [publicando, setPublicando] = useState(false);

  const fotoUsuario = getUrlFotoUsuario(usuario?.foto_usuario ?? null);
  const nomeUsuario = usuario?.nome_usuario?.trim() || "Meu perfil";
  const podePublicar = !!foto && !!token && !publicando;

  async function escolherFoto() {
    if (publicando) return;
    try {
      // No navegador, o próprio seletor gerencia a autorização.
      if (Platform.OS !== "web") {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissao.granted) {
          Alert.alert("Acesso às fotos", "Autorize o acesso à galeria para selecionar uma foto.");
          return;
        }
      }

      const selecao = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: false,
        quality: 0.85,
      });

      if (selecao.canceled || !selecao.assets?.length) return;
      const selecionada = selecao.assets[0];
      if (selecionada.fileSize && selecionada.fileSize > TAMANHO_MAXIMO_FOTO) {
        Alert.alert("Foto muito grande", "Escolha uma foto com até 20 MB.");
        return;
      }
      // A API já permite somente JPG, PNG e WEBP; validar antes evita envio inválido.
      const mime = selecionada.mimeType?.toLowerCase();
      if (mime && !FORMATOS_ACEITOS.includes(mime)) {
        Alert.alert("Formato não aceito", "Utilize uma foto JPG, PNG ou WEBP.");
        return;
      }
      setFoto(selecionada);
    } catch (error) {
      console.error("ERRO SELECIONAR FOTO:", error);
      Alert.alert("Erro", "Não foi possível selecionar a foto.");
    }
  }

  async function publicar() {
    if (publicando) return;
    if (!token) {
      Alert.alert("Sessão expirada", "Entre novamente para publicar.");
      return;
    }
    if (!foto) {
      Alert.alert("Foto obrigatória", "Selecione uma foto para criar sua publicação.");
      return;
    }

    setPublicando(true);
    try {
      // Não alteramos o serviço nem a API: envia a imagem e a legenda opcional.
      const resposta = await criarPublicacao(token, legenda.trim(), foto);
      if (!resposta.success) {
        throw new Error(resposta.message || "Não foi possível publicar a foto.");
      }
      router.replace("/home");
    } catch (error) {
      console.error("ERRO AO PUBLICAR FOTO:", error);
      Alert.alert(
        "Erro ao publicar",
        error instanceof Error ? error.message : "Não foi possível publicar a foto.",
      );
    } finally {
      setPublicando(false);
    }
  }

  return (
    <View style={globalStyle.container}>
      <View style={[globalStyle.background, styles.container]}>
        <SafeAreaView style={globalStyle.areaConteudo}>
          {/* Mesmo header compartilhado das outras telas; sino e menu preservados. */}
          <HeaderScreen />
          <KeyboardAvoidingView
            style={styles.corpo}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.conteudo}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.tituloLinha}>
                <Pressable
                  onPress={() => router.back()}
                  style={({ pressed }) => [styles.voltar, pressed && styles.pressionado]}
                  accessibilityRole="button"
                  accessibilityLabel="Voltar"
                  disabled={publicando}
                >
                  <Ionicons name="arrow-back" size={24} color={coresTema.texto} />
                </Pressable>
                <Text style={styles.tituloPagina}>Criar publicação</Text>
              </View>

              <View style={styles.usuarioLinha}>
                <View style={styles.avatar}>
                  {fotoUsuario ? (
                    <Image source={{ uri: fotoUsuario }} style={styles.avatarImagem} />
                  ) : (
                    <Ionicons name="person" size={25} color={coresTema.textoSecundario} />
                  )}
                </View>
                <View style={styles.usuarioTextos}>
                  <Text style={styles.nomeUsuario} numberOfLines={1}>{nomeUsuario}</Text>
                  <View style={styles.publicoLinha}>
                    <Ionicons name="people-outline" size={15} color={coresTema.destaque} />
                    <Text style={styles.publicoTexto}>Compartilhar com a comunidade</Text>
                  </View>
                </View>
              </View>

              <View style={styles.compositor}>
                <TextInput
                  style={styles.campoLegenda}
                  placeholder="Escreva uma legenda (opcional)..."
                  placeholderTextColor={coresTema.textoSecundario}
                  value={legenda}
                  onChangeText={setLegenda}
                  maxLength={LIMITE_LEGENDA}
                  multiline
                  textAlignVertical="top"
                  editable={!publicando}
                  accessibilityLabel="Legenda da foto"
                />
                <Text style={styles.contador}>{legenda.length}/{LIMITE_LEGENDA}</Text>
              </View>

              {foto ? (
                <View style={styles.areaFoto}>
                  <Image source={{ uri: foto.uri }} style={styles.previaImagem} resizeMode="cover" />
                  <Pressable
                    style={({ pressed }) => [styles.removerFoto, pressed && styles.pressionado]}
                    onPress={() => setFoto(null)}
                    disabled={publicando}
                    accessibilityRole="button"
                    accessibilityLabel="Remover foto selecionada"
                  >
                    <Ionicons name="close" size={21} color="#FFFFFF" />
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [styles.trocarFoto, pressed && styles.pressionado]}
                    onPress={escolherFoto}
                    disabled={publicando}
                    accessibilityRole="button"
                    accessibilityLabel="Trocar foto selecionada"
                  >
                    <Ionicons name="images-outline" size={18} color={coresTema.texto} />
                    <Text style={styles.trocarFotoTexto}>Trocar foto</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={escolherFoto}
                  style={({ pressed }) => [styles.selecionarFoto, pressed && styles.pressionado]}
                  disabled={publicando}
                  accessibilityRole="button"
                  accessibilityLabel="Selecionar foto da galeria"
                >
                  <Ionicons name="image-outline" size={36} color={coresTema.destaque} />
                  <Text style={styles.fotoTitulo}>Adicionar foto</Text>
                  <Text style={styles.fotoDescricao}>Escolha uma foto da sua galeria</Text>
                  <Text style={styles.fotoLimites}>JPG, PNG ou WEBP · até 20 MB</Text>
                </Pressable>
              )}

              <Pressable
                onPress={publicar}
                disabled={!podePublicar}
                style={({ pressed }) => [
                  styles.publicarBotao,
                  !podePublicar && styles.publicarDesativado,
                  pressed && podePublicar && styles.pressionado,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Publicar foto"
                accessibilityState={{ disabled: !podePublicar, busy: publicando }}
              >
                {publicando ? (
                  <ActivityIndicator color="#1B1C21" />
                ) : (
                  <>
                    <Ionicons name="send-outline" size={21} color="#1B1C21" />
                    <Text style={styles.publicarTexto}>Publicar foto</Text>
                  </>
                )}
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
          {/* O footer é o componente original, sem botões extras nesta tela. */}
          <MenuSreen />
        </SafeAreaView>
      </View>
    </View>
  );
}
