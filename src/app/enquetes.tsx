import {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import {
  router,
} from "expo-router";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  useTema,
} from "@/contexts/TemaContext";

import {
  criarEnquetesStyles,
} from "@/styles/enquetesStyles";

import {
  buscarEnquetes,
  Enquete,
  FiltroEnquete,
  OpcaoRespostaEnquete,
  responderEnquete,
} from "@/services/enqueteService";

import {
  getUrlFotoUsuario,
} from "@/services/usuarioService";

import HeaderScreen from "./header";

import MenuSreen from "./menu";


type FiltroTela = {
  id: FiltroEnquete;
  titulo: string;
};


const FILTROS: FiltroTela[] = [
  {
    id: "todas",
    titulo: "Todas",
  },
  {
    id: "nao_respondidas",
    titulo: "Não respondidas",
  },
  {
    id: "respondidas",
    titulo: "Respondidas",
  },
];


const OPCOES: {
  id: OpcaoRespostaEnquete;
  titulo: string;
}[] = [
    {
      id: 1,
      titulo: "Sim",
    },
    {
      id: 2,
      titulo: "Não",
    },
    {
      id: 3,
      titulo: "Outro",
    },
  ];


function nomeResposta(
  resposta:
    OpcaoRespostaEnquete | null
) {

  switch (resposta) {

    case 1:
      return "SIM";

    case 2:
      return "NÃO";

    case 3:
      return "OUTRO";

    default:
      return "";

  }

}


function formatarTempo(
  data: string | null
) {

  if (!data) {

    return "Enquete anterior";

  }


  const criadaEm =
    new Date(data);


  if (
    Number.isNaN(
      criadaEm.getTime()
    )
  ) {

    return "";

  }


  const agora =
    new Date();


  const diferenca =
    Math.max(
      0,
      agora.getTime() -
      criadaEm.getTime()
    );


  const minutos =
    Math.floor(
      diferenca / 60000
    );


  if (minutos < 1) {

    return "agora";

  }


  if (minutos < 60) {

    return `há ${minutos} min`;

  }


  const horas =
    Math.floor(
      minutos / 60
    );


  if (horas < 24) {

    return horas === 1
      ? "há 1 hora"
      : `há ${horas} horas`;

  }


  const dias =
    Math.floor(
      horas / 24
    );


  if (dias === 1) {

    return "ontem";

  }


  if (dias < 7) {

    return `há ${dias} dias`;

  }


  return criadaEm
    .toLocaleDateString(
      "pt-BR"
    );

}


