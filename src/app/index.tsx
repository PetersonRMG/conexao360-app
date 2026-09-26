import { useState } from "react";
import { login } from "@/services/authService";
import { router } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import loginStyle from "@/styles/loginStyles";
import globalStyle from "@/styles/globalStyles";

export default function Index() {
  const [verSenha, setVerSenha] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  // PARA TESTE
  // Se estiver no celular físico, troque pelo IP do seu notebook.
  // Exemplo: http://192.168.0.15:8081

  async function fazerLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");

      return;
    }

    try {
      setCarregando(true);

      const resposta = await login(email, senha);

      console.log("LOGIN:", resposta);

      const token = resposta.data.token;

      router.replace({
        pathname: "/home",
        params: {
          token,
        },
      });
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro no login",
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o login.",
      );
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
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={loginStyle.conteudo}>
              <View style={loginStyle.conteudoTopo}>
                <Image source={require("@/assets/images/img/logo.svg")} />

                <Text style={loginStyle.titulo}>
                  Advocacia {"\n"} E<Text style={loginStyle.x}>x</Text>
                  ponencial
                </Text>

                <Text style={loginStyle.subtitulo}>Rede Exclusiva</Text>
              </View>

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
                      autoComplete="off"
                      textContentType="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  {/* SENHA */}
                  <View style={loginStyle.input}>
                    <Image
                      source={require("@/assets/images/img/trancar.png")}
                      style={loginStyle.icone}
                    />

                    <TextInput
                      placeholder="Senha"
                      secureTextEntry={!verSenha}
                      placeholderTextColor="#D6B26A"
                      autoComplete="off"
                      textContentType="none"
                      style={loginStyle.txtInput}
                      value={senha}
                      onChangeText={setSenha}
                    />

                    <Pressable
                      onPress={() => setVerSenha((current) => !current)}
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

                <Pressable onPress={() => router.navigate("/esqueciSenha")}>
                  <Text style={loginStyle.txtEsqueciSenha}>Esqueci Senha</Text>
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

                <Pressable
                  style={({ pressed }) => [
                    loginStyle.btnCriar,
                    pressed && loginStyle.btnCriarPressed,
                  ]}
                  onPress={() => router.navigate("/cad-cliente")}
                >
                  <Text style={[loginStyle.textBtn, loginStyle.textCriar]}>
                    Criar Conta
                  </Text>
                </Pressable>

                <Text style={loginStyle.sloganTitulo}>
                  Networking de alto nivel
                </Text>

                <Text style={loginStyle.sloganSubtitulo}>
                  Conhecimento <Text style={loginStyle.x}>Exponencial</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
