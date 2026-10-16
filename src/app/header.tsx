import { useEffect, useMemo, useRef, useState } from "react";

import {
  Animated,
  FlatList,
  Image,
  type ImageSourcePropType,
  Modal,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { router } from "expo-router";

import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarHeaderStyles } from "@/styles/headerStyles";
import { getUrlFotoUsuario } from "@/services/usuarioService";

import {
  buscarNotificacoes,
  marcarNotificacaoComoLida,
  marcarTodasNotificacoesComoLidas,
  type NotificacaoApi,
} from "@/services/notificacoeService";

import MenuModalScreen from "@/components/menuModal";

type HeaderProps = {
  fotoUsuario?: string | null;
};

type FiltroNotificacao = "todas" | "naoLidas";

type Notificacao = {
  id: string;
  titulo: string;
  descricao?: string;
  tempo: string;
  lida: boolean;
  icone: ImageSourcePropType;

  idUsuarioOrigem: number | null;
  tipo: string;
  idReferencia: number | null;
  tipoReferencia: string | null;
};

function getIconeNotificacao(tipo: string): ImageSourcePropType {
  switch (tipo) {
    case "NOVO_COMENTARIO":
      return require("@/assets/images/img/coment.png");

    case "NOVA_ENQUETE":
      return require("@/assets/images/img/enquete.png");

    case "SOLICITACAO_CONEXAO":
    case "CONEXAO_ACEITA":
    default:
      return require("@/assets/images/img/usuario.png");
  }
}

function formatarTempoNotificacao(data: string | null) {
  if (!data) {
    return "";
  }

  const criadaEm = new Date(data);

  if (Number.isNaN(criadaEm.getTime())) {
    return "";
  }

  const agora = new Date();

  const diferenca = Math.max(0, agora.getTime() - criadaEm.getTime());

  const minutos = Math.floor(diferenca / 60000);

  if (minutos < 1) {
    return "agora";
  }

  if (minutos < 60) {
    return `há ${minutos} min`;
  }

  const horas = Math.floor(minutos / 60);

  if (horas < 24) {
    return horas === 1 ? "há 1 hora" : `há ${horas} horas`;
  }

  const dias = Math.floor(horas / 24);

  if (dias === 1) {
    return "ontem";
  }

  if (dias < 7) {
    return `há ${dias} dias`;
  }

  return criadaEm.toLocaleDateString("pt-BR");
}

function adaptarNotificacao(item: NotificacaoApi): Notificacao {
  return {
    id: String(item.id_notificacao),

    titulo: item.titulo_notificacao,

    descricao: item.mensagem_notificacao ?? undefined,

    tempo: formatarTempoNotificacao(item.criado_em_notificacao),

    lida: item.lida_notificacao === true || item.lida_notificacao === 1,

    icone: getIconeNotificacao(item.tipo_notificacao),

    idUsuarioOrigem: item.id_usuario_origem,

    tipo: item.tipo_notificacao,

    idReferencia: item.id_referencia,

    tipoReferencia: item.tipo_referencia,
  };
}

