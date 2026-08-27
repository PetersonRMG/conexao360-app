import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";

export const headerStyles = StyleSheet.create({

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

    


});