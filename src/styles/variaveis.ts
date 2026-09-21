export const cores = {

  // =========================
  // MARCA
  // =========================

  douradoPrincipal: "#D6B26A",
  douradoPrincipalPressed: "#B99653",

  // Dourado com mais contraste para textos
  // e estados ativos no tema claro.
  douradoTextoClaro: "#A77B2B",
  branco: "#FFFDFC",


  // =========================
  // ESCURO
  // =========================

  preto: "#000000",
  pretoPrincipal: "#0A0909",

  fundoEscuro: "#0A0909",

  cardEscuro: "#141414",
  cardSecundarioEscuro: "#1B1B1B",

  inputEscuro: "#202020",

  bordaEscura: "#2B2B2B",
  linhaEscura: "#2B2B2B",

  textoEscuro: "#F6F3ED",
  textoSecundarioEscuro: "#AAA49A",

  bgPreto80: "#00000080",


  // =========================
  // CLARO
  // =========================

  fundoClaro: "#F4F0E8",

  headerClaro: "#FFFDFC",
  footerClaro: "#FFFDFC",
 

  cardClaro: "#FFFFFF",
  cardSecundarioClaro: "#ECE6DC",

  inputClaro: "#F7F3EC",

  bordaClaro: "#DDD4C6",
  linhaClaro: "#E3DBCF",

  textoClaro: "#24201C",
  textoSecundarioClaro: "#746E66",


  // =========================
  // ESTADOS
  // =========================

  verdeOnline: "#00C875",

  erro: "#D86B6B",

  overlayEscuro: "rgba(0,0,0,0.60)",


  // =========================
  // LEGADO
  // =========================
  // Mantidos temporariamente para não quebrar
  // arquivos antigos que ainda referenciam
  // roxoPrincipal / roxoPrincipal80.
  //
  // Eles agora apontam para superfícies neutras,
  // removendo o roxo visual do app.

  roxoPrincipal: "#141414",
  roxoPrincipal80: "#1B1B1BCC",


  // =========================
  // INTERAÇÃO
  // =========================

  btnPress: [{ scale: 0.97 }],

};


export const fontes = {

  // =========================
  // ESCALA PRINCIPAL
  // =========================

  titulo: 28,
  subtitulo: 17,
  btn: 15,

  // Tokens novos para manter hierarquia
  // consistente nas próximas telas.
  secao: 20,
  cardTitulo: 15,
  texto: 13,
  textoPequeno: 11,
  meta: 10,


  // =========================
  // PESOS
  // =========================

  fina: "Lato_300Light",
  normal: "Lato_400Regular",
  media: "Lato_500Medium",
  semiNegrito: "Lato_600SemiBold",
  negrito: "Lato_700Bold",
  extraNegrito: "Lato_900Black",


  // =========================
  // ITÁLICO
  // =========================

  finaItalico: "Lato_300Light_Italic",
  normalItalico: "Lato_400Regular_Italic",
  semiNegritoItalico: "Lato_600SemiBold_Italic",
  negritoItalico: "Lato_700Bold_Italic",
  extraNegritoItalico: "Lato_900Black_Italic",

};


// baixar a fonte
/** npx expo install @expo-google-fonts/lato expo-font */
