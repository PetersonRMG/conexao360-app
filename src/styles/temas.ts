import { cores } from "./variaveis";


export const temaEscuro = {

    // =========================
    // ESTRUTURA
    // =========================

    fundo:
        cores.fundoEscuro,

    header:
        "#0D0D0D",

    footer:
        "#0D0D0D",


    // =========================
    // SUPERFÍCIES
    // =========================

    card:
        cores.cardEscuro,

    cardSecundario:
        cores.cardSecundarioEscuro,

    input:
        cores.inputEscuro,


    // =========================
    // TEXTO
    // =========================

    texto:
        cores.textoEscuro,

    textoSecundario:
        cores.textoSecundarioEscuro,


    // =========================
    // DESTAQUE
    // =========================

    destaque:
        cores.douradoPrincipal,

    destaqueTexto:
        cores.douradoPrincipal,

    textoSobreDestaque:
        cores.pretoPrincipal,


    // =========================
    // LINHAS / BORDAS
    // =========================
    // Borda normal NÃO é mais dourada.
    // O dourado fica reservado para seleção,
    // CTA e elementos realmente importantes.

    borda:
        cores.bordaEscura,

    linha:
        cores.linhaEscura,


    // =========================
    // ESTADOS
    // =========================

    sucesso:
        cores.verdeOnline,

    erro:
        cores.erro,

    overlay:
        cores.overlayEscuro,

};


export const temaClaro = {

    // =========================
    // ESTRUTURA
    // =========================

    fundo:
        cores.fundoClaro,

    header:
        cores.headerClaro,

    footer:
        cores.footerClaro,


    // =========================
    // SUPERFÍCIES
    // =========================

    card:
        cores.cardClaro,

    cardSecundario:
        cores.cardSecundarioClaro,

    input:
        cores.inputClaro,


    // =========================
    // TEXTO
    // =========================

    texto:
        cores.textoClaro,

    textoSecundario:
        cores.textoSecundarioClaro,


    // =========================
    // DESTAQUE
    // =========================
    // Mais escuro que o dourado do tema dark
    // para manter contraste em fundo claro.

    destaque:
        cores.douradoTextoClaro,

    destaqueTexto:
        cores.douradoTextoClaro,

    textoSobreDestaque:
        cores.branco,


    // =========================
    // LINHAS / BORDAS
    // =========================

    borda:
        cores.bordaClaro,

    linha:
        cores.linhaClaro,


    // =========================
    // ESTADOS
    // =========================

    sucesso:
        cores.verdeOnline,

    erro:
        cores.erro,

    overlay:
        "rgba(0,0,0,0.32)",

};


export type CoresTema =
    typeof temaEscuro;