export default function HeaderScreen({ fotoUsuario }: HeaderProps) {
  const { coresTema } = useTema();

  const { token, usuario } = useAuth();

  const { width: larguraTela } = useWindowDimensions();

  const headerStyles = criarHeaderStyles(coresTema);

  const fotoUsuarioContexto = getUrlFotoUsuario(usuario?.foto_usuario ?? null);

  const fotoExibida = fotoUsuario ?? fotoUsuarioContexto;

  const [modalLinkSenha, setModalLinkSenha] = useState(false);

  const [notificacoesVisiveis, setNotificacoesVisiveis] = useState(false);

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const [filtroNotificacao, setFiltroNotificacao] =
    useState<FiltroNotificacao>("todas");

  const larguraOffcanvas = Math.min(larguraTela * 0.88, 380);

  const translateX = useRef(new Animated.Value(larguraOffcanvas)).current;

  // =====================================
  // CARREGAR NOTIFICAÇÕES
  // =====================================

  async function carregarNotificacoes() {
    if (!token) {
      setNotificacoes([]);
      return;
    }

    try {
      const resposta = await buscarNotificacoes(token);

      if (resposta.success) {
        setNotificacoes(resposta.data.map(adaptarNotificacao));
      }
    } catch (error) {
      console.log("ERRO BUSCAR NOTIFICAÇÕES:", error);
    }
  }

  useEffect(() => {
    carregarNotificacoes();
  }, [token]);

  // =====================================
  // QUANTIDADE NÃO LIDA
  // =====================================

  const quantidadeNaoLidas = useMemo(
    () => notificacoes.filter((item) => !item.lida).length,
    [notificacoes],
  );

  // =====================================
  // FILTRO
  // =====================================

  const notificacoesFiltradas = useMemo(() => {
    if (filtroNotificacao === "naoLidas") {
      return notificacoes.filter((item) => !item.lida);
    }

    return notificacoes;
  }, [filtroNotificacao, notificacoes]);

  // =====================================
  // ABRIR NOTIFICAÇÕES
  // =====================================

  function abrirNotificacoes() {
    carregarNotificacoes();

    translateX.setValue(larguraOffcanvas);

    setNotificacoesVisiveis(true);

    requestAnimationFrame(() => {
      Animated.timing(translateX, {
        toValue: 0,

        duration: 260,

        useNativeDriver: Platform.OS !== "web",
      }).start();
    });
  }

  // =====================================
  // FECHAR NOTIFICAÇÕES
  // =====================================

  function fecharNotificacoes() {
    Animated.timing(translateX, {
      toValue: larguraOffcanvas,

      duration: 220,

      useNativeDriver: Platform.OS !== "web",
    }).start(() => {
      setNotificacoesVisiveis(false);
    });
  }

  // =====================================
  // MARCAR UMA COMO LIDA
  // =====================================

  async function marcarComoLida(id: string) {
    if (!token) {
      return;
    }

    const notificacao = notificacoes.find((item) => item.id === id);

    if (!notificacao || notificacao.lida) {
      return;
    }

    setNotificacoes((atuais) =>
      atuais.map((item) =>
        item.id === id
          ? {
              ...item,

              lida: true,
            }
          : item,
      ),
    );

    try {
      await marcarNotificacaoComoLida(token, Number(id));
    } catch (error) {
      console.log("ERRO MARCAR NOTIFICAÇÃO:", error);

      setNotificacoes((atuais) =>
        atuais.map((item) =>
          item.id === id
            ? {
                ...item,

                lida: false,
              }
            : item,
        ),
      );
    }
  }

  // =====================================
  // ABRIR DESTINO DA NOTIFICAÇÃO
  // =====================================

  async function abrirDestinoNotificacao(notificacao: Notificacao) {
    if (!notificacao.lida) {
      await marcarComoLida(notificacao.id);
    }

    setNotificacoesVisiveis(false);

    translateX.setValue(larguraOffcanvas);

    // =================================
    // SOLICITAÇÃO DE CONEXÃO
    // CONEXÃO ACEITA
    // =================================

    if (
      (notificacao.tipo === "SOLICITACAO_CONEXAO" ||
        notificacao.tipo === "CONEXAO_ACEITA") &&
      notificacao.idUsuarioOrigem
    ) {
      router.push({
        pathname: "/perfil",

        params: {
          idUsuario: String(notificacao.idUsuarioOrigem),
        },
      });

      return;
    }

    // =================================
    // NOVO COMENTÁRIO
    // =================================
    //
    // idReferencia = id_publicacao
    // =================================

    if (notificacao.tipo === "NOVO_COMENTARIO" && notificacao.idReferencia) {
      router.push({
        pathname: "/home",

        params: {
          idPublicacao: String(notificacao.idReferencia),
        },
      });

      return;
    }

    // =================================
    // NOVA MENSAGEM
    // FUTURO
    // =================================
    //
    // idReferencia = id_conversa
    // =================================

    if (notificacao.tipo === "NOVA_MENSAGEM" && notificacao.idReferencia) {
      router.push({
        pathname: "/conversa",

        params: {
          idConversa: String(notificacao.idReferencia),
        },
      });
    }
  }

  // =====================================
  // MARCAR TODAS COMO LIDAS
  // =====================================

  async function marcarTodasComoLidas() {
    if (!token) {
      return;
    }

    const anteriores = notificacoes;

    setNotificacoes((atuais) =>
      atuais.map((item) => ({
        ...item,

        lida: true,
      })),
    );

    try {
      await marcarTodasNotificacoesComoLidas(token);
    } catch (error) {
      console.log("ERRO MARCAR TODAS AS NOTIFICAÇÕES:", error);

      setNotificacoes(anteriores);
    }
  }

  return (
    <View style={headerStyles.header}>
      {/* =========================
                LADO ESQUERDO
            ========================= */}

      <View style={headerStyles.ladoHeader}>
        <Pressable
          style={({ pressed }) => [
            headerStyles.perfil,

            pressed && headerStyles.btnPressed,
          ]}
          onPress={() => router.push("/perfil")}
          accessibilityRole="button"
          accessibilityLabel="Abrir meu perfil"
        >
          <Image
            source={
              fotoExibida
                ? {
                    uri: fotoExibida,
                  }
                : require("@/assets/images/img/avatar.png")
            }
            style={headerStyles.fotoPerfil}
            resizeMode="cover"
          />
        </Pressable>
      </View>

      {/* =========================
                LOGO
            ========================= */}

      <View style={headerStyles.logoContainer}>
        <Image
          source={require("@/assets/images/img/logo.svg")}
          style={headerStyles.logo}
        />

        <Text style={headerStyles.nomeProjeto}>Conexão 360°</Text>
      </View>

      {/* =========================
                AÇÕES
            ========================= */}

      <View style={headerStyles.acoesHeader}>
        {/* NOTIFICAÇÕES */}

        <Pressable
          style={({ pressed }) => [
            headerStyles.btnHeader,

            pressed && headerStyles.btnPressed,
          ]}
          onPress={abrirNotificacoes}
          accessibilityRole="button"
          accessibilityLabel={
            quantidadeNaoLidas > 0
              ? `Notificações, ${quantidadeNaoLidas} não lidas`
              : "Notificações"
          }
        >
          <SymbolView
            name={{
              ios: "bell",

              android: "notifications_none",

              web: "notifications_none",
            }}
            size={24}
            tintColor={coresTema.destaque}
          />

          {quantidadeNaoLidas > 0 && (
            <View style={headerStyles.badgeNotificacao}>
              <Text style={headerStyles.badgeNotificacaoTexto}>
                {quantidadeNaoLidas > 9 ? "9+" : quantidadeNaoLidas}
              </Text>
            </View>
          )}
        </Pressable>

        {/* MENU */}

        <Pressable
          style={({ pressed }) => [
            headerStyles.btnHeader,

            pressed && headerStyles.btnPressed,
          ]}
          onPress={() => setModalLinkSenha(true)}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
        >
          <Image
            source={require("@/assets/images/img/menu.png")}
            style={headerStyles.iconeHeader}
          />
        </Pressable>
      </View>

      {/* =========================
                MENU MODAL
            ========================= */}

      <MenuModalScreen
        visible={modalLinkSenha}
        onClose={() => setModalLinkSenha(false)}
      />

      {/* =========================
                NOTIFICAÇÕES
            ========================= */}

      <Modal
        visible={notificacoesVisiveis}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={fecharNotificacoes}
      >
        <View style={headerStyles.offcanvasOverlay}>
          <Pressable
            style={headerStyles.offcanvasBackdrop}
            onPress={fecharNotificacoes}
          />

          <Animated.View
            style={[
              headerStyles.offcanvas,

              {
                width: larguraOffcanvas,

                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          >
            <SafeAreaView style={headerStyles.offcanvasSafeArea}>
              {/* CABEÇALHO */}

              <View style={headerStyles.offcanvasHeader}>
                <View style={headerStyles.offcanvasTituloArea}>
                  <Text style={headerStyles.offcanvasTitulo}>Notificações</Text>

                  {quantidadeNaoLidas > 0 && (
                    <View style={headerStyles.contadorNotificacoes}>
                      <Text style={headerStyles.contadorNotificacoesTexto}>
                        {quantidadeNaoLidas}
                      </Text>
                    </View>
                  )}
                </View>

                <Pressable
                  style={({ pressed }) => [
                    headerStyles.btnFechar,

                    pressed && headerStyles.btnPressed,
                  ]}
                  onPress={fecharNotificacoes}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar notificações"
                >
                  <Text style={headerStyles.btnFecharTexto}>×</Text>
                </Pressable>
              </View>

              {/* FILTROS */}

              <View style={headerStyles.filtrosLinha}>
                <View style={headerStyles.filtros}>
                  <Pressable
                    style={[
                      headerStyles.filtro,

                      filtroNotificacao === "todas" && headerStyles.filtroAtivo,
                    ]}
                    onPress={() => setFiltroNotificacao("todas")}
                  >
                    <Text
                      style={[
                        headerStyles.filtroTexto,

                        filtroNotificacao === "todas" &&
                          headerStyles.filtroTextoAtivo,
                      ]}
                    >
                      Todas
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      headerStyles.filtro,

                      filtroNotificacao === "naoLidas" &&
                        headerStyles.filtroAtivo,
                    ]}
                    onPress={() => setFiltroNotificacao("naoLidas")}
                  >
                    <Text
                      style={[
                        headerStyles.filtroTexto,

                        filtroNotificacao === "naoLidas" &&
                          headerStyles.filtroTextoAtivo,
                      ]}
                    >
                      Não lidas
                    </Text>
                  </Pressable>
                </View>

                {quantidadeNaoLidas > 0 && (
                  <Pressable
                    style={({ pressed }) => [
                      pressed && headerStyles.textoPressed,
                    ]}
                    onPress={marcarTodasComoLidas}
                  >
                    <Text style={headerStyles.marcarTodasTexto}>
                      Marcar todas
                      {"\n"}
                      como lidas
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* LISTA */}

              <FlatList
                data={notificacoesFiltradas}
                keyExtractor={(item) => item.id}
                style={headerStyles.listaNotificacoes}
                contentContainerStyle={headerStyles.listaNotificacoesConteudo}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      headerStyles.notificacaoItem,

                      !item.lida && headerStyles.notificacaoNaoLida,

                      pressed && headerStyles.notificacaoPressed,
                    ]}
                    onPress={() => abrirDestinoNotificacao(item)}
                  >
                    <View style={headerStyles.notificacaoIconeArea}>
                      <Image
                        source={item.icone}
                        style={headerStyles.notificacaoIcone}
                      />
                    </View>

                    <View style={headerStyles.notificacaoConteudo}>
                      <Text
                        style={[
                          headerStyles.notificacaoTitulo,

                          !item.lida && headerStyles.notificacaoTituloNaoLida,
                        ]}
                      >
                        {item.titulo}
                      </Text>

                      {item.descricao && (
                        <Text
                          style={headerStyles.notificacaoDescricao}
                          numberOfLines={2}
                        >
                          {item.descricao}
                        </Text>
                      )}

                      <Text style={headerStyles.notificacaoTempo}>
                        {item.tempo}
                      </Text>
                    </View>

                    <View style={headerStyles.notificacaoStatusArea}>
                      {!item.lida && (
                        <View style={headerStyles.notificacaoPonto} />
                      )}
                    </View>
                  </Pressable>
                )}
                ItemSeparatorComponent={() => (
                  <View style={headerStyles.separadorNotificacao} />
                )}
                ListEmptyComponent={
                  <View style={headerStyles.notificacoesVazio}>
                    <SymbolView
                      name={{
                        ios: "bell.slash",

                        android: "notifications_off",

                        web: "notifications_off",
                      }}
                      size={32}
                      tintColor={coresTema.textoSecundario}
                    />

                    <Text style={headerStyles.notificacoesVazioTitulo}>
                      Tudo em dia
                    </Text>

                    <Text style={headerStyles.notificacoesVazioTexto}>
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
