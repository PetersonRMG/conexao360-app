import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Animated, Image, Modal, Pressable, ScrollView, Text, useWindowDimensions, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarMenuModalStyles } from "@/styles/menuModalStyles";
import { buscarUsuario, getUrlFotoUsuario, type Usuario } from "@/services/usuarioService";
import SairModalScreen from "./modalSair";
import { useInstalarApp } from "@/hooks/useInstalarApp";

type ItemMenu = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  rota: string;
};

const comunidade: ItemMenu[] = [
  { label: "Início", icon: "home-outline", rota: "/home" },
  { label: "Conexões", icon: "search-outline", rota: "/explorar" },
  { label: "Publicações", icon: "reader-outline", rota: "/home" },
  { label: "Enquetes / Tópicos", icon: "bar-chart-outline", rota: "/enquetes" },
  { label: "Eventos", icon: "calendar-outline", rota: "/eventos" },
  // { label: "Galeria", icon: "images-outline", rota: "/galeria" },
];
const minhaConta: ItemMenu[] = [
  { label: "Meu perfil", icon: "person-outline", rota: "/perfil" },
  { label: "Editar perfil", icon: "create-outline", rota: "/editarPerfil" },
  { label: "Alterar senha", icon: "lock-closed-outline", rota: "/alterarSenha" },
  { label: "Excluir conta", icon: "trash-outline", rota: "/excluirConta" },
];

interface MenuModalProps { visible: boolean; onClose: () => void }

