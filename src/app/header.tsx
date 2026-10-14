import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Animated,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { router } from "expo-router";

import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarHeaderStyles } from "@/styles/headerStyles";
import { getUrlFotoUsuario } from "@/services/usuarioService";
import MenuModalScreen from "@/components/menuModal";


type HeaderProps = {
  fotoUsuario?: string | null;
};


type FiltroNotificacao =
  | "todas"
  | "naoLidas";


type Notificacao = {
  id: string;

  titulo: string;

  descricao?: string;

  tempo: string;

  lida: boolean;

  icone: ImageSourcePropType;
};


const NOTIFICACOES_INICIAIS: Notificacao[] = [
  {
    id: "1",

    titulo:
      "Carlos enviou uma solicitação de conexão",

    descricao:
      "Você recebeu uma nova solicitação para ampliar sua rede.",

    tempo:
      "há 5 minutos",

    lida:
      false,

    icone:
      require("@/assets/images/img/usuario.png"),
  },

  {
    id: "2",

    titulo:
      "Juliana comentou na sua publicação",

    descricao:
      "“Muito interessante esse ponto...”",

    tempo:
      "há 20 minutos",

    lida:
      false,

    icone:
      require("@/assets/images/img/coment.png"),
  },

  {
    id: "3",

    titulo:
      "Nova enquete disponível",

    descricao:
      "Participe da nova enquete da Conexão 360°.",

    tempo:
      "há 1 hora",

    lida:
      false,

    icone:
      require("@/assets/images/img/enquete.png"),
  },

  {
    id: "4",

    titulo:
      "Fernanda aceitou sua solicitação de conexão",

    descricao:
      "Vocês agora fazem parte da mesma rede de conexões.",

    tempo:
      "ontem",

    lida:
      true,

    icone:
      require("@/assets/images/img/usuario.png"),
  },
];


