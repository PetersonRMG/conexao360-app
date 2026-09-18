import {
    StyleSheet
} from "react-native";

import {
    fontes
} from "./variaveis";

import {
    CoresTema
} from "./temas";


export const criarComentariosStyles = (
    tema: CoresTema
) => {

    return StyleSheet.create({

        container: {

            flex: 1,

            backgroundColor:
                tema.fundo,

        },


        // =========================
        // SCROLL
        // =========================

        scroll: {

            flex: 1,

        },

        scrollConteudo: {

            paddingHorizontal: 16,

            paddingTop: 10,

            paddingBottom: 20,

        },


        // =========================
        // POST
        // =========================

        post: {

            width: "100%",

            backgroundColor:
                tema.card,

            borderWidth: 1,

            borderColor:
                tema.borda,

            borderRadius: 12,

            padding: 12,

            marginBottom: 20,

        },

        postHeader: {

            flexDirection: "row",

            alignItems: "center",

            marginBottom: 8,

        },

        avatarPost: {

            width: 40,

            height: 40,

            borderRadius: 20,

            marginRight: 10,

            borderWidth: 1,

            borderColor:
                tema.destaque,

        },

        nomePost: {

            color:
                tema.texto,

            fontSize: 13,

            fontFamily:
                fontes.negrito,

        },

        tempoPost: {

            color:
                tema.textoSecundario,

            fontSize: 9,

            fontFamily:
                fontes.normal,

        },

        textoPost: {

            color:
                tema.texto,

            fontSize: 11,

            lineHeight: 15,

            fontFamily:
                fontes.normal,

        },


        // =========================
        // AÇÕES
        // =========================

        acoes: {

            width: "100%",

            flexDirection: "row",

            justifyContent:
                "space-between",

            borderTopWidth: 1,

            borderTopColor:
                tema.cardSecundario,

            paddingTop: 10,

            marginTop: 10,

        },

        acao: {

            flexDirection: "row",

            alignItems: "center",

            gap: 5,

        },

        iconeAcao: {

            width: 17,

            height: 17,

            resizeMode: "contain",

        },

        txtAcao: {

            color:
                tema.textoSecundario,

            fontSize: 8,

            fontFamily:
                fontes.normal,

        },


        // =========================
        // TÍTULO COMENTÁRIOS
        // =========================

        tituloComentarios: {

            color:
                tema.destaque,

            fontSize: 18,

            fontFamily:
                fontes.negrito,

            marginBottom: 15,

        },


        // =========================
        // COMENTÁRIO
        // =========================

        comentario: {

            width: "100%",

            flexDirection: "row",

            paddingVertical: 14,

            borderBottomWidth: 1,

            borderBottomColor:
                tema.cardSecundario,

        },

        avatarComentario: {

            width: 40,

            height: 40,

            borderRadius: 20,

            alignItems: "center",

            justifyContent:
                "center",

            backgroundColor:
                tema.destaque,

            marginRight: 10,

        },

        imgComentario: {

            width: 25,

            height: 25,

            resizeMode: "contain",

        },

        comentarioConteudo: {

            flex: 1,

        },

        nomeComentario: {

            color:
                tema.destaque,

            fontSize: 11,

            fontFamily:
                fontes.negrito,

        },

        horarioComentario: {

            color:
                tema.textoSecundario,

            fontSize: 7,

            marginTop: 1,

            fontFamily:
                fontes.normal,

        },

        textoComentario: {

            color:
                tema.texto,

            fontSize: 10,

            lineHeight: 14,

            marginTop: 8,

            fontFamily:
                fontes.normal,

        },


        // =========================
        // INPUT
        // =========================

        areaEnviar: {

            width: "100%",

            minHeight: 62,

            flexDirection: "row",

            alignItems: "center",

            paddingHorizontal: 12,

            gap: 8,

            backgroundColor:
                tema.fundo,

            borderTopWidth: 1,

            borderTopColor:
                tema.cardSecundario,

        },

        avatarInput: {

            width: 34,

            height: 34,

            borderRadius: 17,

            borderWidth: 1,

            borderColor:
                tema.destaque,

        },

        inputContainer: {

            flex: 1,

            height: 40,

            flexDirection: "row",

            alignItems: "center",

            backgroundColor:
                tema.card,

            borderWidth: 1,

            borderColor:
                tema.borda,

            borderRadius: 20,

            paddingHorizontal: 12,

        },

        input: {

            flex: 1,

            height: "100%",

            color:
                tema.texto,

            fontSize: 10,

            fontFamily:
                fontes.normal,

        },

        send: {

            width: 20,

            height: 20,

            resizeMode: "contain",

        },

    });

};