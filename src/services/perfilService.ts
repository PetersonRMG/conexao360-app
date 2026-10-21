import { apiFetch } from "@/services/api";

export type StatusConexao = "PROPRIO_PERFIL" | "SEM_CONEXAO" | "PENDENTE_ENVIADA" | "PENDENTE_RECEBIDA" | "CONECTADO";

export type UsuarioPerfil = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string | null;
  area_atuacao_usuario: string | null;
  perfil_usuario: string;
  estado_usuario: string | null;
  sobre_usuario: string | null;
  // Campos opcionais: o PerfilController pode não enviá-los ainda
  email_usuario?: string | null;
  instagram_usuario?: string | null;
  linkedin_usuario?: string | null;
  youtube_usuario?: string | null;
  tiktok_usuario?: string | null;
  facebook_usuario?: string | null;
  site_usuario?: string | null;
};

export type PerfilData = {
  usuario: UsuarioPerfil;
  conexoes_count: number;
  status_conexao: StatusConexao;
  id_conexao: number | null;
  pode_conectar: boolean;
};

export type PerfilResponse = {
  success: boolean;
  data: PerfilData;
};

export async function buscarPerfilUsuario(token: string, idUsuario: number): Promise<PerfilResponse> {
  return apiFetch<PerfilResponse>(`/api/v1/usuarios/${idUsuario}`, {
    method: "GET",
    token,
  });
}
