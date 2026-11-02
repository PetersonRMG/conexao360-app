
import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { login } from "@/services/authService";
import { buscarUsuario } from "@/services/usuarioService";
import { useAuth } from "@/contexts/AuthContext";

import loginStyle from "@/styles/loginStyles";
import globalStyle from "@/styles/globalStyles";

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

  // =========================================
  // TELA
  // =========================================
  return (
    <View style={loginStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={loginStyle.background}
        resizeMode="stretch"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView
            style={globalStyle.scrollConteudo}
            keyboardShouldPersistTaps="handled"
          >
            <View style={loginStyle.conteudo}>

              {/* TOPO */}
              <View style={loginStyle.conteudoTopo}>
                <Image
                  source={require("@/assets/images/img/logo.svg")}
                />

                <Text style={loginStyle.titulo}>
                  Advocacia {"\n"} E
                  <Text style={loginStyle.x}>x</Text>
                  ponencial
                </Text>

                <Text style={loginStyle.subtitulo}>
                  Rede Exclusiva
                </Text>
              </View>

              {/* FORMULÁRIO */}
              <View style={loginStyle.conteudoBtns}>
                <View style={loginStyle.form}>

                  {/* E-MAIL */}
                  <View style={loginStyle.input}>
                    <Image
                      source={require("@/assets/images/img/e-mail.png")}
                      style={loginStyle.icone}
                    />

                    <TextInput
                      style={loginStyle.txtInput}
                      placeholder="E-mail"
                      placeholderTextColor="#D6B26A"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect={false}
                      value={email}
                      editable={!carregando}
                      onChangeText={(valor) => {
                        setEmail(valor);
                        if (erroLogin) setErroLogin("");
                      }}
                    />
                  </View>

                  {/* SENHA */}
                  <View style={loginStyle.input}>
                    <Image
                      source={require("@/assets/images/img/trancar.png")}
                      style={loginStyle.icone}
                    />

                    <TextInput
                      style={loginStyle.txtInput}
                      placeholder="Senha"
                      placeholderTextColor="#D6B26A"
                      secureTextEntry={!verSenha}
                      autoComplete="password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={senha}
                      editable={!carregando}
                      onSubmitEditing={fazerLogin}
                      onChangeText={(valor) => {
                        setSenha(valor);
                        if (erroLogin) setErroLogin("");
                      }}
                    />

                    {/* MOSTRAR / OCULTAR SENHA */}
                    <Pressable
                      onPress={() =>
                        setVerSenha((atual) => !atual)
                      }
                      accessibilityRole="button"
                      accessibilityLabel={
                        verSenha ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      <Image
                        source={
                          verSenha
                            ? require("@/assets/images/img/esconder.png")
                            : require("@/assets/images/img/olho.png")
                        }
                        style={loginStyle.mostrarSenha}
                      />
                    </Pressable>
                  </View>
                </View>

                {/* ESQUECI SENHA */}
                <Pressable
                  onPress={() =>
                    router.navigate("/esqueciSenha")
                  }
                >
                  <Text style={loginStyle.txtEsqueciSenha}>
                    Esqueci Senha
                  </Text>
                </Pressable>

                {/* ENTRAR */}
                <Pressable
                  style={({ pressed }) => [
                    loginStyle.btnEntrar,
                    pressed && loginStyle.btnEntrarPressed,
                  ]}
                  onPress={fazerLogin}
                  disabled={carregando}
                >
                  <Text style={loginStyle.textBtn}>
                    {carregando ? "Entrando..." : "Entrar"}
                  </Text>
                </Pressable>

                {/* MENSAGEM DE ERRO */}
                {erroLogin !== "" && (
                  <View
                    accessibilityRole="alert"
                    style={{
                      marginTop: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 14,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#CA6868",
                      backgroundColor: "#351F24",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFD8D8",
                        fontSize: 14,
                        lineHeight: 20,
                        textAlign: "center",
                      }}
                    >
                      {erroLogin}
                    </Text>
                  </View>
                )}

                {/* CRIAR CONTA */}
                <Pressable
                  style={({ pressed }) => [
                    loginStyle.btnCriar,
                    pressed && loginStyle.btnCriarPressed,
                  ]}
                  onPress={() =>
                    router.navigate("/cad-cliente")
                  }
                >
                  <Text
                    style={[
                      loginStyle.textBtn,
                      loginStyle.textCriar,
                    ]}
                  >
                    Criar Conta
                  </Text>
                </Pressable>

                {/* SLOGAN */}
                <Text style={loginStyle.sloganTitulo}>
                  Networking de alto nivel
                </Text>

                <Text style={loginStyle.sloganSubtitulo}>
                  Conhecimento{" "}
                  <Text style={loginStyle.x}>
                    Exponencial
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
