import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
    ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView,
    Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import globalStyle from "@/styles/globalStyles";
import { useTema } from "@/contexts/TemaContext";
import { redefinirSenha } from "@/services/verificacaoEmailService";
import { limparSenhaPendente, obterSenhaPendente } from "@/services/senhaPendente";

// Nome e rota originais preservados: senhaRef.tsx -> /senhaRef
// Só permite redefinir após a verificação real do código pelo backend.
export default function SenhaRefScreen() {
    const { coresTema } = useTema();
    const [pendencia] = useState(obterSenhaPendente);
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [verSenha, setVerSenha] = useState(false);
    const [verConfirmacao, setVerConfirmacao] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!pendencia || pendencia.tipo !== "recuperacao" || !pendencia.codigo) {
            // Sem dados temporários, a recuperação deve reiniciar.
            router.replace("/esqueciSenha");
        }
    }, [pendencia]);

    async function salvarNovaSenha() {
        if (carregando) return;
        if (!pendencia || pendencia.tipo !== "recuperacao" || !pendencia.codigo) return;
        setErro("");
        if (senha.length < 8) {
            setErro("A nova senha precisa de pelo menos 8 caracteres.");
            return;
        }
        if (senha !== confirmarSenha) {
            setErro("As senhas informadas não são iguais.");
            return;
        }

        try {
            setCarregando(true);
            await redefinirSenha(pendencia.email, pendencia.codigo, senha, confirmarSenha);
            limparSenhaPendente();
            router.replace("/senhaRef");
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Não foi possível redefinir a senha.");
        } finally {
            setCarregando(false);
        }
    }

    const corBorda = coresTema.linha;
    const corTexto = coresTema.texto;
    const corSecundaria = coresTema.textoSecundario;

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                        <Image style={globalStyle.logoMenor} source={require("@/assets/images/img/logo.svg")} />
                        <Text style={[styles.title, { color: corTexto }]}>Crie sua nova senha</Text>
                        <Text style={[styles.info, { color: corSecundaria }]}>O código de verificação foi confirmado. Escolha uma nova senha para sua conta.</Text>

                        <Text style={[styles.label, { color: corSecundaria }]}>Nova senha</Text>
                        <View style={[styles.inputRow, { borderColor: corBorda }]}>
                            <TextInput
                                style={[styles.input, { color: corTexto }]}
                                value={senha}
                                onChangeText={setSenha}
                                placeholder="Mínimo de 8 caracteres"
                                placeholderTextColor="#888888"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={!verSenha}
                                editable={!carregando}
                                maxLength={255}
                            />
                            <Pressable onPress={() => setVerSenha(!verSenha)} style={styles.eye} accessibilityRole="button" accessibilityLabel={verSenha ? "Ocultar senha" : "Mostrar senha"}>
                                <Ionicons name={verSenha ? "eye-off-outline" : "eye-outline"} color={corSecundaria} size={23} />
                            </Pressable>
                        </View>

                        <Text style={[styles.label, { color: corSecundaria }]}>Confirmar nova senha</Text>
                        <View style={[styles.inputRow, { borderColor: corBorda }]}>
                            <TextInput
                                style={[styles.input, { color: corTexto }]}
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                                placeholder="Confirme sua nova senha"
                                placeholderTextColor="#888888"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={!verConfirmacao}
                                editable={!carregando}
                                maxLength={255}
                                onSubmitEditing={salvarNovaSenha}
                            />
                            <Pressable onPress={() => setVerConfirmacao(!verConfirmacao)} style={styles.eye} accessibilityRole="button" accessibilityLabel={verConfirmacao ? "Ocultar confirmação" : "Mostrar confirmação"}>
                                <Ionicons name={verConfirmacao ? "eye-off-outline" : "eye-outline"} color={corSecundaria} size={23} />
                            </Pressable>
                        </View>

                        {!!erro && (
                            <View accessibilityRole="alert" style={styles.error}>
                                <Text style={styles.errorText}>{erro}</Text>
                            </View>
                        )}

                        <Pressable
                            onPress={salvarNovaSenha}
                            disabled={carregando || !pendencia || pendencia.tipo !== "recuperacao"}
                            style={[styles.button, { backgroundColor: coresTema.destaque }]}
                        >
                            {carregando ? <ActivityIndicator color="#0A1013" /> :
                                <Text style={styles.buttonText}>Redefinir senha</Text>}
                        </Pressable>

                        <Pressable onPress={() => router.replace("/esqueciSenha")} disabled={carregando} style={styles.back}>
                            <Text style={{ color: corSecundaria, textAlign: "center" }}>Solicitar outro código</Text>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, paddingHorizontal: 26, paddingVertical: 35, justifyContent: "center", gap: 13, width: "100%", maxWidth: 480, alignSelf: "center" },
    title: { fontSize: 26, fontWeight: "700", textAlign: "center", marginTop: 12 },
    info: { fontSize: 15, lineHeight: 22, textAlign: "center", marginBottom: 18 },
    label: { fontSize: 14, fontWeight: "600", marginTop: 5 },
    inputRow: { flexDirection: "row", borderWidth: 1, borderRadius: 12, minHeight: 52, alignItems: "center", backgroundColor: "#192129" },
    input: { flex: 1, minHeight: 50, fontSize: 16, paddingHorizontal: 14 },
    eye: { paddingVertical: 10, paddingHorizontal: 13 },
    error: { backgroundColor: "#3A2024", padding: 12, borderRadius: 10, marginTop: 5 },
    errorText: { color: "#FFD8D8", fontSize: 14, lineHeight: 20 },
    button: { minHeight: 52, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 12 },
    buttonText: { fontSize: 16, color: "#101820", fontWeight: "700" },
    back: { padding: 10, marginTop: 8 },
});
