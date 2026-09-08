import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";
import { Color } from "expo-router";

export const galeriaStyles = StyleSheet.create({
    galeriaTxt: {
        fontSize: 15,
        color: "#767373",
    },
    titulo: {
        fontSize: 20,
        color: "#D6B26A",
        fontWeight: "bold",
    },
    btnGaleria: {
        backgroundColor: cores.roxoPrincipal,
        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
        width: 150,
        height: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: -38,
        flexDirection: 'row',
    },
    btnImg: {
        width: 24,
        height: 24,
    },
    btnTxt: {
        color: cores.douradoPrincipal,
        fontSize: 15,
    },
    cxPesquisa: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginTop: 20,
    },
    imgPesquisa: {
        width: 20,
        height: 20,
        marginRight: 8,
        resizeMode: 'contain',
    },
    inputPesquisa: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 14,
        height: '100%',
    },
    cxMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 10,
    },
    txtMenu: {
        fontSize: 15,
        color: cores.branco,
        fontWeight: 'bold',
    },
    cxBotoes: {
        flexDirection: 'row',
    },
    cxEventos: {
        flexDirection: 'row',
        top: 40,
    },
    btnEventos: {
        backgroundColor: cores.roxoPrincipal,
        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
        width: 150,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        paddingLeft: 10,
        flexDirection: 'row',
    },
    btnImgEventos: {
        width: 24,
        height: 24,
    },
    txtEventos: {
        color: cores.branco,
        fontSize: 12,
    },
    btnFiltro: {
        paddingLeft: 150,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    txtFiltro: {
        fontSize: 12,
        color: cores.branco,
        paddingRight: 5,
    },
    btnImgFiltro: {
        width: 15,
        height: 15,
    },
    cxDestaque: {
        marginTop: 70,
        width: '100%',
    },
    desTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: cores.douradoPrincipal,
    },
    deSubtitulo: {
        position: 'absolute',
        right: 0,
        top: 4,
    },
    cxImg: {
        marginTop: 20,
        width: '100%',
        height: 130,
    },
    imgDestaque: {
        width: 100,
        height: 90,
        borderRadius: 8,
        marginRight: 12,
        resizeMode: 'cover',
    },
    txtDestaque: {
        color: cores.branco
    },
    cardDestaque: {
        width: 100,
        height: 130,
        marginRight: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: cores.douradoPrincipal,
        backgroundColor: '#1E1E1E',
        overflow: 'hidden',
    },
    desTitulos: {
        fontSize: 20,
        fontWeight: 'bold',
        color: cores.douradoPrincipal,
        marginTop: 20,
    },
    postImg: {
        width: 110,
        height: 110,
        borderRadius: 5,
        marginTop: 10,
        marginRight: 12,
    },
    cxPost: {
        flexDirection: 'row',
    },
});