import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const menuStyles = StyleSheet.create({

    menuInferior: {
        width: "100%",
        height: 70,

        position: "absolute",
        bottom: 0,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

        paddingHorizontal: 5,

        backgroundColor: "#080808",

        borderTopWidth: 1,
        borderTopColor: cores.roxoPrincipal80,
    },

    itemMenu: {
        flex: 1,

        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        gap: 3,
    },

    iconeMenu: {
        width: 22,
        height: 22,

        resizeMode: "contain",

        opacity: 0.65,
    },

    iconeMenuAtivo: {
        opacity: 1,

        tintColor: cores.douradoPrincipal,
    },

    txtMenu: {
        color: cores.branco,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.6,
    },

    txtMenuAtivo: {
        color: cores.douradoPrincipal,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },


    btnPublicar: {
        width: 42,
        height: 42,

        borderRadius: 21,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.douradoPrincipal,

        marginTop: -18,

        borderWidth: 3,
        borderColor: "#080808",
    },

    maisPublicar: {
        color: cores.roxoPrincipal,

        fontSize: 28,
        fontFamily: fontes.negrito,

        lineHeight: 30,
    },

});