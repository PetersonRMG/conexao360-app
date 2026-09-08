import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

export const perfilStyles = StyleSheet.create({


    // =========================
    // ESTRUTURA
    // =========================

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
        backgroundColor: "rgba(0, 0, 0, 0.35)",
    },


    // =========================
    // SCROLL
    // =========================

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 15,

        // espaço para não ficar atrás do footer
        paddingBottom: 100,
    },


    // =========================
    // TOPO
    // =========================

    topo: {
        width: "100%",
        height: 80,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 10,
    },

    btnVoltar: {
        width: 45,
        height: 45,

        borderRadius: 23,

        
        borderColor: cores.douradoPrincipal,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.bgPreto80,
    },
    voltarImagem: {
        width: 45,
        height: 45,
    },

    btnVoltarPressed: {
        backgroundColor: cores.roxoPrincipal80,
        transform: cores.btnPress,
    },

    txtVoltar: {
        color: cores.branco,

        fontSize: 32,

        fontFamily: fontes.negrito,

        lineHeight: 35,
    },

    logo: {
        width: 55,
        height: 55,

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

        marginTop: 5,
        marginBottom: 25,
    },

    titulo: {
        color: cores.branco,

        fontSize: fontes.titulo,

        fontFamily: fontes.negrito,
    },

    tituloDourado: {
        color: cores.douradoPrincipal,
    },

    aviso: {
        color: cores.douradoPrincipal,

        fontSize: 10,

        fontFamily: fontes.normal,

        marginTop: 7,

        opacity: 0.8,
    },


    // =========================
    // CARD PERFIL
    // =========================

    cardPerfil: {
        width: "100%",

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 18,

        alignItems: "center",

        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 28,

        marginBottom: 18,
    },


    // =========================
    // AVATAR
    // =========================

    avatarContainer: {
        width: 120,
        height: 120,

        borderRadius: 60,

        overflow: "hidden",

        marginBottom: 10,

        borderWidth: 2,
        borderColor: cores.douradoPrincipal,
    },

    avatar: {
        width: "100%",
        height: "100%",

        resizeMode: "cover",
    },


    // =========================
    // DADOS DO PERFIL
    // =========================

    nome: {
        color: cores.douradoPrincipal,

        fontSize: 22,

        fontFamily: fontes.extraNegrito,

        marginBottom: 5,
    },

    descricao: {
        color: cores.branco,

        fontSize: 15,

        fontFamily: fontes.normal,

        textAlign: "center",

        marginBottom: 4,
    },


    // =========================
    // LOCAL / CONEXÕES
    // =========================

    informacoes: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: 35,
    },

    informacaoItem: {
        flexDirection: "row",
        alignItems: "center",

        gap: 8,
    },

    iconeInfo: {
        width: 22,
        height: 22,

        resizeMode: "contain",

        tintColor: cores.branco,

        opacity: 0.8,
    },

    txtInfo: {
        color: cores.branco,

        fontSize: 12,

        fontFamily: fontes.normal,

        opacity: 0.8,
    },


    // =========================
    // BOTÕES
    // =========================

    areaBotoes: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",

        marginTop: 35,

        gap: 20,
    },

    btnAcao: {
        flex: 1,

        height: 42,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.roxoPrincipal80,

        borderRadius: 20,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
    },

    btnAcaoPressed: {
        backgroundColor: cores.douradoPrincipalPressed,
        transform: cores.btnPress,
    },

    txtBtnAcao: {
        color: cores.branco,

        fontSize: fontes.btn,

        fontFamily: fontes.extraNegrito,
    },


    // =========================
    // CONQUISTAS
    // =========================

    cardConquistas: {
        width: "100%",

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 18,

        paddingHorizontal: 20,
        paddingVertical: 20,

        marginBottom: 20,
    },

    tituloConquistas: {
        color: cores.branco,

        fontSize: 21,

        fontFamily: fontes.extraNegrito,

        textAlign: "center",

        marginBottom: 25,
    },

    listaConquistas: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    conquista: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        gap: 8,
    },

    iconeConquista: {
        width: 23,
        height: 23,

        resizeMode: "contain",

        tintColor: cores.branco,

        opacity: 0.75,
    },

    txtConquista: {
        color: cores.branco,

        fontSize: 11,

        fontFamily: fontes.normal,

        textAlign: "center",

        opacity: 0.8,
    },

});