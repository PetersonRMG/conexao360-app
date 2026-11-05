import { Platform, StyleSheet } from "react-native";
import { cores, fontes, tipografia } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";
export const criarHeaderStyles = (tema: CoresTema) =>
  StyleSheet.create({
    container: { backgroundColor: tema.header },
    header: {
      width: "100%",
      minHeight: 70,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      backgroundColor: tema.header,
      // Sem borda: header e feed formam uma única superfície.
    },
    marcaContainer: {
      flex: 1,
      minWidth: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    logoMarca: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.card,
      borderWidth: 1,
      borderColor: tema.borda,
    },
    nomeProjeto: {
      color: tema.texto,
      fontSize: 19,
      lineHeight: 25,
      fontFamily: fontes.appBold,
    },
    nomeDestaque: { color: tema.destaque },
    acoesHeader: {
      width: 43,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    btnHeader: {
      position: "relative",
      width: 43,
      height: 43,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    },
    btnPressed: { backgroundColor: tema.cardSecundario, transform: cores.btnPress },
    textoPressed: { opacity: 0.7 },
    badgeNotificacao: {
      position: "absolute",
      top: 1,
      right: 0,
      minWidth: 17,
      height: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.erro,
      borderWidth: 1.5,
      borderColor: tema.header,
      borderRadius: 9,
      paddingHorizontal: 3,
    },
    badgeNotificacaoTexto: {
      color: "#FFFFFF",
      fontSize: 10,
      lineHeight: 12,
      fontFamily: fontes.appBold,
    },
    // =========================
    // OFFCANVAS
    // =========================
    offcanvasOverlay: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      backgroundColor: "transparent",
    },
    offcanvasBackdrop: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: tema.overlay,
    },
    offcanvas: {
      height: "100%",
      backgroundColor: tema.fundo,
      borderRightWidth: 1,
      borderRightColor: tema.borda,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 0,
          },
          shadowOpacity: 0.28,
          shadowRadius: 16,
        },
        android: {
          elevation: 16,
        },
        web: {
          boxShadow: "10px 0 30px rgba(0,0,0,0.28)",
        },
      }),
    },
    offcanvasSafeArea: {
      flex: 1,
    },
    // =========================
    // CABEÇALHO DO OFFCANVAS
    // =========================
    offcanvasHeader: {
      minHeight: 70,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      borderBottomWidth: 1,
      borderBottomColor: tema.linha,
    },
    offcanvasTituloArea: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    offcanvasTitulo: {
      color: tema.texto,
      fontSize: tipografia.secao,
      fontFamily: fontes.appBold,
    },
    contadorNotificacoes: {
      minWidth: 27,
      height: 27,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.destaque,
      borderRadius: 14,
      paddingHorizontal: 7,
    },
    contadorNotificacoesTexto: {
      color: tema.textoSobreDestaque,
      fontSize: tipografia.legenda,
      fontFamily: fontes.appBold,
    },
    btnFechar: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
    btnFecharTexto: {
      color: tema.texto,
      fontSize: 31,
      lineHeight: 32,
      fontFamily: fontes.appRegular,
    },
    // =========================
    // FILTROS
    // =========================
    filtrosLinha: {
      minHeight: 67,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 10,
      paddingHorizontal: 18,
      paddingTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: tema.linha,
    },
    filtros: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 22,
    },
    filtro: {
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
      paddingHorizontal: 4,
    },
    filtroAtivo: {
      borderBottomColor: tema.destaque,
    },
    filtroTexto: {
      color: tema.textoSecundario,
      fontSize: tipografia.legenda,
      fontFamily: fontes.appRegular,
    },
    filtroTextoAtivo: {
      color: tema.destaque,
      fontFamily: fontes.appBold,
    },
    marcarTodasTexto: {
      color: tema.destaque,
      fontSize: 13,
      lineHeight: 18,
      fontFamily: fontes.appSemiBold,
      textAlign: "right",
      paddingBottom: 9,
    },
    // =========================
    // LISTA DE NOTIFICAÇÕES
    // =========================
    listaNotificacoes: {
      flex: 1,
    },
    listaNotificacoesConteudo: {
      paddingHorizontal: 14,
      paddingTop: 10,
      paddingBottom: 24,
    },
    notificacaoItem: {
      minHeight: 92,
      flexDirection: "row",
      alignItems: "flex-start",
      borderRadius: 13,
      paddingHorizontal: 10,
      paddingVertical: 12,
    },
    notificacaoNaoLida: {
      backgroundColor: tema.card,
    },
    notificacaoPressed: {
      backgroundColor: tema.cardSecundario,
    },
    notificacaoIconeArea: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.cardSecundario,
      borderRadius: 12,
      marginRight: 10,
    },
    notificacaoIcone: {
      width: 22,
      height: 22,
      resizeMode: "contain",
      tintColor: tema.destaque,
    },
    notificacaoConteudo: {
      flex: 1,
      minWidth: 0,
    },
    notificacaoTitulo: {
      color: tema.texto,
      fontSize: tipografia.corpo,
      lineHeight: 22,
      fontFamily: fontes.appSemiBold,
    },
    notificacaoTituloNaoLida: {
      fontFamily: fontes.appBold,
    },
    notificacaoDescricao: {
      color: tema.textoSecundario,
      fontSize: tipografia.legenda,
      lineHeight: 20,
      fontFamily: fontes.appRegular,
      marginTop: 3,
    },
    notificacaoTempo: {
      color: tema.textoSecundario,
      fontSize: tipografia.legenda,
      fontFamily: fontes.appRegular,
      marginTop: 7,
    },
    notificacaoStatusArea: {
      width: 18,
      alignItems: "flex-end",
      paddingTop: 5,
    },
    notificacaoPonto: {
      width: 8,
      height: 8,
      backgroundColor: tema.destaque,
      borderRadius: 4,
    },
    separadorNotificacao: {
      height: 1,
      backgroundColor: tema.linha,
      marginHorizontal: 10,
    },
    // =========================
    // ESTADO VAZIO
    // =========================
    notificacoesVazio: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 28,
      paddingVertical: 60,
    },
    notificacoesVazioTitulo: {
      color: tema.texto,
      fontSize: 18,
      fontFamily: fontes.appBold,
      marginTop: 12,
    },
    notificacoesVazioTexto: {
      color: tema.textoSecundario,
      fontSize: fontes.textoPequeno,
      lineHeight: 16,
      fontFamily: fontes.appRegular,
      textAlign: "center",
      marginTop: 5,
    },
  });
// Compatibilidade com imports antigos.
export const headerStyles = criarHeaderStyles(temaEscuro);
