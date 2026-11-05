import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

import { CoresTema } from "./temas";

export const criarEnquetesStyles = (tema: CoresTema) =>
  StyleSheet.create({
    // =====================================
    // ESTRUTURA
    // =====================================

    container: {
      flex: 1,

      backgroundColor: tema.fundo,
    },

    conteudo: {
      paddingHorizontal: 18,

      paddingTop: 12,

      paddingBottom: 120,
    },

    // =====================================
    // CABEÇALHO DA TELA
    // =====================================

    cabecalhoTela: {
      flexDirection: "row",

      alignItems: "center",

      gap: 12,

      marginBottom: 18,
    },

    btnVoltar: {
      width: 40,
      height: 40,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 20,

      backgroundColor: tema.cardSecundario,
    },

    cabecalhoTextos: {
      flex: 1,
    },

    titulo: {
      color: tema.texto,

      fontSize: 28,

      fontFamily: fontes.appBold,
    },

    subtitulo: {
      color: tema.textoSecundario,

      fontSize: 15,

      fontFamily: fontes.appRegular,

      marginTop: 3,
    },

    filtros: {
      width: "100%",
      minHeight: 54,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      marginBottom: 18,

      borderBottomWidth: 1,
      borderBottomColor: tema.cardSecundario,
    },

    filtro: {
      flex: 1,
      height: "100%",

      alignItems: "center",
      justifyContent: "center",

      borderBottomWidth: 2,
      borderBottomColor: "transparent",

      backgroundColor: "transparent",
    },

    filtroAtivo: {
      borderBottomColor: tema.destaque,

      backgroundColor: "transparent",
    },

    textoFiltro: {
      flexShrink: 1,
      color: tema.textoSecundario,

      fontSize: 14,

      fontFamily: fontes.appSemiBold,

      textAlign: "center",
    },

    textoFiltroAtivo: {
      color: tema.destaque,
    },

    // =====================================
    // CARD
    // =====================================

    card: {
      width: "100%",

      padding: 16,

      marginBottom: 14,

      borderRadius: 16,

      backgroundColor: tema.card,

      borderWidth: 1,

      borderColor: tema.cardSecundario,
    },

    cardTopo: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginBottom: 12,
    },

    autorContainer: {
      flex: 1,

      flexDirection: "row",

      alignItems: "center",

      gap: 9,
    },

    avatar: {
      width: 36,
      height: 36,

      borderRadius: 18,

      borderWidth: 1,

      borderColor: tema.destaque,

      resizeMode: "cover",
    },

    avatarPadrao: {
      width: 36,
      height: 36,

      borderRadius: 18,

      resizeMode: "cover",
    },

    dadosAutor: {
      flex: 1,
    },

    nomeAutor: {
      color: tema.texto,

      fontSize: 17,

      fontFamily: fontes.appSemiBold,
    },

    tempo: {
      color: tema.textoSecundario,

      fontSize: 14,

      fontFamily: fontes.appRegular,

      marginTop: 2,
    },

    badgeRespondida: {
      flexDirection: "row",

      alignItems: "center",

      gap: 4,

      paddingHorizontal: 8,

      paddingVertical: 5,

      borderRadius: 12,

      backgroundColor: tema.cardSecundario,
    },

    badgeRespondidaTexto: {
      color: tema.destaque,

      fontSize: 13,

      fontFamily: fontes.appSemiBold,
    },

    pergunta: {
      color: tema.texto,

      fontSize: 18,

      lineHeight: 22,

      fontFamily: fontes.appSemiBold,

      marginBottom: 14,
    },

    rodapeCard: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      paddingTop: 12,

      borderTopWidth: 1,

      borderTopColor: tema.cardSecundario,
    },

    totalVotos: {
      flexDirection: "row",

      alignItems: "center",

      gap: 6,
    },

    totalVotosTexto: {
      color: tema.textoSecundario,

      fontSize: 14,

      fontFamily: fontes.appRegular,
    },

    btnParticipar: {
      flexDirection: "row",

      alignItems: "center",

      gap: 5,

      paddingHorizontal: 14,

      paddingVertical: 11,

      borderRadius: 18,

      backgroundColor: tema.destaque,
    },

    btnParticiparTexto: {
      color: tema.textoSobreDestaque,

      fontSize: 15,

      fontFamily: fontes.appSemiBold,
    },

    // =====================================
    // VOTAÇÃO
    // =====================================

    areaVotacao: {
      marginTop: 14,

      paddingTop: 14,

      borderTopWidth: 1,

      borderTopColor: tema.cardSecundario,
    },

    tituloVotacao: {
      color: tema.texto,

      fontSize: 16,

      fontFamily: fontes.appSemiBold,

      marginBottom: 10,
    },

    opcoes: {
      gap: 8,
    },

    opcao: {
      minHeight: 48,

      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: 12,

      borderRadius: 10,

      borderWidth: 1,

      borderColor: tema.cardSecundario,

      backgroundColor: tema.fundo,
    },

    opcaoSelecionada: {
      borderColor: tema.destaque,

      backgroundColor: tema.cardSecundario,
    },

    radio: {
      width: 18,
      height: 18,

      borderRadius: 9,

      borderWidth: 2,

      borderColor: tema.textoSecundario,

      alignItems: "center",
      justifyContent: "center",

      marginRight: 10,
    },

    radioSelecionado: {
      borderColor: tema.destaque,
    },

    radioCentro: {
      width: 8,
      height: 8,

      borderRadius: 4,

      backgroundColor: tema.destaque,
    },

    textoOpcao: {
      flexShrink: 1,
      color: tema.texto,

      fontSize: 16,

      fontFamily: fontes.appRegular,
    },

    botoesVotacao: {
      flexDirection: "row",

      gap: 8,

      marginTop: 12,
    },

    btnCancelar: {
      flex: 1,

      minHeight: 48,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 10,

      borderWidth: 1,

      borderColor: tema.cardSecundario,
    },

    btnCancelarTexto: {
      color: tema.textoSecundario,

      fontSize: 15,

      fontFamily: fontes.appSemiBold,
    },

    btnConfirmar: {
      flex: 1,

      minHeight: 48,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 10,

      backgroundColor: tema.destaque,
    },

    btnConfirmarDesabilitado: {
      opacity: 0.45,
    },

    btnConfirmarTexto: {
      color: tema.textoSobreDestaque,

      fontSize: 15,

      fontFamily: fontes.appSemiBold,
    },

    // =====================================
    // RESULTADOS
    // =====================================

    areaResultados: {
      marginTop: 14,

      paddingTop: 14,

      borderTopWidth: 1,

      borderTopColor: tema.cardSecundario,
    },

    minhaResposta: {
      color: tema.destaque,

      fontSize: 14,

      fontFamily: fontes.appSemiBold,

      marginBottom: 12,
    },

    resultadoItem: {
      marginBottom: 10,
    },

    resultadoCabecalho: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",

      marginBottom: 5,
    },

    resultadoNome: {
      color: tema.texto,

      fontSize: 15,

      fontFamily: fontes.appSemiBold,
    },

    resultadoPercentual: {
      color: tema.textoSecundario,

      fontSize: 14,

      fontFamily: fontes.appRegular,
    },

    barra: {
      width: "100%",

      height: 7,

      overflow: "hidden",

      borderRadius: 4,

      backgroundColor: tema.cardSecundario,
    },

    barraPreenchida: {
      height: "100%",

      borderRadius: 4,

      backgroundColor: tema.destaque,
    },

    // =====================================
    // ESTADOS
    // =====================================

    centralizado: {
      paddingVertical: 50,

      alignItems: "center",
      justifyContent: "center",
    },

    mensagem: {
      color: tema.textoSecundario,

      fontSize: 15,

      fontFamily: fontes.appRegular,

      textAlign: "center",

      marginTop: 10,
    },

    erro: {
      marginHorizontal: 18,

      marginTop: 12,

      padding: 12,

      borderRadius: 10,

      borderWidth: 1,

      borderColor: tema.erro,

      color: tema.texto,

      fontSize: 14,

      fontFamily: fontes.appRegular,
    },

    carregandoMais: {
      paddingVertical: 20,

      alignItems: "center",
    },
  });
