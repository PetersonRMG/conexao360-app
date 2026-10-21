import { StyleSheet } from "react-native";

import { fontes } from "./variaveis";

import { CoresTema } from "./temas";

export const criarExplorarStyles = (tema: CoresTema) =>
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: tema.fundo,
    },

    // =========================
    // CABEÇALHO DA TELA
    // =========================

    topo: {
      flexDirection: "row",

      alignItems: "center",

      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 10,

      gap: 12,
    },

    btnVoltar: {
      width: 40,
      height: 40,

      alignItems: "center",
      justifyContent: "center",

      borderRadius: 20,

      backgroundColor: tema.card,
    },

    topoTextos: {
      flex: 1,
    },

    titulo: {
      color: tema.texto,

      fontSize: fontes.subtitulo,

      fontFamily: fontes.negrito,
    },

    subtitulo: {
      color: tema.textoSecundario,

      fontSize: 12,

      fontFamily: fontes.normal,

      marginTop: 2,
    },

    // =========================
    // BUSCA
    // =========================

    areaBusca: {
      paddingHorizontal: 18,
      paddingBottom: 14,
    },

    busca: {
      height: 46,

      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: 14,

      backgroundColor: tema.input,

      borderWidth: 1,

      borderColor: tema.cardSecundario,

      borderRadius: 23,
    },

    input: {
      flex: 1,

      height: "100%",

      color: tema.texto,

      fontFamily: fontes.normal,

      fontSize: 13,

      paddingHorizontal: 10,
      paddingVertical: 0,
    },

    btnLimpar: {
      width: 32,
      height: 32,

      alignItems: "center",
      justifyContent: "center",
    },

    // =========================
    // TÍTULO DA LISTA
    // =========================

    areaTituloLista: {
      paddingHorizontal: 18,
      paddingBottom: 9,

      flexDirection: "row",

      alignItems: "center",
      justifyContent: "space-between",
    },

    tituloLista: {
      color: tema.destaque,

      fontSize: 14,

      fontFamily: fontes.negrito,
    },

    quantidade: {
      color: tema.textoSecundario,

      fontSize: 11,

      fontFamily: fontes.normal,
    },

    // =========================
    // LISTA
    // =========================

    lista: {
      paddingHorizontal: 18,

      paddingBottom: 100,
    },

    card: {
      minHeight: 76,

      flexDirection: "row",
      alignItems: "center",

      paddingHorizontal: 12,
      paddingVertical: 11,

      marginBottom: 9,

      backgroundColor: tema.card,

      borderWidth: 1,

      borderColor: tema.cardSecundario,

      borderRadius: 14,
    },

    cardPressed: {
      opacity: 0.72,
    },

    avatar: {
      width: 52,
      height: 52,

      borderRadius: 26,

      borderWidth: 1,

      borderColor: tema.destaque,

      marginRight: 12,
    },

    dados: {
      flex: 1,

      minWidth: 0,
    },

    linhaNome: {
      flexDirection: "row",

      alignItems: "center",

      flexWrap: "wrap",

      gap: 6,
    },

    nome: {
      color: tema.texto,

      fontSize: 14,

      fontFamily: fontes.negrito,
    },

    badge: {
      paddingHorizontal: 7,
      paddingVertical: 2,

      borderRadius: 10,

      backgroundColor: tema.cardSecundario,
    },

    txtBadge: {
      color: tema.destaque,

      fontSize: 9,

      fontFamily: fontes.negrito,
    },

    area: {
      color: tema.textoSecundario,

      fontSize: 12,

      fontFamily: fontes.normal,

      marginTop: 5,
    },

    local: {
      color: tema.textoSecundario,

      fontSize: 10,

      fontFamily: fontes.normal,

      marginTop: 3,

      opacity: 0.8,
    },

    seta: {
      width: 30,

      alignItems: "flex-end",
      justifyContent: "center",
    },

    // =========================
    // ESTADOS
    // =========================

    centro: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",

      paddingHorizontal: 35,
      paddingVertical: 60,
    },

    tituloVazio: {
      color: tema.texto,

      fontSize: 15,

      fontFamily: fontes.negrito,

      marginTop: 12,

      textAlign: "center",
    },

    textoVazio: {
      color: tema.textoSecundario,

      fontSize: 12,

      lineHeight: 18,

      fontFamily: fontes.normal,

      textAlign: "center",

      marginTop: 5,
    },

    erro: {
      color: tema.texto,

      backgroundColor: tema.card,

      borderColor: tema.cardSecundario,

      borderWidth: 1,

      borderRadius: 12,

      padding: 12,

      marginHorizontal: 18,
      marginBottom: 12,

      fontSize: 12,

      fontFamily: fontes.normal,
    },

    // =========================
    // PAGINAÇÃO
    // =========================

    rodapeLista: {
      minHeight: 65,

      alignItems: "center",
      justifyContent: "center",
    },
  });
