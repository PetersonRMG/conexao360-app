import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarPerfilStyles = (tema: CoresTema) => StyleSheet.create({


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


    // =========================
    // SCROLL
    // =========================

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 15,

        // espaço para não ficar atrás do footer
        paddingBottom: 100,
    },


    // =========================
    // TOPO
    // =========================

    topo: {
        width: "100%",
        height: 80,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 10,
    },

    btnVoltar: {
        width: 45,
        height: 45,

        borderRadius: 23,


        borderColor: tema.destaque,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: tema.overlay,
    },
    voltarImagem: {
        width: 45,
        height: 45,
    },

    btnVoltarPressed: {
        backgroundColor: tema.pressionado,
        transform: cores.btnPress,
    },

    txtVoltar: {
        color: tema.texto,

        fontSize: 32,

        fontFamily: fontes.negrito,

        lineHeight: 35,
    },

    logo: {
        width: 55,
        height: 55,

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

        marginTop: 5,
        marginBottom: 25,
    },

    titulo: {
        color: tema.texto,

        fontSize: fontes.titulo,

        fontFamily: fontes.negrito,
    },

    tituloDourado: {
        color: tema.destaque,
    },

    aviso: {
        color: tema.destaque,

        fontSize: 10,

        fontFamily: fontes.normal,

        marginTop: 7,

        opacity: 0.8,
    },


    // =========================
    // CARD PERFIL
    // =========================

    cardPerfil: {
        width: "100%",

        backgroundColor: tema.card,

        borderRadius: 18,

        alignItems: "center",

        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 28,

        marginBottom: 18,
    },


    // =========================
    // AVATAR
    // =========================

    avatarContainer: {
        width: 120,
        height: 120,

        borderRadius: 60,

        overflow: "hidden",

        marginBottom: 10,

        borderWidth: 2,
        borderColor: tema.destaque,
    },

    avatar: {
        width: "100%",
        height: "100%",

        resizeMode: "cover",
    },


    // =========================
    // DADOS DO PERFIL
    // =========================

    nome: {
        color: tema.destaque,

        fontSize: 22,

        fontFamily: fontes.extraNegrito,

        marginBottom: 5,
    },

    descricao: {
        color: tema.texto,

        fontSize: 15,

        fontFamily: fontes.normal,

        textAlign: "center",

        marginBottom: 4,
    },


    // =========================
    // LOCAL / CONEXÕES
    // =========================

    informacoes: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: 35,
    },

    informacaoItem: {
        flexDirection: "row",
        alignItems: "center",

        gap: 8,
    },

    iconeInfo: {
        width: 22,
        height: 22,

        resizeMode: "contain",

        tintColor: tema.texto,

        opacity: 0.8,
    },

    txtInfo: {
        color: tema.texto,

        fontSize: 12,

        fontFamily: fontes.normal,

        opacity: 0.8,
    },


    // =========================
    // BOTÕES
    // =========================

    areaBotoes: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-between",

        marginTop: 35,

        gap: 20,
    },

    btnAcao: {
        flex: 1,

        height: 42,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: tema.cardSecundario,

        borderRadius: 20,

        borderWidth: 1,
        borderColor: tema.destaque,
    },
    btnAcaoAtivo: {
        backgroundColor: tema.destaque,
    },

    txtBtnAcaoAtivo: {
        color: tema.textoSobreDestaque,
    },

    btnAcaoPressed: {
        backgroundColor: tema.destaquePressed,
        transform: cores.btnPress,
    },

    txtBtnAcao: {
        color: tema.texto,

        fontSize: fontes.btn,

        fontFamily: fontes.extraNegrito,
    },


    // =========================
    // CONQUISTAS
    // =========================

    cardConquistas: {
        width: "100%",

        backgroundColor: tema.card,

        borderRadius: 18,

        paddingHorizontal: 20,
        paddingVertical: 20,

        marginBottom: 20,
    },

    tituloConquistas: {
        color: tema.texto,

        fontSize: 21,

        fontFamily: fontes.extraNegrito,

        textAlign: "center",

        marginBottom: 25,
    },

    listaConquistas: {
        width: "100%",

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    conquista: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        gap: 8,
    },

    iconeConquista: {
        width: 23,
        height: 23,

        resizeMode: "contain",

        tintColor: tema.texto,

        opacity: 0.75,
    },

    txtConquista: {
        color: tema.texto,

        fontSize: 11,

        fontFamily: fontes.normal,

        textAlign: "center",

        opacity: 0.8,
    },

});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarPerfilStyles(coresTema) dentro do componente.
export const perfilStyles = criarPerfilStyles(temaEscuro);
