import { router } from "expo-router";
import {
  Pressable,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import globalStyle from "@/styles/globalStyles";
import { esqueciSenhaStyle } from "@/styles/esqueciSenhaStyles";

export default function EsqueciSenha() {
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <View style={esqueciSenhaStyle.conteudo}>
          <View style={esqueciSenhaStyle.conteudoTopo}>
            <Image
              style={globalStyle.logoMenor}
              source={require("@/assets/images/img/logo.svg")}
            ></Image>
            <Text style={esqueciSenhaStyle.subtitulo}>Esqueceu a Senha ?</Text>
            <Text style={esqueciSenhaStyle.titulo}>
              Vamos <Text style={esqueciSenhaStyle.titulo2}>Redefinir</Text>
            </Text>
            <Text style={esqueciSenhaStyle.inf}>
              Informe seu e-mail para receber o link de redefinição
            </Text>
            <View style={esqueciSenhaStyle.cardInput}>
              <View style={esqueciSenhaStyle.input}>
                <Image
                  style={esqueciSenhaStyle.icon}
                  source={require("@/assets/images/img/e-mail.png")}
                />
                <TextInput
                  style={esqueciSenhaStyle.txtInput}
                  placeholder="E-mail"
                  placeholderTextColor={"#888888"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              esqueciSenhaStyle.btnEnviar,
              pressed && esqueciSenhaStyle.btnEnviarPressed,
            ]}
            onPress={() => router.navigate("/enviarLink")}
          >
            <Text style={esqueciSenhaStyle.txtEnviar}>Enviar Link</Text>
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/")}
            style={({ pressed }) => [
              esqueciSenhaStyle.btnVoltar,
              pressed && esqueciSenhaStyle.btnVoltarPressed,
            ]}
          >
            <Text style={esqueciSenhaStyle.txtVoltar}>Voltar ao login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
