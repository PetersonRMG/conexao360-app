import { Platform, StyleSheet } from "react-native";
import { cores, fontes, tipografia } from "./variaveis";
import type { CoresTema } from "./temas";

/** Menu lateral simples: linhas integradas ao fundo, sem cards empilhados. */
export const criarMenuModalStyles = (tema: CoresTema) => StyleSheet.create({
  overlay: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
  backdrop: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: tema.overlay },
  offcanvas: {
    height: "100%", backgroundColor: tema.fundo, borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: tema.borda,
    ...Platform.select({ ios: { shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 16, shadowOffset: { width: -5, height: 0 } }, android: { elevation: 15 }, default: {} }),
  },
  safeArea: { flex: 1 },
  header: { minHeight: 65, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitulo: { fontFamily: fontes.appBold, fontSize: tipografia.secao, color: tema.texto },
  btnFechar: { height: 44, width: 44, alignItems: "center", justifyContent: "center" },
  scroll: { flex: 1 },
  scrollConteudo: { paddingHorizontal: 20, paddingTop: 5, paddingBottom: 36 },
  perfilCard: { flexDirection: "row", alignItems: "center", paddingTop: 12, paddingBottom: 22, marginBottom: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: tema.linha },
  avatar: { width: 64, height: 64, borderRadius: 32, borderColor: tema.destaque, borderWidth: 1.5, marginRight: 14 },
  perfilTextoArea: { flex: 1, minWidth: 0 },
  perfilNome: { fontSize: tipografia.autor, lineHeight: 23, color: tema.texto, fontFamily: fontes.appBold },
  perfilAcao: { fontSize: tipografia.legenda, marginTop: 4, color: tema.textoSecundario, fontFamily: fontes.appRegular },
  secaoTitulo: { fontSize: tipografia.legenda, marginTop: 15, marginBottom: 6, color: tema.destaque, fontFamily: fontes.appSemiBold },
  grupo: { marginBottom: 7 },
  item: { minHeight: 51, paddingHorizontal: 7, flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 10 },
  itemPressed: { backgroundColor: tema.cardSecundario },
  itemTitulo: { flex: 1, color: tema.texto, fontSize: tipografia.corpo, fontFamily: fontes.appMedium },
  itemTituloPerigo: { color: tema.erro },
  itemSair: { marginTop: 20, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: tema.linha, borderRadius: 0 },
  switchBase: { width: 45, height: 25, backgroundColor: tema.cardSecundario, padding: 3, borderRadius: 13, justifyContent: "center" },
  switchAtivo: { backgroundColor: cores.douradoPrincipal },
  switchBolinha: { width: 19, height: 19, backgroundColor: tema.textoSecundario, borderRadius: 10 },
  switchBolinhaAtiva: { alignSelf: "flex-end", backgroundColor: tema.textoSobreDestaque },
});
