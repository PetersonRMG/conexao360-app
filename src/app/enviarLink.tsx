import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
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
import { criarEnviarLinkStyles } from "@/styles/enviarLinkStyles";
import {
  obterCadastroPendente,
  registrarReenvioCadastro,
  limparCadastroPendente,
} from "@/services/cadastroPendente";
import {
  obterSenhaPendente,
  guardarCodigoRecuperacao,
  registrarReenvioSenha,
  limparSenhaPendente,
} from "@/services/senhaPendente";
import {
  cadastrarUsuarioVerificado,
  solicitarCodigoCadastro,
  solicitarCodigoRecuperacao,
  verificarCodigoRecuperacao,
  solicitarCodigoAlteracao,
  alterarSenha,
} from "@/services/verificacaoEmailService";
import HeaderScreen from "./header";
import MenuSreen from "./menu";

const VALIDADE_CODIGO_MS = 10 * 60 * 1000;
const INTERVALO_REENVIO_MS = 60 * 1000;

type Modo = "cadastro" | "recuperacao" | "alteracao";
type Feedback = { tipo: "erro" | "sucesso"; mensagem: string } | null;

function formatarTempo(segundos: number) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

/**
 * Tela de confirmação compartilhada pelos fluxos de cadastro,
 * recuperação de senha e alteração de senha autenticada.
 * Os endpoints originais e o código de seis dígitos foram preservados.
 */
