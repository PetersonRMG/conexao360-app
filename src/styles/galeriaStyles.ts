import { StyleSheet } from "react-native";

type PaletaGaleria = {
  texto: string;
  textoSecundario: string;
  destaque: string;
  card: string;
  borda: string;
};

/**
 * Galeria Conexão 360°.
 * Fundo preto e detalhes dourados; não modifica globalStyles, Header ou Menu.
 */
export function criarGaleriaStyles(cores: PaletaGaleria) {
  const dourado = cores.destaque;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#080909",
    },
    area: {
      flex: 1,
      backgroundColor: "#080909",
    },
    scroll: {
      flex: 1,
      backgroundColor: "#080909",
    },
    conteudo: {
      paddingHorizontal: 18,
      paddingTop: 22,
      paddingBottom: 34,
    },

    introducao: {
      marginBottom: 20,
    },
    rotuloLinha: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
    pontoDourado: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: dourado,
    },
    rotulo: {
      fontSize: 10,
      lineHeight: 15,
      fontWeight: "800",
      letterSpacing: 1.7,
      color: dourado,
    },
    titulo: {
      fontSize: 33,
      lineHeight: 39,
      letterSpacing: -0.9,
      fontWeight: "800",
      color: "#F6F4F0",
      marginBottom: 5,
    },
    tituloPonto: {
      color: dourado,
    },
    subtitulo: {
      color: "#BAB8B5",
      fontSize: 14,
      lineHeight: 21,
    },

    capa: {
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 21,
      backgroundColor: "#161616",
      borderWidth: 1,
      borderColor: "#24231F",
    },
    capaImagem: {
      height: 216,
      justifyContent: "space-between",
    },
    capaSombra: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.47)",
    },
    capaTopo: {
      padding: 15,
      alignItems: "flex-start",
    },
    seloCapa: {
      backgroundColor: "rgba(8,8,8,0.86)",
      borderColor: "rgba(218,177,102,0.37)",
      borderWidth: 1,
      borderRadius: 30,
      paddingHorizontal: 11,
      paddingVertical: 6,
    },
    seloCapaTexto: {
      color: "#EAC987",
      fontWeight: "800",
      fontSize: 10,
      letterSpacing: 1.15,
    },
    capaRodape: {
      paddingHorizontal: 17,
      paddingBottom: 15,
    },
    capaLinha: {
      color: "#DFC58A",
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.3,
      marginBottom: 5,
    },
    capaTitulo: {
      color: "#FFFFFF",
      fontSize: 23,
      fontWeight: "800",
      lineHeight: 29,
      maxWidth: "93%",
      marginBottom: 9,
    },
    capaAcao: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    capaAcaoTexto: {
      color: "#F3E7D2",
      fontSize: 13,
      fontWeight: "700",
    },
    capaAcaoSeta: {
      color: "#F3E7D2",
      fontSize: 17,
      fontWeight: "800",
    },
    capaSemFoto: {
      height: 216,
      backgroundColor: "#161718",
      justifyContent: "center",
      alignItems: "center",
      padding: 18,
    },
    capaSemFotoSimbolo: {
      fontSize: 36,
      color: dourado,
      marginBottom: 10,
    },
    capaSemFotoTitulo: {
      fontSize: 20,
      fontWeight: "800",
      color: "#F5F2EC",
      textAlign: "center",
    },
    capaSemFotoTexto: {
      fontSize: 12,
      color: "#B9B4AB",
      textAlign: "center",
      marginTop: 7,
    },

    abas: {
      flexDirection: "row",
      backgroundColor: "#141516",
      borderRadius: 15,
      padding: 4,
      marginBottom: 17,
      borderWidth: 1,
      borderColor: "#252422",
    },
    aba: {
      flex: 1,
      minHeight: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 11,
    },
    abaAtiva: {
      backgroundColor: dourado,
    },
    abaTexto: {
      fontSize: 15,
      fontWeight: "700",
      color: "#C7C5C2",
    },
    abaTextoAtiva: {
      color: "#14110C",
      fontWeight: "800",
    },

    buscaBarra: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#141516",
      borderColor: "#282827",
      borderWidth: 1,
      borderRadius: 13,
      paddingHorizontal: 13,
      minHeight: 48,
      marginBottom: 23,
    },
    buscaIcone: {
      fontSize: 26,
      color: "#C1BDB4",
      width: 30,
      textAlign: "center",
      marginTop: -5,
    },
    buscaInput: {
      flex: 1,
      fontSize: 14,
      color: "#F1F0EB",
      paddingVertical: 9,
      paddingHorizontal: 7,
      minHeight: 46,
    },
    limparBusca: {
      width: 40,
      minHeight: 45,
      alignItems: "center",
      justifyContent: "center",
    },
    limparBuscaTexto: {
      color: "#D6D4CE",
      fontSize: 22,
    },

    cabecalhoSecao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    tituloSecao: {
      color: "#F5F3ED",
      fontSize: 18,
      lineHeight: 25,
      fontWeight: "800",
      letterSpacing: -0.3,
    },
    subtituloSecao: {
      color: "#AFAEAA",
      fontSize: 12,
      lineHeight: 18,
      marginTop: 3,
    },
    contadorSecao: {
      color: dourado,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.3,
      borderWidth: 1,
      borderColor: "#454033",
      borderRadius: 8,
      overflow: "hidden",
      paddingHorizontal: 9,
      paddingVertical: 6,
    },

    grade: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    cardCategoria: {
      width: "48.5%",
      height: 144,
      backgroundColor: "#171819",
      borderRadius: 16,
      borderColor: "#2B2A27",
      borderWidth: 1,
      overflow: "hidden",
      padding: 14,
      justifyContent: "space-between",
      marginBottom: 12,
    },
    cardCategoriaAlternado: {
      backgroundColor: "#1C1B19",
    },
    cardDecoracao: {
      position: "absolute",
      top: -46,
      right: -43,
      height: 116,
      width: 116,
      borderRadius: 58,
      borderWidth: 1,
      borderColor: "rgba(223,184,111,0.14)",
    },
    cardTopo: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    cardIconeArea: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: "#28241D",
      alignItems: "center",
      justifyContent: "center",
    },
    cardIcone: {
      color: dourado,
      fontSize: 23,
      fontWeight: "600",
    },
    cardSeta: {
      color: "#C3B391",
      fontSize: 18,
      fontWeight: "600",
    },
    cardRodape: {
      gap: 4,
    },
    cardTitulo: {
      color: "#F5F4F1",
      fontSize: 15,
      lineHeight: 19,
      fontWeight: "800",
    },
    cardLegenda: {
      color: "#AAA49A",
      fontSize: 11,
      fontWeight: "500",
    },
    notaRodape: {
      color: "#A39F98",
      fontSize: 12,
      lineHeight: 19,
      textAlign: "center",
      marginTop: 12,
      paddingHorizontal: 15,
    },

    resultadosBusca: {
      marginTop: 13,
      gap: 12,
    },
    linhaAlbum: {
      flexDirection: "row",
      alignItems: "center",
      padding: 9,
      backgroundColor: "#18191A",
      borderWidth: 1,
      borderColor: "#302F2C",
      borderRadius: 13,
      minHeight: 68,
      gap: 11,
    },
    linhaAlbumImagem: {
      width: 58,
      height: 49,
      borderRadius: 8,
    },
    linhaAlbumTitulo: {
      flex: 1,
      color: "#F5F3ED",
      fontWeight: "700",
      fontSize: 14,
    },
    buscaVazia: {
      padding: 20,
      alignItems: "center",
    },
    buscaVaziaTitulo: {
      color: "#F5F4EE",
      fontWeight: "800",
      fontSize: 16,
    },
    buscaVaziaTexto: {
      color: "#B1ABA2",
      fontSize: 13,
      marginTop: 5,
    },

    voltar: {
      minHeight: 46,
      alignSelf: "flex-start",
      justifyContent: "center",
      marginBottom: 14,
      paddingRight: 14,
    },
    voltarTexto: {
      color: dourado,
      fontWeight: "700",
      fontSize: 16,
    },
    tituloDetalhe: {
      color: "#F6F5EF",
      fontSize: 26,
      lineHeight: 32,
      fontWeight: "800",
      marginBottom: 4,
    },
    textoDetalhe: {
      color: "#B7B4AE",
      fontSize: 14,
      marginBottom: 22,
    },
    fotoItem: {
      width: "48.5%",
      marginBottom: 15,
    },
    fotoThumb: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 13,
      backgroundColor: "#1B1B1B",
    },
    fotoTitulo: {
      color: "#E9E6DF",
      fontSize: 13,
      fontWeight: "700",
      marginTop: 8,
    },
    vazioDetalhe: {
      marginTop: 18,
      paddingHorizontal: 20,
      paddingVertical: 34,
      backgroundColor: "#141515",
      borderRadius: 20,
      alignItems: "center",
      borderColor: "#292823",
      borderWidth: 1,
    },
    vazioIconeCircular: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#28231B",
      marginBottom: 15,
    },
    vazioIcone: {
      color: dourado,
      fontSize: 30,
    },
    vazioTitulo: {
      color: "#F6F4EF",
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 6,
      textAlign: "center",
    },
    vazioDescricao: {
      color: "#BEBBB5",
      lineHeight: 21,
      fontSize: 13,
      textAlign: "center",
    },
    voltarVazio: {
      paddingHorizontal: 18,
      minHeight: 45,
      justifyContent: "center",
      backgroundColor: dourado,
      borderRadius: 11,
      marginTop: 18,
    },
    voltarVazioTexto: {
      color: "#15120C",
      fontSize: 13,
      fontWeight: "800",
    },

    videosLista: {
      gap: 11,
    },
    videoCard: {
      minHeight: 97,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      backgroundColor: "#171819",
      padding: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#2A2927",
    },
    videoImagemContainer: {
      width: 110,
      height: 76,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "#25221D",
      justifyContent: "center",
      alignItems: "center",
    },
    videoImagem: {
      width: "100%",
      height: "100%",
    },
    videoPlay: {
      color: dourado,
      fontSize: 27,
    },
    videoInfo: {
      flex: 1,
      gap: 5,
    },
    videoTitulo: {
      color: "#F2F1EC",
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 19,
    },
    videoDescricao: {
      color: "#B7B2A8",
      fontSize: 12,
      lineHeight: 17,
    },
    videosVazio: {
      marginTop: 4,
      paddingHorizontal: 26,
      paddingVertical: 35,
      backgroundColor: "#171819",
      borderRadius: 19,
      borderWidth: 1,
      borderColor: "#2A2927",
      alignItems: "center",
    },
    videosVazioIconeArea: {
      width: 68,
      height: 68,
      borderRadius: 22,
      borderColor: "#51452C",
      borderWidth: 1,
      backgroundColor: "#302719",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 17,
    },
    videosVazioIcone: {
      color: dourado,
      fontSize: 27,
      marginLeft: 4,
    },
    videosVazioTitulo: {
      color: "#F3F2ED",
      fontSize: 19,
      lineHeight: 26,
      fontWeight: "800",
      textAlign: "center",
    },
    videosVazioTexto: {
      color: "#BEB8AE",
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
      marginTop: 8,
    },

    visualizador: {
      flex: 1,
      backgroundColor: "#070707",
    },
    visualizadorTopo: {
      flexDirection: "row",
      minHeight: 57,
      paddingHorizontal: 17,
      alignItems: "center",
      justifyContent: "space-between",
    },
    visualizadorContador: {
      fontSize: 14,
      color: "#F5F4F1",
      fontWeight: "700",
    },
    visualizadorFechar: {
      minWidth: 48,
      minHeight: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    visualizadorFecharTexto: {
      color: "#FFFFFF",
      fontSize: 27,
    },
    visualizadorImagemArea: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    visualizadorImagem: {
      width: "100%",
      height: "100%",
    },
    visualizadorRodape: {
      paddingHorizontal: 18,
      paddingBottom: 17,
      paddingTop: 12,
      gap: 15,
    },
    visualizadorTitulo: {
      color: "#F6F4EE",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
    visualizadorNavegacao: {
      flexDirection: "row",
      gap: 10,
    },
    visualizadorBotao: {
      flex: 1,
      minHeight: 48,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#242424",
    },
    visualizadorBotaoInativo: {
      opacity: 0.35,
    },
    visualizadorBotaoTexto: {
      color: "#F6F6F6",
      fontSize: 14,
      fontWeight: "700",
    },
  });
}
