import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";


export const criarSairModalStyles = (tema: CoresTema) => StyleSheet.create({

    overlay: {


        backgroundColor: tema.overlay,

        alignItems: "center",
        margin: 'auto'


    },
    caixaSair: {
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.destaque,
        width: '100%',
        minWidth: 250,
        height: 150,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    tituloSair: {
        color: tema.texto,
        fontSize: 20,
        fontFamily: fontes.extraNegritoItalico,
        textAlign: 'center'
    },
    btns: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        columnGap: 5

    },
    btnSair: {
        width: '55%',
        height: 27,
        flexDirection: 'row',

        marginVertical: 3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: tema.destaquePressed


    },

    iconesMenu: {
        color: tema.texto,
        margin: 'auto'
    },
});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarSairModalStyles(coresTema) dentro do componente.
export const sairModalStyles = criarSairModalStyles(temaEscuro);
