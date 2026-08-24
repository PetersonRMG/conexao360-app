import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import loginStyle from "@/styles/loginStyles";
import globalStyle from "@/styles/globalStyles";

export default function Index() {
  return (
    <View style={loginStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={loginStyle.background}
        resizeMode="stretch"
      >
        {/* <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
          </ScrollView>
        </SafeAreaView> */}
        <View style={loginStyle.conteudo}>
          <View style={loginStyle.conteudoTopo}>
            {/* logo */}
            <Image source={require("@/assets/images/img/logo.svg")}></Image>
            <Text style={loginStyle.titulo}>
              Conhecimento <Text style={loginStyle.x}>Exponencial</Text>
            </Text>
            <Text style={loginStyle.subtitulo}>Rede Exclusiva</Text>
          </View>

          {/* form */}
          <View style={loginStyle.conteudoBtns}>
            <Pressable
              style={[loginStyle.btnEntrar]}
              onPress={() => router.navigate("/")}
            >
              <Text style={loginStyle.textBtn}>Entrar</Text>
            </Pressable>
            <Pressable
              style={[loginStyle.btnCriar]}
              onPress={() => router.navigate("/")}
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
      </ImageBackground>
    </View>
  );
}
