import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarHomeStyle = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // CONTAINER
    // =========================

    container: {
        backgroundColor: tema.fundo,
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

        backgroundColor: tema.header,

        borderBottomWidth: 1,
        borderBottomColor: tema.destaque,
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
        borderColor: tema.destaque,

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
        color: tema.destaque,

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
        backgroundColor: tema.cardSecundario,
        transform: cores.btnPress,
    },

    iconeHeader: {
        width: 25,
        height: 25,

        resizeMode: "contain",

        tintColor: tema.destaque,
    },


    // =========================
    // BUSCA
    // =========================

    areaBusca: {
        width: "100%",

        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 8,

        backgroundColor: tema.fundo,
    },

    inputBusca: {
        width: "100%",
        height: 40,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 14,

        backgroundColor: tema.input,

        borderRadius: 20,

        borderWidth: 1,
        borderColor: tema.cardSecundario,
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

        color: tema.texto,

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

        backgroundColor: tema.fundo,

        borderBottomWidth: 1,
        borderBottomColor: tema.card,
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
        borderBottomColor: tema.destaque,
    },

    txtFiltro: {
        color: tema.texto,

        fontSize: 11,
        fontFamily: fontes.normal,

        opacity: 0.7,
    },

    txtFiltroAtivo: {
        color: tema.destaque,

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
        borderColor: tema.destaque,
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

        backgroundColor: tema.textoSecundario,

        opacity: 0.4,
    },

    indicadorAtivo: {
        width: 7,
        height: 7,

        borderRadius: 7,

        backgroundColor: tema.destaque,
    },


    // =========================
    // PUBLICAÇÕES
    // =========================

    tituloSecao: {
        color: tema.destaque,

        fontSize: fontes.subtitulo,
        fontFamily: fontes.negrito,

        marginTop: 15,
        marginBottom: 10,
    },

    cardPublicacao: {
        width: "100%",

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.cardSecundario,

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
        borderColor: tema.destaque,

        resizeMode: "cover",
    },

    autorContainer: {
        flex: 1,
    },

    nomeAutor: {
        color: tema.texto,

        fontSize: 13,
        fontFamily: fontes.negrito,
    },

    tempoPublicacao: {
        color: tema.texto,

        fontSize: 10,
        fontFamily: fontes.normal,

        opacity: 0.5,

        marginTop: 2,
    },


    // =========================
    // TEXTO PUBLICAÇÃO
    // =========================

    textoPublicacao: {
        color: tema.texto,

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
        borderTopColor: tema.cardSecundario,

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
        color: tema.texto,

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

        backgroundColor: tema.footer,

        borderTopWidth: 1,
        borderTopColor: tema.cardSecundario,
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

        tintColor: tema.destaque,
    },

    txtMenu: {
        color: tema.texto,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.6,
    },

    txtMenuAtivo: {
        color: tema.destaque,

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

        backgroundColor: tema.destaque,

        marginTop: -18,

        borderWidth: 3,
        borderColor: tema.footer,
    },

    maisPublicar: {
        color: tema.textoSobreDestaque,

        fontSize: 28,
        fontFamily: fontes.negrito,

        lineHeight: 30,
    },


    // =========================
    // CONTADORES
    // =========================

    areaContadores: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",

        paddingVertical: 8,

        borderBottomWidth: 1,
        borderBottomColor: tema.cardSecundario,
    },

    txtContador: {
        color: tema.texto,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.6,
    },


    // =========================
    // AÇÃO ATIVA
    // =========================

    iconeAcaoAtivo: {
        tintColor: tema.destaque,
        opacity: 1,
    },

    txtAcaoAtivo: {
        color: tema.destaque,
        opacity: 1,

        fontFamily: fontes.negrito,
    },


    // =========================
    // COMENTÁRIO
    // =========================

    areaComentario: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        marginTop: 10,

        gap: 8,
    },

    inputComentario: {
        flex: 1,
        height: 40,

        backgroundColor: tema.input,

        color: tema.texto,

        borderRadius: 20,

        paddingHorizontal: 14,

        fontSize: 11,
        fontFamily: fontes.normal,
    },

    btnEnviarComentario: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 20,

        backgroundColor: tema.destaque,
    },

    iconeEnviarComentario: {
        width: 21,
        height: 21,

        resizeMode: "contain",
    },


    // =========================
    // SKELETON / PLACEHOLDER
    // =========================

    skeletonHeader: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        marginBottom: 10,
    },

    skeletonAvatar: {
        width: 36,
        height: 36,

        borderRadius: 18,

        marginRight: 10,

        backgroundColor:
            tema.cardSecundario,
    },

    skeletonAutor: {
        flex: 1,
    },

    skeletonLinha: {
        height: 11,

        borderRadius: 5,

        backgroundColor:
            tema.cardSecundario,
    },

    skeletonLinhaPequena: {
        height: 8,

        borderRadius: 4,

        backgroundColor:
            tema.cardSecundario,

        marginTop: 6,
    },

    skeletonNome: {
        width: "48%",
    },

    skeletonData: {
        width: "25%",
    },

    skeletonTexto1: {
        width: "95%",

        marginTop: 5,
    },

    skeletonTexto2: {
        width: "82%",

        marginTop: 7,
    },

    skeletonTexto3: {
        width: "57%",

        marginTop: 7,

        marginBottom: 12,
    },

    skeletonImagem: {
        width: "100%",
        height: 190,

        borderRadius: 8,

        backgroundColor:
            tema.cardSecundario,

        marginBottom: 12,
    },

    skeletonContadores: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",

        paddingVertical: 8,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.cardSecundario,
    },

    skeletonContadorCurto: {
        width: 65,
        height: 8,

        borderRadius: 4,

        backgroundColor:
            tema.cardSecundario,
    },

    skeletonContadorLongo: {
        width: 90,
        height: 8,

        borderRadius: 4,

        backgroundColor:
            tema.cardSecundario,
    },

    skeletonAcoes: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingTop: 10,
    },

    skeletonAcao: {
        width: "25%",
        height: 12,

        borderRadius: 5,

        backgroundColor:
            tema.cardSecundario,
    },


    // =========================
    // SEM PUBLICAÇÕES
    // =========================

    semPublicacoes: {
        color: tema.texto,

        fontSize: 13,
        fontFamily: fontes.normal,

        textAlign: "center",

        marginTop: 30,

        opacity: 0.6,
    },

});


// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarHomeStyle(coresTema) dentro do componente.
export const homeStyle =
    criarHomeStyle(
        temaEscuro
    );