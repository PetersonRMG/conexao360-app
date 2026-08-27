import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

export const homeStyle = StyleSheet.create({

    // =========================
    // CONTAINER
    // =========================

    container: {
        backgroundColor: "#0A0909",
    },


    // =========================
    // HEADER
    // =========================

    header: {
        width: "100%",
        height: 80,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 18,
        

        backgroundColor: cores.bgPreto80,

        borderBottomWidth: 1,
        borderBottomColor: cores.douradoPrincipal,
    },

    perfil: {
        width: 42,
        height: 42,

        alignItems: "center",
        justifyContent: "center",
    },

    fotoPerfil: {
        width: 40,
        height: 40,

        borderRadius: 20,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        resizeMode: "cover",
    },

    logoContainer: {
       
        alignItems: "center",
        justifyContent: "center",

        gap: 8,
    },

    logo: {
        width: 50,
        height: 50,

        resizeMode: "contain",
    },

    nomeProjeto: {
        color: cores.douradoPrincipal,

        fontSize: fontes.subtitulo,
        fontFamily: fontes.negrito,
    },

    btnMenu: {
        width: 42,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 8,
    },

    btnPressed: {
        backgroundColor: cores.roxoPrincipal80,
        transform: cores.btnPress,
    },

    iconeHeader: {
        width: 25,
        height: 25,

        resizeMode: "contain",

        tintColor: cores.douradoPrincipal,
    },


    // =========================
    // BUSCA
    // =========================

    areaBusca: {
        width: "100%",

        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 8,

        backgroundColor: "#080808",
    },

    inputBusca: {
        width: "100%",
        height: 40,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 14,

        backgroundColor: cores.bgPreto80,

        borderRadius: 20,

        borderWidth: 1,
        borderColor: cores.roxoPrincipal80,
    },

    iconeBusca: {
        width: 18,
        height: 18,

        marginRight: 10,

        resizeMode: "contain",

        opacity: 0.7,
    },

    txtBusca: {
        flex: 1,

        height: "100%",

        paddingVertical: 0,

        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.normal,
    },


    // =========================
    // FILTROS
    // =========================

    filtros: {
        width: "100%",
        height: 45,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 18,

        backgroundColor: "#080808",

        borderBottomWidth: 1,
        borderBottomColor: cores.bgPreto80,
    },

    filtro: {
        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 5,
    },

    filtroAtivo: {
        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 5,

        borderBottomWidth: 2,
        borderBottomColor: cores.douradoPrincipal,
    },

    txtFiltro: {
        color: cores.branco,

        fontSize: 11,
        fontFamily: fontes.normal,

        opacity: 0.7,
    },

    txtFiltroAtivo: {
        color: cores.douradoPrincipal,

        fontSize: 11,
        fontFamily: fontes.negrito,
    },


    // =========================
    // SCROLL
    // =========================

    scroll: {
        flex: 1,

        width: "100%",
    },

    scrollConteudo: {
        paddingHorizontal: 18,

        // espaço para o menu inferior
        paddingBottom: 100,
    },


    // =========================
    // BANNER
    // =========================

    bannerContainer: {
        width: "100%",
        height: 180,

        marginTop: 15,

        borderRadius: 12,

        overflow: "hidden",

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
    },

    banner: {
        width: "100%",
        height: "100%",

        resizeMode: "cover",
    },

    indicadores: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 5,

        marginTop: 8,
    },

    indicador: {
        width: 5,
        height: 5,

        borderRadius: 5,

        backgroundColor: cores.branco,

        opacity: 0.4,
    },

    indicadorAtivo: {
        width: 7,
        height: 7,

        borderRadius: 7,

        backgroundColor: cores.douradoPrincipal,
    },


    // =========================
    // PUBLICAÇÕES
    // =========================

    tituloSecao: {
        color: cores.douradoPrincipal,

        fontSize: fontes.subtitulo,
        fontFamily: fontes.negrito,

        marginTop: 15,
        marginBottom: 10,
    },

    cardPublicacao: {
        width: "100%",

        backgroundColor: cores.bgPreto80,

        borderWidth: 1,
        borderColor: cores.roxoPrincipal80,

        borderRadius: 10,

        padding: 12,

        marginBottom: 15,
    },


    // =========================
    // CABEÇALHO PUBLICAÇÃO
    // =========================

    publicacaoHeader: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        marginBottom: 10,
    },

    avatarPublicacao: {
        width: 36,
        height: 36,

        borderRadius: 18,

        marginRight: 10,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        resizeMode: "cover",
    },

    autorContainer: {
        flex: 1,
    },

    nomeAutor: {
        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.negrito,
    },

    tempoPublicacao: {
        color: cores.branco,

        fontSize: 10,
        fontFamily: fontes.normal,

        opacity: 0.5,

        marginTop: 2,
    },


    // =========================
    // TEXTO PUBLICAÇÃO
    // =========================

    textoPublicacao: {
        color: cores.branco,

        fontSize: 13,
        fontFamily: fontes.normal,

        lineHeight: 19,

        opacity: 0.9,

        marginBottom: 12,
    },


    // =========================
    // IMAGEM PUBLICAÇÃO
    // =========================

    imagemPublicacao: {
        width: "100%",
        height: 190,

        borderRadius: 8,

        resizeMode: "cover",

        marginBottom: 12,
    },


    // =========================
    // AÇÕES DA PUBLICAÇÃO
    // =========================

    acoesPublicacao: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderTopWidth: 1,
        borderTopColor: cores.roxoPrincipal80,

        paddingTop: 10,
    },

    acao: {
        flexDirection: "row",
        alignItems: "center",

        gap: 5,
    },

    iconeAcao: {
        width: 16,
        height: 16,

        resizeMode: "contain",

        opacity: 0.7,
    },

    txtAcao: {
        color: cores.branco,

        fontSize: 10,
        fontFamily: fontes.normal,

        opacity: 0.65,
    },


    // =========================
    // MENU INFERIOR
    // =========================

    menuInferior: {
        width: "100%",
        height: 70,

        position: "absolute",
        bottom: 0,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

        paddingHorizontal: 5,

        backgroundColor: "#080808",

        borderTopWidth: 1,
        borderTopColor: cores.roxoPrincipal80,
    },

    itemMenu: {
        flex: 1,

        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        gap: 3,
    },

    iconeMenu: {
        width: 22,
        height: 22,

        resizeMode: "contain",

        opacity: 0.65,
    },

    iconeMenuAtivo: {
        opacity: 1,

        tintColor: cores.douradoPrincipal,
    },

    txtMenu: {
        color: cores.branco,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.6,
    },

    txtMenuAtivo: {
        color: cores.douradoPrincipal,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },


    // =========================
    // BOTÃO PUBLICAR
    // =========================

    btnPublicar: {
        width: 42,
        height: 42,

        borderRadius: 21,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: cores.douradoPrincipal,

        marginTop: -18,

        borderWidth: 3,
        borderColor: "#080808",
    },

    maisPublicar: {
        color: cores.roxoPrincipal,

        fontSize: 28,
        fontFamily: fontes.negrito,

        lineHeight: 30,
    },

});