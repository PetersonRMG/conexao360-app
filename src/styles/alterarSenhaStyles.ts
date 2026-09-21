import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

import { CoresTema } from "./temas";
export const criarAlterarSenhaStyles = (tema: CoresTema) => StyleSheet.create({

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
        flexGrow: 1,

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

        marginBottom: 45,
    },

    titulo: {
        color: tema.texto,

        fontSize: fontes.titulo,
        fontFamily: fontes.negrito,
    },

    tituloDourado: {
        color: cores.douradoPrincipal,
    },

    aviso: {
        color: cores.douradoPrincipal,

        fontSize: fontes.subtitulo,
        fontFamily: fontes.normal,

        marginTop: 5,

        opacity: 0.8,
    },


    // =========================
    // CARD
    // =========================

    card: {
        width: "100%",

        backgroundColor: tema.card,

        borderRadius: 14,

        paddingHorizontal: 12,
        paddingVertical: 12,
    },


    // =========================
    // CAMPOS
    // =========================

    campo: {
        width: "100%",
        minHeight: 65,

        flexDirection: "row",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: tema.linha,

        paddingHorizontal: 4,
        paddingVertical: 6,
    },

    iconeCampo: {
        width: 21,
        height: 21,

        resizeMode: "contain",

        marginRight: 10,
    },

    areaInput: {
        flex: 1,
    },

    label: {
        color: cores.douradoPrincipal,

        fontSize: 11,
        fontFamily: fontes.normal,

        marginBottom: 2,
    },

    input: {
        width: "100%",

        color: tema.texto,

        fontSize: 12,
        fontFamily: fontes.normal,

        paddingHorizontal: 0,
        paddingVertical: 2,
    },

    iconeOlho: {
        width: 20,
        height: 20,

        resizeMode: "contain",

        opacity: 0.8,
    },


    // =========================
    // INFORMAÇÃO
    // =========================

    cardInfo: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 10,

        paddingHorizontal: 10,
        paddingVertical: 10,

        marginTop: 12,
    },

    iconeInfo: {
        width: 32,
        height: 32,

        resizeMode: "contain",

        marginRight: 10,
    },

    areaInfo: {
        flex: 1,
    },

    tituloInfo: {
        color: tema.texto,

        fontSize: 10,
        fontFamily: fontes.negrito,

        marginBottom: 3,
    },

    txtInfo: {
        color: tema.texto,

        fontSize: 8,
        lineHeight: 12,

        fontFamily: fontes.normal,

        opacity: 0.8,
    },


    // =========================
    // BOTÕES
    // =========================

    areaBotoes: {
        width: "75%",

        alignSelf: "center",

        marginTop: 70,

        gap: 10,
    },

    btnSalvar: {
        width: "100%",
        height: 45,

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnSalvarPressed: {
        backgroundColor: tema.cardSecundario,
        transform: cores.btnPress,
    },

    txtSalvar: {
        color: cores.douradoPrincipal,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

    btnCancelar: {
        width: "100%",
        height: 45,

        backgroundColor: cores.douradoPrincipal,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnCancelarPressed: {
        backgroundColor: cores.douradoPrincipalPressed,
        transform: cores.btnPress,
    },

    txtCancelar: {
        color: tema.textoSobreDestaque,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

});