import {
  useState,
} from "react";

import {
  router,
} from "expo-router";

import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyles";

import {
  criarCadClienteStyles,
} from "@/styles/cadClientStyles";

import {
  useTema,
} from "@/contexts/TemaContext";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  cadastrarUsuario,
} from "@/services/authService";


export default function CadClienteScreen() {

  // =====================================
  // TEMA
  // =====================================

  const {
    coresTema,
  } = useTema();


  const cadClienteStyle =
    criarCadClienteStyles(
      coresTema
    );


  // =====================================
  // AUTENTICAÇÃO
  // =====================================

  const {
    definirSessao,
  } = useAuth();


  // =====================================
  // FORMULÁRIO
  // =====================================

  const [
    nome,
    setNome,
  ] = useState("");


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    areaAtuacao,
    setAreaAtuacao,
  ] = useState("");


  const [
    estado,
    setEstado,
  ] = useState("");


  const [
    senha,
    setSenha,
  ] = useState("");


  const [
    confirmarSenha,
    setConfirmarSenha,
  ] = useState("");


  const [
    termosAceitos,
    setTermosAceitos,
  ] = useState(false);


  const [
    cadastrando,
    setCadastrando,
  ] = useState(false);


  // =====================================
  // CADASTRAR
  // =====================================

  async function criarConta() {

    if (cadastrando) {

      return;

    }


    const nomeTratado =
      nome.trim();


    const emailTratado =
      email
        .trim()
        .toLowerCase();


    const areaTratada =
      areaAtuacao.trim();


    const estadoTratado =
      estado
        .trim()
        .toUpperCase();


    // =================================
    // VALIDAÇÕES LOCAIS
    // =================================

    if (!nomeTratado) {

      Alert.alert(
        "Nome obrigatório",
        "Informe seu nome completo."
      );

      return;

    }


    if (!emailTratado) {

      Alert.alert(
        "E-mail obrigatório",
        "Informe seu e-mail."
      );

      return;

    }


    if (
      !emailTratado.includes(
        "@"
      )
    ) {

      Alert.alert(
        "E-mail inválido",
        "Informe um e-mail válido."
      );

      return;

    }


    if (!areaTratada) {

      Alert.alert(
        "Área de atuação",
        "Informe sua área de atuação."
      );

      return;

    }


    if (
      estadoTratado.length !==
      2
    ) {

      Alert.alert(
        "Estado inválido",
        "Informe a sigla do estado com 2 letras. Exemplo: SP."
      );

      return;

    }


    if (
      senha.length <
      8
    ) {

      Alert.alert(
        "Senha inválida",
        "A senha deve possuir pelo menos 8 caracteres."
      );

      return;

    }


    if (
      senha !==
      confirmarSenha
    ) {

      Alert.alert(
        "Senhas diferentes",
        "A confirmação da senha não corresponde."
      );

      return;

    }


    if (!termosAceitos) {

      Alert.alert(
        "Termos de uso",
        "É necessário aceitar os termos para criar sua conta."
      );

      return;

    }


    // =================================
    // API
    // =================================

    try {

      setCadastrando(
        true
      );


      const resposta =
        await cadastrarUsuario({
          nome:
            nomeTratado,

          email:
            emailTratado,

          area_atuacao:
            areaTratada,

          estado:
            estadoTratado,

          sobre:
            "",

          senha,

          senha_confirmation:
            confirmarSenha,

          termos:
            termosAceitos,
        });


      if (
        !resposta.success
      ) {

        throw new Error(
          resposta.message ||
          "Não foi possível criar a conta."
        );

      }


      // =================================
      // SALVAR TOKEN + USUÁRIO
      // =================================

      await definirSessao(
        resposta.data.token,
        resposta.data.usuario
      );


      // =================================
      // ENTRAR NO APP
      // =================================

      router.replace(
        "/home"
      );


    } catch (error) {

      console.log(
        "ERRO CADASTRO:",
        error
      );


      Alert.alert(
        "Não foi possível criar a conta",
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao realizar o cadastro."
      );


    } finally {

      setCadastrando(
        false
      );

    }

  }


  // =====================================
  // TELA
  // =====================================

  return (

    <View
      style={
        globalStyle.container
      }
    >

      <ImageBackground
        source={require(
          "@/assets/images/img/fundoLogin.png"
        )}
        style={
          globalStyle.background
        }
        resizeMode="stretch"
      >

        <SafeAreaView
          style={
            cadClienteStyle.safeArea
          }
        >

          <KeyboardAvoidingView
            style={
              cadClienteStyle.keyboard
            }
            behavior={
              Platform.OS ===
                "ios"

                ? "padding"

                : undefined
            }
          >

            <ScrollView
              style={
                cadClienteStyle.scroll
              }
              contentContainerStyle={
                cadClienteStyle.scrollConteudo
              }
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={
                false
              }
            >

              <View
                style={
                  cadClienteStyle.conteudo
                }
              >

                {/* ================================
                                    CONTEÚDO SUPERIOR
                                ================================= */}

                <View
                  style={
                    cadClienteStyle.conteudoTopo
                  }
                >

                  <Image
                    style={
                      globalStyle.logoMenor
                    }
                    source={require(
                      "@/assets/images/img/logo.svg"
                    )}
                  />


                  <Text
                    style={
                      cadClienteStyle.subtitulo
                    }
                  >
                    Criar Conta
                  </Text>


                  <Text
                    style={
                      cadClienteStyle.titulo
                    }
                  >
                    Seja{" "}

                    <Text
                      style={
                        cadClienteStyle.tituloDourado
                      }
                    >
                      Exponencial
                    </Text>

                  </Text>


                  <Text
                    style={
                      cadClienteStyle.inf
                    }
                  >
                    Informe seus dados para fazer parte da Conexão 360°.
                  </Text>

                </View>


                {/* ================================
                                    CAMPOS
                                ================================= */}

                <View
                  style={
                    cadClienteStyle.cardInput
                  }
                >

                  {/* NOME */}

                  <View
                    style={
                      cadClienteStyle.input
                    }
                  >

                    <Image
                      style={
                        cadClienteStyle.icon
                      }
                      source={require(
                        "@/assets/images/img/usuario.png"
                      )}
                    />


                    <TextInput
                      style={
                        cadClienteStyle.txtInput
                      }
                      placeholder="Nome completo"
                      placeholderTextColor={
                        coresPlaceholder
                      }
                      value={
                        nome
                      }
                      onChangeText={
                        setNome
                      }
                      autoCapitalize="words"
                      autoCorrect={
                        false
                      }
                      editable={
                        !cadastrando
                      }
                      maxLength={
                        100
                      }
                    />

                  </View>


                  {/* E-MAIL */}

                  <View
                    style={
                      cadClienteStyle.input
                    }
                  >

                    <Image
                      style={
                        cadClienteStyle.icon
                      }
                      source={require(
                        "@/assets/images/img/e-mail.png"
                      )}
                    />


                    <TextInput
                      style={
                        cadClienteStyle.txtInput
                      }
                      placeholder="E-mail"
                      placeholderTextColor={
                        coresPlaceholder
                      }
                      value={
                        email
                      }
                      onChangeText={
                        setEmail
                      }
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={
                        false
                      }
                      editable={
                        !cadastrando
                      }
                      maxLength={
                        80
                      }
                    />

                  </View>


                  {/* ÁREA DE ATUAÇÃO */}

                  <View
                    style={
                      cadClienteStyle.input
                    }
                  >

                    <Image
                      style={
                        cadClienteStyle.icon
                      }
                      source={require(
                        "@/assets/images/img/usuario.png"
                      )}
                    />


                    <TextInput
                      style={
                        cadClienteStyle.txtInput
                      }
                      placeholder="Área de atuação"
                      placeholderTextColor={
                        coresPlaceholder
                      }
                      value={
                        areaAtuacao
                      }
                      onChangeText={
                        setAreaAtuacao
                      }
                      autoCapitalize="sentences"
                      editable={
                        !cadastrando
                      }
                      maxLength={
                        150
                      }
                    />

                  </View>


                  {/* ESTADO */}

                  <View
                    style={
                      cadClienteStyle.input
                    }
                  >

                    <Image
                      style={
                        cadClienteStyle.icon
                      }
                      source={require(
                        "@/assets/images/img/usuario.png"
                      )}
                    />


                    <TextInput
                      style={
                        cadClienteStyle.txtInput
                      }
                      placeholder="Estado - Ex.: SP"
                      placeholderTextColor={
                        coresPlaceholder
                      }
                      value={
                        estado
                      }
                      onChangeText={(
                        texto
                      ) =>
                        setEstado(
                          texto
                            .replace(
                              /[^a-zA-Z]/g,
                              ""
                            )
                            .toUpperCase()
                            .slice(
                              0,
                              2
                            )
                        )
                      }
                      autoCapitalize="characters"
                      autoCorrect={
                        false
                      }
                      editable={
                        !cadastrando
                      }
                      maxLength={
                        2
                      }
                    />

                  </View>


                  {/* SENHA */}

                  <View
                    style={
                      cadClienteStyle.input
                    }
                  >

                    <Image
                      style={
                        cadClienteStyle.icon
                      }
                      source={require(
                        "@/assets/images/img/trancar.png"
                      )}
                    />


                    <TextInput
                      style={
                        cadClienteStyle.txtInput
                      }
                      placeholder="Senha"
                      placeholderTextColor={
                        coresPlaceholder
                      }
                      value={
                        senha
                      }
                      onChangeText={
                        setSenha
                      }
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={
                        false
                      }
                      editable={
                        !cadastrando
                      }
                      maxLength={
                        255
                      }
                    />

                  </View>


                  {/* CONFIRMAR SENHA */}

                  <View
                    style={[
                      cadClienteStyle.input,
                      cadClienteStyle.inputUltimo,
                    ]}
                  >

                    <Image
                      style={
                        cadClienteStyle.icon
                      }
                      source={require(
                        "@/assets/images/img/trancar.png"
                      )}
                    />


                    <TextInput
                      style={
                        cadClienteStyle.txtInput
                      }
                      placeholder="Confirmar senha"
                      placeholderTextColor={
                        coresPlaceholder
                      }
                      value={
                        confirmarSenha
                      }
                      onChangeText={
                        setConfirmarSenha
                      }
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={
                        false
                      }
                      editable={
                        !cadastrando
                      }
                      maxLength={
                        255
                      }
                      onSubmitEditing={
                        criarConta
                      }
                    />

                  </View>

                </View>


                {/* ================================
                                    TERMOS
                                ================================= */}

                <Pressable
                  style={({
                    pressed,
                  }) => [
                      cadClienteStyle.areaTermos,

                      pressed &&
                      cadClienteStyle.areaTermosPressed,
                    ]}
                  onPress={() =>
                    setTermosAceitos(
                      (atual) =>
                        !atual
                    )
                  }
                  disabled={
                    cadastrando
                  }
                >

                  <View
                    style={[
                      cadClienteStyle.checkbox,

                      termosAceitos &&
                      cadClienteStyle.checkboxAtivo,
                    ]}
                  >

                    {termosAceitos && (

                      <Text
                        style={
                          cadClienteStyle.checkboxMarca
                        }
                      >
                        ✓
                      </Text>

                    )}

                  </View>


                  <Text
                    style={
                      cadClienteStyle.txtTermos
                    }
                  >
                    Li e aceito os Termos de Uso e a Política de Privacidade.
                  </Text>

                </Pressable>


                {/* ================================
                                    CRIAR CONTA
                                ================================= */}

                <Pressable
                  style={({
                    pressed,
                  }) => [
                      cadClienteStyle.btnCriar,

                      cadastrando &&
                      cadClienteStyle.btnCriarDesabilitado,

                      pressed &&
                      !cadastrando &&
                      cadClienteStyle.btnCriarPressed,
                    ]}
                  onPress={
                    criarConta
                  }
                  disabled={
                    cadastrando
                  }
                >

                  <Text
                    style={
                      cadClienteStyle.txtCriar
                    }
                  >
                    {cadastrando
                      ? "Criando conta..."
                      : "Criar Conta"}
                  </Text>

                </Pressable>


                {/* ================================
                                    VOLTAR AO LOGIN
                                ================================= */}

                <Pressable
                  style={({
                    pressed,
                  }) => [
                      cadClienteStyle.btnVoltar,

                      pressed &&
                      !cadastrando &&
                      cadClienteStyle.btnVoltarPressed,
                    ]}
                  onPress={() =>
                    router.back()
                  }
                  disabled={
                    cadastrando
                  }
                >

                  <Text
                    style={
                      cadClienteStyle.txtVoltar
                    }
                  >
                    Voltar ao login
                  </Text>

                </Pressable>

              </View>

            </ScrollView>

          </KeyboardAvoidingView>

        </SafeAreaView>

      </ImageBackground>

    </View>

  );

}

const coresPlaceholder =
  "#888888";