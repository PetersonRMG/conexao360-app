import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";


export const galeriaStyles = StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor:
            cores.pretoPrincipal,
    },

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 16,

        paddingTop: 20,
        paddingBottom: 100,
    },


    // =========================
    // CABEÇALHO
    // =========================

    cabecalho: {
        width: "100%",

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
    },

    galeriaTxt: {
        fontSize: 15,

        color: cores.branco,

        fontFamily:
            fontes.normal,

        opacity: 0.55,
    },

    titulo: {
        fontSize: 20,

        color:
            cores.douradoPrincipal,

        fontFamily:
            fontes.negrito,

        marginBottom: 3,
    },


    // =========================
    // BOTÃO GALERIA
    // =========================

    btnGaleria: {
        minWidth: 130,
        height: 34,

        backgroundColor:
            cores.roxoPrincipal,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",

        flexDirection: "row",

        gap: 6,

        paddingHorizontal: 10,
    },

    btnGaleriaPressed: {
        backgroundColor:
            cores.roxoPrincipal80,

        transform:
            cores.btnPress,
    },

    btnImg: {
        width: 20,
        height: 20,

        resizeMode: "contain",
    },

    btnTxt: {
        color:
            cores.douradoPrincipal,

        fontSize: 12,

        fontFamily:
            fontes.negrito,
    },


    // =========================
    // PESQUISA
    // =========================

    cxPesquisa: {
        width: "100%",
        height: 42,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor:
            cores.pretoPrincipal,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        borderRadius: 20,

        paddingHorizontal: 12,

        marginTop: 20,
    },

    imgPesquisa: {
        width: 20,
        height: 20,

        marginRight: 8,

        resizeMode: "contain",

        opacity: 0.7,
    },

    inputPesquisa: {
        flex: 1,

        height: "100%",

        color:
            cores.branco,

        fontSize: 13,

        fontFamily:
            fontes.normal,

        paddingVertical: 0,
    },


    // =========================
    // MENU / ABAS
    // =========================

    cxMenu: {
        width: "100%",
        height: 48,

        flexDirection: "row",

        marginTop: 8,

        borderBottomWidth: 1,

        borderBottomColor:
            cores.roxoPrincipal80,
    },

    itemMenu: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
    },

    itemMenuAtivo: {
        borderBottomWidth: 2,

        borderBottomColor:
            cores.douradoPrincipal,
    },

    txtMenu: {
        fontSize: 11,

        color:
            cores.branco,

        fontFamily:
            fontes.negrito,

        opacity: 0.65,

        textAlign: "center",
    },

    txtMenuAtivo: {
        color:
            cores.douradoPrincipal,

        opacity: 1,
    },


    // =========================
    // EVENTOS
    // =========================

    cxEventos: {
        width: "100%",

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 18,
    },

    btnEventos: {
        minWidth: 145,
        height: 34,

        backgroundColor:
            cores.roxoPrincipal,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 12,
    },

    txtEventos: {
        color:
            cores.branco,

        fontSize: 11,

        fontFamily:
            fontes.normal,
    },

    btnFiltro: {
        height: 34,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: 6,

        paddingHorizontal: 12,

        borderRadius: 8,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,
    },

    txtFiltro: {
        fontSize: 11,

        color:
            cores.branco,

        fontFamily:
            fontes.normal,
    },

    btnImgFiltro: {
        width: 15,
        height: 15,

        resizeMode: "contain",
    },

    btnPressed: {
        opacity: 0.75,

        transform:
            cores.btnPress,
    },


    // =========================
    // DESTAQUES
    // =========================

    cxDestaque: {
        width: "100%",

        marginTop: 28,
    },

    tituloDestaqueArea: {
        width: "100%",

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
    },

    desTitulo: {
        fontSize: 20,

        fontFamily:
            fontes.negrito,

        color:
            cores.douradoPrincipal,
    },

    deSubtitulo: {
        paddingVertical: 5,
        paddingLeft: 10,
    },

    txtDestaque: {
        color:
            cores.branco,

        fontSize: 11,

        fontFamily:
            fontes.normal,

        opacity: 0.8,
    },


    // =========================
    // CARROSSEL
    // =========================

    carrosselConteudo: {
        paddingVertical: 15,
        paddingRight: 8,
    },

    cardDestaque: {
        width: 105,
        height: 105,

        marginRight: 12,

        borderRadius: 8,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        backgroundColor:
            cores.pretoPrincipal,

        overflow: "hidden",
    },

    imgDestaque: {
        width: "100%",
        height: "100%",

        resizeMode: "cover",
    },


    // =========================
    // FOTOS RECENTES
    // =========================

    desTitulos: {
        fontSize: 20,

        fontFamily:
            fontes.negrito,

        color:
            cores.douradoPrincipal,

        marginTop: 12,
        marginBottom: 10,
    },

    gradeFotos: {
        width: "100%",

        flexDirection: "row",
        flexWrap: "wrap",

        justifyContent:
            "space-between",

        rowGap: 8,
    },

    cardFoto: {
        width: "32%",

        aspectRatio: 1,

        borderRadius: 7,

        overflow: "hidden",
    },

    postImg: {
        width: "100%",
        height: "100%",

        resizeMode: "cover",
    },


    // =========================
    // SEM RESULTADOS
    // =========================

    semResultados: {
        width: "100%",

        paddingVertical: 35,

        alignItems: "center",
        justifyContent: "center",
    },

    txtSemResultados: {
        color:
            cores.branco,

        fontSize: 12,

        fontFamily:
            fontes.normal,

        opacity: 0.6,
    },

});