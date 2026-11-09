import { apiFetch } from "@/services/api";

// O backend retorna nomes de campos do banco; aqui são convertidos para o app.
type RespostaApi<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type ProgramacaoApi = {
  id_programacao: number;
  titulo_programacao: string;
  descricao_programacao: string | null;
  inicio_programacao: string;
  fim_programacao: string | null;
  local_programacao: string | null;
  id_palestrante: number | null;
  palestrante_programacao: string | null;
};

export type AtividadeEvento = {
  id: string;
  titulo: string;
  descricao?: string;
  inicio: string;
  data: string;
  horario: string;
  local?: string;
  palestrante?: string;
  palestranteId?: string;
};

type ResultadoOpcao = { votos: number; percentual: number };
export type ResultadosEnqueteEvento = {
  sim: ResultadoOpcao;
  nao: ResultadoOpcao;
  outro: ResultadoOpcao;
};

type EnqueteApi = {
  id_enquete: number;
  id_evento: number | null;
  pergunta_enquete: string;
  status_enquete: string;
  respondida: boolean;
  minha_resposta: number | null;
  resultados: ResultadosEnqueteEvento | null;
  total_votos: number;
};

export type EnqueteEvento = {
  id: string;
  pergunta: string;
  encerrada: boolean;
  respondida: boolean;
  minhaResposta: number | null;
  resultados: ResultadosEnqueteEvento | null;
  totalVotos: number;
};

type RespostaEnquetesApi = RespostaApi<EnqueteApi[]> & {
  meta?: { current_page?: number; last_page?: number };
};

function validarEventoId(eventoId: string): number {
  const id = Number(eventoId);
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Identificador inválido do evento.");
  }
  return id;
}

function obterData(raw: string): Date | null {
  if (!raw) return null;
  // Datetimes retornados pelo MySQL têm espaço entre data e hora.
  const data = new Date(raw.includes("T") ? raw : raw.replace(" ", "T"));
  return Number.isNaN(data.getTime()) ? null : data;
}

function hora(raw: string | null): string | null {
  const data = raw ? obterData(raw) : null;
  return data
    ? new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(data)
    : null;
}

function mapearEnquete(enquete: EnqueteApi): EnqueteEvento {
  return {
    id: String(enquete.id_enquete),
    pergunta: enquete.pergunta_enquete,
    encerrada: enquete.status_enquete !== "ATIVA",
    respondida: Boolean(enquete.respondida),
    minhaResposta: enquete.minha_resposta ?? null,
    resultados: enquete.resultados ?? null,
    totalVotos: Number(enquete.total_votos ?? 0),
  };
}

export async function buscarProgramacaoEvento(token: string, eventoId: string): Promise<AtividadeEvento[]> {
  const id = validarEventoId(eventoId);
  const resposta = await apiFetch<RespostaApi<ProgramacaoApi[]>>(`/api/v1/eventos/${id}/programacao`, {
    method: "GET",
    token,
  });
  if (!resposta.success || !Array.isArray(resposta.data)) {
    throw new Error(resposta.message || "Não foi possível carregar a programação.");
  }
  return resposta.data.map((item) => {
    const inicio = obterData(item.inicio_programacao);
    const data = inicio
      ? new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(inicio)
      : "Data a confirmar";
    const de = hora(item.inicio_programacao);
    const ate = hora(item.fim_programacao);
    return {
      id: String(item.id_programacao),
      titulo: item.titulo_programacao,
      descricao: item.descricao_programacao ?? undefined,
      inicio: item.inicio_programacao,
      data,
      horario: de ? (ate ? `${de}–${ate}` : de) : "A definir",
      local: item.local_programacao ?? undefined,
      palestrante: item.palestrante_programacao ?? undefined,
      palestranteId: item.id_palestrante == null ? undefined : String(item.id_palestrante),
    };
  });
}

export async function buscarEnquetesEvento(token: string, eventoId: string): Promise<EnqueteEvento[]> {
  const id = validarEventoId(eventoId);
  const resultado: EnqueteEvento[] = [];
  // A rota é paginada, com limite de 20 itens por página.
  for (let pagina = 1; pagina <= 50; pagina++) {
    const resposta = await apiFetch<RespostaEnquetesApi>(
      `/api/v1/enquetes?id_evento=${id}&per_page=20&page=${pagina}`,
      { method: "GET", token },
    );
    if (!resposta.success || !Array.isArray(resposta.data)) {
      throw new Error(resposta.message || "Não foi possível carregar as enquetes.");
    }
    resultado.push(...resposta.data.map(mapearEnquete));
    if (pagina >= (resposta.meta?.last_page ?? 1)) break;
  }
  return resultado;
}

export async function responderEnqueteEvento(
  token: string,
  enqueteId: string,
  resposta: 1 | 2 | 3,
): Promise<EnqueteEvento> {
  const id = Number(enqueteId);
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Enquete inválida.");
  const retorno = await apiFetch<RespostaApi<EnqueteApi>>(`/api/v1/enquetes/${id}/resposta`, {
    method: "POST",
    token,
    body: JSON.stringify({ resposta }),
  });
  if (!retorno.success || !retorno.data) {
    throw new Error(retorno.message || "Não foi possível registrar seu voto.");
  }
  return mapearEnquete(retorno.data);
}
