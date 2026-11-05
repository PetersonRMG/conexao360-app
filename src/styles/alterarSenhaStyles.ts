import { StyleSheet } from "react-native";
import { cores, fontes, tipografia } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

/** Estilos da tela Alterar senha — identidade visual Conexão 360°. */
export const criarAlterarSenhaStyles = (tema: CoresTema) => {
  const escuro = tema.fundo === temaEscuro.fundo;
  const acento = tema.destaque;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tema.fundo,
    },
    areaSegura: {
      flex: 1,
    },
    areaFlexivel: {
      flex: 1,
    },
    rolagem: {
      flex: 1,
    },
    conteudo: {
      paddingHorizontal: 20,
      paddingTop: 14,
      paddingBottom: 116, // Espaço para o footer compartilhado.
      gap: 20,
    },
    linhaTitulo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      minHeight: 46,
    },
    botaoVoltar: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 21,
    },
    tituloPagina: {
      color: tema.texto,
      fontSize: tipografia.secao,
      fontFamily: fontes.appSemiBold,
      includeFontPadding: false,
    },
    apresentacao: {
      alignItems: "center",
      paddingTop: 7,
      paddingBottom: 5,
      gap: 7,
    },
    emblemaSeguranca: {
      width: 96,
      height: 96,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 48,
      backgroundColor: escuro ? "#2C2A25" : "#F4EADB",
      marginBottom: 4,
    },
    tituloApresentacao: {
      color: tema.texto,
      fontSize: 26,
      lineHeight: 32,
      fontFamily: fontes.appBold,
      textAlign: "center",
      includeFontPadding: false,
    },
    subtitulo: {
      color: tema.textoSecundario,
      fontSize: tipografia.corpo,
      lineHeight: 24,
      fontFamily: fontes.appRegular,
      textAlign: "center",
      maxWidth: 310,
    },
    formulario: {
      gap: 14,
    },
    grupoCampo: {
      gap: 7,
    },
    rotuloCampo: {
      color: tema.texto,
      fontSize: tipografia.label,
      fontFamily: fontes.appMedium,
      paddingLeft: 2,
    },
    linhaCampo: {
      minHeight: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 4,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: tema.borda,
      backgroundColor: tema.input,
      gap: 12,
    },
    input: {
      flex: 1,
      minWidth: 0,
      height: 54,
      color: tema.texto,
      fontSize: tipografia.corpo,
      fontFamily: fontes.appRegular,
      paddingVertical: 0,
    },
    botaoOlho: {
      width: 45,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    caixaRequisitos: {
      borderColor: escuro ? "#87702E" : "#BE9C30",
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: escuro ? "#282725" : "#FFF9EC",
      paddingVertical: 15,
      paddingHorizontal: 16,
      gap: 11,
    },
    requisitosCabecalho: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      marginBottom: 2,
    },
    tituloRequisitos: {
      color: acento,
      fontSize: 16,
      fontFamily: fontes.appSemiBold,
      flexShrink: 1,
    },
    linhaRequisito: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingLeft: 3,
    },
    textoRequisito: {
      color: tema.texto,
      fontSize: tipografia.legenda,
      fontFamily: fontes.appRegular,
      lineHeight: 21,
      flexShrink: 1,
    },
    caixaErro: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderRadius: 12,
      padding: 13,
      backgroundColor: escuro ? "#3D252A" : "#FDEBEC",
    },
    textoErro: {
      flex: 1,
      color: escuro ? "#FFD8D8" : "#982F39",
      fontSize: tipografia.legenda,
      fontFamily: fontes.appRegular,
      lineHeight: 21,
    },
    botaoPrincipal: {
      minHeight: 56,
      borderRadius: 14,
      backgroundColor: escuro ? cores.douradoBotao : cores.douradoPrincipal,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 9,
      paddingHorizontal: 12,
      marginTop: 6,
    },
    botaoPressionado: {
      opacity: 0.85,
    },
    botaoDesabilitado: {
      opacity: 0.58,
    },
    textoBotaoPrincipal: {
      color: "#1B1C21",
      fontSize: tipografia.botao,
      fontFamily: fontes.appBold,
      textAlign: "center",
    },
    avisoConfirmacao: {
      color: tema.textoSecundario,
      fontFamily: fontes.appRegular,
      fontSize: tipografia.legenda,
      textAlign: "center",
      lineHeight: 21,
      paddingHorizontal: 8,
    },
  });
};
