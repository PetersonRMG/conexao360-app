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

import loginStyle from "@/styles/loginStyles";
import globalStyle from "@/styles/globalStyles";

export default function Index() {
  const [verSenha, setVerSenha] = useState(false);
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
                {/* logo */}
                <Image source={require("@/assets/images/img/logo.svg")}></Image>
                <Text style={loginStyle.titulo}>
                  Advocacia {"\n"} E<Text style={loginStyle.x}>x</Text>ponencial
                </Text>
                <Text style={loginStyle.subtitulo}>Rede Exclusiva</Text>
              </View>

              {/* form */}
              <View style={loginStyle.conteudoBtns}>
                <View style={loginStyle.form}>
                  <View style={loginStyle.input}>
                    <Image
                      source={require("@/assets/images/img/e-mail.png")}
                      style={loginStyle.icone}
                    />
                    <TextInput
                      style={loginStyle.txtInput}
                      placeholder="E-mail"
                      placeholderTextColor={"#D6B26A"}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="off"
                      textContentType="none"
                    />
                  </View>
                  <View style={loginStyle.input}>
                    <Image
                      source={require("@/assets/images/img/trancar.png")}
                      style={loginStyle.icone}
                    />
                    <TextInput
                      placeholder="Senha"
                      secureTextEntry={!verSenha}
                      placeholderTextColor={"#D6B26A"}
                      keyboardType="visible-password"
                      autoComplete="off"
                      textContentType="none"
                      style={loginStyle.txtInput}
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

                <Pressable
                  style={({ pressed }) => [
                    loginStyle.btnEntrar,
                    pressed && loginStyle.btnEntrarPressed,
                  ]}
                  onPress={()=>router.navigate('/home')}
                >
                  <Text style={loginStyle.textBtn}>Entrar</Text>
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

                {/* slogan */}
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
