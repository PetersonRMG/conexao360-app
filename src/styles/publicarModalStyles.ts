import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

export const publicarModalStyles = StyleSheet.create({

    // =========================
    // FUNDO DO MODAL
    // =========================

    overlay: {
        flex: 1,

        backgroundColor: "rgba(0,0,0,0.25)",

        justifyContent: "flex-end",
        alignItems: "center",

        // sobe a caixa para ficar acima do footer
        paddingBottom: 72,
    },


    // =========================
    // CAIXA
    // =========================

    caixaMenu: {
        width: 180,

        backgroundColor: "#0A0909",

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 8,

        paddingHorizontal: 14,
        paddingVertical: 12,

        marginBottom: 5,
    },


    // =========================
    // BOTÃO
    // =========================

    btnMenu: {
        width: "100%",
        height: 42,

        flexDirection: "row",
        alignItems: "center",

        columnGap: 10,

        paddingHorizontal: 5,

        borderRadius: 5,
    },


    // =========================
    // ÍCONE
    // =========================

    imagemMenu: {
        width: 25,
        height: 25,

        resizeMode: "contain",
    },


    // =========================
    // TEXTO
    // =========================

    txtMenu: {
        color: cores.douradoPrincipal,

        fontSize: 15,
        fontFamily: fontes.normal,
    },

});