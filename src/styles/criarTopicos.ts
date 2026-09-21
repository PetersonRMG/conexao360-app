import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";


import { CoresTema } from "./temas";
export const criarTopicosStyle = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor: tema.fundo,
    },

    background: {
        flex: 1,

        width: "100%",
        height: "100%",
    },

    overlay: {
        flex: 1,

        backgroundColor: tema.overlay,
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

    },

    btnVoltarPressed: {
        backgroundColor: tema.cardSecundario,

        transform:
            cores.btnPress,
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
        color: tema.texto,

        fontSize: fontes.titulo,

        fontFamily:
            fontes.negrito,
    },

    tituloDourado: {
        color:
            cores.douradoPrincipal,
    },

    aviso: {
        color:
            cores.douradoPrincipal,

        fontSize: 10,

        fontFamily:
            fontes.normal,

        marginTop: 4,

        opacity: 0.8,
    },


    // =========================
    // CARDS
    // =========================

    card: {
        width: "100%",

        backgroundColor: tema.card,

        borderRadius: 12,

        padding: 12,

        marginBottom: 10,
    },

    label: {
        color: tema.texto,

        fontSize: 16,

        fontFamily:
            fontes.negrito,

        marginBottom: 8,
    },


    // =========================
    // INPUTS
    // =========================

    input: {
        width: "100%",
        height: 44,

        color: tema.texto,

        fontSize: 13,

        fontFamily:
            fontes.normal,

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        borderRadius: 10,

        paddingHorizontal: 12,
        paddingVertical: 0,
    },

    inputDescricao: {
        width: "100%",

        minHeight: 70,

        color: tema.texto,

        fontSize: 13,

        fontFamily:
            fontes.normal,

        backgroundColor: tema.cardSecundario,

        borderRadius: 10,

        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    contador: {
        alignSelf: "flex-end",

        color: tema.texto,

        fontSize: 9,

        fontFamily:
            fontes.normal,

        opacity: 0.5,

        marginTop: 4,
    },


    // =========================
    // SELETOR DE ÍCONE
    // =========================

    seletor: {
        width: "100%",
        height: 48,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,
        borderColor:
            cores.douradoPrincipal,

        borderRadius: 10,

        paddingHorizontal: 12,
    },

    seletorPressed: {
        transform:
            cores.btnPress,
    },

    txtSeletor: {
        color: tema.texto,

        fontSize: 11,

        fontFamily:
            fontes.normal,

        opacity: 0.7,
    },

    iconeSeletor: {
        width: 22,
        height: 22,

        resizeMode: "contain",

        opacity: 0.8,
    },


    // =========================
    // OPÇÕES DE VOTAÇÃO
    // =========================

    areaOpcoes: {
        width: "100%",

        flexDirection: "row",
        flexWrap: "wrap",

        alignItems: "center",

        gap: 8,
    },

    opcao: {
        minWidth: 80,
        height: 27,

        paddingHorizontal: 12,

        backgroundColor: tema.cardSecundario,

        borderRadius: 15,

        alignItems: "center",
        justifyContent: "center",
    },

    txtOpcao: {
        color: tema.texto,

        fontSize: 10,

        fontFamily:
            fontes.normal,

        opacity: 0.8,
    },

    btnNovaOpcao: {
        height: 27,

        paddingHorizontal: 14,

        borderRadius: 15,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        alignItems: "center",
        justifyContent: "center",
    },

    txtNovaOpcao: {
        color:
            cores.douradoPrincipal,

        fontSize: 10,

        fontFamily:
            fontes.negrito,
    },


    // =========================
    // NOVA OPÇÃO
    // =========================

    areaNovaOpcao: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        gap: 8,

        marginTop: 12,
    },

    inputNovaOpcao: {
        flex: 1,

        height: 40,

        color: tema.texto,

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        borderRadius: 10,

        paddingHorizontal: 12,

        fontSize: 12,

        fontFamily:
            fontes.normal,
    },

    btnAdicionarOpcao: {
        height: 40,

        paddingHorizontal: 12,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            cores.douradoPrincipal,

        borderRadius: 10,
    },

    btnAdicionarOpcaoPressed: {
        backgroundColor:
            cores.douradoPrincipalPressed,

        transform:
            cores.btnPress,
    },

    txtAdicionarOpcao: {
        color: tema.textoSobreDestaque,

        fontSize: 10,

        fontFamily:
            fontes.negrito,
    },


    // =========================
    // BOTÕES
    // =========================

    areaBotoes: {
        width: "100%",

        flexDirection: "row",

        justifyContent:
            "space-between",

        gap: 20,

        marginTop: 6,
    },

    btnPublicar: {
        flex: 1,

        height: 45,

        backgroundColor:
            cores.douradoPrincipal,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnPublicarPressed: {
        backgroundColor:
            cores.douradoPrincipalPressed,

        transform:
            cores.btnPress,
    },

    txtPublicar: {
        color: tema.textoSobreDestaque,

        fontSize:
            fontes.btn,

        fontFamily:
            fontes.extraNegrito,
    },

    btnCancelar: {
        flex: 1,

        height: 45,

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,

        borderColor:
            cores.douradoPrincipal,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnCancelarPressed: {
        backgroundColor: tema.cardSecundario,

        transform:
            cores.btnPress,
    },

    txtCancelar: {
        color:
            cores.douradoPrincipal,

        fontSize:
            fontes.btn,

        fontFamily:
            fontes.extraNegrito,
    },

});