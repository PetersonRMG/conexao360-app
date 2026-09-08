import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";


export const sairModalStyles = StyleSheet.create({

    overlay: {
      

        backgroundColor: "rgba(0,0,0,0.5)",

        alignItems: "center",
        margin:'auto'


    },
    caixaSair: {
        backgroundColor: '#0A0909',
        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
        width: '100%',
        minWidth:250,
        height: 150,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    tituloSair: {
        color: cores.branco,
        fontSize: 20,
        fontFamily: fontes.extraNegritoItalico,
      textAlign:'center'
    },
    btns: {
        width: '80%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        columnGap:5
      
    },
    btnSair: {
        width: '55%',
        height: 27,
        flexDirection: 'row',
        
        marginVertical: 3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor:cores.douradoPrincipalPressed
        

    },

    iconesMenu: {
        color: cores.branco,
        margin:'auto'
    },
});