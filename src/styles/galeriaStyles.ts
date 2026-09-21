import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";


export const criarGaleriaStyles = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor:
            tema.fundo,
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

        color: tema.texto,

        fontFamily:
            fontes.normal,

        opacity: 0.55,
    },

    titulo: {
        fontSize: 20,

        color:
            tema.destaque,

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
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",

        flexDirection: "row",

        gap: 6,

        paddingHorizontal: 10,
    },

    btnGaleriaPressed: {
        backgroundColor:
            tema.cardSecundario,

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
            tema.destaque,

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
            tema.input,

        borderWidth: 1,

        borderColor:
            tema.destaque,

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
            tema.texto,

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
            tema.cardSecundario,
    },

    itemMenu: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
    },

    itemMenuAtivo: {
        borderBottomWidth: 2,

        borderBottomColor:
            tema.destaque,
    },

    txtMenu: {
        fontSize: 11,

        color:
            tema.texto,

        fontFamily:
            fontes.negrito,

        opacity: 0.65,

        textAlign: "center",
    },

    txtMenuAtivo: {
        color:
            tema.destaque,

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
            tema.card,

        borderWidth: 1,

        borderColor:
            tema.destaque,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 12,
    },

    txtEventos: {
        color:
            tema.texto,

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
            tema.destaque,
    },

    txtFiltro: {
        fontSize: 11,

        color:
            tema.texto,

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
            tema.destaque,
    },

    deSubtitulo: {
        paddingVertical: 5,
        paddingLeft: 10,
    },

    txtDestaque: {
        color:
            tema.texto,

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
            tema.destaque,

        backgroundColor:
            tema.card,

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
            tema.destaque,

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
            tema.texto,

        fontSize: 12,

        fontFamily:
            fontes.normal,

        opacity: 0.6,
    },

});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarGaleriaStyles(coresTema) dentro do componente.
export const galeriaStyles = criarGaleriaStyles(temaEscuro);
