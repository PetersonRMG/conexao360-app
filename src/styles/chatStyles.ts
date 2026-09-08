import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const chatStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#0A0909",
    },


    // =========================
    // HEADER
    // =========================

    header: {
        backgroundColor: "#0A0909",

        borderBottomWidth: 1,
        borderBottomColor: cores.roxoPrincipal80,

        paddingHorizontal: 16,
        paddingTop: 12,
    },

    headerTopo: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    avatarUsuario: {
        width: 42,
        height: 42,

        borderRadius: 21,

        resizeMode: "cover",

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
    },

    logoArea: {
        flexDirection: "row",
        alignItems: "center",

        gap: 8,
    },

    logo: {
        width: 38,
        height: 38,

        resizeMode: "contain",
    },

    logoTexto: {
        color: cores.douradoPrincipal,

        fontSize: 16,
        fontFamily: fontes.negrito,
    },

    btnHeader: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",
    },

    iconeHeader: {
        width: 28,
        height: 28,

        resizeMode: "contain",
    },


    // =========================
    // TÍTULO
    // =========================

    tituloArea: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 10,
        marginBottom: 10,
    },

    titulo: {
        color: cores.douradoPrincipal,

        fontSize: 22,
        fontFamily: fontes.negrito,
    },

    btnNovoChat: {
        width: 34,
        height: 34,

        borderWidth: 2,
        borderColor: cores.douradoPrincipal,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
    },

    btnNovoChatPressed: {
        backgroundColor: cores.roxoPrincipal80,
        transform: cores.btnPress,
    },

    iconeAdicionar: {
        width: 22,
        height: 22,

        resizeMode: "contain",
    },


    // =========================
    // BUSCA
    // =========================

    areaBusca: {
        width: "100%",

        backgroundColor: cores.roxoPrincipal,

        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    inputBuscaContainer: {
        width: "100%",
        height: 38,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: cores.roxoPrincipal80,

        borderRadius: 20,

        paddingHorizontal: 12,
    },

    iconeBusca: {
        width: 20,
        height: 20,

        resizeMode: "contain",

        marginRight: 8,

        opacity: 0.6,
    },

    inputBusca: {
        flex: 1,
        height: "100%",

        color: cores.branco,

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

        backgroundColor: "#0A0909",

        borderBottomWidth: 1,
        borderBottomColor: cores.roxoPrincipal80,

        paddingHorizontal: 16,
    },

    filtro: {
        flex: 1,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "center",

        gap: 4,
    },

    filtroAtivo: {
        borderBottomWidth: 2,
        borderBottomColor: cores.douradoPrincipal,
    },

    txtFiltro: {
        color: cores.branco,

        fontSize: 10,
        fontFamily: fontes.normal,

        opacity: 0.65,
    },

    txtFiltroAtivo: {
        color: cores.douradoPrincipal,
        opacity: 1,
    },

    badgeFiltro: {
        width: 16,
        height: 16,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#A500CC",
    },

    txtBadgeFiltro: {
        color: cores.branco,

        fontSize: 8,
        fontFamily: fontes.negrito,
    },


    // =========================
    // SCROLL
    // =========================

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingBottom: 90,
    },


    // =========================
    // CONVERSA
    // =========================

    conversa: {
        width: "100%",
        minHeight: 80,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 16,
        paddingVertical: 10,

        borderBottomWidth: 1,
        borderBottomColor: "#292323",
    },

    conversaPressed: {
        backgroundColor: cores.roxoPrincipal80,
    },

    avatarConversaContainer: {
        width: 47,
        height: 47,

        borderRadius: 24,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.douradoPrincipal,

        marginRight: 12,
    },

    avatarConversa: {
        width: 32,
        height: 32,

        resizeMode: "contain",
    },

    conversaConteudo: {
        flex: 1,

        paddingRight: 10,
    },

    nome: {
        color: cores.douradoPrincipal,

        fontSize: 15,
        fontFamily: fontes.negrito,

        marginBottom: 3,
    },

    mensagem: {
        color: cores.branco,

        fontSize: 11,
        lineHeight: 15,

        fontFamily: fontes.normal,

        opacity: 0.85,
    },

    conversaMeta: {
        height: 55,

        alignItems: "flex-end",
        justifyContent: "space-between",
    },

    horario: {
        color: cores.branco,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.7,
    },

    badge: {
        width: 19,
        height: 19,

        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#A500CC",
    },

    txtBadge: {
        color: cores.branco,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },

});