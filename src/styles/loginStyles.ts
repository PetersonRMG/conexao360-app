import { StyleSheet } from "react-native";

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
    borderBottomColor: "#D6B26A",
    backgroundColor: "#ffffff00",
    borderWidth: 2,
    padding: 10,
    marginVertical: 10,
  },
  txtInput: {
    width: "100%",
    backgroundColor: "#00000004",
    color: "#D6B26A",
  },
  form: {
    backgroundColor: "#00000096",
    width: "100%",
    padding:15,
    borderRadius:10,
    marginVertical:5,
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
    width: "90%",
    height: 50,
    borderRadius: 10,
    margin: "auto",
    textAlign: "center",
    paddingBlock: 5,
    marginBlock: 5,
  },
  btnCriar: {
    color: "#D6B26A",
    backgroundColor: "#2d1b33b7",
    width: "90%",
    height: 50,
    borderRadius: 10,
    margin: "auto",
    textAlign: "center",
    paddingBlock: 5,
    marginBlock: 5,
  },
  btnCriarPressed: {
    backgroundColor: "#2d1b33",
    alignItems: "center",
    transform: " scale(1.1)",
  },

  btnEntrarPressed: {
    backgroundColor: "#bb9c5d",
    alignItems: "center",
    transform: " scale(1.1)",
  },

  textBtn: {
    margin: "auto",
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  textCriar: {
    color: "#D6B26A",
  },
  sloganTitulo: {
    color: "#D6B26A",
    fontWeight: "normal",
    textTransform: "uppercase",
    fontSize: 15,
    marginTop: 30,
  },
  sloganSubtitulo: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default loginStyle;
