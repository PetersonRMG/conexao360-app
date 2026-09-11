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
    backgroundColor: "#3b3b3bff",
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

  pressBtn: {
    transform: 'scale(0.9)',

    
  },
  containerG: {
    flex: 1,
    backgroundColor: "#0A0909",
  },
  conteudoG: {
    padding: 20,
    paddingBottom: 90,

  },
  titulo: {
    color: "#D6B26A",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  
  
});

export default globalStyle;
