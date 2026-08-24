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
  
  
});

export default globalStyle;
