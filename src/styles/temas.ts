import { cores } from "./variaveis";

export const temaEscuro = {
    fundo: cores.preto,
    header: cores.pretoPrincipal,
    footer: cores.pretoPrincipal,

    card: "#151515",
    cardSecundario: "#1E1E1E",
    input: "#1E1E1E",

    texto: cores.branco,
    textoSecundario: "#AFAFAF",
    textoSobreDestaque: "#0A0909",

    destaque: cores.douradoPrincipal,
    borda: cores.douradoPrincipal,
    linha: "#2A2A2A",

    overlay: "rgba(10, 9, 9, 0.80)",
    pressionado: "#2A2A2A",
};

export const temaClaro = {
    fundo: "#F3F0E9",
    header: "#F6EFE4",
    footer: "#F6EFE4",

    card: "#FFFFFF",
    cardSecundario: "#EEEAE2",
    input: "#F8F5EE",

    texto: "#24201C",
    textoSecundario: "#77716A",
    textoSobreDestaque: "#0A0909",

    destaque: cores.douradoPrincipal,
    borda: cores.douradoPrincipal,
    linha: "#D8D1C5",

    overlay: "rgba(243, 240, 233, 0.88)",
    pressionado: "#E2DDD3",
};

export type CoresTema = typeof temaEscuro;
