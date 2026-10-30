import { StyleSheet } from "react-native";

type CoresPublicarModal = {
  card: string;
  cardSecundario: string;
  borda: string;
  destaque: string;
  texto: string;
  textoSecundario: string;
};

export function criarPublicarModalStyles(cores: CoresPublicarModal) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.62)",
    },
    areaExterna: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    caixaMenu: {
      width: "100%",
      maxWidth: 440,
      alignSelf: "center",
      backgroundColor: cores.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderWidth: 1,
      borderBottomWidth: 0,
      borderColor: cores.borda,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 12,
    },
    indicador: {
      width: 42,
      height: 4,
      borderRadius: 4,
      alignSelf: "center",
      backgroundColor: cores.borda,
      marginBottom: 18,
    },
    cabecalho: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 20,
    },
    textosCabecalho: {
      flex: 1,
    },
    titulo: {
      fontSize: 20,
      lineHeight: 27,
      fontWeight: "700",
      color: cores.texto,
    },
    subtitulo: {
      fontSize: 13,
      lineHeight: 19,
      marginTop: 4,
      color: cores.textoSecundario,
    },
    botaoFechar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: cores.cardSecundario,
    },
    listaOpcoes: {
      gap: 10,
    },
    btnMenu: {
      minHeight: 76,
      borderRadius: 16,
      backgroundColor: cores.cardSecundario,
      borderWidth: 1,
      borderColor: cores.borda,
      paddingHorizontal: 13,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    iconeContainer: {
      width: 48,
      height: 48,
      borderRadius: 13,
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      alignItems: "center",
      justifyContent: "center",
    },
    imagemMenu: {
      width: 26,
      height: 26,
      tintColor: cores.destaque,
    },
    conteudoOpcao: {
      flex: 1,
      gap: 3,
    },
    txtMenu: {
      fontSize: 16,
      fontWeight: "700",
      color: cores.texto,
    },
    descricaoOpcao: {
      fontSize: 13,
      lineHeight: 18,
      color: cores.textoSecundario,
    },
    botaoPressionado: {
      opacity: 0.75,
    },
  });
}
