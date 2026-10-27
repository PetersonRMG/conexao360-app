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

      fontSize: 22,

      fontFamily: fontes.negrito,
    },

    subtitulo: {
      color: tema.textoSecundario,

      fontSize: 12,

      fontFamily: fontes.normal,

      marginTop: 3,
    },

    filtros: {
      width: "100%",
      height: 45,

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
      color: tema.textoSecundario,

      fontSize: 11,

      fontFamily: fontes.negrito,

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

      fontSize: 12,

      fontFamily: fontes.negrito,
    },

    tempo: {
      color: tema.textoSecundario,

      fontSize: 10,

      fontFamily: fontes.normal,

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

      fontSize: 9,

      fontFamily: fontes.negrito,
    },

    pergunta: {
      color: tema.texto,

      fontSize: 16,

      lineHeight: 22,

      fontFamily: fontes.negrito,

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

      fontSize: 11,

      fontFamily: fontes.normal,
    },

    btnParticipar: {
      flexDirection: "row",

      alignItems: "center",

      gap: 5,

      paddingHorizontal: 12,

      paddingVertical: 8,

      borderRadius: 18,

      backgroundColor: tema.destaque,
    },

    btnParticiparTexto: {
      color: tema.fundo,

      fontSize: 11,

      fontFamily: fontes.negrito,
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

      fontSize: 12,

      fontFamily: fontes.negrito,

      marginBottom: 10,
    },

    opcoes: {
      gap: 8,
    },

    opcao: {
      minHeight: 42,

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
      color: tema.texto,

      fontSize: 12,

      fontFamily: fontes.normal,
    },

    botoesVotacao: {
      flexDirection: "row",

      gap: 8,

      marginTop: 12,
    },

    btnCancelar: {
      flex: 1,

      minHeight: 40,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 10,

      borderWidth: 1,

      borderColor: tema.cardSecundario,
    },

    btnCancelarTexto: {
      color: tema.textoSecundario,

      fontSize: 11,

      fontFamily: fontes.negrito,
    },

    btnConfirmar: {
      flex: 1,

      minHeight: 40,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 10,

      backgroundColor: tema.destaque,
    },

    btnConfirmarDesabilitado: {
      opacity: 0.45,
    },

    btnConfirmarTexto: {
      color: tema.fundo,

      fontSize: 11,

      fontFamily: fontes.negrito,
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

      fontSize: 11,

      fontFamily: fontes.negrito,

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

      fontSize: 11,

      fontFamily: fontes.negrito,
    },

    resultadoPercentual: {
      color: tema.textoSecundario,

      fontSize: 10,

      fontFamily: fontes.normal,
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

      fontSize: 12,

      fontFamily: fontes.normal,

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

      fontSize: 11,

      fontFamily: fontes.normal,
    },

    carregandoMais: {
      paddingVertical: 20,

      alignItems: "center",
    },
  });
