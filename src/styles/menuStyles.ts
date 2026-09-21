import { StyleSheet } from "react-native";
import { fontes } from "./variaveis";
import { CoresTema } from "./temas";

export const criarMenuStyles = (tema: CoresTema) => StyleSheet.create({

    menuInferior: {
        width: "100%",
        height: 70,

        position: "absolute",
        bottom: 0,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

        paddingHorizontal: 5,

        backgroundColor: tema.footer,

        borderTopWidth: 1,
        borderTopColor: tema.linha,
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
        tintColor: tema.destaque,
    },

    txtMenu: {
        color: tema.texto,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.6,
    },

    txtMenuAtivo: {
        color: tema.destaque,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },

    btnPublicar: {
        width: 42,
        height: 42,

        borderRadius: 21,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: tema.destaque,

        marginTop: -18,

        borderWidth: 3,
        borderColor: tema.footer,
    },

    maisPublicar: {
        color: tema.textoSobreDestaque,

        fontSize: 28,
        fontFamily: fontes.negrito,

        lineHeight: 30,
    },

});
