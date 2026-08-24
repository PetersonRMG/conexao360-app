import { router } from "expo-router";

import { ImageBackground, Pressable, Text, View, Image } from "react-native";

import globalStyle from "@/styles/globalStyles";
import { senhaRedfStyle } from "@/styles/senhaRedfStyles";

export default function SenhaRedfScreen() {
  // SIMULAÇÃO
  // true  = código correto
  // false = código incorreto
  const codigoCorreto = Math.random() >= 0.5;

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/fundoLogin.png")}
        style={globalStyle.background}
        resizeMode="stretch"
      >
        <View style={senhaRedfStyle.conteudo}>
          {/* LOGO */}
          <View style={senhaRedfStyle.conteudoTopo}>
            <Image
              style={globalStyle.logoMenor}
              source={require("@/assets/images/img/logo.svg")}
            />

            {/* 
                            SE O CÓDIGO ESTIVER CORRETO
                            */}
            {codigoCorreto ? (
              <>
                <Text style={senhaRedfStyle.subtitulo}>Senha Redefinida !</Text>

                <Text style={senhaRedfStyle.titulo}>
                  Acesse sua{" "}
                  <Text style={senhaRedfStyle.tituloDourado}>Conta</Text>
                </Text>

                <Text style={senhaRedfStyle.inf}>
                  Sua senha foi redefinida com sucesso !{"\n"}
                  agora volte a página de Login e faça seu acesso ao canal
                </Text>
              </>
            ) : (
              /*
                            SE O CÓDIGO ESTIVER INCORRETO
                            */

              <>
                <Text style={senhaRedfStyle.subtitulo}>Código incorreto !</Text>

                <Text style={senhaRedfStyle.titulo}>
                  Tente{" "}
                  <Text style={senhaRedfStyle.tituloDourado}>Novamente</Text>
                </Text>

                <Text style={senhaRedfStyle.inf}>
                  Você digitou o código incorreto e agora resta
                  {"\n"}
                  apenas 2 tentativas.
                  {"\n"}
                  Após haverá um bloqueio temporário de 1 hora.
                </Text>
              </>
            )}
          </View>

          {/* BOTÃO */}
          {codigoCorreto ? (
            <Pressable
              style={({ pressed }) => [
                senhaRedfStyle.btnVoltar,
                pressed && senhaRedfStyle.btnVoltarPressed,
              ]}
              onPress={() => router.navigate("/")}
            >
              <Text style={senhaRedfStyle.txtVoltar}>Voltar ao login</Text>
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [
                senhaRedfStyle.btnEnviar,
                pressed && senhaRedfStyle.btnEnviarPressed,
              ]}
              onPress={() => {
                router.navigate("/enviarLink");
              }}
            >
              <Text style={senhaRedfStyle.txtEnviar}>Enviar novo código</Text>
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
