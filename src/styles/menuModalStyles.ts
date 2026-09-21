import { StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarMenuModalStyles = (tema: CoresTema) => StyleSheet.create({

    // =========================================
    // FUNDO TOTAL DO MODAL
    // =========================================
    overlay: {
        flex: 1,

        backgroundColor: tema.overlay,

        // centraliza a área de 440px
        alignItems: "center",
    },


    // =========================================
    // ÁREA DO APP
    // MESMO LIMITE DAS OUTRAS TELAS
    // =========================================
    areaModal: {
        flex: 1,

        width: "100%",
        maxWidth: 440,

        alignItems: "flex-end",

        paddingTop: 70,
        paddingRight: 15,
    },


    // =========================================
    // CAIXA DO MENU
    // =========================================
    caixaMenu: {
        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.destaque,

        width: 170,
        height: 250,

        padding: 15,

        borderRadius: 10,

        justifyContent: "space-between",
    },


    // =========================================
    // BOTÕES
    // =========================================
    btnMenu: {
        width: "100%",
        height: 30,

        flexDirection: "row",
        alignItems: "center",

        columnGap: 7,

        marginVertical: 3,

        borderRadius: 5,
    },


    // =========================================
    // ÍCONES
    // =========================================
    imagemMenu: {
        width: 22,
        height: 22,

        resizeMode: "contain",
    },


    // =========================================
    // TEXTO
    // =========================================
    iconesMenu: {
        color: tema.texto,

        fontSize: 14,
        fontFamily: fontes.normal,
    },

});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarMenuModalStyles(coresTema) dentro do componente.
export const menuModalStyles = criarMenuModalStyles(temaEscuro);
