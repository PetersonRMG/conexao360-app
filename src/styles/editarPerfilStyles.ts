import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const editarPerfilStyles = StyleSheet.create({

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
    // TÍTULO PRINCIPAL
    // =========================

    apresentacao: {
        width: "100%",

        alignItems: "center",

        marginTop: 2,
        marginBottom: 12,
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

        marginTop: 4,

        opacity: 0.8,
    },


    // =========================
    // AVATAR
    // =========================

    areaAvatar: {
        width: "100%",

        alignItems: "center",

        marginBottom: 18,
    },

    avatarContainer: {
        width: 92,
        height: 92,

        position: "relative",
    },

    avatar: {
        width: 92,
        height: 92,

        borderRadius: 46,

        resizeMode: "cover",

        borderWidth: 2,
        borderColor: cores.douradoPrincipal,
    },

    btnEditarFoto: {
        width: 30,
        height: 30,

        position: "absolute",

        right: -2,
        bottom: 0,

        borderRadius: 15,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.douradoPrincipal,

        borderWidth: 2,
        borderColor: cores.roxoPrincipal,
    },

    iconeEditarFoto: {
        width: 15,
        height: 15,

        resizeMode: "contain",
    },


    // =========================
    // TÍTULO DAS SEÇÕES
    // =========================

    tituloGrupo: {
        width: "100%",

        color: cores.branco,

        fontSize: 15,
        fontFamily: fontes.negrito,

        marginTop: 6,
        marginBottom: 8,
    },


    // =========================
    // CARD INDIVIDUAL DE INPUT
    // =========================

    cardCampo: {
        width: "100%",

        minHeight: 68,

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 8,

        marginBottom: 8,
    },

    campoTopo: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    label: {
        color: cores.branco,

        fontSize: 16,
        fontFamily: fontes.negrito,
    },


    // =========================
    // PRIVACIDADE
    // =========================

    status: {
        minWidth: 72,

        height: 20,

        paddingHorizontal: 10,

        borderRadius: 12,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.roxoPrincipal80,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
    },

    txtStatus: {
        color: cores.branco,

        fontSize: 8,
        fontFamily: fontes.normal,

        opacity: 0.8,
    },


    // =========================
    // INPUT
    // =========================

    input: {
        width: "100%",

        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.normal,

        opacity: 0.65,

        paddingHorizontal: 0,
        paddingVertical: 4,

        marginTop: 2,
    },


    // =========================
    // DESCRIÇÃO
    // =========================

    cardDescricao: {
        width: "100%",

        minHeight: 120,

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 10,

        marginBottom: 12,
    },

    inputDescricao: {
        width: "100%",
        minHeight: 75,

        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.normal,

        opacity: 0.7,

        paddingHorizontal: 0,
        paddingTop: 8,
    },


    // =========================
    // SEGURANÇA
    // =========================

    cardSeguranca: {
        width: "100%",

        minHeight: 68,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: cores.roxoPrincipal,

        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 10,

        marginBottom: 8,
    },

    txtDadoSeguranca: {
        color: cores.branco,

        fontSize: 12,
        fontFamily: fontes.normal,

        opacity: 0.6,

        marginTop: 4,
    },

    verificado: {
        color: cores.douradoPrincipal,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },


    // =========================
    // ALTERAR SENHA
    // =========================

    alterarSenha: {
        flexDirection: "row",
        alignItems: "center",

        gap: 5,
    },

    iconeSenha: {
        width: 14,
        height: 14,

        resizeMode: "contain",
    },

    txtAlterarSenha: {
        color: cores.douradoPrincipal,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },

});