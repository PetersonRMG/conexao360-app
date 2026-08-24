import { StyleSheet } from "react-native";
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

export const esqueciSenhaStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
  },
  conteudoTopo: {
    marginVertical: 50,
    alignItems: "flex-start",
  },
  subtitulo: {
    color: cores.douradoPrincipal,
    fontSize: fontes.subtitulo,
    fontFamily: fontes.normal,
  },
  titulo: {
    color: cores.branco,
    fontSize: fontes.titulo,
    fontFamily: fontes.extraNegrito,
  },
  titulo2: {
    color: cores.douradoPrincipal,
  },
  inf: {
    color: cores.branco,
  },
  cardInput: {
    backgroundColor: cores.bgPreto80,
    marginTop: 50,
    marginBottom: 30,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
  input: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: cores.douradoPrincipal,
    borderBottomWidth: 2,
    padding: 10,
    marginVertical: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  txtInput: {
    width: "100%",
  },
  btnEnviar: {
    width: "80%",
    height: 50,
    backgroundColor: cores.douradoPrincipal,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  btnEnviarPressed: {
    backgroundColor: cores.douradoPrincipalPressed,
    alignItems: "center",
    transform: cores.btnPress,
  },
  txtEnviar: {
    fontSize: fontes.btn,
    color: cores.roxoPrincipal,
    fontFamily: fontes.extraNegrito,
  },
  btnVoltar: {
    width: "80%",
    height: 50,
    backgroundColor: cores.bgPreto80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: cores.douradoPrincipal,
  },
  btnVoltarPressed: {
    backgroundColor: cores.roxoPrincipal80,
    alignItems: "center",
    transform: cores.btnPress,
  },
  txtVoltar: {
    fontSize: fontes.btn,
    color: cores.douradoPrincipal,
    fontFamily: fontes.extraNegrito,
  },
});
