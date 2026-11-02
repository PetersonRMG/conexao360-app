import { useState } from "react";
import { router } from "expo-router";
import {
    ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Platform,
    Pressable, ScrollView, Text, TextInput, View,
} from "react-native";

import globalStyle from "@/styles/globalStyles";
import { esqueciSenhaStyle } from "@/styles/esqueciSenhaStyles";
import { solicitarCodigoRecuperacao } from "@/services/verificacaoEmailService";
import { iniciarRecuperacaoSenha } from "@/services/senhaPendente";

// RECUPERAÇÃO: e-mail -> código -> nova senha.
export default function EsqueciSenhaScreen() {
    const [email, setEmail] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function enviarCodigo() {
        if (carregando) return;
        setErro("");
        const emailTratado = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado)) {
            setErro("Informe um e-mail válido.");
            return;
        }

        try {
            setCarregando(true);
            await solicitarCodigoRecuperacao(emailTratado);
            iniciarRecuperacaoSenha(emailTratado);
            router.push({ pathname: "/enviarLink", params: { modo: "recuperacao" } });
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Não foi possível solicitar o código.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        contentContainerStyle={[esqueciSenhaStyle.conteudo, { paddingBottom: 30 }]}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={esqueciSenhaStyle.conteudoTopo}>
                            <Image style={globalStyle.logoMenor} source={require("@/assets/images/img/logo.svg")} />
                            <Text style={esqueciSenhaStyle.subtitulo}>Esqueceu a senha?</Text>
                            <Text style={esqueciSenhaStyle.titulo}>
                                Vamos <Text style={esqueciSenhaStyle.titulo2}>Redefinir</Text>
                            </Text>
                            <Text style={esqueciSenhaStyle.inf}>
                                Informe o e-mail da sua conta. Enviaremos um código de 6 dígitos para confirmar a recuperação.
                            </Text>
                            <View style={esqueciSenhaStyle.cardInput}>
                                <View style={esqueciSenhaStyle.input}>
                                    <Image style={esqueciSenhaStyle.icon} source={require("@/assets/images/img/e-mail.png")} />
                                    <TextInput
                                        style={esqueciSenhaStyle.txtInput}
                                        placeholder="E-mail cadastrado"
                                        placeholderTextColor="#888888"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={email}
                                        onChangeText={setEmail}
                                        editable={!carregando}
                                        maxLength={80}
                                        onSubmitEditing={enviarCodigo}
                                    />
                                </View>
                            </View>
                        </View>

                        {!!erro && (
                            <View accessibilityRole="alert" style={{ backgroundColor: "#3A2024", borderRadius: 10, padding: 12, marginBottom: 10 }}>
                                <Text style={{ color: "#FFD8D8", textAlign: "center" }}>{erro}</Text>
                            </View>
                        )}

                        <Pressable
                            style={({ pressed }) => [esqueciSenhaStyle.btnEnviar, pressed && esqueciSenhaStyle.btnEnviarPressed]}
                            disabled={carregando}
                            onPress={enviarCodigo}
                        >
                            {carregando ? <ActivityIndicator color="#ffffff" /> :
                                <Text style={esqueciSenhaStyle.txtEnviar}>Enviar código</Text>}
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [esqueciSenhaStyle.btnVoltar, pressed && esqueciSenhaStyle.btnVoltarPressed]}
                            disabled={carregando}
                            onPress={() => router.replace("/")}
                        >
                            <Text style={esqueciSenhaStyle.txtVoltar}>Voltar ao login</Text>
                        </Pressable>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}
