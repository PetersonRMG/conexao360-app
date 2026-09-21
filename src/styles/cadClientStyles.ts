import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

import { CoresTema } from "./temas";
export const criarCadClienteStyles = (tema: CoresTema) => StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 18,
  },

  // =========================
  // TOPO
  // =========================

  conteudoTopo: {
    width: "100%",
    marginTop: 45,
    alignItems: "flex-start",
  },

  subtitulo: {
    color: cores.douradoPrincipal,
    fontSize: fontes.subtitulo,
    fontFamily: fontes.normal,
    marginBottom: 6,
  },

  titulo: {
    color: tema.texto,
    fontSize: fontes.titulo,
    marginBottom: 10,
    fontFamily: fontes.negrito,
  },

  tituloDourado: {
    color: cores.douradoPrincipal,
  },

  inf: {
    color: tema.texto,
    lineHeight: 14,
    opacity: 0.9,
    fontFamily: fontes.normalItalico,
  },

  // =========================
  // CARD DOS INPUTS
  // =========================

  cardInput: {
    width: "100%",
    marginTop: 28,
    marginBottom: 20,

    backgroundColor: tema.card,

    paddingHorizontal: 10,
    paddingVertical: 5,

    justifyContent: "center",
    borderRadius: 10,
  },

  // =========================
  // INPUT
  // =========================

  input: {
    width: "100%",
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    borderBottomColor: cores.douradoPrincipal,
    borderBottomWidth: 1,

    paddingHorizontal: 8,

    marginVertical: 2,
  },

  icon: {
    width: 25,
    height: 25,
    marginRight: 12,
    resizeMode: "contain",
  },

  txtInput: {
    flex: 1,

    color: tema.texto,

    fontSize: 14,
    fontFamily: fontes.normal,

    paddingVertical: 0,
  },

  // =========================
  // CRIAR CONTA
  // =========================

  btnCriar: {
    width: "75%",
    height: 50,

    backgroundColor: cores.douradoPrincipal,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 8,

    marginTop: 5,
  },

  btnCriarPressed: {
    backgroundColor: cores.douradoPrincipalPressed,
    transform: cores.btnPress,
  },

  txtCriar: {
    fontSize: fontes.btn,
    color: tema.textoSobreDestaque,

    fontFamily: fontes.extraNegrito,
  },

  // =========================
  // VOLTAR
  // =========================

  btnVoltar: {
    width: "75%",
    height: 50,

    backgroundColor: tema.cardSecundario,

    borderWidth: 1,
    borderColor: cores.douradoPrincipal,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 8,

    // Mais para o meio da tela,
    // seguindo o padrão das telas anteriores
    marginTop: 10,
  },

  btnVoltarPressed: {
    backgroundColor: tema.cardSecundario,
    transform: cores.btnPress,
  },

  txtVoltar: {
    fontSize: fontes.btn,

    color: cores.douradoPrincipal,

    fontFamily: fontes.extraNegrito,
  },
});
