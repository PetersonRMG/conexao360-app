import { Platform, StyleSheet } from "react-native";
import { fontes, tipografia } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarMenuStyles = (tema: CoresTema) => {
    const escuro = tema.fundo === temaEscuro.fundo;

    return StyleSheet.create({
        menuInferior: {
            width: "100%",
            height: 76,
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 6,
            paddingVertical: 3,
            backgroundColor: tema.footer,
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

        // Cada item ocupa exatamente 1/5 da largura livre.
        itemMenu: {
            flex: 1,
            minWidth: 0,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: 12,
        },

        // Área idêntica para todos os ícones do menu.
        areaIcone: {
            width: "100%",
            height: 37,
            alignItems: "center",
            justifyContent: "center",
        },

        // A altura fixa mantém todas as legendas exatamente na mesma linha.
        txtMenu: {
            width: "100%",
            height: 18,
            color: tema.textoSecundario,
            fontSize: tipografia.navegacao,
            lineHeight: 18,
            fontFamily: fontes.appRegular,
            textAlign: "center",
            includeFontPadding: false,
        },

        txtMenuAtivo: {
            color: tema.destaque,
            fontFamily: fontes.appSemiBold,
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

    });
};
