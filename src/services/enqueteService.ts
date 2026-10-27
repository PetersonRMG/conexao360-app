import { apiFetch } from "./api";

export type FiltroEnquete = "todas" | "nao_respondidas" | "respondidas";

export type OpcaoRespostaEnquete = 1 | 2 | 3;

export type CriadorEnquete = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string | null;
  perfil_usuario: string;
};

export type ResultadoOpcaoEnquete = {
  votos: number;
  percentual: number;
};

export type ResultadosEnquete = {
  sim: ResultadoOpcaoEnquete;
  nao: ResultadoOpcaoEnquete;
  outro: ResultadoOpcaoEnquete;
};

export type Enquete = {
  id_enquete: number;

  pergunta_enquete: string;

  status_enquete: string;

  criado_em_enquete: string | null;

  criador: CriadorEnquete | null;

  total_votos: number;

  respondida: boolean;

  minha_resposta: OpcaoRespostaEnquete | null;

  resultados: ResultadosEnquete | null;
};

type MetaEnquetes = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type EnquetesResponse = {
  success: boolean;

  data: Enquete[];

  meta: MetaEnquetes;
};

export type ResponderEnqueteResponse = {
  success: boolean;

  message: string;

  data: Enquete;
};

// =====================================
// LISTAR ENQUETES
// =====================================

export async function buscarEnquetes(
  token: string,
  filtro: FiltroEnquete = "todas",
  pagina: number = 1,
  porPagina: number = 20,
) {
  const parametros = new URLSearchParams({
    filtro,
    page: String(pagina),
    per_page: String(porPagina),
  });

  return apiFetch<EnquetesResponse>(`/api/v1/enquetes?${parametros.toString()}`, {
    method: "GET",
    token,
  });
}

// =====================================
// RESPONDER ENQUETE
// =====================================

export async function responderEnquete(token: string, idEnquete: number, resposta: OpcaoRespostaEnquete) {
  return apiFetch<ResponderEnqueteResponse>(`/api/v1/enquetes/${idEnquete}/resposta`, {
    method: "POST",

    token,

    body: JSON.stringify({
      resposta,
    }),
  });
}
