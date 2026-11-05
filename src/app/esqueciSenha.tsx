import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthBrand from "@/components/AuthBrand";
import { esqueciSenhaStyle as styles } from "@/styles/esqueciSenhaStyles";
import { solicitarCodigoRecuperacao } from "@/services/verificacaoEmailService";
import { iniciarRecuperacaoSenha } from "@/services/senhaPendente";

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
      <View style={styles.container}>
        <ImageBackground source={require("@/assets/images/img/fundoLogin.png")} style={styles.background} resizeMode="stretch">
          <View style={styles.overlay}>
            <SafeAreaView style={styles.safe}>
              <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                  <View style={styles.conteudo}>
                    <View style={styles.back}>
                      <Pressable style={styles.backTap} onPress={() => router.replace("/")} accessibilityLabel="Voltar">
                        <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                      </Pressable>
                      <Text style={styles.appTitle}>Conexão <Text style={styles.appTitleGold}>360°</Text></Text>
                      <View style={styles.backSpacer} />
                    </View>
                    <AuthBrand compact />
                    <Ionicons name="mail-outline" size={58} color="#F0C247" style={styles.iconHero} />
                    <View style={styles.conteudoTopo}>
                      <Text style={styles.subtitulo}>Esqueceu a senha?</Text>
                      <Text style={styles.titulo}>Vamos <Text style={styles.titulo2}>Redefinir</Text></Text>
                      <Text style={styles.inf}>
                        Informe o e-mail da sua conta. Enviaremos um código de 6 dígitos para confirmar a recuperação.
                      </Text>
                    </View>
                    <View style={styles.cardInput}>
                      <View style={styles.input}>
                        <Ionicons name="mail-outline" size={23} color="#F0C247" style={{ marginRight: 12 }} />
                        <TextInput
                          style={styles.txtInput} placeholder="E-mail cadastrado" placeholderTextColor="#BFC0C6"
                          keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
                          autoComplete="email" value={email} onChangeText={setEmail}
                          editable={!carregando} maxLength={80} onSubmitEditing={enviarCodigo}
                        />
                      </View>
                    </View>
                    {!!erro && (
                      <View accessibilityRole="alert" style={styles.erroBox}>
                        <Text style={styles.erroText}>{erro}</Text>
                      </View>
                    )}
                    <Pressable
                      style={({ pressed }) => [styles.btnEnviar, pressed && styles.btnEnviarPressed]}
                      disabled={carregando} onPress={enviarCodigo}
                    >
                      {carregando ? <ActivityIndicator color="#1B1C21" /> : (
                        <>
                          <Ionicons name="paper-plane-outline" color="#1B1C21" size={20} />
                          <Text style={styles.txtEnviar}>Enviar código</Text>
                        </>
                      )}
                    </Pressable>
                    <View style={styles.infoBox}>
                      <Ionicons name="information-circle-outline" size={22} color="#F0C247" />
                      <Text style={styles.infoText}>Você receberá um código de 6 dígitos no seu e-mail para continuar.</Text>
                    </View>
                    <Pressable
                      style={({ pressed }) => [styles.btnVoltar, pressed && styles.btnVoltarPressed]}
                      disabled={carregando} onPress={() => router.replace("/")}
                    >
                      <Text style={styles.txtVoltar}>Voltar ao login</Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    );
}
