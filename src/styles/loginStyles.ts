import { StyleSheet } from "react-native";
import { cores,fontes } from "./variaveis";

const loginStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  background: {
    width: "100%",
    maxWidth: 440,
    height: "100%",
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  conteudoTopo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  icone: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  mostrarSenha: {
    width: 20,
    height: 20,
  },
  input: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#00000000",
    borderBottomColor: cores.douradoPrincipal,
    backgroundColor: cores.bgPreto80,
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
  },
  txtInput: {
    width: "100%",
    backgroundColor: "transparent",
    color: cores.douradoPrincipal,
  },
  form: {
    backgroundColor: cores.bgPreto80,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },

  conteudoBtns: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontFamily: fontes.extraNegrito,
    marginBottom: 10,
    color: "#ffff",
    textTransform: "uppercase",
  },
  x: {
    color: cores.douradoPrincipal,
  },
  subtitulo: {
    fontSize: 20,
    color: cores.douradoPrincipal,
    fontFamily: fontes.normal,
    textTransform: "uppercase",
  },
  btnEntrar: {
    color: cores.roxoPrincipal,
    backgroundColor: cores.douradoPrincipal,
    width: "90%",
    height: 50,
    borderRadius: 10,
    margin: "auto",
    textAlign: "center",
    paddingBlock: 5,
    marginBlock: 5,
  },
  btnCriar: {
    width: "90%",
    height: 50,
    backgroundColor: cores.bgPreto80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: cores.douradoPrincipal,
  },
  btnCriarPressed: {
    backgroundColor: cores.roxoPrincipal,
    alignItems: "center",
    transform: " scale(0.9)",
  },

  btnEntrarPressed: {
    backgroundColor: cores.douradoPrincipalPressed,
    alignItems: "center",
    transform: " scale(0.9)",
  },

  textBtn: {
    margin: "auto",
    fontSize: 15,
    textTransform: "uppercase",
    fontFamily: fontes.extraNegrito,
  },
  textCriar: {
    color: cores.douradoPrincipal,
  },
  sloganTitulo: {
    color: cores.douradoPrincipal,
    fontFamily: fontes.normal,
    textTransform: "uppercase",
    fontSize: 15,
    marginTop: 30,
  },
  sloganSubtitulo: {
    color: "#ffffff",
    fontSize: 25,
    fontFamily: fontes.extraNegrito,
  },
  txtEsqueciSenha:{
    color:cores.douradoPrincipal,
  
  }
});

export default loginStyle;
