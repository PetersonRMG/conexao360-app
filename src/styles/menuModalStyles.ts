import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const menuModalStyles = StyleSheet.create({

    // =========================================
    // FUNDO TOTAL DO MODAL
    // =========================================
    overlay: {
        flex: 1,

        backgroundColor: "rgba(0,0,0,0.5)",

        // centraliza a área de 440px
        alignItems: "center",
    },


    // =========================================
    // ÁREA DO APP
    // MESMO LIMITE DAS OUTRAS TELAS
    // =========================================
    areaModal: {
        flex: 1,

        width: "100%",
        maxWidth: 440,

        alignItems: "flex-end",

        paddingTop: 70,
        paddingRight: 15,
    },


    // =========================================
    // CAIXA DO MENU
    // =========================================
    caixaMenu: {
        backgroundColor: "#0A0909",

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        width: 170,
        height: 250,

        padding: 15,

        borderRadius: 10,

        justifyContent: "space-between",
    },


    // =========================================
    // BOTÕES
    // =========================================
    btnMenu: {
        width: "100%",
        height: 30,

        flexDirection: "row",
        alignItems: "center",

        columnGap: 7,

        marginVertical: 3,

        borderRadius: 5,
    },


    // =========================================
    // ÍCONES
    // =========================================
    imagemMenu: {
        width: 22,
        height: 22,

        resizeMode: "contain",
    },


    // =========================================
    // TEXTO
    // =========================================
    iconesMenu: {
        color: cores.branco,

        fontSize: 14,
        fontFamily: fontes.normal,
    },

});