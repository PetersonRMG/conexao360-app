import {
    StyleSheet,
} from "react-native";

import {
    cores,
    fontes,
} from "./variaveis";

import {
    CoresTema,
} from "./temas";


export const criarComentariosModalStyles = (
    tema: CoresTema
) => StyleSheet.create({

    keyboard: {
        flex: 1,
    },

    // =========================
    // FUNDO
    // =========================

    overlay: {
        flex: 1,

        justifyContent: "flex-end",

        backgroundColor:
            "rgba(0,0,0,0.55)",
    },


    // =========================
    // BOTTOM SHEET
    // =========================

    sheet: {
        width: "100%",
        maxWidth: 440,
        height: "72%",

        alignSelf: "center",

        backgroundColor:
            tema.fundo,

        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor:
            tema.cardSecundario,

        overflow: "hidden",
    },

    handle: {
        width: 44,
        height: 4,

        alignSelf: "center",

        borderRadius: 2,

        backgroundColor:
            tema.textoSecundario,

        opacity: 0.65,

        marginTop: 8,
        marginBottom: 5,
    },


    // =========================
    // HEADER
    // =========================

    header: {
        width: "100%",
        height: 58,

        flexDirection: "row",
        alignItems: "center",
        justifyContent:
            "space-between",

        paddingHorizontal: 16,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.cardSecundario,
    },

    titulo: {
        color: tema.destaque,

        fontSize: 20,
        fontFamily:
            fontes.extraNegrito,
    },

    btnFechar: {
        width: 38,
        height: 38,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 19,
    },

    txtFechar: {
        color: tema.texto,

        fontSize: 30,
        lineHeight: 31,

        fontFamily:
            fontes.normal,
    },


    // =========================
    // SCROLL
    // =========================

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 14,
        paddingBottom: 12,
    },


    // =========================
    // COMENTÁRIO
    // =========================

    comentario: {
        width: "100%",

        flexDirection: "row",

        paddingVertical: 15,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.cardSecundario,
    },

    avatar: {
        width: 42,
        height: 42,

        borderRadius: 21,

        borderWidth: 1,
        borderColor:
            tema.destaque,

        resizeMode: "cover",

        marginRight: 10,
    },

    comentarioConteudo: {
        flex: 1,
    },

    comentarioTopo: {
        width: "100%",

        flexDirection: "row",
        justifyContent:
            "space-between",
    },

    comentarioAutor: {
        flex: 1,
    },

    nome: {
        color: tema.destaque,

        fontSize: 11,
        fontFamily:
            fontes.negrito,
    },

    horario: {
        color:
            tema.textoSecundario,

        fontSize: 7,
        fontFamily:
            fontes.normal,

        marginTop: 2,
    },

    mais: {
        color:
            tema.textoSecundario,

        fontSize: 20,

        paddingHorizontal: 6,
    },

    textoComentario: {
        color: tema.texto,

        fontSize: 10,
        lineHeight: 14,

        fontFamily:
            fontes.normal,

        marginTop: 8,

        paddingRight: 8,
    },


    // =========================
    // INPUT FIXO
    // =========================

    areaEnviar: {
        width: "100%",
        minHeight: 66,

        flexDirection: "row",
        alignItems: "center",

        gap: 7,

        paddingHorizontal: 12,
        paddingTop: 8,

        backgroundColor:
            tema.fundo,

        borderTopWidth: 1,
        borderTopColor:
            tema.cardSecundario,
    },

    avatarInput: {
        width: 36,
        height: 36,

        borderRadius: 18,

        borderWidth: 1,
        borderColor:
            tema.destaque,

        resizeMode: "cover",
    },

    inputContainer: {
        flex: 1,
        minHeight: 40,
        maxHeight: 78,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor:
            tema.input,

        borderWidth: 1,
        borderColor:
            tema.borda,

        borderRadius: 22,

        paddingLeft: 12,
        paddingRight: 8,
    },

    input: {
        flex: 1,
        maxHeight: 70,

        color: tema.texto,

        fontSize: 10,
        fontFamily:
            fontes.normal,

        paddingVertical: 8,
    },

    iconeEmoji: {
        width: 18,
        height: 18,

        resizeMode: "contain",

        opacity: 0.8,
    },

    btnEnviar: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 20,

        backgroundColor:
            tema.destaque,
    },

    btnEnviarPressed: {
        opacity: 0.8,

        transform:
            cores.btnPress,
    },

    iconeEnviar: {
        width: 21,
        height: 21,

        resizeMode: "contain",
    },

});
