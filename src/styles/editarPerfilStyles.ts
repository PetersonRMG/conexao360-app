import { StyleSheet } from "react-native";
import { fontes, tipografia, cores } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

/** Editar perfil — padrão unificado com o feed e o perfil público. */
export const criarEditarPerfilStyles = (tema: CoresTema) => StyleSheet.create({
  container: { flex: 1, backgroundColor: tema.fundo },
  background: { flex: 1, backgroundColor: tema.fundo },
  overlay: { flex: 1, backgroundColor: tema.fundo },
  keyboard: { flex: 1 },
  scroll: { flex: 1 },
  scrollConteudo: { paddingHorizontal: 20, paddingBottom: 32 },

  topo: {
    minHeight: 60, flexDirection: "row", alignItems: "center", gap: 12,
    paddingTop: 8,
  },
  btnVoltar: { width: 42, minHeight: 44, alignItems: "flex-start", justifyContent: "center" },
  btnVoltarPressed: { opacity: 0.7 },
  tituloPagina: {
    color: tema.texto, fontSize: tipografia.secao,
    fontFamily: fontes.appBold,
  },
  apresentacao: { marginTop: 1, marginBottom: 14 },
  aviso: {
    color: tema.textoSecundario, fontSize: tipografia.legenda,
    lineHeight: 21, fontFamily: fontes.appRegular,
  },

  areaAvatar: { alignItems: "center", marginTop: 6, marginBottom: 21 },
  avatarContainer: { width: 112, height: 112, position: "relative" },
  avatar: {
    width: 112, height: 112, borderRadius: 56,
    backgroundColor: tema.card, borderWidth: 3, borderColor: tema.destaque,
  },
  btnEditarFoto: {
    position: "absolute", bottom: 0, right: -3,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: cores.douradoBotao, borderWidth: 3, borderColor: tema.fundo,
    alignItems: "center", justifyContent: "center",
  },
  textoFoto: {
    fontSize: tipografia.legenda, fontFamily: fontes.appSemiBold,
    color: tema.destaque, marginTop: 8, textAlign: "center",
  },
  tituloGrupo: {
    color: tema.texto, fontSize: tipografia.secao,
    fontFamily: fontes.appSemiBold, marginTop: 16, marginBottom: 16,
  },

  campoGrupo: { marginBottom: 16 },
  label: {
    fontSize: tipografia.label, fontFamily: fontes.appMedium,
    color: tema.texto, marginBottom: 8,
  },
  // Cada campo é uma superfície única, sem cartões adicionais à sua volta.
  input: {
    width: "100%", height: 52, paddingHorizontal: 15, paddingVertical: 12,
    borderRadius: 13, borderWidth: 1, borderColor: tema.borda,
    backgroundColor: tema.input, color: tema.texto,
    fontSize: tipografia.corpo, fontFamily: fontes.appRegular,
  },
  inputDescricao: {
    width: "100%", minHeight: 116, paddingHorizontal: 15, paddingVertical: 13,
    borderRadius: 13, borderWidth: 1, borderColor: tema.borda,
    backgroundColor: tema.input, color: tema.texto,
    fontSize: tipografia.corpo, lineHeight: 24, fontFamily: fontes.appRegular,
  },
  seletorEstado: {
    minHeight: 52, paddingHorizontal: 15, borderRadius: 13,
    borderWidth: 1, borderColor: tema.borda,
    backgroundColor: tema.input, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
  },
  valorEstado: { fontSize: tipografia.corpo, fontFamily: fontes.appRegular, color: tema.texto },
  contadorBio: {
    fontSize: tipografia.legenda, fontFamily: fontes.appRegular,
    color: tema.textoSecundario, textAlign: "right", marginTop: -10, marginBottom: 10,
  },
  campoSomenteLeitura: {
    minHeight: 52, justifyContent: "center", paddingHorizontal: 15,
    borderRadius: 13, borderWidth: 1, borderColor: tema.borda,
    backgroundColor: tema.cardSecundario,
  },
  textoSomenteLeitura: {
    color: tema.textoSecundario, fontSize: tipografia.corpo,
    fontFamily: fontes.appRegular,
  },
  // Usado no estado de falha de carregamento.
  cardCampo: {
    backgroundColor: tema.card, borderWidth: 1,
    borderColor: tema.borda, borderRadius: 13,
    padding: 16,
  },
  btnSalvar: {
    minHeight: 54, alignItems: "center", justifyContent: "center",
    borderRadius: 13, backgroundColor: cores.douradoBotao,
    marginTop: 14, marginBottom: 12,
  },
  btnSalvarPressed: { opacity: 0.75 },
  txtSalvar: {
    color: cores.pretoPrincipal, fontSize: tipografia.botao,
    fontFamily: fontes.appBold,
  },
});

export const editarPerfilStyles = criarEditarPerfilStyles(temaEscuro);
