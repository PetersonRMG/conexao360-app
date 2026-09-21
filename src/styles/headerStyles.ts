import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarHeaderStyles = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // CONTAINER
    // =========================

    container: {
        backgroundColor: tema.header,
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
        backgroundColor: tema.pressionado,
        transform: cores.btnPress,
    },

    iconeHeader: {
        width: 25,
        height: 25,

        resizeMode: "contain",

        tintColor: tema.destaque,
    },




});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarHeaderStyles(coresTema) dentro do componente.
export const headerStyles = criarHeaderStyles(temaEscuro);
