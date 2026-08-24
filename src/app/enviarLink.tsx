import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";

import globalStyle from "@/styles/globalStyles";
import { enviarLinkStyle } from "@/styles/enviarLinkStyles";

export default function EnviarLinkScreen() {
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <View style={enviarLinkStyle.conteudo}>
          {/* CONTEÚDO SUPERIOR */}
          <View style={enviarLinkStyle.conteudoTopo}>
            <Image
              style={globalStyle.logoMenor}
              source={require("@/assets/images/img/logo.svg")}
            ></Image>
            <Text style={enviarLinkStyle.subtitulo}>Abra Seu Email</Text>

            <Text style={enviarLinkStyle.titulo}>
              Enviamos{" "}
              <Text style={enviarLinkStyle.tituloDourado}>Confirmação</Text>
            </Text>

            <Text style={enviarLinkStyle.inf}>
              Para sua segurança, digite o código de 4 dígitos
              {"\n"}
              enviado no seu email.
            </Text>
          </View>

          {/* CÓDIGO */}
          <View style={enviarLinkStyle.codigoContainer}>
            <TextInput
              style={enviarLinkStyle.codigoInput}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />

            <TextInput
              style={enviarLinkStyle.codigoInput}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />

            <TextInput
              style={enviarLinkStyle.codigoInput}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />

            <TextInput
              style={enviarLinkStyle.codigoInput}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          </View>

          {/* CONFIRMAR */}
          <Pressable
            style={({ pressed }) => [
              enviarLinkStyle.btnEnviar,
              pressed && enviarLinkStyle.btnEnviarPressed,
            ]}
            onPress={() => router.navigate("/senhaRef")}
          >
            <Text style={enviarLinkStyle.txtEnviar}>Confirmar codigo</Text>
          </Pressable>

          {/* VOLTAR */}
          <Pressable
            style={({ pressed }) => [
              enviarLinkStyle.btnVoltar,
              pressed && enviarLinkStyle.btnVoltarPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={enviarLinkStyle.txtVoltar}>Voltar ao login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
