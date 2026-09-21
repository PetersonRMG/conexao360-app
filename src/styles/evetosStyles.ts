import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema } from "./temas";


export const criarEventosStyles = (
    tema: CoresTema
) => StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,
        backgroundColor: tema.fundo,
    },

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 110,
    },


    // =========================
    // BUSCA
    // =========================

    areaBusca: {
        width: "100%",

        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 4,

        backgroundColor: tema.fundo,
    },

    inputBuscaContainer: {
        width: "100%",
        height: 40,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: tema.cardSecundario,

        borderRadius: 20,

        paddingHorizontal: 13,
    },

    iconeBusca: {
        width: 18,
        height: 18,

        resizeMode: "contain",

        marginRight: 9,

        opacity: 0.65,
    },

    inputBusca: {
        flex: 1,

        height: "100%",

        color: tema.texto,

        fontSize: 12,
        fontFamily: fontes.normal,

        paddingVertical: 0,
    },


    // =========================
    // FILTROS
    // =========================

    filtros: {
        width: "100%",
        height: 48,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 12,

        backgroundColor: tema.fundo,

        borderBottomWidth: 1,
        borderBottomColor: tema.cardSecundario,
    },

    filtro: {
        flex: 1,
        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 3,
    },

    filtroAtivo: {
        borderBottomWidth: 2,
        borderBottomColor: tema.destaque,
    },

    txtFiltro: {
        color: tema.textoSecundario,

        fontSize: 9,
        fontFamily: fontes.normal,

        textAlign: "center",

        opacity: 0.8,
    },

    txtFiltroAtivo: {
        color: tema.destaque,

        fontFamily: fontes.negrito,

        opacity: 1,
    },


    // =========================
    // SEÇÕES
    // =========================

    cabecalhoSecao: {
        width: "100%",

        marginTop: 4,
    },

    tituloSecao: {
        color: tema.destaque,

        fontSize: 18,
        fontFamily: fontes.negrito,

        marginTop: 16,
        marginBottom: 7,
    },

    subtituloSecao: {
        color: tema.textoSecundario,

        fontSize: 10,
        fontFamily: fontes.normal,

        marginTop: -3,
        marginBottom: 8,
    },


    // =========================
    // EVENTO PRINCIPAL
    // =========================

    hero: {
        width: "100%",
        height: 330,

        borderRadius: 15,

        overflow: "hidden",

        borderWidth: 1,
        borderColor: tema.borda,

        backgroundColor: tema.card,
    },

    heroImagem: {
        width: "100%",
        height: "100%",
    },

    heroImagemInterna: {
        borderRadius: 15,
    },

    heroOverlay: {
        flex: 1,

        justifyContent: "space-between",

        backgroundColor: "rgba(0,0,0,0.58)",

        padding: 14,
    },

    statusEvento: {
        alignSelf: "flex-start",

        minHeight: 25,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 10,

        borderRadius: 13,

        backgroundColor: "rgba(0,214,107,0.16)",

        borderWidth: 1,
        borderColor: cores.verdeOnline,
    },

    txtStatusEvento: {
        color: cores.verdeOnline,

        fontSize: 8,
        fontFamily: fontes.negrito,
    },

    heroConteudo: {
        width: "100%",
    },

    heroTitulo: {
        color: cores.branco,

        fontSize: 26,
        lineHeight: 30,

        fontFamily: fontes.extraNegrito,

        marginBottom: 7,
    },

    heroDescricao: {
        color: cores.branco,

        fontSize: 11,
        lineHeight: 15,

        fontFamily: fontes.normal,

        opacity: 0.88,

        marginBottom: 12,
    },

    heroInfos: {
        width: "100%",

        gap: 7,

        marginBottom: 13,
    },

    infoLinha: {
        flexDirection: "row",
        alignItems: "center",

        minHeight: 20,
    },

    infoIcone: {
        width: 17,
        height: 17,

        resizeMode: "contain",

        marginRight: 7,

        tintColor: cores.douradoPrincipal,
    },

    infoTexto: {
        color: cores.branco,

        fontSize: 10,
        fontFamily: fontes.normal,
    },

    infoSeparador: {
        color: cores.douradoPrincipal,

        marginHorizontal: 7,
    },

    btnPrincipal: {
        width: "100%",
        height: 43,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 22,

        backgroundColor: tema.destaque,
    },

    btnPrincipalPressed: {
        opacity: 0.82,

        transform: cores.btnPress,
    },

    txtBtnPrincipal: {
        color: cores.pretoPrincipal,

        fontSize: 13,
        fontFamily: fontes.extraNegrito,
    },


    // =========================
    // PROGRAMAÇÃO
    // =========================

    cardProgramacao: {
        width: "100%",

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.borda,

        borderRadius: 13,

        paddingHorizontal: 12,
        paddingVertical: 4,
    },

    programacaoItem: {
        minHeight: 67,

        flexDirection: "row",
        alignItems: "center",

        paddingVertical: 10,
    },

    programacaoItemBorda: {
        borderBottomWidth: 1,
        borderBottomColor: tema.cardSecundario,
    },

    horarioArea: {
        width: 66,

        alignItems: "flex-start",
    },

    horario: {
        color: tema.destaque,

        fontSize: 13,
        fontFamily: fontes.negrito,

        marginBottom: 5,
    },

    pontoTimeline: {
        width: 7,
        height: 7,

        borderRadius: 4,

        backgroundColor: tema.destaque,
    },

    programacaoConteudo: {
        flex: 1,
    },

    programacaoTitulo: {
        color: tema.texto,

        fontSize: 12,
        fontFamily: fontes.negrito,

        marginBottom: 4,
    },

    programacaoLocal: {
        color: tema.textoSecundario,

        fontSize: 9,
        fontFamily: fontes.normal,
    },


    // =========================
    // PALESTRANTES
    // =========================

    palestrantes: {
        gap: 10,

        paddingVertical: 4,
        paddingRight: 8,
    },

    palestrante: {
        width: 110,
        minHeight: 145,

        alignItems: "center",

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.cardSecundario,

        borderRadius: 12,

        paddingHorizontal: 9,
        paddingVertical: 12,
    },

    palestranteAvatar: {
        width: 62,
        height: 62,

        borderRadius: 31,

        borderWidth: 1,
        borderColor: tema.destaque,

        resizeMode: "cover",

        marginBottom: 8,
    },

    palestranteNome: {
        color: tema.texto,

        fontSize: 10,
        lineHeight: 13,

        textAlign: "center",

        fontFamily: fontes.negrito,
    },

    palestranteCargo: {
        color: tema.textoSecundario,

        fontSize: 8,

        textAlign: "center",

        fontFamily: fontes.normal,

        marginTop: 3,
    },


    // =========================
    // OUTROS EVENTOS
    // =========================

    cardEvento: {
        width: "100%",
        minHeight: 96,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.cardSecundario,

        borderRadius: 12,

        padding: 10,

        marginBottom: 9,
    },

    cardEventoPressed: {
        opacity: 0.8,
    },

    dataEvento: {
        width: 58,
        height: 66,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 10,

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,
        borderColor: tema.destaque,

        marginRight: 10,
    },

    txtDataEvento: {
        color: tema.destaque,

        fontSize: 13,
        lineHeight: 16,

        textAlign: "center",

        fontFamily: fontes.extraNegrito,
    },

    eventoConteudo: {
        flex: 1,
    },

    eventoTitulo: {
        color: tema.texto,

        fontSize: 12,
        fontFamily: fontes.negrito,

        marginBottom: 4,
    },

    eventoDescricao: {
        color: tema.textoSecundario,

        fontSize: 9,
        lineHeight: 12,

        fontFamily: fontes.normal,

        marginBottom: 5,
    },

    eventoMeta: {
        color: tema.destaque,

        fontSize: 8,
        fontFamily: fontes.normal,
    },

    semEventos: {
        color: tema.textoSecundario,

        fontSize: 11,
        fontFamily: fontes.normal,

        textAlign: "center",

        paddingVertical: 30,
    },

});
