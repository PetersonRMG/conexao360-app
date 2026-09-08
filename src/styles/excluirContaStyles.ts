import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const excluirContaStyles = StyleSheet.create({

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
        alignItems: "center",
        marginBottom: 22,
    },

    titulo: {
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
        marginTop: 5,
        textAlign: "center",
        opacity: 0.8,
    },


    // =========================
    // CARD
    // =========================

    card: {
        width: "100%",

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 14,

        paddingHorizontal: 16,
        paddingVertical: 16,

        marginBottom: 14,
    },

    cardTituloArea: {
        flexDirection: "row",
        alignItems: "center",

        columnGap: 12,

        marginBottom: 18,
    },

    iconeAviso: {
        width: 27,
        height: 27,
        resizeMode: "contain",
    },

    cardTitulo: {
        color: cores.branco,

        fontSize: 17,
        fontFamily: fontes.negrito,

        lineHeight: 20,
    },


    // =========================
    // AVISOS
    // =========================

    listaAvisos: {
        width: "100%",
        marginBottom: 16,
    },

    avisoItem: {
        flexDirection: "row",

        marginBottom: 11,

        paddingRight: 8,
    },

    bullet: {
        color: cores.douradoPrincipal,

        fontSize: 14,
        fontFamily: fontes.negrito,

        marginRight: 8,
    },

    txtAviso: {
        flex: 1,

        color: cores.branco,

        fontSize: 11,
        lineHeight: 16,

        fontFamily: fontes.normal,

        opacity: 0.8,
    },

    txtConfirmacao: {
        color: cores.branco,

        fontSize: 11,
        fontFamily: fontes.normal,

        marginBottom: 10,

        opacity: 0.85,
    },


    // =========================
    // SENHA
    // =========================

    inputContainer: {
        width: "100%",
        height: 48,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: cores.roxoPrincipal80,

        borderRadius: 10,

        paddingHorizontal: 10,
    },

    iconeInput: {
        width: 20,
        height: 20,

        resizeMode: "contain",

        marginRight: 8,
    },

    input: {
        flex: 1,
        height: "100%",

        color: cores.branco,

        fontSize: 12,
        fontFamily: fontes.normal,

        paddingVertical: 0,
    },

    iconeOlho: {
        width: 20,
        height: 20,

        resizeMode: "contain",

        opacity: 0.8,
    },

    esqueciSenha: {
        alignSelf: "flex-end",
        marginTop: 8,
    },

    txtEsqueciSenha: {
        color: cores.douradoPrincipal,

        fontSize: 9,
        fontFamily: fontes.normal,
    },


    // =========================
    // BOTÕES
    // =========================

    areaBotoes: {
        width: "100%",

        flexDirection: "row",

        gap: 16,

        marginTop: 4,
    },

    btnCancelar: {
        flex: 1,
        height: 45,

        backgroundColor: cores.douradoPrincipal,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
    },

    btnCancelarPressed: {
        backgroundColor: cores.douradoPrincipalPressed,
        transform: cores.btnPress,
    },

    txtCancelar: {
        color: cores.roxoPrincipal,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

    btnExcluir: {
        flex: 1,
        height: 45,

        backgroundColor: cores.bgPreto80,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
    },

    btnExcluirPressed: {
        backgroundColor: cores.roxoPrincipal80,
        transform: cores.btnPress,
    },

    txtExcluir: {
        color: cores.douradoPrincipal,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

});