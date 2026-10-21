import { apiFetch, API_URL } from "./api";

export type Usuario = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string | null;
  email_usuario: string;
  area_atuacao_usuario: string;
  perfil_usuario: string;
  estado_usuario: string;
  sobre_usuario: string;

  instagram_usuario?: string | null;
  linkedin_usuario?: string | null;
  youtube_usuario?: string | null;
  tiktok_usuario?: string | null;
  facebook_usuario?: string | null;
  site_usuario?: string | null;
};

export type UsuarioBusca = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string | null;

  area_atuacao_usuario: string | null;

  perfil_usuario: string;

  estado_usuario: string | null;

  criado_em_usuario: string | null;
};

type UsuarioResponse = {
  success: boolean;
  data: Usuario;
};

export type UsuariosBuscaResponse = {
  success: boolean;

  data: UsuarioBusca[];

  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

// =====================================
// USUÁRIO LOGADO
// =====================================

export async function buscarUsuario(token: string) {
  return apiFetch<UsuarioResponse>("/api/v1/usuario", {
    method: "GET",
    token,
  });
}

// =====================================
// PESQUISAR USUÁRIOS
// =====================================

export async function buscarUsuarios(token: string, busca: string = "", pagina: number = 1) {
  const parametros: string[] = [`page=${pagina}`];

  const buscaLimpa = busca.trim();

  if (buscaLimpa) {
    parametros.push(`busca=${encodeURIComponent(buscaLimpa)}`);
  }

  const query = parametros.join("&");

  return apiFetch<UsuariosBuscaResponse>(`/api/v1/usuarios?${query}`, {
    method: "GET",
    token,
  });
}

// =====================================
// FOTO DO USUÁRIO
// =====================================

export function getUrlFotoUsuario(foto: string | null) {
  if (!foto) {
    return null;
  }

  if (foto.startsWith("http://") || foto.startsWith("https://")) {
    return foto;
  }

  return `${API_URL}/dash/assets/img/${foto}`;
}
