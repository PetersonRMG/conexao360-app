import { apiFetch } from "@/services/api";

type Resposta = { success: boolean; message: string };

export type DadosCadastroVerificado = {
  nome: string;
  email: string;
  area_atuacao: string;
  estado: string;
  sobre: string;
  senha: string;
  senha_confirmation: string;
  termos: boolean;
  codigo: string;
};

type UsuarioSessao = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario: string;
  email_usuario: string;
  area_atuacao_usuario: string;
  estado_usuario: string;
  sobre_usuario: string;
  perfil_usuario: string;
};

export function solicitarCodigoCadastro(email: string): Promise<Resposta> {
  return apiFetch<Resposta>("/api/v1/auth/register/code", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function cadastrarUsuarioVerificado(dados: DadosCadastroVerificado) {
  return apiFetch<Resposta & { data: { token: string; usuario: UsuarioSessao } }>(
    "/api/v1/auth/register",
    { method: "POST", body: JSON.stringify(dados) },
  );
}

export function solicitarCodigoRecuperacao(email: string): Promise<Resposta> {
  return apiFetch<Resposta>("/api/v1/auth/password/code", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Confere o código recebido sem consumi-lo. A troca real da senha
// continuará exigindo o mesmo código no endpoint de reset.
export function verificarCodigoRecuperacao(email: string, codigo: string): Promise<Resposta> {
  return apiFetch<Resposta>("/api/v1/auth/password/verify", {
    method: "POST",
    body: JSON.stringify({ email, codigo }),
  });
}

export function redefinirSenha(
  email: string,
  codigo: string,
  senha: string,
  senha_confirmation: string,
): Promise<Resposta> {
  return apiFetch<Resposta>("/api/v1/auth/password/reset", {
    method: "POST",
    body: JSON.stringify({ email, codigo, senha, senha_confirmation }),
  });
}

export function solicitarCodigoAlteracao(token: string, senha_atual: string): Promise<Resposta> {
  return apiFetch<Resposta>("/api/v1/auth/password/change/code", {
    method: "POST",
    token,
    body: JSON.stringify({ senha_atual }),
  });
}

export function alterarSenha(
  token: string,
  codigo: string,
  senha_atual: string,
  senha: string,
  senha_confirmation: string,
): Promise<Resposta> {
  return apiFetch<Resposta>("/api/v1/auth/password/change", {
    method: "POST",
    token,
    body: JSON.stringify({ codigo, senha_atual, senha, senha_confirmation }),
  });
}