export default function EnviarLinkScreen() {
  const { modo: modoParam } = useLocalSearchParams<{ modo?: string }>();
  const modo: Modo | null =
    modoParam === "cadastro" || modoParam === "recuperacao" || modoParam === "alteracao"
      ? modoParam
      : null;

  const { token, usuario, definirSessao } = useAuth();
  const { coresTema } = useTema();
  const styles = criarEnviarLinkStyles(coresTema);
  const refs = useRef<Array<TextInput | null>>([]);

  const [cadastro, setCadastro] = useState(obterCadastroPendente);
  const [pendencia, setPendencia] = useState(obterSenhaPendente);
  const [codigo, setCodigo] = useState("      ");
  const [processando, setProcessando] = useState(false);
  const [alteracaoConcluida, setAlteracaoConcluida] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [agora, setAgora] = useState(Date.now());

  // Para o usuário autenticado, mantém o header/footer aprovados.
  // Cadastro e recuperação são públicos e não devem exibir navegação logada.
  const mostrarNavegacao = modo === "alteracao" && !!token;

  useEffect(() => {
    const intervalo = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const dadosDisponiveis =
    (modo === "cadastro" && cadastro !== null) ||
    (modo === "recuperacao" && pendencia?.tipo === "recuperacao") ||
    (modo === "alteracao" && pendencia?.tipo === "alteracao");

  const enviadoEm = modo === "cadastro" ? cadastro?.enviadoEm : pendencia?.enviadoEm;
  const segundosRestantes = enviadoEm
    ? Math.max(0, Math.ceil((enviadoEm + VALIDADE_CODIGO_MS - agora) / 1000))
    : 0;
  const segundosReenvio = enviadoEm
    ? Math.max(0, Math.ceil((enviadoEm + INTERVALO_REENVIO_MS - agora) / 1000))
    : 0;

  const emailDestino =
    modo === "cadastro"
      ? cadastro?.dados.email
      : modo === "recuperacao" && pendencia?.tipo === "recuperacao"
        ? pendencia.email
        : usuario?.email_usuario;

  function avisar(mensagem: string, tipo: "erro" | "sucesso" = "erro") {
    setFeedback({ tipo, mensagem });
    if (Platform.OS !== "web" && tipo === "erro") {
      Alert.alert("Verificação de e-mail", mensagem);
    }
  }

  function preencherDigito(texto: string, indice: number) {
    const numeros = texto.replace(/\D/g, "");
    const atual = Array.from({ length: 6 }, (_, i) => codigo[i] || " ");

    if (numeros.length > 1) {
      // Permite colar um código completo, além da digitação individual.
      for (let i = 0; i < numeros.length && indice + i < 6; i++) {
        atual[indice + i] = numeros[i];
      }
      refs.current[Math.min(indice + numeros.length, 5)]?.focus();
    } else {
      atual[indice] = numeros || " ";
      if (numeros && indice < 5) refs.current[indice + 1]?.focus();
    }

    setCodigo(atual.join(""));
    setFeedback(null);
  }

  function aoPressionarTecla(tecla: string, indice: number) {
    if (tecla === "Backspace" && !codigo[indice]?.trim() && indice > 0) {
      refs.current[indice - 1]?.focus();
    }
  }

  function voltar() {
    if (modo === "recuperacao") router.replace("/esqueciSenha");
    else if (modo === "alteracao") router.replace("/alterarSenha");
    else router.back();
  }

  async function confirmarCodigo() {
    if (processando) return;
    if (!modo || !dadosDisponiveis) {
      avisar("Dados da verificação não encontrados. Volte e solicite outro código.");
      return;
    }
    if (segundosRestantes === 0) {
      avisar("Código expirado. Solicite um novo código.");
      return;
    }
    if (!/^\d{6}$/.test(codigo)) {
      avisar("Informe os seis dígitos recebidos no e-mail.");
      return;
    }

    try {
      setProcessando(true);
      setFeedback(null);

      if (modo === "cadastro" && cadastro) {
        const resposta = await cadastrarUsuarioVerificado({ ...cadastro.dados, codigo });
        if (!resposta.success) throw new Error(resposta.message || "Não foi possível criar sua conta.");
        await definirSessao(resposta.data.token, resposta.data.usuario as Parameters<typeof definirSessao>[1]);
        limparCadastroPendente();
        router.replace("/home");
        return;
      }

      if (modo === "recuperacao" && pendencia?.tipo === "recuperacao") {
        await verificarCodigoRecuperacao(pendencia.email, codigo);
        guardarCodigoRecuperacao(codigo);
        router.replace("/senhaRef");
        return;
      }

      if (modo === "alteracao" && pendencia?.tipo === "alteracao") {
        if (!token) throw new Error("Sessão expirada. Entre novamente.");
        await alterarSenha(
          token,
          codigo,
          pendencia.senhaAtual,
          pendencia.novaSenha,
          pendencia.confirmarSenha,
        );
        limparSenhaPendente();
        setAlteracaoConcluida(true);
        return;
      }

      throw new Error("Não foi possível continuar a verificação.");
    } catch (error) {
      avisar(error instanceof Error ? error.message : "Falha ao confirmar o código.");
    } finally {
      setProcessando(false);
    }
  }

  async function reenviarCodigo() {
    if (!modo || !dadosDisponiveis || processando || segundosReenvio > 0) return;
    try {
      setProcessando(true);
      setFeedback(null);

      if (modo === "cadastro" && cadastro) {
        await solicitarCodigoCadastro(cadastro.dados.email);
        setCadastro(registrarReenvioCadastro());
      } else if (modo === "recuperacao" && pendencia?.tipo === "recuperacao") {
        await solicitarCodigoRecuperacao(pendencia.email);
        setPendencia(registrarReenvioSenha());
      } else if (modo === "alteracao" && pendencia?.tipo === "alteracao") {
        if (!token) throw new Error("Sessão expirada. Entre novamente.");
        await solicitarCodigoAlteracao(token, pendencia.senhaAtual);
        setPendencia(registrarReenvioSenha());
      }

      setAgora(Date.now());
      setCodigo("      ");
      avisar("Novo código solicitado. Confira o e-mail e a pasta de spam.", "sucesso");
      refs.current[0]?.focus();
    } catch (error) {
      avisar(error instanceof Error ? error.message : "Não foi possível reenviar o código.");
    } finally {
      setProcessando(false);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.areaSegura} edges={["top", "bottom"]}>
        {mostrarNavegacao && <HeaderScreen />}
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
                onPress={alteracaoConcluida ? () => router.replace("/home") : voltar}
                disabled={processando}
                accessibilityRole="button"
                accessibilityLabel="Voltar"
                style={styles.botaoVoltar}
              >
                <Ionicons name="arrow-back-outline" size={26} color={coresTema.texto} />
              </Pressable>
              <Text style={styles.tituloPagina}>
                {alteracaoConcluida ? "Senha alterada" : "Verificar código"}
              </Text>
            </View>

            {alteracaoConcluida ? (
              <View style={styles.confirmacaoSucesso}>
                <View style={styles.emblema}>
                  <Ionicons name="checkmark-circle-outline" size={70} color={coresTema.destaque} />
                </View>
                <Text style={styles.tituloDestaque}>Senha alterada!</Text>
                <Text style={styles.descricao}>
                  Sua senha foi alterada com sucesso. Você continua conectado ao Conexão 360°.
                </Text>
                <Pressable
                  style={({ pressed }) => [styles.botaoPrincipal, pressed && styles.botaoPressionado]}
                  onPress={() => router.replace("/home")}
                  accessibilityRole="button"
                >
                  <Text style={styles.textoBotaoPrincipal}>Continuar no aplicativo</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={styles.apresentacao}>
                  <View style={styles.emblema}>
                    <Ionicons name="mail-unread-outline" size={67} color={coresTema.destaque} />
                  </View>
                  <Text style={styles.tituloDestaque}>Código de verificação</Text>
                  <Text style={styles.descricao}>
                    Enviamos um código de 6 dígitos para o seu e-mail cadastrado.
                  </Text>
                  {!!emailDestino && (
                    <View style={styles.caixaEmail}>
                      <Ionicons name="mail-outline" size={23} color={coresTema.destaque} />
                      <Text style={styles.textoEmail} numberOfLines={2} selectable>
                        {emailDestino}
                      </Text>
                    </View>
                  )}
                </View>

                {dadosDisponiveis ? (
                  <>
                    <Text style={styles.labelCodigo}>Digite o código</Text>
                    <View style={styles.linhaCodigo}>
                      {Array.from({ length: 6 }, (_, indice) => (
                        <TextInput
                          key={indice}
                          ref={(ref) => { refs.current[indice] = ref; }}
                          style={styles.caixaCodigo}
                          value={codigo[indice]?.trim() || ""}
                          onChangeText={(texto) => preencherDigito(texto, indice)}
                          onKeyPress={({ nativeEvent }) => aoPressionarTecla(nativeEvent.key, indice)}
                          keyboardType="number-pad"
                          textAlign="center"
                          maxLength={6}
                          editable={!processando && segundosRestantes > 0}
                          selectTextOnFocus
                          accessibilityLabel={`Dígito ${indice + 1} do código`}
                        />
                      ))}
                    </View>

                    <View style={styles.caixaAjuda}>
                      <Ionicons name="information-circle-outline" size={24} color={coresTema.destaque} />
                      <View style={styles.ajudaTextos}>
                        <Text style={styles.ajudaTitulo}>Não recebeu o código?</Text>
                        <Text style={styles.ajudaDescricao}>
                          Confira sua caixa de entrada, spam ou lixo eletrônico.
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.tempoValidade}>
                      {segundosRestantes > 0
                        ? `Código válido por ${formatarTempo(segundosRestantes)}`
                        : "Código expirado. Solicite outro código."}
                    </Text>
                    <Pressable
                      onPress={reenviarCodigo}
                      disabled={processando || segundosReenvio > 0}
                      style={styles.botaoReenviar}
                      accessibilityRole="button"
                      accessibilityState={{ disabled: processando || segundosReenvio > 0 }}
                    >
                      <Text style={[
                        styles.textoReenviar,
                        segundosReenvio > 0 && styles.textoReenviarBloqueado,
                      ]}>
                        {segundosReenvio > 0
                          ? `Reenviar código em ${formatarTempo(segundosReenvio)}`
                          : "Reenviar código"}
                      </Text>
                    </Pressable>
                  </>
                ) : (
                  <View style={styles.caixaAjuda}>
                    <Ionicons name="alert-circle-outline" size={24} color={coresTema.erro} />
                    <Text style={styles.ajudaDescricao}>
                      Dados da verificação não encontrados. Volte e solicite um novo código.
                    </Text>
                  </View>
                )}

                {feedback && (
                  <View
                    style={feedback.tipo === "erro" ? styles.caixaErro : styles.caixaSucesso}
                    accessibilityRole="alert"
                  >
                    <Ionicons
                      name={feedback.tipo === "erro" ? "alert-circle-outline" : "checkmark-circle-outline"}
                      size={20}
                      color={feedback.tipo === "erro" ? coresTema.erro : coresTema.sucesso}
                    />
                    <Text style={styles.textoFeedback}>{feedback.mensagem}</Text>
                  </View>
                )}

                <Pressable
                  onPress={confirmarCodigo}
                  disabled={processando || !dadosDisponiveis || segundosRestantes === 0}
                  accessibilityRole="button"
                  accessibilityLabel="Confirmar código de verificação"
                  accessibilityState={{
                    disabled: processando || !dadosDisponiveis || segundosRestantes === 0,
                    busy: processando,
                  }}
                  style={({ pressed }) => [
                    styles.botaoPrincipal,
                    pressed && styles.botaoPressionado,
                    (processando || !dadosDisponiveis || segundosRestantes === 0) && styles.botaoDesabilitado,
                  ]}
                >
                  {processando ? (
                    <ActivityIndicator color="#1B1C21" />
                  ) : (
                    <>
                      <Ionicons name="checkmark-circle-outline" size={23} color="#1B1C21" />
                      <Text style={styles.textoBotaoPrincipal}>
                        {modo === "cadastro" ? "Confirmar e criar conta" : "Confirmar código"}
                      </Text>
                    </>
                  )}
                </Pressable>
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
         
      </SafeAreaView>
    </View>
  );
}
