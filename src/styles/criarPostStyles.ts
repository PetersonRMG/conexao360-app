import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

export const criarPostStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#080808",
    },

    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    keyboard: {
        flex: 1,
    },

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 16,
        paddingBottom: 110,
    },


    // =========================
    // TOPO
    // =========================

    topo: {
        width: "100%",
        height: 75,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 8,
    },

    btnVoltar: {
        width: 45,
        height: 45,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 23,

        backgroundColor: cores.bgPreto80,
    },

    btnVoltarPressed: {
        backgroundColor: cores.roxoPrincipal80,
        transform: cores.btnPress,
    },

    voltarImagem: {
        width: 45,
        height: 45,

        resizeMode: "contain",
    },

    logo: {
        width: 52,
        height: 52,

        resizeMode: "contain",
    },

    espacoTopo: {
        width: 45,
        height: 45,
    },


    // =========================
    // APRESENTAÇÃO
    // =========================

    apresentacao: {
        width: "100%",

        alignItems: "center",

        marginBottom: 18,
    },

    tituloPagina: {
        color: cores.branco,

        fontSize: 28,
        fontFamily: fontes.negrito,
    },

    tituloDourado: {
        color: cores.douradoPrincipal,
    },

    aviso: {
        color: cores.douradoPrincipal,

        fontSize: 10,
        fontFamily: fontes.normal,

        marginTop: 4,

        opacity: 0.8,
    },


    // =========================
    // CARDS
    // =========================

    card: {
        width: "100%",

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 12,

        padding: 12,

        marginBottom: 10,
    },

    label: {
        color: cores.branco,

        fontSize: 16,
        fontFamily: fontes.negrito,

        marginBottom: 8,
    },


    // =========================
    // INPUT
    // =========================

    input: {
        width: "100%",
        height: 44,

        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.normal,

        backgroundColor: cores.roxoPrincipal80,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 10,

        paddingHorizontal: 12,
        paddingVertical: 0,
    },

    inputDescricao: {
        width: "100%",
        minHeight: 70,

        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.normal,

        backgroundColor: cores.roxoPrincipal80,

        borderRadius: 10,

        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    contador: {
        alignSelf: "flex-end",

        color: cores.branco,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.5,

        marginTop: 4,
    },


    // =========================
    // IMAGEM
    // =========================

    areaImagem: {
        width: "100%",
        height: 125,

        backgroundColor: cores.roxoPrincipal80,

        borderRadius: 12,

        alignItems: "center",
        justifyContent: "center",
    },

    areaImagemPressed: {
        transform: cores.btnPress,
    },

    iconeImagem: {
        width: 38,
        height: 38,

        resizeMode: "contain",

        marginBottom: 8,
    },

    txtImagem: {
        color: cores.branco,

        fontSize: 10,
        fontFamily: fontes.normal,

        opacity: 0.7,
    },


    // =========================
    // TAGS
    // =========================

    areaTags: {
        width: "100%",

        flexDirection: "row",
        flexWrap: "wrap",

        alignItems: "center",

        gap: 8,
    },

    tag: {
        minWidth: 80,
        height: 27,

        paddingHorizontal: 12,

        backgroundColor: cores.roxoPrincipal80,

        borderRadius: 15,

        alignItems: "center",
        justifyContent: "center",
    },

    txtTag: {
        color: cores.branco,

        fontSize: 10,
        fontFamily: fontes.normal,

        opacity: 0.7,
    },

    btnNovaTag: {
        height: 27,

        paddingHorizontal: 14,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 15,

        alignItems: "center",
        justifyContent: "center",
    },

    txtNovaTag: {
        color: cores.douradoPrincipal,

        fontSize: 10,
        fontFamily: fontes.negrito,
    },


    // =========================
    // BOTÕES
    // =========================

    areaBotoes: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",

        gap: 20,

        marginTop: 6,
    },

    btnPublicar: {
        flex: 1,
        height: 45,

        backgroundColor: cores.douradoPrincipal,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnPublicarPressed: {
        backgroundColor: cores.douradoPrincipalPressed,
        transform: cores.btnPress,
    },

    txtPublicar: {
        color: cores.roxoPrincipal,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

    btnCancelar: {
        flex: 1,
        height: 45,

        backgroundColor: cores.bgPreto80,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnCancelarPressed: {
        backgroundColor: cores.roxoPrincipal80,
        transform: cores.btnPress,
    },

    txtCancelar: {
        color: cores.douradoPrincipal,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

});