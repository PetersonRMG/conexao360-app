import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";


import { CoresTema } from "./temas";
export const criarConversaStyles = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // ESTRUTURA
    // =========================

    container: {
        flex: 1,

        backgroundColor: tema.fundo,
    },

    keyboard: {
        flex: 1,
    },


    // =========================
    // HEADER
    // =========================

    header: {
        width: "100%",
        height: 80,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 14,

        backgroundColor: tema.header,

        borderBottomWidth: 1,
        borderBottomColor: tema.linha,
    },

    btnVoltar: {
        width: 38,
        height: 38,

        alignItems: "center",
        justifyContent: "center",

        marginRight: 8,

        borderRadius: 19,
    },

    btnVoltarPressed: {
        backgroundColor: tema.cardSecundario,

        transform: cores.btnPress,
    },

    iconeVoltar: {
        width: 30,
        height: 30,

        resizeMode: "contain",
    },


    // =========================
    // PERFIL
    // =========================

    perfil: {
        flex: 1,

        flexDirection: "row",
        alignItems: "center",
    },

    avatarContainer: {
        position: "relative",

        marginRight: 10,
    },

    avatar: {
        width: 42,
        height: 42,

        borderRadius: 21,

        resizeMode: "cover",

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
    },

    online: {
        width: 10,
        height: 10,

        borderRadius: 5,

        position: "absolute",

        right: 0,
        bottom: 0,

        backgroundColor: cores.verdeOnline,

        borderWidth: 1,
        borderColor: tema.fundo,
    },

    nome: {
        color: tema.texto,

        fontSize: 14,
        fontFamily: fontes.negrito,
    },

    status: {
        color: tema.texto,

        fontSize: 9,
        fontFamily: fontes.normal,

        opacity: 0.7,

        marginTop: 1,
    },


    // =========================
    // MAIS
    // =========================

    btnMais: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",
    },

    mais: {
        color: cores.douradoPrincipal,

        fontSize: 30,
        lineHeight: 30,

        fontFamily: fontes.negrito,
    },


    // =========================
    // SEGURANÇA
    // =========================

    areaSeguranca: {
        width: "100%",

        alignItems: "center",

        paddingVertical: 16,
        paddingHorizontal: 16,
    },

    avisoSeguranca: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: cores.douradoPrincipal,

        borderRadius: 10,

        paddingHorizontal: 12,
        paddingVertical: 7,
    },

    iconeSeguranca: {
        width: 17,
        height: 17,

        resizeMode: "contain",

        marginRight: 7,
    },

    txtSeguranca: {
        flexShrink: 1,

        color: tema.texto,

        fontSize: 8,
        lineHeight: 11,

        fontFamily: fontes.normal,

        textAlign: "center",

        opacity: 0.85,
    },


    // =========================
    // DATA
    // =========================

    divisorData: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 16,

        marginBottom: 8,
    },

    linha: {
        flex: 1,

        height: 1,

        backgroundColor:
            cores.douradoPrincipal,

        opacity: 0.7,
    },

    data: {
        color: cores.douradoPrincipal,

        fontSize: 9,
        fontFamily: fontes.normal,

        marginHorizontal: 12,
    },


    // =========================
    // MENSAGENS
    // =========================

    scroll: {
        flex: 1,
    },

    scrollConteudo: {
        paddingHorizontal: 20,

        paddingTop: 5,
        paddingBottom: 20,
    },

    linhaMensagem: {
        width: "100%",

        marginVertical: 8,
    },

    linhaMensagemRecebida: {
        alignItems: "flex-start",
    },

    linhaMinhaMensagem: {
        alignItems: "flex-end",
    },

    balao: {
        maxWidth: "78%",
        minWidth: 90,

        borderRadius: 15,

        paddingHorizontal: 12,
        paddingVertical: 9,
    },

    balaoRecebido: {
        backgroundColor: tema.card,

        borderBottomLeftRadius: 3,
    },

    balaoMeu: {
        backgroundColor:
            cores.douradoPrincipal,

        borderBottomRightRadius: 3,
    },

    txtMensagem: {
        color: tema.texto,

        fontSize: 11,
        lineHeight: 15,

        fontFamily: fontes.normal,
    },

    txtMinhaMensagem: {
        color: tema.textoSobreDestaque,
    },

    horario: {
        color: tema.texto,

        fontSize: 7,
        fontFamily: fontes.normal,

        opacity: 0.5,

        textAlign: "right",

        marginTop: 4,
    },

    horarioMeu: {
        color: tema.textoSobreDestaque,
    },


    // =========================
    // ÁREA DE ENVIO
    // =========================

    areaEnviar: {
        width: "100%",
        minHeight: 70,

        flexDirection: "row",
        alignItems: "center",

        gap: 8,

        paddingHorizontal: 12,
        paddingVertical: 10,

        backgroundColor: tema.footer,

        borderTopWidth: 1,
        borderTopColor: tema.linha,
    },


    // =========================
    // ANEXO
    // =========================

    btnAnexo: {
        width: 38,
        height: 38,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 19,

        backgroundColor: tema.card,
    },

    btnAnexoPressed: {
        backgroundColor: tema.cardSecundario,

        transform: cores.btnPress,
    },

    iconeAnexo: {
        width: 22,
        height: 22,

        resizeMode: "contain",
    },


    // =========================
    // INPUT MENSAGEM
    // =========================

    inputContainer: {
        flex: 1,

        minHeight: 42,
        maxHeight: 100,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: tema.input,

        borderWidth: 1,
        borderColor:
            cores.douradoPrincipal,

        borderRadius: 22,

        paddingHorizontal: 14,
    },

    input: {
        flex: 1,

        maxHeight: 90,

        color: tema.texto,

        fontSize: 11,
        fontFamily: fontes.normal,

        paddingVertical: 8,
    },

    iconeEmoji: {
        width: 19,
        height: 19,

        resizeMode: "contain",

        marginLeft: 7,
    },


    // =========================
    // ENVIAR
    // =========================

    btnEnviar: {
        width: 42,
        height: 42,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 21,
    },

    btnEnviarPressed: {
        transform: cores.btnPress,
    },

    iconeEnviar: {
        width: 32,
        height: 32,

        resizeMode: "contain",
    },

});