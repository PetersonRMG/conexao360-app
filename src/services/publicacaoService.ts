import { apiFetch, API_URL } from "./api";

export type UsuarioPublicacao = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string | null;
};

export type Publicacao = {
  id_publicacao: number;
  id_usuario: number;
  texto_publicacao: string | null;
  tipo_midia_publicacao: string | null;
  midia_publicacao: string | null;
  status_publicacao: string;
  criado_em_publicacao: string;
  atualizado_em_publicacao: string;
  usuario: UsuarioPublicacao;
  curtidas_count: number;
  comentarios_count: number;
  curtido_por_mim: boolean | number;
  // Alimentados pela API com withCount / withExists.
  denuncias_count?: number;
  denunciado_por_mim?: boolean | number;
};

export type ImagemNovaPublicacao = {
  uri: string;
  fileName?: string | null;
  mimeType?: string | null;
  file?: any;
};

export type ComentarioPublicacao = {
  id_comentario_publicacao: number;
  id_publicacao: number;
  id_usuario: number;
  texto_comentario_publicacao: string;
  status_comentario_publicacao: string;
  criado_em_comentario_publicacao: string;
  atualizado_em_comentario_publicacao: string;
  usuario: UsuarioPublicacao | null;
};

type PublicacoesResponse = { success: boolean; data: Publicacao[] };
type CriarPublicacaoResponse = { success: boolean; message: string; data: Publicacao };
type CurtidaResponse = {
  success: boolean;
  message: string;
  data: { curtido_por_mim: boolean; curtidas_count: number };
};
type ComentariosResponse = { success: boolean; data: ComentarioPublicacao[] };
type CriarComentarioResponse = {
  success: boolean;
  message: string;
  data: { comentario: ComentarioPublicacao; comentarios_count: number };
};

type RespostaAcaoPublicacao = {
  success: boolean;
  message: string;
  data?: { id_publicacao?: number; total_denuncias?: number; status_publicacao?: string };
};

export async function buscarPublicacoes(token: string) {
  return apiFetch<PublicacoesResponse>("/api/v1/publicacoes", { method: "GET", token });
}

export async function criarPublicacao(token: string, texto: string, imagem?: ImagemNovaPublicacao | null) {
  const formData = new FormData();
  const textoLimpo = texto.trim();
  if (textoLimpo) formData.append("texto_publicacao", textoLimpo);
  if (imagem) {
    if (imagem.file) {
      formData.append("midia_publicacao", imagem.file);
    } else {
      formData.append("midia_publicacao", {
        uri: imagem.uri,
        name: imagem.fileName ?? `publicacao_${Date.now()}.jpg`,
        type: imagem.mimeType ?? "image/jpeg",
      } as any);
    }
  }
  return apiFetch<CriarPublicacaoResponse>("/api/v1/publicacoes", {
    method: "POST",
    token,
    body: formData,
  });
}

export async function curtirPublicacao(token: string, idPublicacao: number) {
  return apiFetch<CurtidaResponse>(`/api/v1/publicacoes/${idPublicacao}/curtidas`, { method: "POST", token });
}

export async function descurtirPublicacao(token: string, idPublicacao: number) {
  return apiFetch<CurtidaResponse>(`/api/v1/publicacoes/${idPublicacao}/curtidas`, { method: "DELETE", token });
}

export async function buscarComentarios(token: string, idPublicacao: number) {
  return apiFetch<ComentariosResponse>(`/api/v1/publicacoes/${idPublicacao}/comentarios`, { method: "GET", token });
}

export async function criarComentario(token: string, idPublicacao: number, texto: string) {
  return apiFetch<CriarComentarioResponse>(`/api/v1/publicacoes/${idPublicacao}/comentarios`, {
    method: "POST",
    token,
    body: JSON.stringify({ texto }),
  });
}

/** Registra denúncia válida; o backend oculta o post para análise. */
export async function denunciarPublicacao(token: string, idPublicacao: number, motivo: string, descricao: string) {
  return apiFetch<RespostaAcaoPublicacao>(`/api/v1/publicacoes/${idPublicacao}/denuncias`, {
    method: "POST",
    token,
    body: JSON.stringify({
      motivo_denuncia: motivo,
      descricao_denuncia: descricao.trim() || null,
    }),
  });
}

/** Retira do feed um post do próprio usuário sem destruir o histórico. */
export async function excluirPublicacao(token: string, idPublicacao: number) {
  return apiFetch<RespostaAcaoPublicacao>(`/api/v1/publicacoes/${idPublicacao}`, {
    method: "DELETE",
    token,
  });
}

export function getUrlMidiaPublicacao(caminho: string | null) {
  if (!caminho) return null;
  if (caminho.startsWith("http://") || caminho.startsWith("https://")) return caminho;
  return `${API_URL}/conexao360/${caminho}`;
}
