import { cores } from "./variaveis";

/** Todos os componentes devem consultar coresTema, nunca a cor do sistema. */
export const temaEscuro = {
  fundo: cores.fundoEscuro,
  header: cores.headerEscuro,
  footer: cores.footerEscuro,
  card: cores.cardEscuro,
  cardSecundario: cores.cardSecundarioEscuro,
  input: cores.inputEscuro,
  texto: cores.textoEscuro,
  textoSecundario: cores.textoSecundarioEscuro,
  destaque: cores.douradoPrincipal,
  destaqueTexto: cores.douradoPrincipal,
  textoSobreDestaque: cores.pretoPrincipal,
  borda: cores.bordaEscura,
  linha: cores.linhaEscura,
  sucesso: cores.verdeOnline,
  erro: cores.erro,
  overlay: cores.overlayEscuro,
};

export const temaClaro = {
  fundo: cores.fundoClaro,
  header: cores.headerClaro,
  footer: cores.footerClaro,
  card: cores.cardClaro,
  cardSecundario: cores.cardSecundarioClaro,
  input: cores.inputClaro,
  texto: cores.textoClaro,
  textoSecundario: cores.textoSecundarioClaro,
  destaque: cores.douradoTextoClaro,
  destaqueTexto: cores.douradoTextoClaro,
  textoSobreDestaque: cores.branco,
  borda: cores.bordaClaro,
  linha: cores.linhaClaro,
  sucesso: cores.verdeOnline,
  erro: cores.erro,
  overlay: "rgba(0,0,0,0.32)",
};

export type CoresTema = typeof temaEscuro;
