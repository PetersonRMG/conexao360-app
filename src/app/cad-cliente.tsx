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
import { cadClienteStyle } from "@/styles/cadClientStyles";

export default function CadClienteScreen() {
  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <View style={cadClienteStyle.conteudo}>
          {/* CONTEÚDO SUPERIOR */}
          <View style={cadClienteStyle.conteudoTopo}>
            <Image
              style={globalStyle.logoMenor}
              source={require("@/assets/images/img/logo.svg")}
            />

            <Text style={cadClienteStyle.subtitulo}>Criar Conta</Text>

            <Text style={cadClienteStyle.titulo}>
              Seja{" "}
              <Text style={cadClienteStyle.tituloDourado}>Exponencial</Text>
            </Text>

            <Text style={cadClienteStyle.inf}>
              Informe seus dados para criar uma nova conta.
            </Text>
          </View>

          {/* CAMPOS */}
          <View style={cadClienteStyle.cardInput}>
            {/* NOME */}
            <View style={cadClienteStyle.input}>
              <Image
                style={cadClienteStyle.icon}
                source={require("@/assets/images/img/usuario.png")}
              />

              <TextInput
                style={cadClienteStyle.txtInput}
                placeholder="Nome completo"
                placeholderTextColor={coresPlaceholder}
                autoCapitalize="words"
              />
            </View>

            {/* E-MAIL */}
            <View style={cadClienteStyle.input}>
              <Image
                style={cadClienteStyle.icon}
                source={require("@/assets/images/img/e-mail.png")}
              />

              <TextInput
                style={cadClienteStyle.txtInput}
                placeholder="E-mail"
                placeholderTextColor={coresPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* TELEFONE */}
            <View style={cadClienteStyle.input}>
              <Image
                style={cadClienteStyle.icon}
                source={require("@/assets/images/img/telefone.png")}
              />

              <TextInput
                style={cadClienteStyle.txtInput}
                placeholder="Telefone"
                placeholderTextColor={coresPlaceholder}
                keyboardType="phone-pad"
              />
            </View>

            {/* INGRESSO */}
            <View style={cadClienteStyle.input}>
              <Image
                style={cadClienteStyle.icon}
                source={require("@/assets/images/img/trancar.png")}
              />

              <TextInput
                style={cadClienteStyle.txtInput}
                placeholder="Ingresso"
                placeholderTextColor={coresPlaceholder}
                autoCapitalize="characters"
              />
            </View>
          </View>

          {/* CRIAR CONTA */}
          <Pressable
            style={({ pressed }) => [
              cadClienteStyle.btnCriar,
              pressed && cadClienteStyle.btnCriarPressed,
            ]}
            onPress={() => {
              // Aqui entra a lógica de criação da conta
            }}
          >
            <Text style={cadClienteStyle.txtCriar}>Criar Conta</Text>
          </Pressable>

          {/* VOLTAR AO LOGIN */}
          <Pressable
            style={({ pressed }) => [
              cadClienteStyle.btnVoltar,
              pressed && cadClienteStyle.btnVoltarPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={cadClienteStyle.txtVoltar}>Voltar ao login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const coresPlaceholder = "#888888";
