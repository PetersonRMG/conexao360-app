import {
    Platform,
    StyleSheet,
} from "react-native";

import {
    cores,
    fontes,
} from "./variaveis";

import {
    CoresTema,
    temaEscuro,
} from "./temas";


export const criarHeaderStyles = (
    tema: CoresTema
) => StyleSheet.create({

    // =========================
    // CONTAINER
    // =========================

    container: {
        backgroundColor:
            tema.header,
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

        backgroundColor:
            tema.header,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.destaque,
    },


    // Mantém a largura da esquerda igual à
    // área de ações da direita. Assim o logo
    // permanece realmente centralizado.

    ladoHeader: {
        width: 90,

        alignItems: "flex-start",
        justifyContent: "center",
    },

    perfil: {
        width: 42,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 21,
    },

    fotoPerfil: {
        width: 40,
        height: 40,

        borderRadius: 20,

        borderWidth: 1,
        borderColor:
            tema.destaque,

        resizeMode: "cover",
    },


    // =========================
    // LOGO
    // =========================

    logoContainer: {
        position: "absolute",

        left: "50%",
        top: 4,

        width: 130,

        alignItems: "center",
        justifyContent: "center",

        transform: [
            {
                translateX:
                    -65,
            },
        ],
    },

    logo: {
        width: 45,
        height: 45,

        resizeMode: "contain",
    },

    nomeProjeto: {
        color:
            tema.destaque,

        fontSize:
            fontes.subtitulo,

        fontFamily:
            fontes.negrito,

        marginTop: 1,
    },


    // =========================
    // AÇÕES DO HEADER
    // =========================

    acoesHeader: {
        width: 90,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "flex-end",

        gap: 4,

        marginLeft: "auto",
    },

    btnHeader: {
        position: "relative",

        width: 42,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 10,
    },

    btnPressed: {
        backgroundColor:
            tema.cardSecundario,

        transform:
            cores.btnPress,
    },

    textoPressed: {
        opacity: 0.65,
    },

    iconeHeader: {
        width: 25,
        height: 25,

        resizeMode: "contain",

        tintColor:
            tema.destaque,
    },


    // =========================
    // BADGE
    // =========================

    badgeNotificacao: {
        position: "absolute",

        top: 2,
        right: 1,

        minWidth: 17,
        height: 17,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            tema.erro,

        borderWidth: 1.5,
        borderColor:
            tema.header,

        borderRadius: 9,

        paddingHorizontal: 3,
    },

    badgeNotificacaoTexto: {
        color:
            "#FFFFFF",

        fontSize: 9,
        lineHeight: 11,

        fontFamily:
            fontes.negrito,
    },


    // =========================
    // OFFCANVAS
    // =========================

    offcanvasOverlay: {
        flex: 1,

        flexDirection: "row",
        justifyContent: "flex-end",

        backgroundColor:
            "transparent",
    },

    offcanvasBackdrop: {
        position: "absolute",

        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        backgroundColor:
            tema.overlay,
    },

    offcanvas: {
        height: "100%",

        backgroundColor:
            tema.fundo,

        borderLeftWidth: 1,
        borderLeftColor:
            tema.borda,

        ...Platform.select({
            ios: {
                shadowColor:
                    "#000",

                shadowOffset: {
                    width:
                        -5,

                    height:
                        0,
                },

                shadowOpacity:
                    0.28,

                shadowRadius:
                    16,
            },

            android: {
                elevation:
                    16,
            },

            web: {
                boxShadow:
                    "-10px 0 30px rgba(0,0,0,0.28)",
            },
        }),
    },

    offcanvasSafeArea: {
        flex: 1,
    },


    // =========================
    // CABEÇALHO DO OFFCANVAS
    // =========================

    offcanvasHeader: {
        minHeight: 70,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 18,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.linha,
    },

    offcanvasTituloArea: {
        flexDirection: "row",

        alignItems: "center",

        gap: 9,
    },

    offcanvasTitulo: {
        color:
            tema.texto,

        fontSize:
            fontes.secao,

        fontFamily:
            fontes.negrito,
    },

    contadorNotificacoes: {
        minWidth: 27,
        height: 27,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            tema.destaque,

        borderRadius: 14,

        paddingHorizontal: 7,
    },

    contadorNotificacoesTexto: {
        color:
            tema.textoSobreDestaque,

        fontSize:
            fontes.textoPequeno,

        fontFamily:
            fontes.negrito,
    },

    btnFechar: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 20,
    },

    btnFecharTexto: {
        color:
            tema.texto,

        fontSize: 31,
        lineHeight: 32,

        fontFamily:
            fontes.normal,
    },


    // =========================
    // FILTROS
    // =========================

    filtrosLinha: {
        minHeight: 67,

        flexDirection: "row",

        alignItems: "flex-end",
        justifyContent: "space-between",

        gap: 10,

        paddingHorizontal: 18,
        paddingTop: 10,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.linha,
    },

    filtros: {
        flex: 1,

        flexDirection: "row",

        alignItems: "flex-end",

        gap: 22,
    },

    filtro: {
        height: 45,

        alignItems: "center",
        justifyContent: "center",

        borderBottomWidth: 2,
        borderBottomColor:
            "transparent",

        paddingHorizontal: 4,
    },

    filtroAtivo: {
        borderBottomColor:
            tema.destaque,
    },

    filtroTexto: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.textoPequeno,

        fontFamily:
            fontes.normal,
    },

    filtroTextoAtivo: {
        color:
            tema.destaque,

        fontFamily:
            fontes.negrito,
    },

    marcarTodasTexto: {
        color:
            tema.destaque,

        fontSize: 10,
        lineHeight: 14,

        fontFamily:
            fontes.semiNegrito,

        textAlign: "right",

        paddingBottom: 9,
    },


    // =========================
    // LISTA DE NOTIFICAÇÕES
    // =========================

    listaNotificacoes: {
        flex: 1,
    },

    listaNotificacoesConteudo: {
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 24,
    },

    notificacaoItem: {
        minHeight: 92,

        flexDirection: "row",

        alignItems: "flex-start",

        borderRadius: 13,

        paddingHorizontal: 10,
        paddingVertical: 12,
    },

    notificacaoNaoLida: {
        backgroundColor:
            tema.card,
    },

    notificacaoPressed: {
        backgroundColor:
            tema.cardSecundario,
    },

    notificacaoIconeArea: {
        width: 42,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            tema.cardSecundario,

        borderRadius: 12,

        marginRight: 10,
    },

    notificacaoIcone: {
        width: 22,
        height: 22,

        resizeMode: "contain",

        tintColor:
            tema.destaque,
    },

    notificacaoConteudo: {
        flex: 1,

        minWidth: 0,
    },

    notificacaoTitulo: {
        color:
            tema.texto,

        fontSize:
            fontes.textoPequeno,

        lineHeight: 16,

        fontFamily:
            fontes.semiNegrito,
    },

    notificacaoTituloNaoLida: {
        fontFamily:
            fontes.negrito,
    },

    notificacaoDescricao: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.meta,

        lineHeight: 14,

        fontFamily:
            fontes.normal,

        marginTop: 3,
    },

    notificacaoTempo: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.meta,

        fontFamily:
            fontes.normal,

        marginTop: 7,
    },

    notificacaoStatusArea: {
        width: 18,

        alignItems: "flex-end",

        paddingTop: 5,
    },

    notificacaoPonto: {
        width: 8,
        height: 8,

        backgroundColor:
            tema.destaque,

        borderRadius: 4,
    },

    separadorNotificacao: {
        height: 1,

        backgroundColor:
            tema.linha,

        marginHorizontal: 10,
    },


    // =========================
    // ESTADO VAZIO
    // =========================

    notificacoesVazio: {
        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 28,
        paddingVertical: 60,
    },

    notificacoesVazioTitulo: {
        color:
            tema.texto,

        fontSize:
            fontes.cardTitulo,

        fontFamily:
            fontes.negrito,

        marginTop: 12,
    },

    notificacoesVazioTexto: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.textoPequeno,

        lineHeight: 16,

        fontFamily:
            fontes.normal,

        textAlign: "center",

        marginTop: 5,
    },

});


// Compatibilidade com imports antigos.
export const headerStyles =
    criarHeaderStyles(
        temaEscuro
    );
