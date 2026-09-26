import { apiFetch } from "./api";

type LoginResponse = {
  success: boolean;

  message: string;

  data: {
    token: string;

    usuario: {
      id_usuario: number;
      nome_usuario: string;
      email_usuario: string;
      perfil_usuario: string;
    };
  };
};

export async function login(email: string, senha: string) {
  return apiFetch<LoginResponse>("/api/v1/auth/login", {
    method: "POST",

    body: JSON.stringify({
      email,
      senha,
      device_name: "app-conexao360",
    }),
  });
}
