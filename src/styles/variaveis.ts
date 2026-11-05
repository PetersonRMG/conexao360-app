/** Design System Conexão 360° — etapa 1 (layout). */
export const cores = {
  // Identidade
  douradoPrincipal: "#D4AF37",
  douradoPrincipalPressed: "#BE9C30",
  douradoTextoClaro: "#976B18",
  douradoBotao: "#F0C247",
  branco: "#F8F8FA",

  // Tema escuro grafite — nunca preto absoluto como fundo principal.
  preto: "#000000",
  pretoPrincipal: "#1B1C21",
  fundoEscuro: "#141414",
  headerEscuro: "#141414",
  // headerEscuro: "#1B1C21",
  footerEscuro: "#202126",
  cardEscuro: "#282930",
  cardSecundarioEscuro: "#303139",
  inputEscuro: "#282930",
  bordaEscura: "#3A3B43",
  linhaEscura: "#3A3B43",
  textoEscuro: "#F8F8FA",
  textoSecundarioEscuro: "#C4C5CC",
  bgPreto80: "#00000080",

  // Tema claro — cores neutras, com dourado apenas nos pontos de destaque.
  fundoClaro: "#F8F7F4",
  headerClaro: "#F8F7F4",
  footerClaro: "#FFFFFF",
  cardClaro: "#FFFFFF",
  cardSecundarioClaro: "#F1F0EC",
  inputClaro: "#FFFFFF",
  bordaClaro: "#E2DED6",
  linhaClaro: "#E2DED6",
  textoClaro: "#1B1C21",
  textoSecundarioClaro: "#65656B",

  verdeOnline: "#00C875",
  erro: "#D86B6B",
  overlayEscuro: "rgba(0,0,0,0.56)",

  // Tokens legados mantidos para telas que serão migradas depois.
  roxoPrincipal: "#282930",
  roxoPrincipal80: "#282930CC",
  btnPress: [{ scale: 0.97 }],
};

/** Escala aprovada para a nova interface (valores em dp/sp do React Native). */
export const tipografia = {
  titulo: 28,
  secao: 22,
  autor: 17,
  corpo: 16,
  botao: 16,
  label: 15,
  legenda: 14,
  abas: 13,
  navegacao: 12,
};

export const fontes = {
  // Fontes Inter usadas SOMENTE nas telas migradas nesta etapa.
  appRegular: "Inter_400Regular",
  appMedium: "Inter_500Medium",
  appSemiBold: "Inter_600SemiBold",
  appBold: "Inter_700Bold",

  // Compatibilidade com as telas antigas até a migração gradual.
  titulo: 28,
  subtitulo: 17,
  btn: 15,
  secao: 20,
  cardTitulo: 15,
  texto: 13,
  textoPequeno: 11,
  meta: 10,
  fina: "Lato_300Light",
  normal: "Lato_400Regular",
  media: "Lato_500Medium",
  semiNegrito: "Lato_600SemiBold",
  negrito: "Lato_700Bold",
  extraNegrito: "Lato_900Black",
  finaItalico: "Lato_300Light_Italic",
  normalItalico: "Lato_400Regular_Italic",
  semiNegritoItalico: "Lato_600SemiBold_Italic",
  negritoItalico: "Lato_700Bold_Italic",
  extraNegritoItalico: "Lato_900Black_Italic",
};
