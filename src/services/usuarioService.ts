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

type UsuarioResponse = {
  success: boolean;
  data: Usuario;
};

export async function buscarUsuario(token: string) {
  return apiFetch<UsuarioResponse>("/api/v1/usuario", {
    method: "GET",
    token,
  });
}

export function getUrlFotoUsuario(foto: string | null) {
  if (!foto) return null;

  if (foto.startsWith("http://") || foto.startsWith("https://")) {
    return foto;
  }

  return `${API_URL}/dash/assets/img/${foto}`;
}
