import { StyleSheet } from "react-native";
import { cores } from "./variaveis";  
import { fontes } from "./variaveis";

const globalStyle = StyleSheet.create({
  logoMenor: {
    width: 70,
    height: 70,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff",
  },
  background: {
    width: "100%",
    maxWidth: 440,
    height: "100%",
    backgroundSize: "convain",
  },
  logoMaior: {
    width: 160,
    height: 150,
  },
  areaConteudo: {
    flex: 1,
  },
  scrollConteudo: {
    flexGrow: 1,
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
  conteudoBtns: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffff",
    textTransform: "uppercase",
  },
  x: {
    color: "#D6B26A",
  },
  subtitulo: {
    fontSize: 20,
    color: "#D6B26A",
    fontStyle: "normal",
    textTransform: "uppercase",
  },
  btnEntrar: {
    color: "#2D1B33",
    backgroundColor: "#D6B26A",
  },
  btnCriar: {
    color: "#D6B26A",
    backgroundColor: "#2D1B33",
  },
  btn: {
    width: "90%",
    borderRadius: 10,
    margin: "auto",
    textAlign: "center",
    paddingBlock: 5,
    marginBlock: 5,
  },

  txtEsqueciSenha: {
    color: cores.douradoPrincipal,
    textDecorationLine: "underline",
  },
});

export default globalStyle;
