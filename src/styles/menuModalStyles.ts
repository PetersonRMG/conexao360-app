import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";


export const menuModalStyles = StyleSheet.create({

    overlay: {
        flex: 1,

        backgroundColor: "rgba(0,0,0,0.5)",

        alignItems: "flex-end",

        paddingTop: 70,
        paddingRight: 15,
    },
    caixaMenu: {
        backgroundColor: '#0A0909',
        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
        width: 150,
        height: 250,
        padding: 15,
        borderRadius: 10,
    },
    iconesMenu: {
      color: cores.branco  
    },


})