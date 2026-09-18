import { cores } from "./variaveis";


export const temaEscuro = {

    fundo: cores.pretoPrincipal,

    header: cores.pretoPrincipal,

    footer: cores.pretoPrincipal,

    card: "#151515",

    cardSecundario: "#1E1E1E",

    input: "#1E1E1E",

    texto: cores.branco,

    textoSecundario: "#AFAFAF",

    destaque: cores.douradoPrincipal,

    borda: cores.douradoPrincipal,

};


export const temaClaro = {

    fundo: "#F3F0E9",

    header: "#FFFFFF",

    footer: "#FFFFFF",

    card: "#FFFFFF",

    cardSecundario: "#EEEAE2",

    input: "#F8F5EE",

    texto: "#24201C",

    textoSecundario: "#77716A",

    destaque: cores.douradoPrincipal,

    borda: cores.douradoPrincipal,

};


export type CoresTema =
    typeof temaEscuro;