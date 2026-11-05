import { StyleSheet } from "react-native";
import { fontes, tipografia, cores } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

/** Perfil — design Conexão 360°: feed contínuo, avatar em destaque e Inter. */
export const criarPerfilStyles = (tema: CoresTema) => StyleSheet.create({
  container: { flex: 1, backgroundColor: tema.fundo },
  scroll: { flex: 1 },
  scrollConteudo: { paddingBottom: 24 },

  topo: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16,
  },
  btnVoltar: {
    minHeight: 44, minWidth: 40, justifyContent: "center", alignItems: "flex-start",
  },
  btnVoltarPressed: { opacity: 0.7 },
  tituloPagina: {
    color: tema.texto, fontSize: tipografia.secao,
    fontFamily: fontes.appBold,
  },
  centroEstado: { minHeight: 180, justifyContent: "center", alignItems: "center", gap: 14 },

  // Capa neutra e decorativa: o backend atual não possui foto de capa.
  capa: {
    height: 134, marginHorizontal: 20, borderRadius: 16,
    overflow: "hidden", backgroundColor: tema.cardSecundario,
    borderWidth: 1, borderColor: tema.borda,
    justifyContent: "center", alignItems: "flex-end", paddingRight: 32,
  },
  capaCirculo: {
    position: "absolute", width: 210, height: 210,
    borderRadius: 105, borderWidth: 1, borderColor: tema.destaque,
    opacity: 0.22, top: -80, right: -35,
  },
  capaIcone: { opacity: 0.52 },
  identidade: { paddingHorizontal: 22, paddingBottom: 12 },
  avatarContainer: {
    width: 112, height: 112, borderRadius: 56,
    overflow: "hidden", borderWidth: 3, borderColor: tema.destaque,
    backgroundColor: tema.card, marginTop: -58, marginBottom: 12,
  },
  avatar: { width: "100%", height: "100%" },
  nome: {
    fontSize: 25, lineHeight: 32, color: tema.texto,
    fontFamily: fontes.appBold, marginBottom: 4,
  },
  descricao: {
    fontSize: tipografia.corpo, lineHeight: 23, color: tema.textoSecundario,
    fontFamily: fontes.appRegular,
  },
  informacoes: {
    flexDirection: "row", flexWrap: "wrap", gap: 18,
    alignItems: "center", marginTop: 16,
  },
  informacaoItem: { flexDirection: "row", alignItems: "center", gap: 7 },
  txtInfo: {
    fontSize: tipografia.legenda, color: tema.textoSecundario,
    fontFamily: fontes.appMedium,
  },
  areaBotoes: { flexDirection: "row", gap: 10, marginTop: 20 },
  btnAcao: {
    flex: 1, minHeight: 52, paddingHorizontal: 12, borderRadius: 13,
    backgroundColor: tema.destaque, justifyContent: "center", alignItems: "center",
  },
  btnAcaoAtivo: {
    backgroundColor: tema.cardSecundario,
    borderColor: tema.borda, borderWidth: 1,
  },
  btnAcaoPressed: { opacity: 0.76 },
  txtBtnAcao: {
    fontSize: tipografia.botao, color: cores.pretoPrincipal,
    fontFamily: fontes.appSemiBold,
  },
  txtBtnAcaoAtivo: { color: tema.texto },
});

export const perfilStyles = criarPerfilStyles(temaEscuro);
