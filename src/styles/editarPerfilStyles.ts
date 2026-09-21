import { StyleSheet } from "react-native";

import { fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";


export const criarEditarPerfilStyles = (
    tema: CoresTema
) => StyleSheet.create({

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
        backgroundColor: tema.fundo,
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

        backgroundColor: tema.cardSecundario,
    },

    btnVoltarPressed: {
        backgroundColor: tema.card,
        transform: [{ scale: 0.97 }],
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
        color: tema.texto,

        fontSize: fontes.titulo,
        fontFamily: fontes.negrito,
    },

    tituloDourado: {
        color: tema.destaque,
    },

    aviso: {
        color: tema.destaque,

        fontSize: fontes.subtitulo,
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
        borderColor: tema.destaque,
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

        backgroundColor: tema.destaque,

        borderWidth: 2,
        borderColor: tema.card,
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

        color: tema.texto,

        fontSize: fontes.subtitulo,
        fontFamily: fontes.negrito,

        marginTop: 6,
        marginBottom: 8,
    },


    // =========================
    // CARD INDIVIDUAL
    // =========================

    cardCampo: {
        width: "100%",

        minHeight: 68,

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.borda,

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
        color: tema.texto,

        fontSize: fontes.subtitulo,
        fontFamily: fontes.negrito,
    },


    // =========================
    // PRIVACIDADE
    // =========================

    status: {
        minWidth: 88,
        height: 28,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 6,

        paddingHorizontal: 10,

        borderRadius: 14,

        backgroundColor: tema.cardSecundario,

        borderWidth: 1,
    },

    statusPublico: {
        borderColor: tema.destaque,
    },

    statusPrivado: {
        borderColor: tema.borda,
    },

    statusPressed: {
        opacity: 0.72,
        transform: [{ scale: 0.97 }],
    },

    statusIndicador: {
        width: 7,
        height: 7,

        borderRadius: 4,
    },

    statusIndicadorPublico: {
        backgroundColor: tema.destaque,
    },

    statusIndicadorPrivado: {
        backgroundColor: tema.textoSecundario,
    },

    txtStatus: {
        fontSize: 9,
        fontFamily: fontes.negrito,
    },

    txtStatusPublico: {
        color: tema.destaque,
    },

    txtStatusPrivado: {
        color: tema.textoSecundario,
    },


    // =========================
    // INPUT
    // =========================

    input: {
        width: "100%",

        color: tema.texto,

        fontSize: 13,
        fontFamily: fontes.normal,

        opacity: 0.9,

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

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.borda,

        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 10,

        marginBottom: 12,
    },

    inputDescricao: {
        width: "100%",
        minHeight: 75,

        color: tema.texto,

        fontSize: 13,
        fontFamily: fontes.normal,

        opacity: 0.9,

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

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.borda,

        borderRadius: 12,

        paddingHorizontal: 12,
        paddingVertical: 10,

        marginBottom: 8,
    },

    txtDadoSeguranca: {
        color: tema.textoSecundario,

        fontSize: 12,
        fontFamily: fontes.normal,

        opacity: 0.9,

        marginTop: 4,
    },

    verificado: {
        color: tema.destaque,

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
        color: tema.destaque,

        fontSize: 9,
        fontFamily: fontes.negrito,
    },

});


// =====================================================
// COMPATIBILIDADE
// =====================================================
// Mantém o import antigo funcionando no tema escuro.
// Para tema dinâmico, use:
// const { coresTema } = useTema();
// const editarPerfilStyles = criarEditarPerfilStyles(coresTema);

export const editarPerfilStyles =
    criarEditarPerfilStyles(temaEscuro);
