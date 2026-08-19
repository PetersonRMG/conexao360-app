import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
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
});

export default globalStyle;
