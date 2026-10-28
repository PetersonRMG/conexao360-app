import type { ImageSourcePropType } from "react-native";

/**
 * Dados VISUAIS de demonstração transcritos da tela antiga de Eventos.
 * Não confundir com registros publicados no banco de produção.
 * Substituir por um service da API de eventos quando o endpoint for validado.
 */
export const EVENTOS_SAO_DEMONSTRATIVOS = true;

export type ItemProgramacao = {
  id: string;
  horario: string;
  titulo: string;
  local?: string;
  descricao?: string;
};

export type PalestranteEvento = {
  id: string;
  nome: string;
  assunto?: string;
  foto?: ImageSourcePropType;
};

export type EnqueteEvento = {
  id: string;
  pergunta: string;
  encerrada: boolean;
  // Uma enquete sem API não tem votação simulada.
  opcoes?: string[];
  resultadosPublicados?: boolean;
};

export type EventoApp = {
  id: string;
  titulo: string;
  edicao?: string;
  descricao: string;
  inicio: string; // Horário local no formato YYYY-MM-DDTHH:mm:ss
  termino: string;
  local: string;
  imagem?: ImageSourcePropType;
  programacao: ItemProgramacao[];
  palestrantes: PalestranteEvento[];
  enquetes: EnqueteEvento[];
};

// Mostra apenas dados já visíveis na gravação fornecida.
// A imagem utiliza o mesmo arquivo de demonstração que a Galeria já utiliza.
export const EVENTOS_APP: EventoApp[] = [
  {
    id: "edicao3-demo",
    titulo: "3ª Ed. Conexão 360°",
    edicao: "3ª edição",
    descricao: "Uma experiência presencial de conhecimento, conexões e estratégias para profissionais da advocacia.",
    inicio: "2026-09-21T09:00:00",
    termino: "2026-09-21T18:00:00",
    local: "São Paulo - SP",
    imagem: require("@/assets/images/img/imagem.png"),
    programacao: [
      { id: "p1", horario: "09:00", titulo: "Abertura e boas-vindas", local: "Auditório principal" },
      { id: "p2", horario: "10:00", titulo: "Advocacia, posicionamento e autoridade", local: "Auditório principal" },
      { id: "p3", horario: "11:30", titulo: "Networking estratégico", local: "Espaço Conexões" },
    ],
    palestrantes: [],
    enquetes: [],
  },
];
