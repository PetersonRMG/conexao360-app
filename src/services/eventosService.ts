import { apiFetch } from "@/services/api";
import type { EventoApp } from "@/data/eventosDados";

type EventoDaApi = {
  id_evento: number;
  titulo_evento: string;
  edicao_evento: number | string | null;
  descricao_evento: string;
  data_inicial_evento: string;
  hora_inicial_evento: string;
  data_termino_evento: string;
  hora_termino_evento: string;
  endereco_evento: string;
  banner_url: string | null;
};

type EventosResponse = {
  success: boolean;
  data: EventoDaApi[];
  message?: string;
};

function dataHoraLocal(data: string, hora: string): string {
  // A API devolve a data e a hora locais do evento, sem conversão de fuso.
  const dia = String(data ?? "").slice(0, 10);
  const horas = String(hora ?? "").slice(0, 8);
  const horaCompleta = horas.length === 5 ? `${horas}:00` : horas;
  return `${dia}T${horaCompleta}`;
}

export async function buscarEventos(token: string): Promise<EventoApp[]> {
  const resposta = await apiFetch<EventosResponse>("/api/v1/eventos", {
    method: "GET",
    token,
  });

  if (!resposta.success || !Array.isArray(resposta.data)) {
    throw new Error(resposta.message || "Resposta inválida ao consultar eventos.");
  }

  return resposta.data.map(evento => ({
    id: String(evento.id_evento),
    titulo: evento.titulo_evento,
    edicao: evento.edicao_evento === null ? undefined : String(evento.edicao_evento),
    descricao: evento.descricao_evento ?? "",
    inicio: dataHoraLocal(evento.data_inicial_evento, evento.hora_inicial_evento),
    termino: dataHoraLocal(evento.data_termino_evento, evento.hora_termino_evento),
    local: evento.endereco_evento ?? "",
    imagem: evento.banner_url ? { uri: evento.banner_url } : undefined,
    // Etapa 1: nunca misturar conteúdos demonstrativos com eventos reais.
    // A vinculação de programação, enquetes e galeria será feita por id_evento.
    programacao: [],
    palestrantes: [],
    enquetes: [],
  }));
}
