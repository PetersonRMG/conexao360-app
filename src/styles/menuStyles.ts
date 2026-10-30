import { Platform, StyleSheet } from "react-native";
import { fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

// Mesmo nome da função original; estilo novo e navegação preservada.
export const criarMenuStyles = (tema: CoresTema) => {
  const escuro = tema.fundo === temaEscuro.fundo;

  return StyleSheet.create({
    menuInferior: {
      width: "100%",
      height: 76,
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      paddingHorizontal: 7,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: escuro ? tema.fundo : tema.footer,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: tema.linha,
      ...Platform.select({
        ios: {
          shadowColor: "#000000",
          shadowOpacity: escuro ? 0.22 : 0.06,
          shadowRadius: 9,
          shadowOffset: { width: 0, height: -3 },
        },
        android: { elevation: 8 },
        default: {},
      }),
    },

    itemMenu: {
      flex: 1,
      minWidth: 0,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      borderRadius: 12,
    },

    // Mesma altura para TODOS os ícones. A legenda fica na mesma linha,
    // inclusive em Publicar (ícone maior com fundo dourado).
    areaIcone: {
      width: "100%",
      height: 43,
      alignItems: "center",
      justifyContent: "center",
    },

    txtMenu: {
      color: tema.textoSecundario,
      fontSize: 10,
      lineHeight: 13,
      fontFamily: fontes.normal,
      textAlign: "center",
    },

    txtMenuAtivo: {
      color: tema.destaque,
      fontFamily: fontes.negrito,
    },

    indicador: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "transparent",
    },

    indicadorAtivo: {
      backgroundColor: tema.destaque,
    },

    // Publicar: botão de escrita no lugar do '+' circular.
    btnPublicar: {
      width: 46,
      height: 43,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.destaque,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: escuro ? "#E6C98A" : tema.destaque,
      ...Platform.select({
        ios: {
          shadowColor: "#000000",
          shadowOpacity: 0.14,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
        },
        android: { elevation: 3 },
        default: {},
      }),
    },

    txtPublicar: {
      color: tema.destaque,
      fontFamily: fontes.negrito,
    },
  });
};
