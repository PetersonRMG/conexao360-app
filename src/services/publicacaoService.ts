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
};

type PublicacoesResponse = {
  success: boolean;
  data: Publicacao[];
};

export async function buscarPublicacoes(token: string) {
  return apiFetch<PublicacoesResponse>("/api/v1/publicacoes", {
    method: "GET",
    token,
  });
}

export function getUrlMidiaPublicacao(caminho: string | null) {
  if (!caminho) {
    return null;
  }

  if (caminho.startsWith("http://") || caminho.startsWith("https://")) {
    return caminho;
  }

  return `${API_URL}/conexao360/${caminho}`;
}
