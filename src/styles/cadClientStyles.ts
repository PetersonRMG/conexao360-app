import {
  StyleSheet,
} from "react-native";

import {
  cores,
  fontes,
} from "./variaveis";

import {
  CoresTema,
} from "./temas";


export const criarCadClienteStyles = (
  tema: CoresTema
) =>
  StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    safeArea: {
      flex: 1,
    },


    keyboard: {
      flex: 1,
    },


    scroll: {
      flex: 1,
    },


    scrollConteudo: {
      flexGrow: 1,

      paddingBottom:
        35,
    },


    conteudo: {
      flex: 1,

      width:
        "100%",

      alignItems:
        "center",

      paddingHorizontal:
        18,
    },


    // =========================
    // TOPO
    // =========================

    conteudoTopo: {
      width:
        "100%",

      marginTop:
        30,

      alignItems:
        "flex-start",
    },


    subtitulo: {
      color:
        cores.douradoPrincipal,

      fontSize:
        fontes.subtitulo,

      fontFamily:
        fontes.normal,

      marginTop:
        10,

      marginBottom:
        6,
    },


    titulo: {
      color:
        tema.texto,

      fontSize:
        fontes.titulo,

      marginBottom:
        10,

      fontFamily:
        fontes.negrito,
    },


    tituloDourado: {
      color:
        cores.douradoPrincipal,
    },


    inf: {
      color:
        tema.texto,

      lineHeight:
        18,

      opacity:
        0.9,

      fontFamily:
        fontes.normalItalico,
    },


    // =========================
    // CARD DOS INPUTS
    // =========================

    cardInput: {
      width:
        "100%",

      marginTop:
        24,

      marginBottom:
        14,

      backgroundColor:
        tema.card,

      paddingHorizontal:
        10,

      paddingVertical:
        5,

      justifyContent:
        "center",

      borderRadius:
        10,
    },


    // =========================
    // INPUT
    // =========================

    input: {
      width:
        "100%",

      height:
        50,

      flexDirection:
        "row",

      alignItems:
        "center",

      borderBottomColor:
        cores.douradoPrincipal,

      borderBottomWidth:
        1,

      paddingHorizontal:
        8,

      marginVertical:
        2,
    },


    inputUltimo: {
      borderBottomWidth:
        0,
    },


    icon: {
      width:
        25,

      height:
        25,

      marginRight:
        12,

      resizeMode:
        "contain",
    },


    txtInput: {
      flex:
        1,

      color:
        tema.texto,

      fontSize:
        14,

      fontFamily:
        fontes.normal,

      paddingVertical:
        0,
    },


    // =========================
    // TERMOS
    // =========================

    areaTermos: {
      width:
        "100%",

      flexDirection:
        "row",

      alignItems:
        "center",

      marginBottom:
        18,

      paddingHorizontal:
        4,
    },


    areaTermosPressed: {
      opacity:
        0.7,
    },


    checkbox: {
      width:
        22,

      height:
        22,

      borderRadius:
        5,

      borderWidth:
        1,

      borderColor:
        cores.douradoPrincipal,

      alignItems:
        "center",

      justifyContent:
        "center",

      marginRight:
        10,
    },


    checkboxAtivo: {
      backgroundColor:
        cores.douradoPrincipal,
    },


    checkboxMarca: {
      fontSize:
        15,

      fontFamily:
        fontes.extraNegrito,

      color:
        tema.textoSobreDestaque,
    },


    txtTermos: {
      flex:
        1,

      color:
        tema.texto,

      fontSize:
        12,

      lineHeight:
        17,

      fontFamily:
        fontes.normal,

      opacity:
        0.9,
    },


    // =========================
    // CRIAR CONTA
    // =========================

    btnCriar: {
      width:
        "75%",

      height:
        50,

      backgroundColor:
        cores.douradoPrincipal,

      alignItems:
        "center",

      justifyContent:
        "center",

      borderRadius:
        8,

      marginTop:
        5,
    },


    btnCriarPressed: {
      backgroundColor:
        cores.douradoPrincipalPressed,

      transform:
        cores.btnPress,
    },


    btnCriarDesabilitado: {
      opacity:
        0.6,
    },


    txtCriar: {
      fontSize:
        fontes.btn,

      color:
        tema.textoSobreDestaque,

      fontFamily:
        fontes.extraNegrito,
    },


    // =========================
    // VOLTAR
    // =========================

    btnVoltar: {
      width:
        "75%",

      height:
        50,

      borderWidth:
        1,

      borderColor:
        cores.douradoPrincipal,

      alignItems:
        "center",

      justifyContent:
        "center",

      borderRadius:
        8,

      marginTop:
        10,

      marginBottom:
        20,
    },


    btnVoltarPressed: {
      backgroundColor:
        tema.cardSecundario,

      transform:
        cores.btnPress,
    },


    txtVoltar: {
      fontSize:
        fontes.btn,

      color:
        cores.douradoPrincipal,

      fontFamily:
        fontes.extraNegrito,
    },

  });