import {
    Platform,
    StyleSheet,
} from "react-native";

import {
    cores,
    fontes,
} from "./variaveis";

import type {
    CoresTema,
} from "./temas";


export const criarMenuModalStyles = (
    tema: CoresTema
) => StyleSheet.create({

    // =========================
    // OFFCANVAS
    // =========================

    overlay: {
        flex: 1,

        flexDirection: "row",
        justifyContent: "flex-end",

        backgroundColor:
            "transparent",
    },

    backdrop: {
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
                    "#000000",

                shadowOffset: {
                    width:
                        -6,

                    height:
                        0,
                },

                shadowOpacity:
                    0.26,

                shadowRadius:
                    18,
            },

            android: {
                elevation:
                    18,
            },

            web: {
                boxShadow:
                    "-10px 0 30px rgba(0,0,0,0.28)",
            },
        }),
    },

    safeArea: {
        flex: 1,
    },


    // =========================
    // CABEÇALHO
    // =========================

    header: {
        minHeight: 72,

        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 18,

        borderBottomWidth: 1,
        borderBottomColor:
            tema.linha,
    },

    headerTituloArea: {
        flex: 1,

        minWidth: 0,

        paddingRight: 10,
    },

    headerTitulo: {
        color:
            tema.texto,

        fontSize:
            fontes.secao,

        fontFamily:
            fontes.negrito,
    },

    headerSubtitulo: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.meta,

        fontFamily:
            fontes.normal,

        marginTop: 2,
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
    // SCROLL
    // =========================

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 30,
    },


    // =========================
    // PERFIL
    // =========================

    perfilCard: {
        minHeight: 78,

        flexDirection: "row",

        alignItems: "center",

        backgroundColor:
            tema.card,

        borderWidth: 1,
        borderColor:
            tema.borda,

        borderRadius: 15,

        paddingHorizontal: 12,
        paddingVertical: 11,

        marginBottom: 21,
    },

    avatar: {
        width: 50,
        height: 50,

        borderRadius: 25,

        borderWidth: 1,
        borderColor:
            tema.destaque,

        resizeMode: "cover",

        marginRight: 11,
    },

    perfilTextoArea: {
        flex: 1,

        minWidth: 0,
    },

    perfilNome: {
        color:
            tema.texto,

        fontSize:
            fontes.cardTitulo,

        fontFamily:
            fontes.negrito,
    },

    perfilAcao: {
        color:
            tema.destaque,

        fontSize:
            fontes.meta,

        fontFamily:
            fontes.semiNegrito,

        marginTop: 3,
    },


    // =========================
    // SEÇÕES
    // =========================

    secaoTitulo: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.meta,

        fontFamily:
            fontes.negrito,

        textTransform: "uppercase",

        letterSpacing: 0.7,

        marginLeft: 4,
        marginBottom: 7,
    },

    grupo: {
        width: "100%",

        backgroundColor:
            tema.card,

        borderWidth: 1,
        borderColor:
            tema.borda,

        borderRadius: 14,

        overflow: "hidden",

        marginBottom: 20,
    },

    item: {
        minHeight: 66,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 11,
        paddingVertical: 9,
    },

    itemPressed: {
        backgroundColor:
            tema.cardSecundario,
    },

    itemIconeArea: {
        width: 38,
        height: 38,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor:
            tema.cardSecundario,

        borderRadius: 11,

        marginRight: 10,
    },

    itemIconeAreaPerigo: {
        backgroundColor:
            tema.cardSecundario,
    },

    itemIcone: {
        width: 20,
        height: 20,

        resizeMode: "contain",

        tintColor:
            tema.destaque,
    },

    itemIconePerigo: {
        tintColor:
            tema.erro,
    },

    itemTextoArea: {
        flex: 1,

        minWidth: 0,

        paddingRight: 7,
    },

    itemTitulo: {
        color:
            tema.texto,

        fontSize:
            fontes.texto,

        fontFamily:
            fontes.semiNegrito,
    },

    itemTituloPerigo: {
        color:
            tema.erro,
    },

    itemDescricao: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.meta,

        lineHeight: 13,

        fontFamily:
            fontes.normal,

        marginTop: 2,
    },

    seta: {
        color:
            tema.textoSecundario,

        fontSize: 22,
        lineHeight: 24,

        marginLeft: 6,
    },

    divisor: {
        height: 1,

        backgroundColor:
            tema.linha,

        marginLeft: 59,
    },


    // =========================
    // TEMA
    // =========================

    switchBase: {
        width: 43,
        height: 24,

        justifyContent: "center",

        backgroundColor:
            tema.cardSecundario,

        borderWidth: 1,
        borderColor:
            tema.borda,

        borderRadius: 12,

        paddingHorizontal: 2,

        marginLeft: 7,
    },

    switchAtivo: {
        backgroundColor:
            tema.destaque,

        borderColor:
            tema.destaque,
    },

    switchBolinha: {
        width: 18,
        height: 18,

        backgroundColor:
            tema.textoSecundario,

        borderRadius: 9,
    },

    switchBolinhaAtiva: {
        alignSelf: "flex-end",

        backgroundColor:
            tema.textoSobreDestaque,
    },


    // =========================
    // RODAPÉ
    // =========================

    rodape: {
        color:
            tema.textoSecundario,

        fontSize:
            fontes.meta,

        fontFamily:
            fontes.normal,

        textAlign: "center",

        opacity: 0.72,

        marginTop: 2,
    },


    // =========================
    // FEEDBACK
    // =========================

    pressed: {
        backgroundColor:
            tema.cardSecundario,

        opacity: 0.78,

        transform:
            cores.btnPress,
    },

});
