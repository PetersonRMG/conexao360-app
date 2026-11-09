import { apiFetch } from "@/services/api";
import type { AlbumGaleria, VideoGaleria } from "@/data/galeriaDados";

type FotoApi = {
  id_foto: number;
  titulo_foto: string;
  descricao_foto: string | null;
  url_foto: string;
};

type AlbumApi = {
  id_album: number;
  titulo_album: string;
  descricao_album: string | null;
  fotos: FotoApi[];
};

type VideoApi = {
  id: number;
  origem?: "SITE" | "PALESTRA";
  titulo: string;
  descricao: string | null;
  url: string;
  capa_url: string | null;
};

type GaleriaApiResponse = {
  success: boolean;
  message?: string;
  data?: { albuns: AlbumApi[]; videos: VideoApi[] };
};

export type GaleriaEventoResultado = {
  albuns: AlbumGaleria[];
  videos: VideoGaleria[];
};

export async function buscarGaleriaEvento(token: string, eventoId: string): Promise<GaleriaEventoResultado> {
  const id = Number(eventoId);
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("Identificador inválido do evento.");
  }
  const resposta = await apiFetch<GaleriaApiResponse>(`/api/v1/eventos/${id}/galeria`, {
    method: "GET",
    token,
  });
  if (
    !resposta.success ||
    !resposta.data ||
    !Array.isArray(resposta.data.albuns) ||
    !Array.isArray(resposta.data.videos)
  ) {
    throw new Error(resposta.message || "Não foi possível carregar a galeria deste evento.");
  }
  return {
    albuns: resposta.data.albuns.map((album) => ({
      id: String(album.id_album),
      eventoId,
      titulo: album.titulo_album,
      descricao: album.descricao_album ?? "",
      categoria: "Oficial",
      fotos: (album.fotos ?? []).map((foto) => ({
        id: String(foto.id_foto),
        titulo: foto.titulo_foto,
        descricao: foto.descricao_foto ?? undefined,
        source: { uri: foto.url_foto },
      })),
    })),
    videos: resposta.data.videos.map((video) => ({
      id: `${video.origem ?? "VIDEO"}-${video.id}`,
      eventoId,
      titulo: video.titulo,
      descricao: video.descricao ?? undefined,
      url: video.url,
      imagem: video.capa_url ? { uri: video.capa_url } : undefined,
    })),
  };
}
