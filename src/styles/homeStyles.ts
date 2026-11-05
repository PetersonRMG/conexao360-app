import { Platform, StyleSheet } from "react-native";
import { cores, fontes, tipografia } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

/** Feed editorial integrado: divisórias finas, sem relevos ou cartões elevados. */
export const criarHomeStyle = (tema: CoresTema) => {
  const escuro = tema.fundo === temaEscuro.fundo;
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: tema.fundo },
    cabecalhoFeed: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 12,
      backgroundColor: tema.fundo,
    },
    tituloFeed: {
      fontFamily: fontes.appBold,
      fontSize: tipografia.titulo,
      lineHeight: 36,
      letterSpacing: -0.6,
      color: tema.texto,
    },
    subtituloFeed: {
      fontFamily: fontes.appRegular,
      fontSize: tipografia.legenda,
      lineHeight: 20,
      marginTop: 2,
      color: tema.textoSecundario,
    },
    filtros: {
      flexGrow: 0,
      backgroundColor: tema.fundo,
      maxHeight: 49,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tema.linha,
    },
    filtrosConteudo: {
      paddingHorizontal: 10,
      alignItems: "stretch",
      gap: 2,
    },
    filtro: {
      minHeight: 48,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    filtroAtivo: { borderBottomColor: tema.destaque },
    txtFiltro: { fontSize: tipografia.abas, color: tema.textoSecundario, fontFamily: fontes.appMedium },
    txtFiltroAtivo: { color: tema.destaque, fontFamily: fontes.appBold },
    botaoPressionado: { opacity: 0.78 },
    scroll: { flex: 1, width: "100%" },
    scrollConteudo: { paddingHorizontal: 20, paddingBottom: 105 },

    cardCamada: {
      paddingVertical: 0,
      marginBottom: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: tema.linha,
    },
    cardPublicacao: {
      width: "100%",
      paddingTop: 18,
      paddingBottom: 14,
      backgroundColor: tema.fundo,
    },
    publicacaoHeader: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 45,
      marginBottom: 11,
    },
    avatarPublicacao: {
      width: 43,
      height: 43,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: escuro ? tema.destaque : tema.borda,
      marginRight: 11,
    },
    autorContainer: { flex: 1, minWidth: 0 },
    nomeAutor: { fontSize: tipografia.corpo, lineHeight: 22, fontFamily: fontes.appSemiBold, color: tema.texto },
    tempoPublicacao: { fontSize: tipografia.legenda, lineHeight: 19, fontFamily: fontes.appRegular, color: tema.textoSecundario, marginTop: 1 },
    botaoMais: { minWidth: 39, minHeight: 40, alignItems: "center", justifyContent: "center", borderRadius: 9 },
    conteudoTexto: { marginBottom: 12 },
    textoPublicacao: { fontSize: tipografia.corpo, lineHeight: 24, color: tema.texto, fontFamily: fontes.appRegular },
    lerMais: { fontSize: tipografia.legenda, fontFamily: fontes.appSemiBold, color: tema.destaque, marginTop: 6 },
    imagemPublicacao: { width: "100%", height: 215, borderRadius: 14, marginBottom: 10, backgroundColor: tema.card },
    acoesPublicacao: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 24, minHeight: 39 },
    acao: { minHeight: 39, flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 3, borderRadius: 8 },
    acaoPressionada: { backgroundColor: tema.cardSecundario },
    txtAcao: { fontSize: tipografia.legenda, color: tema.textoSecundario, fontFamily: fontes.appMedium },
    txtAcaoAtivo: { color: tema.destaque, fontFamily: fontes.appSemiBold },

    // Placeholders sem cards 3D (mantidos para não alterar o carregamento da API).
    skeletonHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    skeletonAvatar: { width: 43, height: 43, borderRadius: 22, backgroundColor: tema.card, marginRight: 11 },
    skeletonAutor: { flex: 1 },
    skeletonLinha: { height: 12, borderRadius: 6, backgroundColor: tema.card },
    skeletonLinhaPequena: { height: 9, borderRadius: 5, backgroundColor: tema.card, marginTop: 7 },
    skeletonNome: { width: "45%" },
    skeletonData: { width: "30%" },
    skeletonTexto1: { width: "95%", marginTop: 9 },
    skeletonTexto2: { width: "82%", marginTop: 9 },
    skeletonTexto3: { width: "59%", marginTop: 9, marginBottom: 14 },
    skeletonImagem: { width: "100%", height: 160, borderRadius: 12, backgroundColor: tema.card },
    skeletonContadores: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
    skeletonContadorCurto: { width: 60, height: 10, borderRadius: 4, backgroundColor: tema.card },
    skeletonContadorLongo: { width: 92, height: 10, borderRadius: 4, backgroundColor: tema.card },
    skeletonAcoes: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 7 },
    skeletonAcao: { width: "26%", height: 12, borderRadius: 5, backgroundColor: tema.card },
    semPublicacoes: { fontSize: tipografia.corpo, fontFamily: fontes.appRegular, color: tema.textoSecundario, textAlign: "center", marginTop: 30 },
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
