import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarExcluirContaStyles = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor: tema.card,
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

        backgroundColor: tema.card,
    },

    btnVoltarPressed: {
        backgroundColor: tema.pressionado,

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

        marginTop: 5,

        textAlign: "center",

        opacity: 0.8,
    },


    // =========================
    // CARD
    // =========================

    card: {
        width: "100%",

        backgroundColor: tema.card,

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
        color: tema.texto,

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
        color: tema.destaque,

        fontSize: 14,
        fontFamily: fontes.negrito,

        marginRight: 8,
    },

    txtAviso: {
        flex: 1,

        color: tema.texto,

        fontSize: 11,
        lineHeight: 16,

        fontFamily: fontes.normal,

        opacity: 0.8,
    },

    txtConfirmacao: {
        color: tema.texto,

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

        backgroundColor: tema.input,

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

        color: tema.texto,

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
        color: tema.destaque,

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

        backgroundColor: tema.destaque,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
    },

    btnCancelarPressed: {
        backgroundColor: tema.destaquePressed,

        transform: cores.btnPress,
    },

    txtCancelar: {
        color: tema.textoSobreDestaque,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

    btnExcluir: {
        flex: 1,

        height: 45,

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.destaque,

        borderRadius: 8,

        alignItems: "center",
        justifyContent: "center",
    },

    btnExcluirPressed: {
        backgroundColor: tema.pressionado,

        transform: cores.btnPress,
    },

    txtExcluir: {
        color: tema.destaque,

        fontSize: fontes.btn,
        fontFamily: fontes.extraNegrito,
    },

});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarExcluirContaStyles(coresTema) dentro do componente.
export const excluirContaStyles = criarExcluirContaStyles(temaEscuro);
