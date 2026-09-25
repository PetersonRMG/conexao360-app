import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema } from "./temas";


const COR_DESTRUTIVA = "#D45A5A";


export const criarGaleria2Styles = (
    tema: CoresTema
) => StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: tema.fundo,
    },

    lista: {
        flex: 1,
        width: "100%",
    },

    listaConteudo: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },

    linhaFotos: {
        justifyContent: "space-between",
        marginBottom: 12,
    },


    // ABAS

    abas: {
        width: "100%",
        height: 42,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: tema.cardSecundario,
        marginBottom: 7,
    },

    aba: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 3,
    },

    abaAtiva: {
        borderBottomWidth: 2,
        borderBottomColor: tema.destaque,
    },

    abaPressionada: {
        opacity: 0.72,
    },

    txtAba: {
        color: tema.texto,
        fontSize: 9,
        fontFamily: fontes.normal,
        textAlign: "center",
        opacity: 0.8,
    },

    txtAbaAtiva: {
        color: tema.destaque,
        fontFamily: fontes.negrito,
        opacity: 1,
    },


    // MINHAS FOTOS / ARQUIVADAS

    minhasAlternador: {
        width: "100%",
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.cardSecundario,
        borderRadius: 20,
        padding: 3,
        marginTop: 4,
        marginBottom: 4,
    },

    minhasOpcao: {
        flex: 1,
        minHeight: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },

    minhasOpcaoAtiva: {
        backgroundColor: tema.cardSecundario,
        borderWidth: 1,
        borderColor: tema.destaque,
    },

    minhasOpcaoPressed: {
        opacity: 0.72,
    },

    txtMinhasOpcao: {
        color: tema.textoSecundario,
        fontSize: 8,
        fontFamily: fontes.normal,
    },

    txtMinhasOpcaoAtiva: {
        color: tema.destaque,
        fontFamily: fontes.negrito,
    },


    // PUBLICAR FOTO

    areaCompartilhar: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 7,
    },

    btnCompartilhar: {
        minWidth: 126,
        height: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 12,
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.destaque,
        borderRadius: 16,
    },

    btnCompartilharPressed: {
        backgroundColor: tema.cardSecundario,
        transform: cores.btnPress,
    },

    iconeCompartilhar: {
        width: 15,
        height: 15,
        resizeMode: "contain",
    },

    txtCompartilhar: {
        color: tema.destaque,
        fontSize: 10,
        fontFamily: fontes.negrito,
    },


    // RESUMO

    resumoCard: {
        width: "100%",
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.borda,
        borderRadius: 7,
        paddingHorizontal: 8,
        paddingVertical: 7,
        marginTop: 3,
    },

    resumoItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    resumoIcone: {
        width: 18,
        height: 18,
        resizeMode: "contain",
    },

    resumoAvatar: {
        width: 18,
        height: 18,
        borderRadius: 9,
        resizeMode: "cover",
    },

    resumoNumero: {
        color: tema.texto,
        fontSize: 9,
        fontFamily: fontes.negrito,
        lineHeight: 11,
    },

    resumoLegenda: {
        color: tema.textoSecundario,
        fontSize: 6.5,
        fontFamily: fontes.normal,
        lineHeight: 9,
    },

    resumoSeparador: {
        width: 1,
        height: 24,
        backgroundColor: tema.cardSecundario,
    },


    // AVISO

    avisoCard: {
        width: "100%",
        minHeight: 43,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.borda,
        borderRadius: 7,
        paddingHorizontal: 9,
        paddingVertical: 7,
        marginTop: 8,
        marginBottom: 12,
    },

    avisoIcone: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 8,
    },

    avisoTexto: {
        flex: 1,
        color: tema.textoSecundario,
        fontSize: 7.5,
        lineHeight: 11,
        fontFamily: fontes.normal,
    },


    // CARD DA FOTO

    cardFoto: {
        width: "48.6%",
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.cardSecundario,
        borderRadius: 8,
        overflow: "hidden",
    },

    areaImagemCard: {
        width: "100%",
        position: "relative",
    },

    areaFoto: {
        width: "100%",
    },

    areaFotoPressionada: {
        opacity: 0.85,
    },

    foto: {
        width: "100%",
        aspectRatio: 1.05,
        resizeMode: "cover",
    },

    btnMais: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        borderWidth: 1,
        borderColor: tema.destaque,
        borderRadius: 14,
    },

    btnMaisPressed: {
        opacity: 0.68,
        transform: cores.btnPress,
    },

    txtMais: {
        color: tema.destaque,
        fontSize: 20,
        lineHeight: 20,
        fontFamily: fontes.negrito,
        marginTop: -4,
    },

    seloSalvo: {
        position: "absolute",
        left: 6,
        top: 6,
        minWidth: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        borderWidth: 1,
        borderColor: tema.destaque,
        borderRadius: 13,
    },

    txtSeloSalvo: {
        color: tema.destaque,
        fontSize: 12,
    },


    // AUTOR / CURTIDA

    rodapeFoto: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 7,
        paddingVertical: 6,
    },

    autorArea: {
        flex: 1,
        minWidth: 0,
        flexDirection: "row",
        alignItems: "center",
    },

    avatarAutor: {
        width: 19,
        height: 19,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: tema.destaque,
        resizeMode: "cover",
        marginRight: 6,
    },

    autorTextoArea: {
        flex: 1,
        minWidth: 0,
    },

    autor: {
        color: tema.texto,
        fontSize: 7.5,
        fontFamily: fontes.negrito,
    },

    detalheAutor: {
        color: tema.textoSecundario,
        fontSize: 6,
        fontFamily: fontes.normal,
        marginTop: 1,
    },

    btnCurtida: {
        minHeight: 28,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        paddingHorizontal: 5,
        borderRadius: 14,
    },

    btnCurtidaAtiva: {
        backgroundColor: tema.cardSecundario,
    },

    btnCurtidaPressed: {
        opacity: 0.6,
        transform: cores.btnPress,
    },

    coracao: {
        color: tema.textoSecundario,
        fontSize: 17,
        lineHeight: 19,
        fontFamily: fontes.normal,
    },

    coracaoAtivo: {
        color: tema.destaque,
    },

    txtCurtidas: {
        color: tema.textoSecundario,
        fontSize: 6.5,
        fontFamily: fontes.normal,
    },

    txtCurtidasAtivo: {
        color: tema.destaque,
        fontFamily: fontes.negrito,
    },


    // ESTADO VAZIO

    semResultados: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 35,
    },

    txtSemResultados: {
        color: tema.textoSecundario,
        fontSize: 12,
        fontFamily: fontes.normal,
        textAlign: "center",
    },


    // PREVIEW

    modalOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: "rgba(0, 0, 0, 0.82)",
    },

    modalCard: {
        width: "100%",
        maxWidth: 410,
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.destaque,
        borderRadius: 14,
        overflow: "hidden",
    },

    modalTopo: {
        width: "100%",
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    modalAutorArea: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    modalAvatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: tema.destaque,
        resizeMode: "cover",
        marginRight: 9,
    },

    modalAutor: {
        color: tema.texto,
        fontSize: 12,
        fontFamily: fontes.negrito,
    },

    modalDetalhe: {
        color: tema.textoSecundario,
        fontSize: 8,
        fontFamily: fontes.normal,
        marginTop: 2,
    },

    btnFecharModal: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
    },

    txtFecharModal: {
        color: tema.texto,
        fontSize: 28,
        lineHeight: 30,
        fontFamily: fontes.normal,
    },

    modalImagem: {
        width: "100%",
        aspectRatio: 1.25,
        resizeMode: "cover",
        backgroundColor: tema.cardSecundario,
    },

    modalAcoes: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    modalAcao: {
        minHeight: 38,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 10,
        borderRadius: 18,
    },

    modalAcaoAtiva: {
        backgroundColor: tema.cardSecundario,
    },

    modalCoracao: {
        color: tema.texto,
        fontSize: 22,
        lineHeight: 24,
        fontFamily: fontes.normal,
    },

    modalCoracaoAtivo: {
        color: tema.destaque,
    },

    modalAcaoIconeTexto: {
        color: tema.destaque,
        fontSize: 18,
        lineHeight: 20,
        fontFamily: fontes.negrito,
    },

    modalAcaoTexto: {
        color: tema.texto,
        fontSize: 10,
        fontFamily: fontes.normal,
    },

    modalAcaoTextoAtivo: {
        color: tema.destaque,
        fontFamily: fontes.negrito,
    },

    btnModalPressed: {
        backgroundColor: tema.cardSecundario,
        opacity: 0.8,
    },


    // PUBLICAÇÃO

    publicarOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        backgroundColor: "rgba(0, 0, 0, 0.82)",
    },

    publicarCard: {
        width: "100%",
        maxWidth: 410,
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: tema.destaque,
        borderRadius: 14,
        padding: 14,
    },

    publicarTitulo: {
        color: tema.destaque,
        fontSize: 18,
        fontFamily: fontes.negrito,
        textAlign: "center",
    },

    publicarSubtitulo: {
        color: tema.textoSecundario,
        fontSize: 9,
        lineHeight: 13,
        fontFamily: fontes.normal,
        textAlign: "center",
        marginTop: 4,
        marginBottom: 12,
    },

    publicarImagem: {
        width: "100%",
        aspectRatio: 4 / 3,
        resizeMode: "cover",
        borderRadius: 10,
        backgroundColor: tema.cardSecundario,
    },

    publicarAcoes: {
        width: "100%",
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
    },

    btnCancelarPublicacao: {
        flex: 1,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tema.cardSecundario,
        borderWidth: 1,
        borderColor: tema.destaque,
        borderRadius: 21,
    },

    txtCancelarPublicacao: {
        color: tema.destaque,
        fontSize: 10,
        fontFamily: fontes.negrito,
    },

    btnConfirmarPublicacao: {
        flex: 1,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tema.destaque,
        borderRadius: 21,
    },

    txtConfirmarPublicacao: {
        color: tema.fundo,
        fontSize: 10,
        fontFamily: fontes.negrito,
    },

    btnPublicacaoPressed: {
        opacity: 0.78,
        transform: cores.btnPress,
    },


    // BOTTOM SHEET DE AÇÕES

    sheetOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.64)",
    },

    sheetBackdrop: {
    position: "absolute",

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
},

    sheetCard: {
        width: "100%",
        maxWidth: 440,
        alignSelf: "center",
        backgroundColor: tema.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: tema.borda,
        paddingTop: 8,
        paddingBottom: 18,
    },

    sheetHandle: {
        width: 42,
        height: 4,
        alignSelf: "center",
        backgroundColor: tema.textoSecundario,
        borderRadius: 2,
        opacity: 0.45,
        marginBottom: 10,
    },

    sheetCabecalho: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingBottom: 10,
    },

    sheetMiniatura: {
        width: 50,
        height: 50,
        borderRadius: 8,
        resizeMode: "cover",
        marginRight: 10,
    },

    sheetCabecalhoTexto: {
        flex: 1,
        minWidth: 0,
    },

    sheetRotulo: {
        color: tema.textoSecundario,
        fontSize: 8,
        fontFamily: fontes.normal,
    },

    sheetAutor: {
        color: tema.texto,
        fontSize: 12,
        fontFamily: fontes.negrito,
        marginTop: 1,
    },

    sheetMeta: {
        color: tema.textoSecundario,
        fontSize: 8,
        fontFamily: fontes.normal,
        marginTop: 3,
    },

    sheetFechar: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
    },

    sheetFecharTexto: {
        color: tema.texto,
        fontSize: 26,
        lineHeight: 28,
    },

    sheetLista: {
        borderTopWidth: 1,
        borderTopColor: tema.cardSecundario,
    },

    sheetAcao: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    sheetAcaoPressed: {
        backgroundColor: tema.cardSecundario,
        opacity: 0.8,
    },

    sheetIcone: {
        width: 28,
        color: tema.destaque,
        fontSize: 17,
        textAlign: "center",
        fontFamily: fontes.negrito,
        marginRight: 6,
    },

    sheetAcaoTexto: {
        flex: 1,
        color: tema.texto,
        fontSize: 11,
        fontFamily: fontes.normal,
    },

    sheetSeta: {
        color: tema.textoSecundario,
        fontSize: 20,
        lineHeight: 22,
    },

    sheetSeparador: {
        height: 1,
        backgroundColor: tema.cardSecundario,
        marginVertical: 3,
    },

    sheetDestrutivo: {
        color: COR_DESTRUTIVA,
    },


    // CONFIRMAR EXCLUSÃO

    confirmacaoOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        backgroundColor: "rgba(0, 0, 0, 0.82)",
    },

    confirmacaoCard: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: tema.card,
        borderWidth: 1,
        borderColor: COR_DESTRUTIVA,
        borderRadius: 14,
        padding: 14,
    },

    confirmacaoTitulo: {
        color: tema.texto,
        fontSize: 16,
        fontFamily: fontes.negrito,
        textAlign: "center",
    },

    confirmacaoTexto: {
        color: tema.textoSecundario,
        fontSize: 9,
        lineHeight: 13,
        fontFamily: fontes.normal,
        textAlign: "center",
        marginTop: 6,
        marginBottom: 12,
    },

    confirmacaoImagem: {
        width: "100%",
        aspectRatio: 16 / 9,
        resizeMode: "cover",
        borderRadius: 9,
        backgroundColor: tema.cardSecundario,
    },

    confirmacaoAcoes: {
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
    },

    btnConfirmacaoCancelar: {
        flex: 1,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tema.cardSecundario,
        borderRadius: 20,
    },

    txtConfirmacaoCancelar: {
        color: tema.texto,
        fontSize: 10,
        fontFamily: fontes.negrito,
    },

    btnConfirmacaoApagar: {
        flex: 1,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COR_DESTRUTIVA,
        borderRadius: 20,
    },

    txtConfirmacaoApagar: {
        color: "#FFFFFF",
        fontSize: 10,
        fontFamily: fontes.negrito,
    },


    // DENÚNCIA

    denunciaCard: {
        width: "100%",
        maxWidth: 440,
        alignSelf: "center",
        backgroundColor: tema.card,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: tema.borda,
        padding: 14,
        paddingTop: 8,
        paddingBottom: 20,
    },

    denunciaTitulo: {
        color: tema.texto,
        fontSize: 16,
        fontFamily: fontes.negrito,
        textAlign: "center",
    },

    denunciaTexto: {
        color: tema.textoSecundario,
        fontSize: 9,
        fontFamily: fontes.normal,
        textAlign: "center",
        marginTop: 4,
        marginBottom: 12,
    },

    denunciaMotivos: {
        gap: 7,
    },

    denunciaMotivo: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: tema.cardSecundario,
        borderWidth: 1,
        borderColor: tema.cardSecundario,
        borderRadius: 10,
        paddingHorizontal: 12,
    },

    denunciaMotivoAtivo: {
        borderColor: tema.destaque,
    },

    denunciaRadio: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: tema.textoSecundario,
        marginRight: 9,
    },

    denunciaRadioAtivo: {
        borderWidth: 5,
        borderColor: tema.destaque,
    },

    denunciaMotivoTexto: {
        flex: 1,
        color: tema.texto,
        fontSize: 10,
        fontFamily: fontes.normal,
    },

    denunciaMotivoTextoAtivo: {
        color: tema.destaque,
        fontFamily: fontes.negrito,
    },

    denunciaAcoes: {
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
    },

    btnDenunciaCancelar: {
        flex: 1,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tema.cardSecundario,
        borderRadius: 20,
    },

    txtDenunciaCancelar: {
        color: tema.texto,
        fontSize: 10,
        fontFamily: fontes.negrito,
    },

    btnDenunciaEnviar: {
        flex: 1.25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COR_DESTRUTIVA,
        borderRadius: 20,
    },

    btnDenunciaDesabilitado: {
        opacity: 0.4,
    },

    txtDenunciaEnviar: {
        color: "#FFFFFF",
        fontSize: 10,
        fontFamily: fontes.negrito,
    },
});
