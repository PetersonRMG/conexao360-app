import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema } from "./temas";


export const criarGaleria2Styles = (
    tema: CoresTema
) => StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor:
            tema.fundo,
    },

    lista: {
        flex: 1,

        width: "100%",
    },

    listaConteudo: {
        paddingHorizontal: 16,

        paddingBottom: 100,
    },

    linhaFotos: {
        justifyContent:
            "space-between",

        marginBottom: 12,
    },


    // =========================
    // ABAS
    // =========================

    abas: {
        width: "100%",
        height: 42,

        flexDirection: "row",

        borderBottomWidth: 1,

        borderBottomColor:
            tema.cardSecundario,

        marginBottom: 7,
    },

    aba: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 3,
    },

    abaAtiva: {
        borderBottomWidth: 2,

        borderBottomColor:
            tema.destaque,
    },

    abaPressionada: {
        opacity: 0.72,
    },

    txtAba: {
        color:
            tema.texto,

        fontSize: 9,

        fontFamily:
            fontes.normal,

        textAlign: "center",

        opacity: 0.8,
    },

    txtAbaAtiva: {
        color:
            tema.destaque,

        fontFamily:
            fontes.negrito,

        opacity: 1,
    },


    // =========================
    // COMPARTILHAR
    // =========================

    areaCompartilhar: {
        width: "100%",

        alignItems: "center",

        paddingVertical: 7,
    },

    btnCompartilhar: {
        minWidth: 112,
        height: 29,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: 6,

        paddingHorizontal: 12,

        backgroundColor:
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        borderRadius: 4,
    },

    btnCompartilharPressed: {
        backgroundColor:
            tema.cardSecundario,

        transform:
            cores.btnPress,
    },

    iconeCompartilhar: {
        width: 15,
        height: 15,

        resizeMode: "contain",
    },

    txtCompartilhar: {
        color:
            tema.destaque,

        fontSize: 10,

        fontFamily:
            fontes.normal,
    },


    // =========================
    // RESUMO
    // =========================

    resumoCard: {
        width: "100%",
        minHeight: 48,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor:
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.borda,

        borderRadius: 7,

        paddingHorizontal: 8,
        paddingVertical: 7,

        marginTop: 3,
    },

    resumoItem: {
        flex: 1,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: 6,
    },

    resumoIcone: {
        width: 18,
        height: 18,

        resizeMode: "contain",
    },

    resumoAvatar: {
        width: 18,
        height: 18,

        borderRadius: 9,

        resizeMode: "cover",
    },

    resumoNumero: {
        color:
            tema.texto,

        fontSize: 9,

        fontFamily:
            fontes.negrito,

        lineHeight: 11,
    },

    resumoLegenda: {
        color:
            tema.textoSecundario,

        fontSize: 6.5,

        fontFamily:
            fontes.normal,

        lineHeight: 9,
    },

    resumoSeparador: {
        width: 1,
        height: 24,

        backgroundColor:
            tema.cardSecundario,
    },


    // =========================
    // AVISO
    // =========================

    avisoCard: {
        width: "100%",
        minHeight: 43,

        flexDirection: "row",

        alignItems: "center",

        backgroundColor:
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.borda,

        borderRadius: 7,

        paddingHorizontal: 9,
        paddingVertical: 7,

        marginTop: 8,
        marginBottom: 12,
    },

    avisoIcone: {
        width: 20,
        height: 20,

        resizeMode: "contain",

        marginRight: 8,
    },

    avisoTexto: {
        flex: 1,

        color:
            tema.textoSecundario,

        fontSize: 7.5,
        lineHeight: 11,

        fontFamily:
            fontes.normal,
    },


    // =========================
    // FOTO
    // =========================

    cardFoto: {
        width: "48.6%",

        backgroundColor:
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.cardSecundario,

        borderRadius: 8,

        overflow: "hidden",
    },

    areaFoto: {
        width: "100%",
    },

    areaFotoPressionada: {
        opacity: 0.85,
    },

    foto: {
        width: "100%",

        aspectRatio: 1.05,

        resizeMode: "cover",
    },


    // =========================
    // AUTOR / CURTIDA
    // =========================

    rodapeFoto: {
        minHeight: 44,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 7,
        paddingVertical: 6,
    },

    autorArea: {
        flex: 1,

        minWidth: 0,

        flexDirection: "row",

        alignItems: "center",
    },

    avatarAutor: {
        width: 19,
        height: 19,

        borderRadius: 10,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        resizeMode: "cover",

        marginRight: 6,
    },

    autorTextoArea: {
        flex: 1,

        minWidth: 0,
    },

    autor: {
        color:
            tema.texto,

        fontSize: 7.5,

        fontFamily:
            fontes.negrito,
    },

    detalheAutor: {
        color:
            tema.textoSecundario,

        fontSize: 6,

        fontFamily:
            fontes.normal,

        marginTop: 1,
    },

    btnCurtida: {
        minHeight: 28,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: 3,

        paddingHorizontal: 5,

        borderRadius: 14,
    },

    btnCurtidaAtiva: {
        backgroundColor:
            tema.cardSecundario,
    },

    btnCurtidaPressed: {
        opacity: 0.6,

        transform:
            cores.btnPress,
    },

    coracao: {
        color:
            tema.textoSecundario,

        fontSize: 17,
        lineHeight: 19,

        fontFamily:
            fontes.normal,
    },

    coracaoAtivo: {
        color:
            tema.destaque,
    },

    txtCurtidas: {
        color:
            tema.textoSecundario,

        fontSize: 6.5,

        fontFamily:
            fontes.normal,
    },

    txtCurtidasAtivo: {
        color:
            tema.destaque,

        fontFamily:
            fontes.negrito,
    },


    // =========================
    // SEM RESULTADOS
    // =========================

    semResultados: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 35,
    },

    txtSemResultados: {
        color:
            tema.textoSecundario,

        fontSize: 12,

        fontFamily:
            fontes.normal,

        textAlign: "center",
    },


    // =========================
    // MODAL / PREVIEW
    // =========================

    modalOverlay: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 16,

        backgroundColor:
            "rgba(0, 0, 0, 0.82)",
    },

    modalCard: {
        width: "100%",
        maxWidth: 410,

        backgroundColor:
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        borderRadius: 14,

        overflow: "hidden",
    },

    modalTopo: {
        width: "100%",
        minHeight: 58,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    modalAutorArea: {
        flex: 1,

        flexDirection: "row",

        alignItems: "center",
    },

    modalAvatar: {
        width: 34,
        height: 34,

        borderRadius: 17,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        resizeMode: "cover",

        marginRight: 9,
    },

    modalAutor: {
        color:
            tema.texto,

        fontSize: 12,

        fontFamily:
            fontes.negrito,
    },

    modalDetalhe: {
        color:
            tema.textoSecundario,

        fontSize: 8,

        fontFamily:
            fontes.normal,

        marginTop: 2,
    },

    btnFecharModal: {
        width: 36,
        height: 36,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 18,
    },

    txtFecharModal: {
        color:
            tema.texto,

        fontSize: 28,
        lineHeight: 30,

        fontFamily:
            fontes.normal,
    },

    modalImagem: {
        width: "100%",

        aspectRatio: 1.25,

        resizeMode: "cover",

        backgroundColor:
            tema.cardSecundario,
    },

    modalAcoes: {
        width: "100%",

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    modalAcao: {
        minHeight: 38,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: 6,

        paddingHorizontal: 10,

        borderRadius: 18,
    },

    modalAcaoAtiva: {
        backgroundColor:
            tema.cardSecundario,
    },

    modalCoracao: {
        color:
            tema.texto,

        fontSize: 22,
        lineHeight: 24,

        fontFamily:
            fontes.normal,
    },

    modalCoracaoAtivo: {
        color:
            tema.destaque,
    },

    modalAcaoIcone: {
        width: 18,
        height: 18,

        resizeMode: "contain",
    },

    modalAcaoTexto: {
        color:
            tema.texto,

        fontSize: 10,

        fontFamily:
            fontes.normal,
    },

    modalAcaoTextoAtivo: {
        color:
            tema.destaque,

        fontFamily:
            fontes.negrito,
    },

    btnModalPressed: {
        backgroundColor:
            tema.cardSecundario,

        opacity: 0.8,
    },


    // =========================
    // PUBLICAR FOTO
    // =========================

    publicarOverlay: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 18,

        backgroundColor:
            "rgba(0, 0, 0, 0.82)",
    },

    publicarCard: {
        width: "100%",
        maxWidth: 410,

        backgroundColor:
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        borderRadius: 14,

        padding: 14,
    },

    publicarTitulo: {
        color:
            tema.destaque,

        fontSize: 18,

        fontFamily:
            fontes.extraNegrito,

        textAlign: "center",
    },

    publicarSubtitulo: {
        color:
            tema.textoSecundario,

        fontSize: 9,
        lineHeight: 13,

        fontFamily:
            fontes.normal,

        textAlign: "center",

        marginTop: 4,
        marginBottom: 12,
    },

    publicarImagem: {
        width: "100%",

        aspectRatio: 4 / 3,

        resizeMode: "cover",

        borderRadius: 10,

        backgroundColor:
            tema.cardSecundario,
    },

    publicarAcoes: {
        width: "100%",

        flexDirection: "row",

        gap: 10,

        marginTop: 14,
    },

    btnCancelarPublicacao: {
        flex: 1,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            tema.cardSecundario,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        borderRadius: 21,
    },

    txtCancelarPublicacao: {
        color:
            tema.destaque,

        fontSize:
            fontes.btn,

        fontFamily:
            fontes.negrito,
    },

    btnConfirmarPublicacao: {
        flex: 1,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            tema.destaque,

        borderRadius: 21,
    },

    txtConfirmarPublicacao: {
        color:
            tema.textoSobreDestaque,

        fontSize:
            fontes.btn,

        fontFamily:
            fontes.extraNegrito,
    },

    btnPublicacaoPressed: {
        opacity: 0.78,

        transform:
            cores.btnPress,
    },

});