export default function EnquetesScreen() {

  // =====================================
  // TEMA
  // =====================================

  const {
    coresTema,
  } = useTema();


  const styles =
    criarEnquetesStyles(
      coresTema
    );


  // =====================================
  // AUTENTICAÇÃO
  // =====================================

  const {
    token,
  } = useAuth();


  // =====================================
  // ESTADO
  // =====================================

  const [
    enquetes,
    setEnquetes,
  ] = useState<Enquete[]>(
    []
  );


  const [
    filtro,
    setFiltro,
  ] = useState<FiltroEnquete>(
    "todas"
  );


  const [
    carregando,
    setCarregando,
  ] = useState(
    true
  );


  const [
    carregandoMais,
    setCarregandoMais,
  ] = useState(
    false
  );


  const [
    erro,
    setErro,
  ] = useState<
    string | null
  >(
    null
  );


  const [
    pagina,
    setPagina,
  ] = useState(
    1
  );


  const [
    ultimaPagina,
    setUltimaPagina,
  ] = useState(
    1
  );


  const [
    enqueteAberta,
    setEnqueteAberta,
  ] = useState<
    number | null
  >(
    null
  );


  const [
    respostasSelecionadas,
    setRespostasSelecionadas,
  ] = useState<
    Record<
      number,
      OpcaoRespostaEnquete | undefined
    >
  >(
    {}
  );


  const [
    votando,
    setVotando,
  ] = useState<
    number | null
  >(
    null
  );


  // =====================================
  // CARREGAR ENQUETES
  // =====================================

  async function carregarEnquetes(
    paginaCarregar: number,
    substituir: boolean
  ) {

    if (!token) {

      setErro(
        "Sessão não encontrada."
      );

      setCarregando(
        false
      );

      return;

    }


    try {

      if (substituir) {

        setCarregando(
          true
        );

      } else {

        setCarregandoMais(
          true
        );

      }


      setErro(
        null
      );


      const resposta =
        await buscarEnquetes(
          token,
          filtro,
          paginaCarregar,
          20
        );


      if (
        !resposta.success
      ) {

        throw new Error(
          "Não foi possível carregar as enquetes."
        );

      }


      setEnquetes(
        (atuais) =>
          substituir
            ? resposta.data
            : [
              ...atuais,
              ...resposta.data,
            ]
      );


      setPagina(
        resposta.meta
          ?.current_page ??
        paginaCarregar
      );


      setUltimaPagina(
        resposta.meta
          ?.last_page ??
        paginaCarregar
      );

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as enquetes."
      );

    } finally {

      setCarregando(
        false
      );


      setCarregandoMais(
        false
      );

    }

  }


  // =====================================
  // ALTERAR FILTRO
  // =====================================

  useEffect(() => {

    setEnquetes(
      []
    );


    setPagina(
      1
    );


    setUltimaPagina(
      1
    );


    setEnqueteAberta(
      null
    );


    void carregarEnquetes(
      1,
      true
    );

  }, [
    token,
    filtro,
  ]);


  // =====================================
  // PAGINAÇÃO
  // =====================================

  function carregarMais() {

    if (
      carregando ||
      carregandoMais ||
      pagina >= ultimaPagina
    ) {

      return;

    }


    void carregarEnquetes(
      pagina + 1,
      false
    );

  }


  // =====================================
  // ABRIR VOTAÇÃO
  // =====================================

  function abrirVotacao(
    idEnquete: number
  ) {

    setEnqueteAberta(
      (atual) =>
        atual === idEnquete
          ? null
          : idEnquete
    );

  }


  // =====================================
  // SELECIONAR RESPOSTA
  // =====================================

  function selecionarResposta(
    idEnquete: number,
    resposta: OpcaoRespostaEnquete
  ) {

    setRespostasSelecionadas(
      (atuais) => ({
        ...atuais,

        [idEnquete]:
          resposta,
      })
    );

  }


  // =====================================
  // VOTAR
  // =====================================

  async function votar(
    enquete: Enquete
  ) {

    if (
      !token ||
      votando !== null
    ) {

      return;

    }


    const respostaSelecionada =
      respostasSelecionadas[
      enquete.id_enquete
      ];


    if (
      !respostaSelecionada
    ) {

      return;

    }


    try {

      setVotando(
        enquete.id_enquete
      );


      setErro(
        null
      );


      const resposta =
        await responderEnquete(
          token,
          enquete.id_enquete,
          respostaSelecionada
        );


      if (
        !resposta.success
      ) {

        throw new Error(
          resposta.message ||
          "Não foi possível registrar o voto."
        );

      }


      setEnquetes(
        (atuais) =>
          atuais.map(
            (item) =>
              item.id_enquete ===
                enquete.id_enquete
                ? resposta.data
                : item
          )
      );


      setEnqueteAberta(
        null
      );


      setRespostasSelecionadas(
        (atuais) => {

          const novas =
          {
            ...atuais,
          };


          delete novas[
            enquete.id_enquete
          ];


          return novas;

        }
      );

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar o voto."
      );

    } finally {

      setVotando(
        null
      );

    }

  }


  // =====================================
  // RESULTADOS
  // =====================================

  function renderResultado(
    titulo: string,
    votos: number,
    percentual: number
  ) {

    return (
      <View
        style={
          styles.resultadoItem
        }
      >

        <View
          style={
            styles.resultadoCabecalho
          }
        >

          <Text
            style={
              styles.resultadoNome
            }
          >
            {titulo}
          </Text>


          <Text
            style={
              styles.resultadoPercentual
            }
          >
            {percentual}% · {votos} voto{votos === 1 ? "" : "s"}
          </Text>

        </View>


        <View
          style={
            styles.barra
          }
        >

          <View
            style={[
              styles.barraPreenchida,

              {
                width:
                  `${percentual}%`,
              },
            ]}
          />

        </View>

      </View>
    );

  }


  // =====================================
  // CARD
  // =====================================

  function renderEnquete({
    item,
  }: {
    item: Enquete;
  }) {

    const selecionada =
      respostasSelecionadas[
      item.id_enquete
      ];


    const aberta =
      enqueteAberta ===
      item.id_enquete;


    const fotoCriador =
      getUrlFotoUsuario(
        item.criador
          ?.foto_usuario ??
        null
      );


    return (
      <View
        style={
          styles.card
        }
      >

        {/* AUTOR */}

        <View
          style={
            styles.cardTopo
          }
        >

          <View
            style={
              styles.autorContainer
            }
          >

            <Image
              source={
                fotoCriador
                  ? {
                    uri:
                      fotoCriador,
                  }
                  : require(
                    "@/assets/images/img/avatar.png"
                  )
              }
              style={
                fotoCriador
                  ? styles.avatar
                  : styles.avatarPadrao
              }
            />


            <View
              style={
                styles.dadosAutor
              }
            >

              <Text
                style={
                  styles.nomeAutor
                }
                numberOfLines={
                  1
                }
              >
                {
                  item.criador
                    ?.nome_usuario ??
                  "Conexão 360°"
                }
              </Text>


              <Text
                style={
                  styles.tempo
                }
              >
                {
                  formatarTempo(
                    item.criado_em_enquete
                  )
                }
              </Text>

            </View>

          </View>


          {item.respondida && (

            <View
              style={
                styles.badgeRespondida
              }
            >

              <Ionicons
                name="checkmark-circle"
                size={13}
                color={
                  coresTema.destaque
                }
              />

              <Text
                style={
                  styles.badgeRespondidaTexto
                }
              >
                Respondida
              </Text>

            </View>

          )}

        </View>


        {/* PERGUNTA */}

        <Text
          style={
            styles.pergunta
          }
        >
          {
            item.pergunta_enquete
          }
        </Text>


        {/* RODAPÉ */}

        <View
          style={
            styles.rodapeCard
          }
        >

          <View
            style={
              styles.totalVotos
            }
          >

            <Ionicons
              name="people-outline"
              size={16}
              color={
                coresTema.textoSecundario
              }
            />

            <Text
              style={
                styles.totalVotosTexto
              }
            >
              {item.total_votos} resposta{item.total_votos === 1 ? "" : "s"}
            </Text>

          </View>


          {!item.respondida && (

            <Pressable
              style={
                styles.btnParticipar
              }
              onPress={() =>
                abrirVotacao(
                  item.id_enquete
                )
              }
            >

              <Text
                style={
                  styles.btnParticiparTexto
                }
              >
                {
                  aberta
                    ? "Fechar"
                    : "Participar"
                }
              </Text>


              <Ionicons
                name={
                  aberta
                    ? "chevron-up"
                    : "chevron-forward"
                }
                size={15}
                color={
                  coresTema.fundo
                }
              />

            </Pressable>

          )}

        </View>


        {/* ÁREA DE VOTAÇÃO */}

        {!item.respondida &&
          aberta && (

            <View
              style={
                styles.areaVotacao
              }
            >

              <Text
                style={
                  styles.tituloVotacao
                }
              >
                Escolha uma opção:
              </Text>


              <View
                style={
                  styles.opcoes
                }
              >

                {OPCOES.map(
                  (opcao) => {

                    const ativa =
                      selecionada ===
                      opcao.id;


                    return (
                      <Pressable
                        key={
                          opcao.id
                        }
                        style={[
                          styles.opcao,

                          ativa &&
                          styles.opcaoSelecionada,
                        ]}
                        onPress={() =>
                          selecionarResposta(
                            item.id_enquete,
                            opcao.id
                          )
                        }
                      >

                        <View
                          style={[
                            styles.radio,

                            ativa &&
                            styles.radioSelecionado,
                          ]}
                        >

                          {ativa && (
                            <View
                              style={
                                styles.radioCentro
                              }
                            />
                          )}

                        </View>


                        <Text
                          style={
                            styles.textoOpcao
                          }
                        >
                          {
                            opcao.titulo
                          }
                        </Text>

                      </Pressable>
                    );

                  }
                )}

              </View>


              <View
                style={
                  styles.botoesVotacao
                }
              >

                <Pressable
                  style={
                    styles.btnCancelar
                  }
                  onPress={() =>
                    setEnqueteAberta(
                      null
                    )
                  }
                  disabled={
                    votando ===
                    item.id_enquete
                  }
                >

                  <Text
                    style={
                      styles.btnCancelarTexto
                    }
                  >
                    Cancelar
                  </Text>

                </Pressable>


                <Pressable
                  style={[
                    styles.btnConfirmar,

                    (
                      !selecionada ||
                      votando ===
                      item.id_enquete
                    ) &&
                    styles.btnConfirmarDesabilitado,
                  ]}
                  disabled={
                    !selecionada ||
                    votando ===
                    item.id_enquete
                  }
                  onPress={() =>
                    votar(
                      item
                    )
                  }
                >

                  <Text
                    style={
                      styles.btnConfirmarTexto
                    }
                  >
                    {
                      votando ===
                        item.id_enquete
                        ? "Enviando..."
                        : "Confirmar voto"
                    }
                  </Text>

                </Pressable>

              </View>

            </View>

          )}


        {/* RESULTADOS */}

        {item.respondida &&
          item.resultados && (

            <View
              style={
                styles.areaResultados
              }
            >

              <Text
                style={
                  styles.minhaResposta
                }
              >
                Você respondeu: {
                  nomeResposta(
                    item.minha_resposta
                  )
                }
              </Text>


              {renderResultado(
                "Sim",
                item.resultados
                  .sim.votos,
                item.resultados
                  .sim.percentual
              )}


              {renderResultado(
                "Não",
                item.resultados
                  .nao.votos,
                item.resultados
                  .nao.percentual
              )}


              {renderResultado(
                "Outro",
                item.resultados
                  .outro.votos,
                item.resultados
                  .outro.percentual
              )}

            </View>

          )}

      </View>
    );

  }


  return (
    <SafeAreaView
      style={
        styles.container
      }
    >

      <HeaderScreen />


      {/* CABEÇALHO */}

      <View
        style={[
          styles.conteudo,

          {
            paddingBottom:
              0,
          },
        ]}
      >

        <View
          style={
            styles.cabecalhoTela
          }
        >

          <Pressable
            style={
              styles.btnVoltar
            }
            onPress={() =>
              router.back()
            }
          >

            <Ionicons
              name="arrow-back"
              size={21}
              color={
                coresTema.destaque
              }
            />

          </Pressable>


          <View
            style={
              styles.cabecalhoTextos
            }
          >

            <Text
              style={
                styles.titulo
              }
            >
              Enquetes
            </Text>

            <Text
              style={
                styles.subtitulo
              }
            >
              Participe das discussões da comunidade
            </Text>

          </View>

        </View>


        {/* FILTROS */}

        <View
          style={
            styles.filtros
          }
        >

          {FILTROS.map(
            (item) => {

              const ativo =
                filtro ===
                item.id;


              return (
                <Pressable
                  key={
                    item.id
                  }
                  style={[
                    styles.filtro,

                    ativo &&
                    styles.filtroAtivo,
                  ]}
                  onPress={() =>
                    setFiltro(
                      item.id
                    )
                  }
                >

                  <Text
                    style={[
                      styles.textoFiltro,

                      ativo &&
                      styles.textoFiltroAtivo,
                    ]}
                  >
                    {
                      item.titulo
                    }
                  </Text>

                </Pressable>
              );

            }
          )}

        </View>

      </View>


      {!!erro && (

        <Text
          style={
            styles.erro
          }
        >
          {erro}
        </Text>

      )}


      {/* LISTA */}

      {carregando ? (

        <View
          style={
            styles.centralizado
          }
        >

          <ActivityIndicator
            color={
              coresTema.destaque
            }
          />

          <Text
            style={
              styles.mensagem
            }
          >
            Carregando enquetes...
          </Text>

        </View>

      ) : (

        <FlatList
          data={
            enquetes
          }
          keyExtractor={
            (item) =>
              String(
                item.id_enquete
              )
          }
          renderItem={
            renderEnquete
          }
          contentContainerStyle={
            styles.conteudo
          }
          onEndReached={
            carregarMais
          }
          onEndReachedThreshold={
            0.4
          }
          ListEmptyComponent={

            <View
              style={
                styles.centralizado
              }
            >

              <Ionicons
                name="bar-chart-outline"
                size={34}
                color={
                  coresTema.destaque
                }
              />

              <Text
                style={
                  styles.mensagem
                }
              >
                Nenhuma enquete encontrada neste filtro.
              </Text>

            </View>

          }
          ListFooterComponent={
            carregandoMais
              ? (
                <View
                  style={
                    styles.carregandoMais
                  }
                >
                  <ActivityIndicator
                    color={
                      coresTema.destaque
                    }
                  />
                </View>
              )
              : null
          }
        />

      )}


      <MenuSreen />

    </SafeAreaView>
  );

}