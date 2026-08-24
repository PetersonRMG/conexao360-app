import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

export const senhaRedfStyle = StyleSheet.create({
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
    fontWeight: "normal",
    marginBottom: 6,
  },

  titulo: {
    color: cores.branco,
    fontSize: fontes.titulo,
    fontWeight: "bold",
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

  /*
    BOTÃO ENVIAR NOVO CÓDIGO
    */

  btnEnviar: {
    width: "75%",
    height: 50,
    backgroundColor: cores.douradoPrincipal,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 55,
  },

  btnEnviarPressed: {
    backgroundColor: cores.douradoPrincipalPressed,
    transform: cores.btnPress,
  },

  txtEnviar: {
    fontSize: fontes.btn,
    color: cores.roxoPrincipal,
    fontWeight: "bold",
  },

  /*
    BOTÃO VOLTAR AO LOGIN
    */

  btnVoltar: {
    width: "75%",
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
    borderColor: cores.douradoPrincipal,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 55,
  },

  btnVoltarPressed: {
    backgroundColor: cores.roxoPrincipal80,
    transform: cores.btnPress,
  },

  txtVoltar: {
    fontSize: fontes.btn,
    color: cores.douradoPrincipal,
    fontWeight: "bold",
  },
});
