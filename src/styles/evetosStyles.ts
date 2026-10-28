import { StyleSheet } from "react-native";

type PaletaEvento = {
  fundo: string;
  card: string;
  cardSecundario: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  destaque: string;
};

export function criarEventosStyles(cores: PaletaEvento) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    scroll: {
      flex: 1,
    },
    scrollConteudo: {
      paddingHorizontal: 17,
      paddingTop: 17,
      paddingBottom: 32,
    },
    titulo: {
      color: cores.texto,
      fontSize: 26,
      fontWeight: "800",
      lineHeight: 34,
    },
    subtitulo: {
      color: cores.textoSecundario,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 4,
      marginBottom: 17,
    },
    marcaDemo: {
      color: cores.textoSecundario,
      fontSize: 12,
      lineHeight: 17,
      marginBottom: 14,
    },
    filtros: {
      flexDirection: "row",
      gap: 8,
      paddingBottom: 15,
    },
    filtro: {
      minHeight: 44,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 12,
      backgroundColor: cores.card,
      paddingHorizontal: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    filtroAtivo: {
      backgroundColor: cores.destaque,
      borderColor: cores.destaque,
    },
    filtroTexto: {
      color: cores.textoSecundario,
      fontSize: 14,
      fontWeight: "700",
    },
    filtroTextoAtivo: {
      color: "#17130A",
    },
    barraBusca: {
      minHeight: 48,
      borderRadius: 14,
      backgroundColor: cores.card,
      borderColor: cores.borda,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 13,
      gap: 9,
      marginBottom: 13,
    },
    iconeBusca: {
      color: cores.destaque,
      fontSize: 21,
    },
    campoBusca: {
      color: cores.texto,
      fontSize: 15,
      flex: 1,
      minHeight: 46,
    },
    limparBusca: {
      minWidth: 40,
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    limparTexto: {
      color: cores.textoSecundario,
      fontSize: 19,
    },
    tituloSecao: {
      color: cores.texto,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 11,
    },
    cartaoEvento: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: cores.borda,
      backgroundColor: cores.card,
      overflow: "hidden",
      marginBottom: 13,
    },
    imagemEvento: {
      height: 180,
      justifyContent: "space-between",
    },
    semImagem: {
      height: 180,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: cores.cardSecundario,
    },
    semImagemTexto: {
      color: cores.textoSecundario,
      fontSize: 14,
    },
    imagemSombra: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.42)",
    },
    selo: {
      alignSelf: "flex-start",
      margin: 12,
      backgroundColor: "rgba(10,10,10,0.83)",
      borderRadius: 20,
      paddingHorizontal: 11,
      paddingVertical: 7,
    },
    seloTexto: {
      color: "#F1D291",
      fontSize: 11,
      fontWeight: "800",
    },
    capaTexto: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "800",
      lineHeight: 27,
      marginHorizontal: 14,
      marginBottom: 13,
    },
    cartaoInfo: {
      paddingHorizontal: 15,
      paddingVertical: 14,
    },
    resumo: {
      color: cores.textoSecundario,
      fontSize: 14,
      lineHeight: 21,
      marginBottom: 8,
    },
    linhaMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginBottom: 9,
    },
    meta: {
      color: cores.textoSecundario,
      fontSize: 13,
      flexShrink: 1,
    },
    ponto: {
      color: cores.destaque,
      fontSize: 16,
      fontWeight: "800",
    },
    botaoPrincipal: {
      backgroundColor: cores.destaque,
      borderRadius: 13,
      minHeight: 48,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    botaoPrincipalTexto: {
      color: "#17130A",
      fontSize: 15,
      fontWeight: "800",
    },
    vazio: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 16,
      backgroundColor: cores.card,
      alignItems: "center",
    },
    vazioTitulo: {
      color: cores.texto,
      fontSize: 16,
      fontWeight: "800",
      textAlign: "center",
    },
    vazioTexto: {
      color: cores.textoSecundario,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 8,
      textAlign: "center",
    },
    voltar: {
      minHeight: 45,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      marginBottom: 8,
    },
    voltarTexto: {
      color: cores.destaque,
      fontSize: 15,
      fontWeight: "700",
    },
    detalheTitulo: {
      fontSize: 24,
      lineHeight: 31,
      color: cores.texto,
      fontWeight: "800",
      marginBottom: 6,
    },
    detalheSubtitulo: {
      color: cores.textoSecundario,
      fontSize: 14,
      lineHeight: 21,
      marginBottom: 12,
    },
    miniMeta: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 11,
      marginVertical: 11,
    },
    metaBloco: {
      color: cores.textoSecundario,
      fontSize: 13,
    },
    abas: {
      backgroundColor: cores.card,
      borderColor: cores.borda,
      borderWidth: 1,
      borderRadius: 14,
      flexDirection: "row",
      padding: 4,
      marginBottom: 19,
      gap: 3,
    },
    aba: {
      flex: 1,
      minHeight: 46,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    abaAtiva: {
      backgroundColor: cores.destaque,
    },
    abaTexto: {
      color: cores.textoSecundario,
      fontWeight: "700",
      fontSize: 13,
    },
    abaTextoAtivo: {
      color: "#17130A",
      fontWeight: "800",
    },
    painel: {
      borderWidth: 1,
      borderColor: cores.borda,
      backgroundColor: cores.card,
      borderRadius: 15,
      overflow: "hidden",
      marginBottom: 12,
    },
    painelConteudo: {
      padding: 14,
    },
    painelTitulo: {
      color: cores.texto,
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 5,
    },
    painelTexto: {
      color: cores.textoSecundario,
      fontSize: 14,
      lineHeight: 20,
    },
    itemProgramacao: {
      flexDirection: "row",
      padding: 15,
      gap: 12,
      borderBottomColor: cores.borda,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    horario: {
      minWidth: 51,
      color: cores.destaque,
      fontSize: 14,
      fontWeight: "800",
    },
    atividade: {
      flex: 1,
    },
    atividadeTitulo: {
      color: cores.texto,
      fontSize: 15,
      fontWeight: "700",
      lineHeight: 21,
    },
    atividadeLocal: {
      color: cores.textoSecundario,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 4,
    },
    menuSecao: {
      color: cores.texto,
      fontSize: 17,
      fontWeight: "800",
      marginTop: 11,
      marginBottom: 11,
    },
    aviso: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 14,
      backgroundColor: cores.cardSecundario,
      padding: 16,
      marginBottom: 12,
    },
    avisoTitulo: {
      color: cores.texto,
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 5,
    },
    avisoTexto: {
      color: cores.textoSecundario,
      lineHeight: 21,
      fontSize: 14,
    },
    listaAlbuns: {
      gap: 12,
    },
    album: {
      borderColor: cores.borda,
      borderWidth: 1,
      borderRadius: 14,
      backgroundColor: cores.card,
      overflow: "hidden",
    },
    albumCapa: {
      height: 140,
      backgroundColor: cores.cardSecundario,
      alignItems: "center",
      justifyContent: "center",
    },
    albumInfo: {
      padding: 13,
    },
    albumTitulo: {
      fontSize: 15,
      color: cores.texto,
      fontWeight: "800",
    },
    albumDescricao: {
      fontSize: 13,
      color: cores.textoSecundario,
      lineHeight: 18,
      marginTop: 4,
    },
    linhaVoltar: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 11,
    },
    grade: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    cardFoto: {
      width: "48.5%",
      marginBottom: 14,
    },
    imagemFoto: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 12,
      backgroundColor: cores.cardSecundario,
    },
    descricaoFoto: {
      color: cores.texto,
      fontSize: 13,
      fontWeight: "700",
      marginTop: 6,
    },
    videoRow: {
      padding: 13,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 14,
      backgroundColor: cores.card,
      flexDirection: "row",
      gap: 11,
      alignItems: "center",
      marginBottom: 10,
    },
    videoCapa: {
      width: 96,
      height: 72,
      borderRadius: 10,
      backgroundColor: cores.cardSecundario,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    videoInfo: {
      flex: 1,
    },
    videoTitulo: {
      color: cores.texto,
      fontWeight: "800",
      fontSize: 14,
      lineHeight: 19,
    },
    videoDescricao: {
      color: cores.textoSecundario,
      fontSize: 13,
      lineHeight: 18,
      marginTop: 4,
    },
    play: {
      color: cores.destaque,
      fontSize: 25,
    },
    visualizador: {
      flex: 1,
      backgroundColor: "#080808",
      paddingTop: 32,
      paddingHorizontal: 15,
      paddingBottom: 20,
    },
    visualizadorTopo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 48,
    },
    visualizadorNumero: {
      fontSize: 14,
      color: "#FFFFFF",
    },
    fechar: {
      minWidth: 48,
      minHeight: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    fecharTexto: {
      color: "#FFFFFF",
      fontSize: 25,
    },
    fotoVisualizador: {
      width: "100%",
      flex: 1,
    },
    legenda: {
      color: "#FFFFFF",
      fontSize: 14,
      lineHeight: 20,
      textAlign: "center",
      marginVertical: 10,
    },
    controlesFoto: {
      flexDirection: "row",
      gap: 12,
    },
    controlarFoto: {
      minHeight: 48,
      flex: 1,
      borderWidth: 1,
      borderColor: "#65605A",
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    controlarFotoInativo: {
      opacity: 0.3,
    },
    controlarFotoTexto: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700",
    },
  });
}
