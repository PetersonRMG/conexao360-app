import {
  apiFetch,
  API_URL,
} from "./api";


// =====================================
// USUÁRIO DA PUBLICAÇÃO
// =====================================

export type UsuarioPublicacao = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string | null;
};


// =====================================
// PUBLICAÇÃO
// =====================================

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

  curtido_por_mim:
  boolean | number;
};


// =====================================
// COMENTÁRIO
// =====================================

export type ComentarioPublicacao = {
  id_comentario_publicacao: number;

  id_publicacao: number;
  id_usuario: number;

  texto_comentario_publicacao: string;

  status_comentario_publicacao: string;

  criado_em_comentario_publicacao: string;
  atualizado_em_comentario_publicacao: string;

  usuario:
  UsuarioPublicacao | null;
};


// =====================================
// RESPONSES
// =====================================

type PublicacoesResponse = {
  success: boolean;
  data: Publicacao[];
};


type CurtidaResponse = {
  success: boolean;

  message: string;

  data: {
    curtido_por_mim: boolean;
    curtidas_count: number;
  };
};


type ComentariosResponse = {
  success: boolean;

  data: ComentarioPublicacao[];
};


type CriarComentarioResponse = {
  success: boolean;

  message: string;

  data: {
    comentario:
    ComentarioPublicacao;

    comentarios_count:
    number;
  };
};


// =====================================
// BUSCAR PUBLICAÇÕES
// =====================================

export async function buscarPublicacoes(
  token: string
) {

  return apiFetch<PublicacoesResponse>(
    "/api/v1/publicacoes",
    {
      method: "GET",
      token,
    }
  );

}


// =====================================
// CURTIR PUBLICAÇÃO
// =====================================

export async function curtirPublicacao(
  token: string,
  idPublicacao: number
) {

  return apiFetch<CurtidaResponse>(
    `/api/v1/publicacoes/${idPublicacao}/curtidas`,
    {
      method: "POST",
      token,
    }
  );

}


// =====================================
// DESCURTIR PUBLICAÇÃO
// =====================================

export async function descurtirPublicacao(
  token: string,
  idPublicacao: number
) {

  return apiFetch<CurtidaResponse>(
    `/api/v1/publicacoes/${idPublicacao}/curtidas`,
    {
      method: "DELETE",
      token,
    }
  );

}


// =====================================
// BUSCAR COMENTÁRIOS
// =====================================

export async function buscarComentarios(
  token: string,
  idPublicacao: number
) {

  return apiFetch<ComentariosResponse>(
    `/api/v1/publicacoes/${idPublicacao}/comentarios`,
    {
      method: "GET",
      token,
    }
  );

}


// =====================================
// CRIAR COMENTÁRIO
// =====================================

export async function criarComentario(
  token: string,
  idPublicacao: number,
  texto: string
) {

  return apiFetch<CriarComentarioResponse>(
    `/api/v1/publicacoes/${idPublicacao}/comentarios`,
    {
      method: "POST",

      token,

      body:
        JSON.stringify({
          texto,
        }),
    }
  );

}


// =====================================
// URL DA MÍDIA DA PUBLICAÇÃO
// =====================================

export function getUrlMidiaPublicacao(
  caminho: string | null
) {

  if (!caminho) {

    return null;

  }


  if (
    caminho.startsWith(
      "http://"
    )
    ||
    caminho.startsWith(
      "https://"
    )
  ) {

    return caminho;

  }


  return `${API_URL}/conexao360/${caminho}`;

}