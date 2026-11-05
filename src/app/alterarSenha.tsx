import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/AuthContext";
import { useTema } from "@/contexts/TemaContext";
import { solicitarCodigoAlteracao } from "@/services/verificacaoEmailService";
import { iniciarAlteracaoSenha } from "@/services/senhaPendente";
import { criarAlterarSenhaStyles } from "@/styles/alterarSenhaStyles";
import HeaderScreen from "./header";
import MenuSreen from "./menu";

type CampoSenhaProps = {
  rotulo: string;
  valor: string;
  aoAlterar: (texto: string) => void;
  visivel: boolean;
  alternarVisibilidade: () => void;
  bloqueado: boolean;
};

// A senha só será alterada após a validação do código enviado por e-mail.
export default function AlterarSenhaScreen() {
  const { token } = useAuth();
  const { coresTema } = useTema();
  const styles = criarAlterarSenhaStyles(coresTema);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [verAtual, setVerAtual] = useState(false);
  const [verNova, setVerNova] = useState(false);
  const [verConfirmacao, setVerConfirmacao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const regras = [
    { descricao: "No mínimo 8 caracteres", valido: novaSenha.length >= 8 },
    { descricao: "Pelo menos uma letra maiúscula", valido: /[A-Z]/.test(novaSenha) },
    { descricao: "Pelo menos uma letra minúscula", valido: /[a-z]/.test(novaSenha) },
    { descricao: "Pelo menos um número", valido: /[0-9]/.test(novaSenha) },
  ];

  const requisitosAtendidos = regras.every((regra) => regra.valido);

  function campoSenha({
    rotulo,
    valor,
    aoAlterar,
    visivel,
    alternarVisibilidade,
    bloqueado,
  }: CampoSenhaProps) {
    return (
      <View style={styles.grupoCampo}>
        <Text style={styles.rotuloCampo}>{rotulo}</Text>
        <View style={styles.linhaCampo}>
          <Ionicons name="lock-closed-outline" size={21} color={coresTema.textoSecundario} />
          <TextInput
            style={styles.input}
            placeholder={rotulo}
            placeholderTextColor={coresTema.textoSecundario}
            secureTextEntry={!visivel}
            value={valor}
            onChangeText={(texto) => {
              aoAlterar(texto);
              if (erro) setErro("");
            }}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!bloqueado}
            maxLength={255}
            returnKeyType="done"
            accessibilityLabel={rotulo}
          />
          <Pressable
            style={styles.botaoOlho}
            onPress={alternarVisibilidade}
            accessibilityRole="button"
            accessibilityLabel={`${visivel ? "Ocultar" : "Mostrar"} ${rotulo.toLowerCase()}`}
            hitSlop={8}
          >
            <Ionicons
              name={visivel ? "eye-off-outline" : "eye-outline"}
              size={23}
              color={coresTema.textoSecundario}
            />
          </Pressable>
        </View>
      </View>
    );
  }

  async function continuar() {
    if (carregando) return;
    setErro("");

    if (!token) {
      setErro("Sua sessão expirou. Faça login novamente.");
      return;
    }
    if (!senhaAtual) {
      setErro("Informe a senha atual.");
      return;
    }
    if (!requisitosAtendidos) {
      setErro("A nova senha precisa atender a todos os requisitos de segurança.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("A confirmação não corresponde à nova senha.");
      return;
    }
    if (senhaAtual === novaSenha) {
      setErro("Escolha uma senha diferente da atual.");
      return;
    }

    try {
      setCarregando(true);
      // Preserva a checagem de senha atual e o código por e-mail da API existente.
      await solicitarCodigoAlteracao(token, senhaAtual);
      iniciarAlteracaoSenha(senhaAtual, novaSenha, confirmarSenha);
      router.push({ pathname: "/enviarLink", params: { modo: "alteracao" } });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível enviar o código.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.areaSegura} edges={["top", "bottom"]}>
        
        <KeyboardAvoidingView
          style={styles.areaFlexivel}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.rolagem}
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.linhaTitulo}>
              <Pressable
                onPress={() => router.back()}
                disabled={carregando}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
                style={styles.botaoVoltar}
              >
                <Ionicons name="arrow-back-outline" size={26} color={coresTema.texto} />
              </Pressable>
              <Text style={styles.tituloPagina}>Alterar senha</Text>
            </View>

            <View style={styles.apresentacao}>
              <View style={styles.emblemaSeguranca}>
                <Ionicons name="shield-checkmark-outline" size={53} color={coresTema.destaque} />
              </View>
              <Text style={styles.tituloApresentacao}>Alterar sua senha</Text>
              <Text style={styles.subtitulo}>
                Defina uma senha segura para proteger sua conta.
              </Text>
            </View>

            <View style={styles.formulario}>
              {campoSenha({
                rotulo: "Senha atual",
                valor: senhaAtual,
                aoAlterar: setSenhaAtual,
                visivel: verAtual,
                alternarVisibilidade: () => setVerAtual(!verAtual),
                bloqueado: carregando,
              })}
              {campoSenha({
                rotulo: "Nova senha",
                valor: novaSenha,
                aoAlterar: setNovaSenha,
                visivel: verNova,
                alternarVisibilidade: () => setVerNova(!verNova),
                bloqueado: carregando,
              })}
              {campoSenha({
                rotulo: "Confirmar nova senha",
                valor: confirmarSenha,
                aoAlterar: setConfirmarSenha,
                visivel: verConfirmacao,
                alternarVisibilidade: () => setVerConfirmacao(!verConfirmacao),
                bloqueado: carregando,
              })}
            </View>

            <View style={styles.caixaRequisitos}>
              <View style={styles.requisitosCabecalho}>
                <Ionicons name="information-circle-outline" size={21} color={coresTema.destaque} />
                <Text style={styles.tituloRequisitos}>Sua nova senha deve conter:</Text>
              </View>
              {regras.map((regra) => (
                <View key={regra.descricao} style={styles.linhaRequisito}>
                  <Ionicons
                    name={regra.valido ? "checkmark-circle" : "ellipse-outline"}
                    size={20}
                    color={regra.valido ? coresTema.destaque : coresTema.textoSecundario}
                  />
                  <Text style={styles.textoRequisito}>{regra.descricao}</Text>
                </View>
              ))}
            </View>

            {!!erro && (
              <View style={styles.caixaErro} accessibilityRole="alert">
                <Ionicons name="alert-circle-outline" size={20} color={coresTema.erro} />
                <Text style={styles.textoErro}>{erro}</Text>
              </View>
            )}

            <Pressable
              onPress={continuar}
              disabled={carregando || !token}
              accessibilityRole="button"
              accessibilityLabel="Continuar e enviar código de confirmação"
              accessibilityState={{ disabled: carregando || !token, busy: carregando }}
              style={({ pressed }) => [
                styles.botaoPrincipal,
                pressed && styles.botaoPressionado,
                (carregando || !token) && styles.botaoDesabilitado,
              ]}
            >
              {carregando ? (
                <ActivityIndicator color="#1B1C21" />
              ) : (
                <>
                  <Ionicons name="lock-closed-outline" size={21} color="#1B1C21" />
                  <Text style={styles.textoBotaoPrincipal}>Continuar e enviar código</Text>
                </>
              )}
            </Pressable>
            <Text style={styles.avisoConfirmacao}>
              Para concluir a alteração, você deverá confirmar o código enviado ao seu e-mail.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
         
      </SafeAreaView>
    </View>
  );
}
