import { API_URL, apiFetch } from "@/services/api";
import type { EventoApp } from "@/data/eventoDados";

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

/**
 * Transforma banner_url em uma URL que o Expo Web/Android/iOS possa carregar.
 * A API normalmente devolve URL absoluta. Também aceitamos caminhos relativos
 * e corrigimos URLs de localhost geradas por APP_URL do Laravel em outra porta.
 */
export function resolverUrlBannerEvento(valor: string | null | undefined): string | null {
  if (typeof valor !== "string" || !valor.trim()) return null;

  const caminho = valor.trim();
  if (/^(data:|blob:|javascript:)/i.test(caminho)) return null;

  try {
    const baseApi = API_URL.replace(/\/api\/v\d+\/?$/i, "").replace(/\/+$/, "");
    const api = new URL(`${baseApi}/`);

    if (/^https?:\/\//i.test(caminho)) {
      const imagem = new URL(caminho);

      // Se Laravel enviar http://localhost:80 enquanto a API usa :8081,
      // o dispositivo tentará a porta errada. Utilizamos a origem da API.
      if (/^(localhost|127\.0\.0\.1)$/i.test(imagem.hostname) && imagem.origin !== api.origin) {
        imagem.protocol = api.protocol;
        imagem.host = api.host;

        // Respeita uma eventual instalação Laravel sob /conexao.
        const prefixo = api.pathname.replace(/\/$/, "");
        if (prefixo && !imagem.pathname.startsWith(`${prefixo}/`)) {
          imagem.pathname = `${prefixo}${imagem.pathname}`;
        }
      }

      return imagem.href;
    }

    // O backend também pode enviar "/conexao360/img/evento/banner.png".
    const semBarra = caminho.replace(/^\/+/, "");
    const relativo = /^(evento\/|img\/)/i.test(semBarra)
      ? `conexao360/img/${semBarra.replace(/^img\//i, "")}`
      : semBarra;

    return new URL(relativo, api).href;
  } catch {
    // Evita passar um endereço inválido para o componente ImageBackground.
    return null;
  }
}

export async function buscarEventos(token: string): Promise<EventoApp[]> {
  const resposta = await apiFetch<EventosResponse>("/api/v1/eventos", {
    method: "GET",
    token,
  });

  if (!resposta.success || !Array.isArray(resposta.data)) {
    throw new Error(resposta.message || "Resposta inválida ao consultar eventos.");
  }

  return resposta.data.map((evento) => {
    const urlBanner = resolverUrlBannerEvento(evento.banner_url);
    return {
      id: String(evento.id_evento),
      titulo: evento.titulo_evento,
      edicao: evento.edicao_evento === null ? undefined : String(evento.edicao_evento),
      descricao: evento.descricao_evento ?? "",
      inicio: dataHoraLocal(evento.data_inicial_evento, evento.hora_inicial_evento),
      termino: dataHoraLocal(evento.data_termino_evento, evento.hora_termino_evento),
      local: evento.endereco_evento ?? "",
      imagem: urlBanner ? { uri: urlBanner } : undefined,
      // Programação, enquetes e galeria são consultadas separadamente
      // por id_evento na tela de Eventos; estes arrays mantêm a compatibilidade de tipos.
      programacao: [],
      palestrantes: [],
      enquetes: [],
    };
  });
}
