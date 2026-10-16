import {
  useEffect,
  useState,
} from "react";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useTema,
} from "@/contexts/TemaContext";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  criarPerfilStyles,
} from "@/styles/perfilStyles";

import globalStyle from "@/styles/globalStyles";

import {
  buscarPerfilUsuario,
  type PerfilData,
} from "@/services/perfilService";

import {
  aceitarConexao,
  recusarConexao,
  solicitarConexao,
} from "@/services/conexaoesService";

import {
  abrirConversa,
} from "@/services/conversaService";

import {
  getUrlFotoUsuario,
} from "@/services/usuarioService";

import MenuSreen from "./menu";


export default function PerfilScreen() {

  // =============================================================
  // TEMA
  // =============================================================

  const {
    coresTema,
  } = useTema();


  const perfilStyles =
    criarPerfilStyles(
      coresTema
    );


  // =============================================================
  // AUTENTICAÇÃO
  // =============================================================

  const {
    token,
    usuario,
  } = useAuth();


  // =============================================================
  // ID DO PERFIL
  // =============================================================

  const params =
    useLocalSearchParams<{
      idUsuario?:
      string |
      string[];
    }>();


  const idUsuarioParam =
    Array.isArray(
      params.idUsuario
    )
      ? params.idUsuario[0]
      : params.idUsuario;


  const idPerfil =
    idUsuarioParam
      ? Number(
        idUsuarioParam
      )
      : Number(
        usuario?.id_usuario
      );


  // =============================================================
  // ESTADOS
  // =============================================================

  const [
    perfil,
    setPerfil,
  ] = useState<
    PerfilData | null
  >(null);


  const [
    carregando,
    setCarregando,
  ] = useState(
    true
  );


  const [
    processando,
    setProcessando,
  ] = useState(
    false
  );


  const [
    abrindoConversa,
    setAbrindoConversa,
  ] = useState(
    false
  );


  const [
    erro,
    setErro,
  ] = useState<
    string | null
  >(null);


  // =============================================================
  // CARREGAR PERFIL
  // =============================================================

  useEffect(
    () => {

      let telaAtiva =
        true;


      async function carregarPerfil() {

        if (!token) {

          if (telaAtiva) {

            setErro(
              "Sessão não encontrada."
            );


            setCarregando(
              false
            );

          }


          return;

        }


        if (
          !idPerfil ||
          Number.isNaN(
            idPerfil
          )
        ) {

          if (telaAtiva) {

            setErro(
              "Usuário inválido."
            );


            setCarregando(
              false
            );

          }


          return;

        }


        try {

          setCarregando(
            true
          );


          setErro(
            null
          );


          const resposta =
            await buscarPerfilUsuario(
              token,
              idPerfil
            );


          if (
            telaAtiva &&
            resposta.success
          ) {

            setPerfil(
              resposta.data
            );

          }

        } catch (error) {

          if (telaAtiva) {

            setErro(
              error instanceof Error
                ? error.message
                : "Não foi possível carregar o perfil."
            );

          }

        } finally {

          if (telaAtiva) {

            setCarregando(
              false
            );

          }

        }

      }


      carregarPerfil();


      return () => {

        telaAtiva =
          false;

      };

    },
    [
      token,
      idPerfil,
    ]
  );


  // =============================================================
  // SOLICITAR CONEXÃO
  // =============================================================

  async function conectar() {

    if (
      !token ||
      !perfil ||
      processando
    ) {

      return;

    }


    try {

      setProcessando(
        true
      );


      setErro(
        null
      );


      const resposta =
        await solicitarConexao(
          token,
          perfil
            .usuario
            .id_usuario
        );


      setPerfil(
        (
          atual
        ) => {

          if (!atual) {

            return atual;

          }


          return {
            ...atual,

            status_conexao:
              "PENDENTE_ENVIADA",

            id_conexao:
              resposta.data
                ?.id_conexao ??
              atual.id_conexao,
          };

        }
      );

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a solicitação."
      );

    } finally {

      setProcessando(
        false
      );

    }

  }


  // =============================================================
  // ACEITAR CONEXÃO
  // =============================================================

  async function aceitar() {

    if (
      !token ||
      !perfil?.id_conexao ||
      processando
    ) {

      return;

    }


    try {

      setProcessando(
        true
      );


      setErro(
        null
      );


      await aceitarConexao(
        token,
        perfil.id_conexao
      );


      setPerfil(
        (
          atual
        ) => {

          if (!atual) {

            return atual;

          }


          return {
            ...atual,

            status_conexao:
              "CONECTADO",

            conexoes_count:
              atual
                .conexoes_count +
              1,
          };

        }
      );

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível aceitar a conexão."
      );

    } finally {

      setProcessando(
        false
      );

    }

  }


  // =============================================================
  // RECUSAR CONEXÃO
  // =============================================================

  async function recusar() {

    if (
      !token ||
      !perfil?.id_conexao ||
      processando
    ) {

      return;

    }


    try {

      setProcessando(
        true
      );


      setErro(
        null
      );


      await recusarConexao(
        token,
        perfil.id_conexao
      );


      setPerfil(
        (
          atual
        ) => {

          if (!atual) {

            return atual;

          }


          return {
            ...atual,

            status_conexao:
              "SEM_CONEXAO",

            id_conexao:
              null,
          };

        }
      );

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível recusar a conexão."
      );

    } finally {

      setProcessando(
        false
      );

    }

  }


  // =============================================================
  // ABRIR CONVERSA
  // =============================================================

  async function iniciarConversa() {

    if (
      !token ||
      !perfil ||
      abrindoConversa
    ) {

      return;

    }


    try {

      setAbrindoConversa(
        true
      );


      setErro(
        null
      );


      const resposta =
        await abrirConversa(
          token,
          perfil
            .usuario
            .id_usuario
        );


      if (
        !resposta.success ||
        !resposta
          .data
          .id_conversa
      ) {

        setErro(
          "Não foi possível abrir a conversa."
        );


        return;

      }


      router.push({
        pathname:
          "/conversa",

        params: {
          idConversa:
            String(
              resposta
                .data
                .id_conversa
            ),
        },
      });

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível abrir a conversa."
      );

    } finally {

      setAbrindoConversa(
        false
      );

    }

  }


  // =============================================================
  // DADOS DO PERFIL
  // =============================================================

  const meuPerfil =
    perfil
      ?.status_conexao ===
    "PROPRIO_PERFIL";


  const nomeCompleto =
    perfil
      ?.usuario
      .nome_usuario ??
    "";


  const primeiroNome =
    nomeCompleto
      .trim()
      .split(
        " "
      )[0] ||
    "Usuário";


  const fotoUsuario =
    getUrlFotoUsuario(
      perfil
        ?.usuario
        .foto_usuario ??
      null
    );


  // =============================================================
  // BOTÕES
  // =============================================================

  function renderizarAcoes() {

    if (
      !perfil ||
      meuPerfil
    ) {

      return null;

    }


    // =========================================================
    // CONECTADO
    // =========================================================
    //
    // Também vale para administrador
    // e palestrante.
    // =========================================================

    if (
      perfil
        .status_conexao ===
      "CONECTADO"
    ) {

      return (

        <>

          <Pressable
            style={[
              perfilStyles.btnAcao,
              perfilStyles.btnAcaoAtivo,
            ]}
            disabled
          >

            <Text
              style={[
                perfilStyles.txtBtnAcao,
                perfilStyles.txtBtnAcaoAtivo,
              ]}
            >
              Conectado
            </Text>

          </Pressable>


          <Pressable
            style={({
              pressed,
            }) => [

                perfilStyles.btnAcao,

                pressed &&
                perfilStyles.btnAcaoPressed,
              ]}
            onPress={
              iniciarConversa
            }
            disabled={
              abrindoConversa
            }
          >

            <Text
              style={
                perfilStyles.txtBtnAcao
              }
            >
              {
                abrindoConversa
                  ? "Abrindo..."
                  : "Mensagem"
              }
            </Text>

          </Pressable>

        </>

      );

    }


    // =========================================================
    // SEM CONEXÃO
    // =========================================================

    if (
      perfil
        .status_conexao ===
      "SEM_CONEXAO" &&
      perfil
        .pode_conectar
    ) {

      return (

        <Pressable
          style={({
            pressed,
          }) => [

              perfilStyles.btnAcao,

              pressed &&
              perfilStyles.btnAcaoPressed,
            ]}
          onPress={
            conectar
          }
          disabled={
            processando
          }
        >

          <Text
            style={
              perfilStyles.txtBtnAcao
            }
          >
            {
              processando
                ? "Enviando..."
                : "Conectar"
            }
          </Text>

        </Pressable>

      );

    }


    // =========================================================
    // SOLICITAÇÃO ENVIADA
    // =========================================================

    if (
      perfil
        .status_conexao ===
      "PENDENTE_ENVIADA"
    ) {

      return (

        <Pressable
          style={[
            perfilStyles.btnAcao,
            perfilStyles.btnAcaoAtivo,
          ]}
          disabled
        >

          <Text
            style={[
              perfilStyles.txtBtnAcao,
              perfilStyles.txtBtnAcaoAtivo,
            ]}
          >
            Solicitação enviada
          </Text>

        </Pressable>

      );

    }


    // =========================================================
    // SOLICITAÇÃO RECEBIDA
    // =========================================================

    if (
      perfil
        .status_conexao ===
      "PENDENTE_RECEBIDA"
    ) {

      return (

        <>

          <Pressable
            style={({
              pressed,
            }) => [

                perfilStyles.btnAcao,

                perfilStyles.btnAcaoAtivo,

                pressed &&
                perfilStyles.btnAcaoPressed,
              ]}
            onPress={
              aceitar
            }
            disabled={
              processando
            }
          >

            <Text
              style={[
                perfilStyles.txtBtnAcao,
                perfilStyles.txtBtnAcaoAtivo,
              ]}
            >
              {
                processando
                  ? "Processando..."
                  : "Aceitar"
              }
            </Text>

          </Pressable>


          <Pressable
            style={({
              pressed,
            }) => [

                perfilStyles.btnAcao,

                pressed &&
                perfilStyles.btnAcaoPressed,
              ]}
            onPress={
              recusar
            }
            disabled={
              processando
            }
          >

            <Text
              style={
                perfilStyles.txtBtnAcao
              }
            >
              Recusar
            </Text>

          </Pressable>

        </>

      );

    }


    return null;

  }


  // =============================================================
  // TELA
  // =============================================================

  return (

    <View
      style={
        globalStyle.container
      }
    >

      <View
        style={[
          globalStyle.background,
          perfilStyles.container,
        ]}
      >

        <ImageBackground
          source={
            require(
              "@/assets/images/img/fundoLogin.png"
            )
          }
          style={
            perfilStyles.background
          }
          resizeMode="cover"
        >

          <SafeAreaView
            style={
              globalStyle.areaConteudo
            }
          >

            <View
              style={
                perfilStyles.overlay
              }
            >

              <ScrollView
                style={
                  perfilStyles.scroll
                }
                contentContainerStyle={
                  perfilStyles.scrollConteudo
                }
                showsVerticalScrollIndicator={
                  false
                }
              >

                {/* ================= TOPO ================= */}

                <View
                  style={
                    perfilStyles.topo
                  }
                >

                  <Pressable
                    style={({
                      pressed,
                    }) => [

                        perfilStyles.btnVoltar,

                        pressed &&
                        perfilStyles.btnVoltarPressed,
                      ]}
                    onPress={
                      () =>
                        router.back()
                    }
                  >

                    <Image
                      style={
                        perfilStyles.voltarImagem
                      }
                      source={
                        require(
                          "@/assets/images/img/left.png"
                        )
                      }
                    />

                  </Pressable>


                  <Image
                    source={
                      require(
                        "@/assets/images/img/logo.svg"
                      )
                    }
                    style={
                      perfilStyles.logo
                    }
                  />


                  <View
                    style={
                      perfilStyles.espacoTopo
                    }
                  />

                </View>


                {/* ================= CARREGANDO ================= */}

                {carregando && (

                  <View
                    style={
                      perfilStyles.apresentacao
                    }
                  >

                    <Text
                      style={
                        perfilStyles.aviso
                      }
                    >
                      Carregando perfil...
                    </Text>

                  </View>

                )}


                {/* ================= ERRO ================= */}

                {!carregando &&
                  erro &&
                  !perfil && (

                    <View
                      style={
                        perfilStyles.apresentacao
                      }
                    >

                      <Text
                        style={
                          perfilStyles.aviso
                        }
                      >
                        {erro}
                      </Text>

                    </View>

                  )}


                {/* ================= PERFIL ================= */}

                {!carregando &&
                  perfil && (

                    <>

                      {/* APRESENTAÇÃO */}

                      <View
                        style={
                          perfilStyles.apresentacao
                        }
                      >

                        <Text
                          style={
                            perfilStyles.titulo
                          }
                        >

                          {
                            meuPerfil
                              ? "Olá, "
                              : "Perfil de "
                          }

                          <Text
                            style={
                              perfilStyles.tituloDourado
                            }
                          >
                            {primeiroNome}

                            {
                              meuPerfil
                                ? "!"
                                : ""
                            }
                          </Text>

                        </Text>


                        <Text
                          style={
                            perfilStyles.aviso
                          }
                        >
                          {
                            meuPerfil
                              ? "Veja e acompanhe as informações do seu perfil."
                              : "Conheça o perfil e amplie sua rede de conexões."
                          }
                        </Text>

                      </View>


                      {/* CARD */}

                      <View
                        style={
                          perfilStyles.cardPerfil
                        }
                      >

                        {/* FOTO */}

                        <View
                          style={
                            perfilStyles.avatarContainer
                          }
                        >

                          <Image
                            source={
                              fotoUsuario
                                ? {
                                  uri:
                                    fotoUsuario,
                                }
                                : require(
                                  "@/assets/images/img/avatar.png"
                                )
                            }
                            style={
                              perfilStyles.avatar
                            }
                          />

                        </View>


                        {/* NOME */}

                        <Text
                          style={
                            perfilStyles.nome
                          }
                        >
                          {
                            perfil
                              .usuario
                              .nome_usuario
                          }
                        </Text>


                        {/* ÁREA */}

                        {perfil
                          .usuario
                          .area_atuacao_usuario && (

                            <Text
                              style={
                                perfilStyles.descricao
                              }
                            >
                              {
                                perfil
                                  .usuario
                                  .area_atuacao_usuario
                              }
                            </Text>

                          )}


                        {/* SOBRE */}

                        {perfil
                          .usuario
                          .sobre_usuario && (

                            <Text
                              style={
                                perfilStyles.descricao
                              }
                            >
                              {
                                perfil
                                  .usuario
                                  .sobre_usuario
                              }
                            </Text>

                          )}


                        {/* INFORMAÇÕES */}

                        <View
                          style={
                            perfilStyles.informacoes
                          }
                        >

                          {perfil
                            .usuario
                            .estado_usuario && (

                              <View
                                style={
                                  perfilStyles.informacaoItem
                                }
                              >

                                <Image
                                  source={
                                    require(
                                      "@/assets/images/img/usuario.png"
                                    )
                                  }
                                  style={
                                    perfilStyles.iconeInfo
                                  }
                                />

                                <Text
                                  style={
                                    perfilStyles.txtInfo
                                  }
                                >
                                  {
                                    perfil
                                      .usuario
                                      .estado_usuario
                                  }
                                </Text>

                              </View>

                            )}


                          <View
                            style={
                              perfilStyles.informacaoItem
                            }
                          >

                            <Image
                              source={
                                require(
                                  "@/assets/images/img/usuario.png"
                                )
                              }
                              style={
                                perfilStyles.iconeInfo
                              }
                            />

                            <Text
                              style={
                                perfilStyles.txtInfo
                              }
                            >
                              {
                                perfil
                                  .conexoes_count
                              } conexões
                            </Text>

                          </View>

                        </View>


                        {/* BOTÕES */}

                        {!meuPerfil && (

                          <View
                            style={
                              perfilStyles.areaBotoes
                            }
                          >

                            {
                              renderizarAcoes()
                            }

                          </View>

                        )}


                        {/* ERRO */}

                        {erro && (

                          <Text
                            style={
                              perfilStyles.aviso
                            }
                          >
                            {erro}
                          </Text>

                        )}

                      </View>

                    </>

                  )}

              </ScrollView>


              <MenuSreen />

            </View>

          </SafeAreaView>

        </ImageBackground>

      </View>

    </View>

  );

}