export default function HeaderScreen({
  fotoUsuario,
}: HeaderProps) {

  const { coresTema } =
    useTema();

  const {
    usuario,
  } = useAuth();


  const fotoUsuarioContexto =
    getUrlFotoUsuario(
      usuario?.foto_usuario ??
      null
    );


  const fotoExibida =
    fotoUsuario ??
    fotoUsuarioContexto;


  const {
    width: larguraTela,
  } = useWindowDimensions();


  const headerStyles =
    criarHeaderStyles(
      coresTema
    );


  const [
    modalLinkSenha,
    setModalLinkSenha,
  ] = useState(
    false
  );


  const [
    notificacoesVisiveis,
    setNotificacoesVisiveis,
  ] = useState(
    false
  );


  const [
    notificacoes,
    setNotificacoes,
  ] = useState<Notificacao[]>(
    NOTIFICACOES_INICIAIS
  );


  const [
    filtroNotificacao,
    setFiltroNotificacao,
  ] = useState<FiltroNotificacao>(
    "todas"
  );


  const larguraOffcanvas =
    Math.min(
      larguraTela * 0.88,
      380
    );


  const translateX =
    useRef(
      new Animated.Value(
        larguraOffcanvas
      )
    ).current;


  const quantidadeNaoLidas =
    useMemo(
      () =>
        notificacoes.filter(
          (item) =>
            !item.lida
        ).length,
      [
        notificacoes,
      ]
    );


  const notificacoesFiltradas =
    useMemo(
      () => {

        if (
          filtroNotificacao ===
          "naoLidas"
        ) {

          return notificacoes.filter(
            (item) =>
              !item.lida
          );

        }


        return notificacoes;

      },
      [
        filtroNotificacao,
        notificacoes,
      ]
    );


  const abrirNotificacoes =
    () => {

      translateX.setValue(
        larguraOffcanvas
      );


      setNotificacoesVisiveis(
        true
      );


      requestAnimationFrame(
        () => {

          Animated.timing(
            translateX,
            {
              toValue:
                0,

              duration:
                260,

              useNativeDriver:
                Platform.OS !==
                "web",
            }
          ).start();

        }
      );

    };


  const fecharNotificacoes =
    () => {

      Animated.timing(
        translateX,
        {
          toValue:
            larguraOffcanvas,

          duration:
            220,

          useNativeDriver:
            Platform.OS !==
            "web",
        }
      ).start(
        () =>
          setNotificacoesVisiveis(
            false
          )
      );

    };


  const marcarComoLida = (
    id: string
  ) => {

    setNotificacoes(
      (atuais) =>
        atuais.map(
          (item) =>
            item.id ===
              id
              ? {
                ...item,

                lida:
                  true,
              }
              : item
        )
    );

  };


  const marcarTodasComoLidas =
    () => {

      setNotificacoes(
        (atuais) =>
          atuais.map(
            (item) => ({
              ...item,

              lida:
                true,
            })
          )
      );

    };


  return (

    <View
      style={
        headerStyles.header
      }
    >

      {/* =========================
                LADO ESQUERDO
            ========================= */}

      <View
        style={
          headerStyles.ladoHeader
        }
      >

        <Pressable
          style={({ pressed }) => [

            headerStyles.perfil,

            pressed &&
            headerStyles.btnPressed,

          ]}
          onPress={() =>
            router.push(
              "/perfil"
            )
          }
          accessibilityRole="button"
          accessibilityLabel="Abrir meu perfil"
        >

          <Image
            source={
              fotoExibida
                ? {
                  uri:
                    fotoExibida,
                }
                : require(
                  "@/assets/images/img/avatar.png"
                )
            }
            style={
              headerStyles.fotoPerfil
            }
            resizeMode="cover"
          />

        </Pressable>

      </View>


      {/* =========================
                LOGO / NOME
            ========================= */}

      <View
        style={
          headerStyles.logoContainer
        }
      >

        <Image
          source={require(
            "@/assets/images/img/logo.svg"
          )}
          style={
            headerStyles.logo
          }
        />

        <Text
          style={
            headerStyles.nomeProjeto
          }
        >
          Conexão 360°
        </Text>

      </View>


      {/* =========================
                AÇÕES DO HEADER
            ========================= */}

      <View
        style={
          headerStyles.acoesHeader
        }
      >

        <Pressable
          style={({ pressed }) => [

            headerStyles.btnHeader,

            pressed &&
            headerStyles.btnPressed,

          ]}
          onPress={
            abrirNotificacoes
          }
          accessibilityRole="button"
          accessibilityLabel={
            quantidadeNaoLidas >
              0
              ? `Notificações, ${quantidadeNaoLidas} não lidas`
              : "Notificações"
          }
        >

          <SymbolView
            name={{
              ios:
                "bell",

              android:
                "notifications_none",

              web:
                "notifications_none",
            }}
            size={
              24
            }
            tintColor={
              coresTema.destaque
            }
          />


          {quantidadeNaoLidas >
            0 && (

              <View
                style={
                  headerStyles.badgeNotificacao
                }
              >

                <Text
                  style={
                    headerStyles.badgeNotificacaoTexto
                  }
                >
                  {
                    quantidadeNaoLidas >
                      9
                      ? "9+"
                      : quantidadeNaoLidas
                  }
                </Text>

              </View>

            )}

        </Pressable>


        <Pressable
          style={({ pressed }) => [

            headerStyles.btnHeader,

            pressed &&
            headerStyles.btnPressed,

          ]}
          onPress={() =>
            setModalLinkSenha(
              true
            )
          }
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
        >

          <Image
            source={require(
              "@/assets/images/img/menu.png"
            )}
            style={
              headerStyles.iconeHeader
            }
          />

        </Pressable>

      </View>


      {/* =========================
                MENU EXISTENTE
            ========================= */}

      <MenuModalScreen
        visible={
          modalLinkSenha
        }
        onClose={() =>
          setModalLinkSenha(
            false
          )
        }
      />


      {/* =========================
                OFFCANVAS DE NOTIFICAÇÕES
            ========================= */}

      <Modal
        visible={
          notificacoesVisiveis
        }
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={
          fecharNotificacoes
        }
      >

        <View
          style={
            headerStyles.offcanvasOverlay
          }
        >

          <Pressable
            style={
              headerStyles.offcanvasBackdrop
            }
            onPress={
              fecharNotificacoes
            }
          />


          <Animated.View
            style={[
              headerStyles.offcanvas,

              {
                width:
                  larguraOffcanvas,

                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          >

            <SafeAreaView
              style={
                headerStyles.offcanvasSafeArea
              }
            >

              {/* CABEÇALHO */}

              <View
                style={
                  headerStyles.offcanvasHeader
                }
              >

                <View
                  style={
                    headerStyles.offcanvasTituloArea
                  }
                >

                  <Text
                    style={
                      headerStyles.offcanvasTitulo
                    }
                  >
                    Notificações
                  </Text>


                  {quantidadeNaoLidas >
                    0 && (

                      <View
                        style={
                          headerStyles.contadorNotificacoes
                        }
                      >

                        <Text
                          style={
                            headerStyles.contadorNotificacoesTexto
                          }
                        >
                          {quantidadeNaoLidas}
                        </Text>

                      </View>

                    )}

                </View>


                <Pressable
                  style={({ pressed }) => [

                    headerStyles.btnFechar,

                    pressed &&
                    headerStyles.btnPressed,

                  ]}
                  onPress={
                    fecharNotificacoes
                  }
                  accessibilityRole="button"
                  accessibilityLabel="Fechar notificações"
                >

                  <Text
                    style={
                      headerStyles.btnFecharTexto
                    }
                  >
                    ×
                  </Text>

                </Pressable>

              </View>


              {/* FILTROS */}

              <View
                style={
                  headerStyles.filtrosLinha
                }
              >

                <View
                  style={
                    headerStyles.filtros
                  }
                >

                  <Pressable
                    style={[
                      headerStyles.filtro,

                      filtroNotificacao ===
                      "todas" &&
                      headerStyles.filtroAtivo,
                    ]}
                    onPress={() =>
                      setFiltroNotificacao(
                        "todas"
                      )
                    }
                  >

                    <Text
                      style={[
                        headerStyles.filtroTexto,

                        filtroNotificacao ===
                        "todas" &&
                        headerStyles.filtroTextoAtivo,
                      ]}
                    >
                      Todas
                    </Text>

                  </Pressable>


                  <Pressable
                    style={[
                      headerStyles.filtro,

                      filtroNotificacao ===
                      "naoLidas" &&
                      headerStyles.filtroAtivo,
                    ]}
                    onPress={() =>
                      setFiltroNotificacao(
                        "naoLidas"
                      )
                    }
                  >

                    <Text
                      style={[
                        headerStyles.filtroTexto,

                        filtroNotificacao ===
                        "naoLidas" &&
                        headerStyles.filtroTextoAtivo,
                      ]}
                    >
                      Não lidas
                    </Text>

                  </Pressable>

                </View>


                {quantidadeNaoLidas >
                  0 && (

                    <Pressable
                      style={({ pressed }) => [
                        pressed &&
                        headerStyles.textoPressed,
                      ]}
                      onPress={
                        marcarTodasComoLidas
                      }
                    >

                      <Text
                        style={
                          headerStyles.marcarTodasTexto
                        }
                      >
                        Marcar todas
                        {"\n"}
                        como lidas
                      </Text>

                    </Pressable>

                  )}

              </View>


              {/* LISTA */}

              <FlatList
                data={
                  notificacoesFiltradas
                }
                keyExtractor={
                  (item) =>
                    item.id
                }
                style={
                  headerStyles.listaNotificacoes
                }
                contentContainerStyle={
                  headerStyles.listaNotificacoesConteudo
                }
                showsVerticalScrollIndicator={
                  false
                }
                renderItem={({ item }) => (

                  <Pressable
                    style={({ pressed }) => [

                      headerStyles.notificacaoItem,

                      !item.lida &&
                      headerStyles.notificacaoNaoLida,

                      pressed &&
                      headerStyles.notificacaoPressed,

                    ]}
                    onPress={() =>
                      marcarComoLida(
                        item.id
                      )
                    }
                  >

                    <View
                      style={
                        headerStyles.notificacaoIconeArea
                      }
                    >

                      <Image
                        source={
                          item.icone
                        }
                        style={
                          headerStyles.notificacaoIcone
                        }
                      />

                    </View>


                    <View
                      style={
                        headerStyles.notificacaoConteudo
                      }
                    >

                      <Text
                        style={[
                          headerStyles.notificacaoTitulo,

                          !item.lida &&
                          headerStyles.notificacaoTituloNaoLida,
                        ]}
                      >
                        {item.titulo}
                      </Text>


                      {item.descricao && (

                        <Text
                          style={
                            headerStyles.notificacaoDescricao
                          }
                          numberOfLines={
                            2
                          }
                        >
                          {item.descricao}
                        </Text>

                      )}


                      <Text
                        style={
                          headerStyles.notificacaoTempo
                        }
                      >
                        {item.tempo}
                      </Text>

                    </View>


                    <View
                      style={
                        headerStyles.notificacaoStatusArea
                      }
                    >

                      {!item.lida && (

                        <View
                          style={
                            headerStyles.notificacaoPonto
                          }
                        />

                      )}

                    </View>

                  </Pressable>

                )}
                ItemSeparatorComponent={() => (

                  <View
                    style={
                      headerStyles.separadorNotificacao
                    }
                  />

                )}
                ListEmptyComponent={

                  <View
                    style={
                      headerStyles.notificacoesVazio
                    }
                  >

                    <SymbolView
                      name={{
                        ios:
                          "bell.slash",

                        android:
                          "notifications_off",

                        web:
                          "notifications_off",
                      }}
                      size={
                        32
                      }
                      tintColor={
                        coresTema.textoSecundario
                      }
                    />

                    <Text
                      style={
                        headerStyles.notificacoesVazioTitulo
                      }
                    >
                      Tudo em dia
                    </Text>

                    <Text
                      style={
                        headerStyles.notificacoesVazioTexto
                      }
                    >
                      Você não possui notificações não lidas.
                    </Text>

                  </View>

                }
              />

            </SafeAreaView>

          </Animated.View>

        </View>

      </Modal>

    </View>

  );

}
