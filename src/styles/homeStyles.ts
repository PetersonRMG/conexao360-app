import { Platform, StyleSheet } from "react-native";
import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

/**
 * Home V2 — fiel à referência preto/dourado e creme/dourado.
 * Relevo 3D criado com sombra real + segunda camada deslocada.
 * Não requer bibliotecas extras e preserva os temas existentes.
 */
export const criarHomeStyle = (tema: CoresTema) => {
  const escuro = tema.fundo === temaEscuro.fundo;
  const fundo = tema.fundo;
  const card = escuro ? "#171D20" : "#FFFFFF";
  const entrada = escuro ? "#222A2D" : "#F1EFEC";
  const borda = escuro ? "#2B3438" : "#E8E1D9";
  const bordaDourada = escuro ? "#A17A42" : "#BA9152";
  const texto = tema.texto;
  const textoSuave = tema.textoSecundario;
  const dourado = tema.destaque;
  const sombra = escuro ? "#000000" : "#7B5E3F";

  return StyleSheet.create({
    // Estrutura externa: respeita o container já existente do app.
    container: { flex: 1, backgroundColor: escuro ? "#0A1013" : "#F8F5F0" },

    // Cabeçalho de busca, duas superfícies lado a lado.
    areaBusca: {
      backgroundColor: escuro ? "#0A1013" : "#F8F5F0",
      paddingHorizontal: 14,
      paddingTop: 10,
      paddingBottom: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    inputBusca: {
      flex: 1,
      height: 39,
      borderRadius: 21,
      paddingHorizontal: 13,
      backgroundColor: entrada,
      borderWidth: 1,
      borderColor: borda,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    txtBusca: {
      color: textoSuave,
      fontFamily: fontes.normal,
      fontSize: 12,
    },
    btnFiltrosBusca: {
      width: 39,
      height: 39,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: entrada,
      borderWidth: 1,
      borderColor: borda,
    },
    botaoPressionado: { opacity: 0.8, transform: [{ scale: 0.97 }] },

    // Cinco abas visíveis sem rolagem horizontal.
    filtros: {
      height: 40,
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      backgroundColor: escuro ? "#0A1013" : "#F8F5F0",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borda,
    },
    filtro: {
      flex: 1,
      minWidth: 0,
      paddingHorizontal: 1,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    filtroAtivo: { borderBottomColor: dourado },
    txtFiltro: {
      color: textoSuave,
      fontSize: 11.5,
      fontFamily: fontes.normal,
      textAlign: "center",
    },
    txtFiltroAtivo: {
      color: dourado,
      fontFamily: fontes.negrito,
    },

    scroll: { flex: 1, width: "100%" },
    scrollConteudo: { paddingHorizontal: 14, paddingBottom: 30 },

    // Banner: o visual e a tipografia são da imagem original do evento.
    bannerElevacao: {
      marginTop: 13,
      marginHorizontal: 1,
      marginBottom: 1,
      position: "relative",
    },
    bannerSombraFundo: {
      position: "absolute",
      top: 7,
      bottom: -5,
      left: 7,
      right: 7,
      borderRadius: 16,
      backgroundColor: escuro ? "#000000" : "#D4B585",
      opacity: escuro ? 0.85 : 0.42,
    },
    bannerContainer: {
      width: "100%",
      height: 190,
      borderRadius: 16,
      overflow: "hidden",
      borderWidth: 1.2,
      borderColor: bordaDourada,
      backgroundColor: entrada,
      ...(Platform.select({
        ios: {
          shadowColor: sombra,
          shadowOpacity: escuro ? 0.42 : 0.22,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 11,
        },
        android: { elevation: 7 },
        default: { shadowColor: sombra, shadowOpacity: 0.25, shadowRadius: 9 },
      }) ?? {}),
    },
    bannerPressionado: { transform: [{ scale: 0.99 }], opacity: 0.97 },
    banner: { width: "100%", height: "100%" },
    indicadores: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 13,
      gap: 6,
      minHeight: 9,
    },
    indicador: {
      height: 6,
      width: 6,
      backgroundColor: textoSuave,
      borderRadius: 4,
      opacity: 0.35,
    },
    indicadorAtivo: {
      height: 7,
      width: 7,
      borderRadius: 4,
      backgroundColor: dourado,
    },

    // Cabeçalho da listagem.
    secaoTopo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
      marginBottom: 12,
      paddingHorizontal: 1,
    },
    tituloSecao: {
      fontSize: 19,
      color: texto,
      fontFamily: fontes.negrito,
      letterSpacing: -0.45,
    },
    verTodas: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingVertical: 6,
    },
    verTodasTexto: {
      color: dourado,
      fontFamily: fontes.negrito,
      fontSize: 11,
    },

    // 3D: camada inferior com deslocamento + borda clara + sombra iOS / elevation Android.
    // A profundidade é propositadamente sutil, como na referência premium.
    cardCamada: { position: "relative", marginBottom: 12, paddingBottom: 2 },
    cardBase3d: {
      position: "absolute",
      top: 3,
      left: 1.5,
      right: 1.5,
      bottom: -1,
      borderRadius: 14,
      backgroundColor: escuro ? "#101518" : "#E8DFD4",
      borderWidth: 1,
      borderColor: escuro ? "#252D30" : "#DED4C8",
      opacity: 0.75,
    },
    cardPublicacao: {
      width: "100%",
      borderRadius: 14,
      paddingHorizontal: 12,
      paddingTop: 11,
      paddingBottom: 9,
      backgroundColor: card,
      borderWidth: 1,
      borderColor: borda,
      overflow: "visible",
      ...(Platform.select({
        ios: {
          shadowColor: sombra,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: escuro ? 0.19 : 0.11,
          shadowRadius: 8,
        },
        android: { elevation: 2 },
        default: { shadowColor: sombra, shadowOpacity: escuro ? 0.15 : 0.1, shadowRadius: 7 },
      }) ?? {}),
    },
    cardReflexo: {
      position: "absolute",
      left: 26,
      right: 26,
      top: 0,
      height: 1,
      backgroundColor: escuro ? "#8F784F" : "#FFFFFF",
      opacity: escuro ? 0.27 : 0.75,
    },
    publicacaoHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      minHeight: 38,
    },
    avatarPublicacao: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: bordaDourada,
      marginRight: 9,
    },
    autorContainer: { flex: 1, minWidth: 0 },
    nomeAutor: {
      fontSize: 12.6,
      fontFamily: fontes.negrito,
      color: texto,
      lineHeight: 17,
    },
    tempoPublicacao: {
      fontSize: 10,
      fontFamily: fontes.normal,
      color: textoSuave,
      marginTop: 1,
    },
    botaoMais: {
      paddingVertical: 7,
      paddingHorizontal: 7,
      marginLeft: 5,
      borderRadius: 10,
    },
    conteudoTexto: { marginBottom: 10 },
    textoPublicacao: {
      fontSize: 12.5,
      lineHeight: 18.5,
      color: texto,
      fontFamily: fontes.normal,
    },
    lerMais: { fontSize: 11, fontFamily: fontes.negrito, color: dourado, marginTop: 4 },
    imagemPublicacao: {
      width: "100%",
      height: 183,
      borderRadius: 9,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: borda,
      marginBottom: 10,
    },
    areaContadores: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 8,
      paddingTop: 2,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borda,
    },
    contadorComIcone: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    txtContador: { color: textoSuave, fontSize: 10, fontFamily: fontes.normal },
    acoesPublicacao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 6,
    },
    acao: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      flex: 1,
      paddingVertical: 6,
      borderRadius: 8,
    },
    acaoPressionada: {
      backgroundColor: entrada,
      transform: [{ scale: 0.97 }],
    },
    txtAcao: { color: textoSuave, fontSize: 10.5, fontFamily: fontes.normal },
    txtAcaoAtivo: { color: dourado, fontFamily: fontes.negrito },

    // Placeholders durante a chamada à API.
    skeletonHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    skeletonAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: entrada, marginRight: 10 },
    skeletonAutor: { flex: 1 },
    skeletonLinha: { height: 11, borderRadius: 6, backgroundColor: entrada },
    skeletonLinhaPequena: { height: 8, borderRadius: 5, backgroundColor: entrada, marginTop: 7 },
    skeletonNome: { width: "45%" },
    skeletonData: { width: "25%" },
    skeletonTexto1: { width: "95%", marginTop: 6 },
    skeletonTexto2: { width: "82%", marginTop: 8 },
    skeletonTexto3: { width: "59%", marginTop: 8, marginBottom: 14 },
    skeletonImagem: { width: "100%", height: 160, borderRadius: 10, backgroundColor: entrada },
    skeletonContadores: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borda,
    },
    skeletonContadorCurto: { width: 64, height: 8, borderRadius: 4, backgroundColor: entrada },
    skeletonContadorLongo: { width: 92, height: 8, borderRadius: 4, backgroundColor: entrada },
    skeletonAcoes: { flexDirection: "row", justifyContent: "space-between", paddingTop: 12 },
    skeletonAcao: { width: "26%", height: 11, borderRadius: 5, backgroundColor: entrada },
    semPublicacoes: {
      color: textoSuave,
      fontSize: 13,
      fontFamily: fontes.normal,
      textAlign: "center",
      marginTop: 28,
    },
    // Compatibilidade: estilos legados mantidos para outros componentes.
    header: {
      width: "100%",
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      backgroundColor: tema.header,
      borderBottomWidth: 1,
      borderBottomColor: tema.destaque,
    },

    perfil: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
    },

    fotoPerfil: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: tema.destaque,
      resizeMode: "cover",
    },

    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },

    logo: {
      width: 50,
      height: 50,
      resizeMode: "contain",
    },

    nomeProjeto: {
      color: tema.destaque,
      fontSize: fontes.subtitulo,
      fontFamily: fontes.negrito,
    },

    btnMenu: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },

    btnPressed: {
      backgroundColor: tema.cardSecundario,
      transform: cores.btnPress,
    },

    iconeHeader: {
      width: 25,
      height: 25,
      resizeMode: "contain",
      tintColor: tema.destaque,
    },

    iconeBusca: {
      width: 18,
      height: 18,
      marginRight: 10,
      resizeMode: "contain",
      opacity: 0.7,
    },

    iconeAcao: {
      width: 16,
      height: 16,
      resizeMode: "contain",
      opacity: 0.7,
    },

    menuInferior: {
      width: "100%",
      height: 70,
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 5,
      backgroundColor: tema.footer,
      borderTopWidth: 1,
      borderTopColor: tema.cardSecundario,
    },

    itemMenu: {
      flex: 1,
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
    },

    iconeMenu: {
      width: 22,
      height: 22,
      resizeMode: "contain",
      opacity: 0.65,
    },

    iconeMenuAtivo: {
      opacity: 1,
      tintColor: tema.destaque,
    },

    txtMenu: {
      color: tema.texto,
      fontSize: 9,
      fontFamily: fontes.normal,
      opacity: 0.6,
    },

    txtMenuAtivo: {
      color: tema.destaque,
      fontSize: 9,
      fontFamily: fontes.negrito,
    },

    btnPublicar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tema.destaque,
      marginTop: -18,
      borderWidth: 3,
      borderColor: tema.footer,
    },

    maisPublicar: {
      color: tema.textoSobreDestaque,
      fontSize: 28,
      fontFamily: fontes.negrito,
      lineHeight: 30,
    },

    iconeAcaoAtivo: {
      tintColor: tema.destaque,
      opacity: 1,
    },

    areaComentario: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      gap: 8,
    },

    inputComentario: {
      flex: 1,
      height: 40,
      backgroundColor: tema.input,
      color: tema.texto,
      borderRadius: 20,
      paddingHorizontal: 14,
      fontSize: 11,
      fontFamily: fontes.normal,
    },

    btnEnviarComentario: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: tema.destaque,
    },

    iconeEnviarComentario: {
      width: 21,
      height: 21,
      resizeMode: "contain",
    },
  });
};

// Compatibilidade com telas que ainda importam diretamente o objeto homeStyle.
export const homeStyle = criarHomeStyle(temaEscuro);
