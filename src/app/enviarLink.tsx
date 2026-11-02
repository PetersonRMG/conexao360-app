import { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
    Alert, Image, ImageBackground, Platform, Pressable, ScrollView,
    Text, TextInput, View,
} from "react-native";

import globalStyle from "@/styles/globalStyles";
import { enviarLinkStyle } from "@/styles/enviarLinkStyles";
import { useAuth } from "@/contexts/AuthContext";
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

const DEZ_MINUTOS = 10 * 60 * 1000;
const UM_MINUTO = 60 * 1000;

type Modo = "cadastro" | "recuperacao" | "alteracao";
type Feedback = { tipo: "erro" | "sucesso"; mensagem: string } | null;

function formatarTempo(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

// MANTÉM NOME ORIGINAL: src/app/enviarLink.tsx -> /enviarLink
// Cadastro: código -> criar conta
// Recuperação: código -> criar nova senha em /senhaRef
// Alteração logada: código -> aplicar senha que o usuário já escolheu
export default function EnviarLinkScreen() {
    const { modo: modoParam } = useLocalSearchParams<{ modo?: string }>();
    const modo: Modo | null =
        modoParam === "cadastro" || modoParam === "recuperacao" || modoParam === "alteracao"
            ? modoParam
            : null;
    const { token, definirSessao } = useAuth();
    const refs = useRef<Array<TextInput | null>>([]);
    const [cadastro, setCadastro] = useState(obterCadastroPendente);
    const [pendencia, setPendencia] = useState(obterSenhaPendente);
    const [codigo, setCodigo] = useState("      ");
    const [processando, setProcessando] = useState(false);
    const [alteracaoConcluida, setAlteracaoConcluida] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [agora, setAgora] = useState(Date.now());

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
        ? Math.max(0, Math.ceil((enviadoEm + DEZ_MINUTOS - agora) / 1000)) : 0;
    const segundosReenvio = enviadoEm
        ? Math.max(0, Math.ceil((enviadoEm + UM_MINUTO - agora) / 1000)) : 0;

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
                // Verificação real pelo backend: não basta navegar para a tela seguinte.
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
                // Não encerre a sessão: a alteração foi feita pelo usuário logado.
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
            avisar("Novo código solicitado. Verifique a caixa de entrada e o spam.", "sucesso");
            refs.current[0]?.focus();
        } catch (error) {
            avisar(error instanceof Error ? error.message : "Não foi possível reenviar o código.");
        } finally {
            setProcessando(false);
        }
    }

    const descricao = !dadosDisponiveis
        ? "Dados da verificação não encontrados. Volte e solicite um novo código."
        : modo === "cadastro" && cadastro
            ? `Digite o código de 6 dígitos enviado para\n${cadastro.dados.email}`
            : modo === "recuperacao" && pendencia?.tipo === "recuperacao"
                ? `Digite o código de 6 dígitos enviado para\n${pendencia.email}`
                : "Digite o código de 6 dígitos enviado ao e-mail da sua conta.";

    // Confirmação da troca dentro do próprio aplicativo.
    if (alteracaoConcluida) {
        return (
            <View style={globalStyle.container}>
                <ImageBackground source={require("@/assets/images/img/fundoLogin.png")}
                    style={globalStyle.background} resizeMode="stretch">
                    <View style={enviarLinkStyle.conteudo}>
                        <View style={enviarLinkStyle.conteudoTopo}>
                            <Image style={globalStyle.logoMenor}
                                source={require("@/assets/images/img/logo.svg")} />
                            <Text style={enviarLinkStyle.subtitulo}>Tudo certo!</Text>
                            <Text style={enviarLinkStyle.titulo}>
                                Senha <Text style={enviarLinkStyle.tituloDourado}>Alterada</Text>
                            </Text>
                            <Text style={enviarLinkStyle.inf}>
                                Sua senha foi alterada com sucesso. Você continua conectado ao Conexão 360°.
                            </Text>
                        </View>
                        <Pressable
                            style={({ pressed }) => [
                                enviarLinkStyle.btnEnviar,
                                pressed && enviarLinkStyle.btnEnviarPressed,
                            ]}
                            onPress={() => router.replace("/home")}
                        >
                            <Text style={enviarLinkStyle.txtEnviar}>Continuar no aplicativo</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    return (
        <View style={globalStyle.container}>
            <ImageBackground source={require("@/assets/images/img/fundoLogin.png")}
                style={globalStyle.background} resizeMode="stretch">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={enviarLinkStyle.conteudo}>
                        <View style={enviarLinkStyle.conteudoTopo}>
                            <Image style={globalStyle.logoMenor} source={require("@/assets/images/img/logo.svg")} />
                            <Text style={enviarLinkStyle.subtitulo}>Abra seu e-mail</Text>
                            <Text style={enviarLinkStyle.titulo}>
                                Confirme seu <Text style={enviarLinkStyle.tituloDourado}>Código</Text>
                            </Text>
                            <Text style={enviarLinkStyle.inf}>{descricao}</Text>
                        </View>

                        {dadosDisponiveis && (
                            <View style={[enviarLinkStyle.codigoContainer, {
                                width: "100%", justifyContent: "center", gap: 5, paddingHorizontal: 10,
                            }]}>
                                {Array.from({ length: 6 }, (_, indice) => (
                                    <TextInput
                                        key={indice}
                                        ref={(ref) => { refs.current[indice] = ref; }}
                                        style={[enviarLinkStyle.codigoInput, {
                                            flexGrow: 1, flexShrink: 1, width: 42, maxWidth: 52,
                                            minWidth: 0, marginHorizontal: 0, paddingHorizontal: 0,
                                        }]}
                                        value={codigo[indice]?.trim() || ""}
                                        onChangeText={(texto) => preencherDigito(texto, indice)}
                                        onKeyPress={({ nativeEvent }) => aoPressionarTecla(nativeEvent.key, indice)}
                                        keyboardType="number-pad"
                                        textAlign="center"
                                        maxLength={6}
                                        editable={!processando}
                                        selectTextOnFocus
                                        accessibilityLabel={`Dígito ${indice + 1} do código`}
                                    />
                                ))}
                            </View>
                        )}

                        {dadosDisponiveis && (
                            <>
                                <Text style={{ textAlign: "center", color: "#E6D8B4", marginTop: 12, marginBottom: 10 }}>
                                    {segundosRestantes > 0
                                        ? `Código válido por ${formatarTempo(segundosRestantes)}`
                                        : "Código expirado. Solicite um novo."}
                                </Text>
                                <Pressable onPress={reenviarCodigo}
                                    disabled={processando || segundosReenvio > 0} style={{ paddingVertical: 12 }}>
                                    <Text style={{ color: segundosReenvio > 0 ? "#AAAAAA" : "#D6AD5F", textAlign: "center" }}>
                                        {segundosReenvio > 0
                                            ? `Reenviar código em ${formatarTempo(segundosReenvio)}`
                                            : "Reenviar código"}
                                    </Text>
                                </Pressable>
                            </>
                        )}

                        {feedback && (
                            <View accessibilityRole="alert" style={{ padding: 12, borderRadius: 8,
                                backgroundColor: feedback.tipo === "erro" ? "#3A2024" : "#303023", marginVertical: 8 }}>
                                <Text style={{ color: feedback.tipo === "erro" ? "#FFD8D8" : "#F8E6BD", textAlign: "center" }}>
                                    {feedback.mensagem}
                                </Text>
                            </View>
                        )}

                        <Pressable
                            style={({ pressed }) => [enviarLinkStyle.btnEnviar, pressed && enviarLinkStyle.btnEnviarPressed]}
                            onPress={confirmarCodigo}
                            disabled={processando || !dadosDisponiveis || segundosRestantes === 0}
                        >
                            <Text style={enviarLinkStyle.txtEnviar}>
                                {processando ? "Validando..." : modo === "cadastro" ? "Confirmar e criar conta" : "Confirmar código"}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [enviarLinkStyle.btnVoltar, pressed && enviarLinkStyle.btnVoltarPressed]}
                            onPress={() => {
                                if (modo === "recuperacao") router.replace("/esqueciSenha");
                                else if (modo === "alteracao") router.replace("/alterarSenha");
                                else router.back();
                            }}
                            disabled={processando}
                        >
                            <Text style={enviarLinkStyle.txtVoltar}>
                                {modo === "cadastro" ? "Voltar ao cadastro" : modo === "alteracao" ? "Voltar à alteração de senha" : "Voltar"}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
