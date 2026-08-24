import { StyleSheet } from "react-native";
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

export const enviarLinkStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 18,
  },

  conteudoTopo: {
    width: "100%",
    marginTop: 60,
    alignItems: "flex-start",
  },

  subtitulo: {
    color: cores.douradoPrincipal,
    fontSize: fontes.subtitulo,
    fontFamily: fontes.normal,
    marginBottom: 6,
  },

  titulo: {
    color: cores.branco,
    fontSize: fontes.titulo,
    fontFamily: fontes.extraNegrito,
    marginBottom: 12,
  },

  tituloDourado: {
    color: cores.douradoPrincipal,
  },

  inf: {
    color: cores.branco,
    lineHeight: 14,
    opacity: 0.9,
  },

  codigoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginTop: 20,
    marginBottom: 50,
  },

  codigoInput: {
    width: 44,
    height: 40,
    borderWidth: 1,
    borderColor: cores.douradoPrincipal,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    color: cores.branco,
    fontSize: 20,
    fontFamily: fontes.extraNegrito,
  },

  btnEnviar: {
    width: "90%",
    height: 50,
    backgroundColor: cores.douradoPrincipal,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 18,
  },

  btnEnviarPressed: {
    backgroundColor: cores.douradoPrincipalPressed,
    transform: cores.btnPress,
  },

  txtEnviar: {
    fontSize: fontes.btn,
    color: cores.roxoPrincipal,
    fontFamily: fontes.extraNegrito,
  },

  btnVoltar: {
    width: "90%",
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
    borderColor: cores.douradoPrincipal,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,

    // posiciona próximo ao final da tela

    marginVertical: 28,
  },

  btnVoltarPressed: {
    backgroundColor: cores.roxoPrincipal80,
    transform: cores.btnPress,
  },

  txtVoltar: {
    fontSize: fontes.btn,
    color: cores.douradoPrincipal,
    fontFamily: fontes.extraNegrito,
  },
});