export default function MenuModalScreen({ visible, onClose }: MenuModalProps) {
  const { tema, coresTema, alternarTema } = useTema();
  const styles = criarMenuModalStyles(coresTema);
  const { instalar, instalado, mensagem: mensagemInstalacao } = useInstalarApp();
  const { token, usuario, definirSessao, limparSessao } = useAuth();
  const { width } = useWindowDimensions();
  const largura = Math.min(width * 0.86, 360);
  const translateX = useRef(new Animated.Value(largura)).current;
  const [usuarioBanco, setUsuarioBanco] = useState<Usuario | null>(null);
  const [mostrarSaida, setMostrarSaida] = useState(false);
  const sessaoRef = useRef(definirSessao);
  sessaoRef.current = definirSessao;

  useEffect(() => {
    if (!visible || !token) return;
    let ativo = true;
    setUsuarioBanco(null);
    buscarUsuario(token).then(async resposta => {
      if (!ativo || !resposta.success || !resposta.data) return;
      setUsuarioBanco(resposta.data);
      await sessaoRef.current(token, resposta.data);
    }).catch(error => console.warn("Não foi possível atualizar o perfil no menu:", error));
    return () => { ativo = false; };
  }, [visible, token]);

  const perfil = usuarioBanco && usuarioBanco.id_usuario === usuario?.id_usuario ? usuarioBanco : usuario;
  const foto = getUrlFotoUsuario(perfil?.foto_usuario ?? null);
  const nome = perfil?.nome_usuario?.trim() || "Meu perfil";
  const papel = String(perfil?.perfil_usuario || "membro");

  useEffect(() => {
    if (!visible) return;
    translateX.setValue(largura);
    const id = requestAnimationFrame(() => {
      Animated.timing(translateX, { toValue: 0, duration: 250, useNativeDriver: Platform.OS !== "web" }).start();
    });
    return () => cancelAnimationFrame(id);
  }, [visible, largura, translateX]);

  function fecharMenu(depois?: () => void) {
    Animated.timing(translateX, { toValue: largura, duration: 190, useNativeDriver: Platform.OS !== "web" })
      .start(({ finished }) => { if (finished) { onClose(); depois?.(); } });
  }
  function navegar(rota: string) { fecharMenu(() => router.navigate(rota as Parameters<typeof router.navigate>[0])); }
  function confirmarSaida() {
    setMostrarSaida(false);
    limparSessao().then(() => router.replace("/")).catch(error => console.error("Erro ao sair:", error));
  }
  function renderItem(item: ItemMenu) {
    const perigo = item.rota === "/excluirConta";
    return (
      <Pressable
        key={item.label}
        onPress={() => navegar(item.rota)}
        accessibilityRole="button"
        accessibilityLabel={item.label}
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      >
        <Ionicons name={item.icon} size={22} color={perigo ? coresTema.erro : coresTema.textoSecundario} />
        <Text style={[styles.itemTitulo, perigo && styles.itemTituloPerigo]}>{item.label}</Text>
        <Ionicons name="chevron-forward-outline" size={16} color={coresTema.textoSecundario} />
      </Pressable>
    );
  }

  return <>
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent onRequestClose={() => fecharMenu()}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={() => fecharMenu()} accessibilityLabel="Fechar menu" />
        <Animated.View style={[styles.offcanvas, { width: largura, transform: [{ translateX }] }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.headerTitulo}>Configurações</Text>
              <Pressable onPress={() => fecharMenu()} style={styles.btnFechar} accessibilityRole="button" accessibilityLabel="Fechar menu">
                <Ionicons name="close-outline" size={27} color={coresTema.texto} />
              </Pressable>
            </View>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollConteudo} showsVerticalScrollIndicator={false}>
              <Pressable onPress={() => navegar("/perfil")} style={styles.perfilCard} accessibilityRole="button" accessibilityLabel="Ver meu perfil">
                <Image source={foto ? { uri: foto } : require("@/assets/images/img/avatar.png")} style={styles.avatar} />
                <View style={styles.perfilTextoArea}>
                  <Text style={styles.perfilNome} numberOfLines={2}>{nome}</Text>
                  <Text style={styles.perfilAcao}>{papel === "administrador" ? "Administrador" : papel === "palestrante" ? "Palestrante" : "Membro da comunidade"}</Text>
                </View>
              </Pressable>
              <Text style={styles.secaoTitulo}>Comunidade</Text>
              <View style={styles.grupo}>{comunidade.map(renderItem)}</View>
              <Text style={styles.secaoTitulo}>Conta</Text>
              <View style={styles.grupo}>{minhaConta.map(renderItem)}</View>
              {/* Um único botão de instalação. No app nativo não é necessário instalar novamente. */}
              {Platform.OS === "web" && !instalado && (
                <Pressable
                  onPress={() => { void instalar(); }}
                  style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Instalar aplicativo"
                  accessibilityHint="Abre a instalação ou mostra como adicionar o aplicativo à tela inicial"
                >
                  <Ionicons name="download-outline" size={22} color={coresTema.destaque} />
                  <Text style={styles.itemTitulo}>Instalar aplicativo</Text>
                  <Ionicons name="chevron-forward-outline" size={16} color={coresTema.textoSecundario} />
                </Pressable>
              )}
              {Platform.OS === "web" && !instalado && Boolean(mensagemInstalacao) && (
                <Text style={[styles.perfilAcao, { marginHorizontal: 10, marginBottom: 12, lineHeight: 19 }]} accessibilityRole="text">
                  {mensagemInstalacao}
                </Text>
              )}
              <Text style={styles.secaoTitulo}>Aparência</Text>
              <Pressable onPress={alternarTema} style={styles.item} accessibilityRole="switch" accessibilityState={{ checked: tema === "escuro" }}>
                <Ionicons name={tema === "escuro" ? "moon-outline" : "sunny-outline"} size={22} color={coresTema.textoSecundario} />
                <Text style={styles.itemTitulo}>Tema escuro</Text>
                <View style={[styles.switchBase, tema === "escuro" && styles.switchAtivo]}>
                  <View style={[styles.switchBolinha, tema === "escuro" && styles.switchBolinhaAtiva]} />
                </View>
              </Pressable>
              <Pressable style={[styles.item, styles.itemSair]} onPress={() => fecharMenu(() => setMostrarSaida(true))} accessibilityRole="button" accessibilityLabel="Sair da conta">
                <Ionicons name="log-out-outline" size={22} color={coresTema.erro} />
                <Text style={[styles.itemTitulo, styles.itemTituloPerigo]}>Sair</Text>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
    <SairModalScreen visible={mostrarSaida} onClose={() => setMostrarSaida(false)} onConfirm={confirmarSaida} />
  </>;
}
