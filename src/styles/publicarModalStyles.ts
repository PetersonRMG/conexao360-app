import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarPublicarModalStyles = (tema: CoresTema) => StyleSheet.create({

    // =========================
    // FUNDO DO MODAL
    // =========================

    overlay: {
        flex: 1,

        backgroundColor: tema.overlay,

        justifyContent: "flex-end",
        alignItems: "center",

        // sobe a caixa para ficar acima do footer
        paddingBottom: 72,
    },


    // =========================
    // CAIXA
    // =========================

    caixaMenu: {
        width: 180,

        backgroundColor: tema.card,

        borderWidth: 1,
        borderColor: tema.destaque,

        borderRadius: 8,

        paddingHorizontal: 14,
        paddingVertical: 12,

        marginBottom: 5,
    },


    // =========================
    // BOTÃO
    // =========================

    btnMenu: {
        width: "100%",
        height: 42,

        flexDirection: "row",
        alignItems: "center",

        columnGap: 10,

        paddingHorizontal: 5,

        borderRadius: 5,
    },


    // =========================
    // ÍCONE
    // =========================

    imagemMenu: {
        width: 25,
        height: 25,

        resizeMode: "contain",
    },


    // =========================
    // TEXTO
    // =========================

    txtMenu: {
        color: tema.destaque,

        fontSize: 15,
        fontFamily: fontes.normal,
    },

});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarPublicarModalStyles(coresTema) dentro do componente.
export const publicarModalStyles = criarPublicarModalStyles(temaEscuro);
