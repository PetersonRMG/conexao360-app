import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const chatStyles = StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor: cores.pretoPrincipal,
    },


    // =========================
    // HEADER
    // =========================

    header: {
        width: "100%",

        backgroundColor: cores.bgPreto80,

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

        paddingHorizontal: 16,

        marginTop: 12,
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

        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 10,

        // removido o fundo roxo
        backgroundColor: cores.bgPreto80,
    },

    inputBuscaContainer: {
        width: "100%",
        height: 44,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: cores.bgPreto80,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 22,

        paddingHorizontal: 14,
    },

    iconeBusca: {
        width: 19,
        height: 19,

        resizeMode: "contain",

        marginRight: 10,

        opacity: 0.7,
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

        backgroundColor: cores.bgPreto80,

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


    // =========================
    // BADGE FILTRO
    // =========================

    badgeFiltro: {
        minWidth: 17,
        height: 17,

        paddingHorizontal: 4,

        borderRadius: 9,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.douradoPrincipal,
    },

    txtBadgeFiltro: {
        color: cores.roxoPrincipal,

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
        borderBottomColor: cores.roxoPrincipal80,
    },

    conversaPressed: {
        backgroundColor: cores.roxoPrincipal80,
    },


    // =========================
    // AVATAR CONVERSA
    // =========================

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


    // =========================
    // DADOS CONVERSA
    // =========================

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


    // =========================
    // META
    // =========================

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
        minWidth: 19,
        height: 19,

        paddingHorizontal: 5,

        borderRadius: 10,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.douradoPrincipal,
    },

    txtBadge: {
        color: cores.roxoPrincipal,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },


    // =========================
    // SEM RESULTADOS
    // =========================

    semResultados: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 40,
    },

    txtSemResultados: {
        color: cores.branco,

        fontSize: 12,
        fontFamily: fontes.normal,

        opacity: 0.6,
    },

});