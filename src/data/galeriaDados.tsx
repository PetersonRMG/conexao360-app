import type { ImageSourcePropType } from "react-native";

/**
 * Dados demonstrativos: não representam registros reais do evento.
 * Substituir estes arrays por dados da API quando os endpoints de galeria existirem.
 */
export type EventoGaleria = {
  id: string;
  nome: string;
};

export type FotoGaleria = {
  id: string;
  titulo: string;
  descricao?: string;
  source: ImageSourcePropType;
};

export type AlbumGaleria = {
  id: string;
  eventoId: string;
  titulo: string;
  descricao: string;
  categoria: string;
  destaque?: boolean;
  fotos: FotoGaleria[];
};

export type VideoGaleria = {
  id: string;
  eventoId: string;
  titulo: string;
  descricao?: string;
  palestrante?: string;
  url: string;
  imagem?: ImageSourcePropType;
};

export const EVENTOS_GALERIA: EventoGaleria[] = [
  { id: "edicao3-demo", nome: "Conexão 360° — 3ª edição (demonstração)" },
];

export const ALBUNS_GALERIA: AlbumGaleria[] = [
  {
    id: "album-demonstracao",
    eventoId: "edicao3-demo",
    titulo: "Prévia de álbum",
    descricao: "Exemplo visual para validar o layout e a navegação.",
    categoria: "Demonstração",
    destaque: true,
    fotos: [
      {
        id: "foto-demonstracao",
        titulo: "Foto de demonstração",
        descricao: "Imagem provisória já existente no projeto. Não é uma fotografia oficial do evento.",
        source: require("@/assets/images/img/imagem.png"),
      },
    ],
  },
];

// Ainda não há conexão com tbl_conteudos. Não cadastrar links ou vídeos fictícios.
export const VIDEOS_GALERIA: VideoGaleria[] = [];
export const DADOS_GALERIA_SAO_DEMONSTRATIVOS = true;
