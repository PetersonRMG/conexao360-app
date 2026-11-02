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
    id_conteudo: number;
    titulo_conteudo: string;
    descricao_conteudo: string | null;
    url_conteudo: string;
};

type GaleriaApiResponse = {
    success: boolean;
    message?: string;
    data?: {
        id_evento: number;
        albuns: AlbumApi[];
        videos: VideoApi[];
    };
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

    if (!resposta.success || !resposta.data || !Array.isArray(resposta.data.albuns)
        || !Array.isArray(resposta.data.videos)) {
        throw new Error(resposta.message || "Não foi possível carregar a galeria deste evento.");
    }

    return {
        albuns: resposta.data.albuns.map(album => ({
            id: String(album.id_album),
            eventoId: eventoId,
            titulo: album.titulo_album,
            descricao: album.descricao_album ?? "",
            categoria: "Oficial",
            fotos: (album.fotos ?? []).map(foto => ({
                id: String(foto.id_foto),
                titulo: foto.titulo_foto,
                descricao: foto.descricao_foto ?? undefined,
                source: { uri: foto.url_foto },
            })),
        })),
        videos: resposta.data.videos.map(video => ({
            id: String(video.id_conteudo),
            eventoId: eventoId,
            titulo: video.titulo_conteudo,
            descricao: video.descricao_conteudo ?? undefined,
            url: video.url_conteudo,
        })),
    };
}
