import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "@/services/authService";
import { buscarUsuario } from "@/services/usuarioService";
import { useAuth } from "@/contexts/AuthContext";
import AuthBrand from "@/components/AuthBrand";
import loginStyle from "@/styles/loginStyles";

export default function Index() {
  const [verSenha, setVerSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erroLogin, setErroLogin] = useState("");

  const { definirSessao } = useAuth();

  // =========================================
  // LOGIN
  // =========================================
  async function fazerLogin() {
    if (carregando) return;

    setErroLogin("");

    const emailTratado = email.trim().toLowerCase();

    // VALIDAÇÃO DOS CAMPOS
    if (!emailTratado || !senha) {
      setErroLogin("Preencha o e-mail e a senha para continuar.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado)) {
      setErroLogin("Informe um endereço de e-mail válido.");
      return;
    }

    setCarregando(true);
    let loginAutenticado = false;

    try {
      // LOGIN NA API
      const resposta = await login(emailTratado, senha);

      if (
        resposta &&
        "success" in resposta &&
        resposta.success === false
      ) {
        const mensagemApi =
          "message" in resposta
            ? String(resposta.message ?? "")
            : "";

        throw new Error(
          mensagemApi || "E-mail ou senha inválidos."
        );
      }

      // TOKEN
      const token = resposta?.data?.token;

      if (!token) {
        throw new Error(
          "Não foi possível autenticar. Verifique seu e-mail e sua senha."
        );
      }

      loginAutenticado = true;

      // BUSCA USUÁRIO COMPLETO
      const respostaUsuario = await buscarUsuario(token);

      const usuarioCompleto =
        (respostaUsuario as any)?.data?.usuario ??
        (respostaUsuario as any)?.data ??
        respostaUsuario;

      if (!usuarioCompleto) {
        throw new Error(
          "Não foi possível carregar os dados do usuário."
        );
      }

      // SALVA SESSÃO
      await definirSessao(token, usuarioCompleto);

      // NAVEGA PARA HOME
      router.replace("/home");

    } catch (error: unknown) {
      console.warn("ERRO LOGIN:", error);

      if (loginAutenticado) {
        setErroLogin(
          "O login foi aceito, mas não foi possível carregar seu perfil. Tente novamente."
        );
        return;
      }

      const erro = error as {
        status?: number;
        response?: { status?: number };
        message?: string;
      };

      const status = erro?.status ?? erro?.response?.status;
      const mensagem = (erro?.message || "").toLowerCase();

      // CREDENCIAIS INCORRETAS
      if (
        status === 401 ||
        /\b401\b/.test(mensagem) ||
        mensagem.includes("credentials") ||
        mensagem.includes("credenciais") ||
        mensagem.includes("incorret") ||
        mensagem.includes("inválid") ||
        mensagem.includes("invalid") ||
        mensagem.includes("não foi possível autenticar")
      ) {
        setErroLogin(
          "E-mail ou senha inválidos. Verifique seus dados e tente novamente."
        );

      // ERRO DE VALIDAÇÃO
      } else if (status === 422) {
        setErroLogin(
          "Verifique o e-mail e a senha informados."
        );

      // ERRO DE CONEXÃO
      } else if (
        mensagem.includes("network") ||
        mensagem.includes("fetch") ||
        mensagem.includes("conexão") ||
        mensagem.includes("timeout")
      ) {
        setErroLogin(
          "Não foi possível conectar ao servidor. Verifique sua conexão."
        );

      // ERRO GENÉRICO
      } else {
        setErroLogin(
          "Não foi possível realizar o login. Tente novamente."
        );
      }

    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={loginStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={loginStyle.background}
        resizeMode="stretch"
      >
        <View style={loginStyle.overlay}>
          <SafeAreaView style={loginStyle.safeArea}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
              <ScrollView
                contentContainerStyle={loginStyle.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={loginStyle.conteudo}>
                  <View>
                    <View style={loginStyle.conteudoTopo}>
                      <AuthBrand showAppName />
                    </View>
                    <View style={loginStyle.conteudoBtns}>
                      <Text style={loginStyle.heading}>Acesse sua conta</Text>
                      <Text style={loginStyle.description}>
                        Entre com seu e-mail e senha para continuar no Conexão 360°.
                      </Text>
                      <View style={loginStyle.form} nativeID="auth-login-form">
                        <View style={loginStyle.input}>
                          <Ionicons name="mail-outline" size={23} color="#F0C247" style={{ marginRight: 12 }} />
                          <TextInput
                            style={loginStyle.txtInput}
                            placeholder="E-mail"
                            placeholderTextColor="#BFC0C6"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect={false}
                            value={email}
                            editable={!carregando}
                            onChangeText={(valor) => { setEmail(valor); if (erroLogin) setErroLogin(""); }}
                          />
                        </View>
                        <View style={loginStyle.input}>
                          <Ionicons name="lock-closed-outline" size={23} color="#F0C247" style={{ marginRight: 12 }} />
                          <TextInput
                            style={loginStyle.txtInput}
                            placeholder="Senha"
                            placeholderTextColor="#BFC0C6"
                            secureTextEntry={!verSenha}
                            autoComplete="password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={senha}
                            editable={!carregando}
                            onSubmitEditing={fazerLogin}
                            onChangeText={(valor) => { setSenha(valor); if (erroLogin) setErroLogin(""); }}
                          />
                          <Pressable
                            style={loginStyle.revealButton}
                            onPress={() => setVerSenha((atual) => !atual)}
                            accessibilityRole="button"
                            accessibilityLabel={verSenha ? "Ocultar senha" : "Mostrar senha"}
                          >
                            <Ionicons name={verSenha ? "eye-off-outline" : "eye-outline"} size={23} color="#D3D4D8" />
                          </Pressable>
                        </View>
                      </View>
                      <View style={loginStyle.esquecidaRow}>
                        <Pressable onPress={() => router.navigate("/esqueciSenha")}>
                          <Text style={loginStyle.txtEsqueciSenha}>Esqueci minha senha</Text>
                        </Pressable>
                      </View>
                      <Pressable
                        style={({ pressed }) => [loginStyle.btnEntrar, pressed && loginStyle.btnEntrarPressed, carregando && loginStyle.btnDesabilitado]}
                        onPress={fazerLogin}
                        disabled={carregando}
                        accessibilityRole="button"
                      >
                        <Text style={loginStyle.textBtn}>{carregando ? "Entrando..." : "Entrar"}</Text>
                      </Pressable>
                      {!!erroLogin && (
                        <View accessibilityRole="alert" style={loginStyle.erroBox}>
                          <Text style={loginStyle.erroText}>{erroLogin}</Text>
                        </View>
                      )}
                      <View style={loginStyle.separator}>
                        <View style={loginStyle.line} />
                        <Text style={loginStyle.separatorText}>Ainda não tem uma conta?</Text>
                        <View style={loginStyle.line} />
                      </View>
                      <Pressable
                        style={({ pressed }) => [loginStyle.btnCriar, pressed && loginStyle.btnCriarPressed]}
                        onPress={() => router.navigate("/cad-cliente")}
                      >
                        <Text style={loginStyle.textCriar}>Criar conta</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={loginStyle.slogan}>
                    <Text style={loginStyle.sloganTitulo}>Networking de alto nível</Text>
                    <Text style={loginStyle.sloganSubtitulo}>
                      Conhecimento <Text style={loginStyle.x}>Exponencial</Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}
