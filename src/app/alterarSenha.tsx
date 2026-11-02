import { useState } from "react";
import { router } from "expo-router";
import {
    ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/AuthContext";
import { useTema } from "@/contexts/TemaContext";
import { solicitarCodigoAlteracao } from "@/services/verificacaoEmailService";
import { iniciarAlteracaoSenha } from "@/services/senhaPendente";

// LOGADO: senha atual + nova senha -> e-mail -> confirmação -> alteração.
export default function AlterarSenhaScreen() {
    const { token } = useAuth();
    const { coresTema } = useTema();

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [verAtual, setVerAtual] = useState(false);
    const [verNova, setVerNova] = useState(false);
    const [verConfirmacao, setVerConfirmacao] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

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
        if (novaSenha.length < 8) {
            setErro("A nova senha deve possuir pelo menos 8 caracteres.");
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
            // Verifica a senha atual no backend antes de enviar o código.
            await solicitarCodigoAlteracao(token, senhaAtual);
            iniciarAlteracaoSenha(senhaAtual, novaSenha, confirmarSenha);
            router.push({ pathname: "/enviarLink", params: { modo: "alteracao" } });
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Não foi possível enviar o código.");
        } finally {
            setCarregando(false);
        }
    }

    const campo = [styles.input, {
        color: coresTema.texto,
        borderColor: coresTema.linha,
    }];

    function renderCampoSenha({
        titulo, valor, aoMudar, visivel, alternar,
    }: {
        titulo: string;
        valor: string;
        aoMudar: (texto: string) => void;
        visivel: boolean;
        alternar: () => void;
    }) {
        return (
            <View style={styles.group}>
                <Text style={[styles.label, { color: coresTema.textoSecundario }]}>{titulo}</Text>
                <View style={[styles.inputRow, { borderColor: coresTema.linha }]}>
                    <TextInput
                        style={[campo, styles.inputSemBorda]}
                        placeholder={titulo}
                        placeholderTextColor="#8F9797"
                        secureTextEntry={!visivel}
                        value={valor}
                        onChangeText={aoMudar}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={!carregando}
                        maxLength={255}
                    />
                    <Pressable accessibilityRole="button" accessibilityLabel={visivel ? `Ocultar ${titulo}` : `Mostrar ${titulo}`}
                        onPress={alternar} style={styles.eye}>
                        <Ionicons name={visivel ? "eye-off-outline" : "eye-outline"} size={23} color={coresTema.textoSecundario} />
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: coresTema.footer }]}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={[styles.title, { color: coresTema.texto }]}>Alterar senha</Text>
                <Text style={[styles.info, { color: coresTema.textoSecundario }]}>
                    Primeiro escolha a nova senha. Depois enviaremos um código para o e-mail da sua conta. A alteração só será concluída após a confirmação.
                </Text>

                {renderCampoSenha({ titulo: "Senha atual", valor: senhaAtual, aoMudar: setSenhaAtual, visivel: verAtual, alternar: () => setVerAtual(!verAtual) })}
                {renderCampoSenha({ titulo: "Nova senha", valor: novaSenha, aoMudar: setNovaSenha, visivel: verNova, alternar: () => setVerNova(!verNova) })}
                {renderCampoSenha({ titulo: "Confirmar nova senha", valor: confirmarSenha, aoMudar: setConfirmarSenha, visivel: verConfirmacao, alternar: () => setVerConfirmacao(!verConfirmacao) })}

                {!!erro && (
                    <View accessibilityRole="alert" style={styles.error}>
                        <Text style={styles.errorText}>{erro}</Text>
                    </View>
                )}

                <Pressable
                    onPress={continuar}
                    disabled={carregando || !token}
                    style={[styles.button, { backgroundColor: coresTema.destaque, opacity: carregando ? .7 : 1 }]}
                >
                    {carregando ? <ActivityIndicator color="#0A1013" /> :
                        <Text style={styles.buttonText}>Enviar código de confirmação</Text>}
                </Pressable>

                <Pressable onPress={() => router.back()} disabled={carregando} style={styles.back}>
                    <Text style={{ color: coresTema.textoSecundario }}>Voltar</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 50, gap: 16 },
    title: { fontSize: 26, fontWeight: "700" },
    info: { fontSize: 15, lineHeight: 23, marginBottom: 4 },
    group: { gap: 7 },
    label: { fontSize: 14, fontWeight: "600" },
    inputRow: { flexDirection: "row", borderWidth: 1, borderRadius: 12, minHeight: 52, alignItems: "center" },
    input: { fontSize: 16, paddingHorizontal: 14 },
    inputSemBorda: { flex: 1, minHeight: 50, borderWidth: 0 },
    eye: { paddingHorizontal: 14, paddingVertical: 10 },
    button: { minHeight: 52, borderRadius: 12, alignItems: "center", justifyContent: "center", paddingHorizontal: 12, marginTop: 10 },
    buttonText: { color: "#0A1013", fontWeight: "700", fontSize: 15, textAlign: "center" },
    back: { alignItems: "center", marginTop: 10, padding: 10 },
    error: { backgroundColor: "#3A2024", padding: 12, borderRadius: 10 },
    errorText: { color: "#FFD8D8", lineHeight: 20 },
});
