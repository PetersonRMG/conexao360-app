import { StyleSheet } from "react-native";
import { fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarSairModalStyles = (tema: CoresTema) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.62)",
      paddingHorizontal: 16,
    },
    areaExterna: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    caixaSair: {
      width: "100%",
      maxWidth: 390,
      alignSelf: "center",
      backgroundColor: tema.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: tema.borda,
      paddingHorizontal: 20,
      paddingTop: 38,
      paddingBottom: 22,
      alignItems: "center",
      position: "relative",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 18,
    },
    botaoFechar: {
      position: "absolute",
      top: 10,
      right: 10,
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
    },
    tituloSair: {
      color: tema.texto,
      fontSize: 21,
      fontFamily: fontes.extraNegritoItalico,
      textAlign: "center",
    },
    subtituloSair: {
      color: tema.textoSecundario,
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      marginTop: 9,
      marginBottom: 24,
    },
    btns: {
      width: "100%",
      flexDirection: "row",
      alignItems: "stretch",
      gap: 10,
    },
    btnCancelar: {
      flex: 1,
      minHeight: 46,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: tema.borda,
      backgroundColor: tema.cardSecundario,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    btnSair: {
      flex: 1,
      minHeight: 46,
      borderRadius: 12,
      backgroundColor: tema.destaque,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
    },
    txtCancelar: {
      color: tema.texto,
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
    },
    iconesMenu: {
      color: "#181818",
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
    },
    botaoPressionado: {
      opacity: 0.75,
    },
  });

// Compatibilidade com imports antigos.
export const sairModalStyles = criarSairModalStyles(temaEscuro);
