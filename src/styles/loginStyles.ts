import { StyleSheet } from "react-native";
import { fontes } from "./variaveis";

const loginStyle = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1015", alignItems: "center" },
  background: { flex: 1, width: "100%", maxWidth: 440 },
  overlay: { flex: 1, backgroundColor: "rgba(6,8,12,0.24)" },
  safeArea: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 34 },
  conteudo: { flexGrow: 1, justifyContent: "space-between" },
  conteudoTopo: { alignItems: "center", paddingBottom: 12 },
  conteudoBtns: { width: "100%", alignItems: "stretch", marginTop: 30 },
  heading: { fontSize: 27, fontFamily: fontes.appBold, color: "#FFFFFF", textAlign: "center" },
  description: {
    fontFamily: fontes.appRegular, fontSize: 15, lineHeight: 22,
    color: "#F1F0EF", textAlign: "center", marginTop: 9, marginBottom: 23,
  },
  form: { width: "100%", gap: 12 },
  input: {
    flexDirection: "row", alignItems: "center", height: 56,
    borderRadius: 13, borderWidth: 1, borderColor: "rgba(222,220,218,0.40)",
    backgroundColor: "rgba(24,25,30,0.87)", paddingHorizontal: 15,
  },
  icone: { width: 22, height: 22, marginRight: 12, resizeMode: "contain" },
  txtInput: {
    flex: 1, paddingVertical: 0, color: "#FFFFFF", fontFamily: fontes.appRegular,
    fontSize: 16, backgroundColor: "transparent",
  },
  mostrarSenha: { width: 22, height: 22, resizeMode: "contain" },
  revealButton: { padding: 10, marginRight: -8 },
  esquecidaRow: { alignItems: "flex-end", marginTop: 13, marginBottom: 23 },
  txtEsqueciSenha: { fontFamily: fontes.appSemiBold, color: "#F0C247", fontSize: 14 },
  btnEntrar: {
    height: 56, borderRadius: 13, backgroundColor: "#F0C247",
    justifyContent: "center", alignItems: "center", width: "100%",
  },
  btnEntrarPressed: { opacity: 0.85 },
  btnDesabilitado: { opacity: 0.65 },
  textBtn: { fontFamily: fontes.appBold, color: "#1B1C21", fontSize: 16 },
  separator: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 23, marginBottom: 17 },
  line: { height: 1, backgroundColor: "rgba(255,255,255,0.40)", flex: 1 },
  separatorText: { color: "#F0ECE9", fontFamily: fontes.appRegular, fontSize: 13 },
  btnCriar: {
    height: 54, borderRadius: 13, borderWidth: 1.5, borderColor: "#E8B62E",
    backgroundColor: "rgba(13,14,17,0.80)", alignItems: "center", justifyContent: "center",
  },
  btnCriarPressed: { backgroundColor: "rgba(212,175,55,0.14)" },
  textCriar: { color: "#F0C247", fontFamily: fontes.appBold, fontSize: 16 },
  slogan: { alignItems: "center", paddingTop: 34 },
  sloganTitulo: {
    color: "#F0C247", fontFamily: fontes.appMedium,
    textTransform: "uppercase", fontSize: 14, letterSpacing: 0.4,
  },
  sloganSubtitulo: {
    color: "#FFFFFF", fontFamily: fontes.appBold,
    fontSize: 21, textAlign: "center", marginTop: 3,
  },
  x: { color: "#F0C247" },
  erroBox: {
    marginTop: 13, paddingVertical: 11, paddingHorizontal: 13,
    borderRadius: 10, borderWidth: 1, borderColor: "#CA6868", backgroundColor: "rgba(53,31,36,0.94)",
  },
  erroText: {
    fontFamily: fontes.appRegular, color: "#FFD8D8", fontSize: 14,
    lineHeight: 20, textAlign: "center",
  },
});

export default loginStyle;
