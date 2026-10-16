import { apiFetch } from "./api";

export type UsuarioAuth = {
  id_usuario: number;
  nome_usuario: string;
  foto_usuario?: string | null;
  email_usuario: string;
  area_atuacao_usuario?: string | null;
  estado_usuario?: string | null;
  sobre_usuario?: string | null;
  perfil_usuario: string;
};

export type AuthResponse = {
  success: boolean;

  message: string;

  data: {
    token: string;

    usuario: UsuarioAuth;
  };
};

export type CadastroUsuarioPayload = {
  nome: string;
  email: string;
  area_atuacao: string;
  estado: string;
  sobre?: string;
  senha: string;
  senha_confirmation: string;
  termos: boolean;
};


// =============================================================
// LOGIN
// =============================================================

export async function login(
  email: string,
  senha: string
) {
  return apiFetch<AuthResponse>(
    "/api/v1/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        senha,
        device_name:
          "app-conexao360",
      }),
    }
  );
}


// =============================================================
// CADASTRO
// =============================================================

export async function cadastrarUsuario(
  dados: CadastroUsuarioPayload
) {
  return apiFetch<AuthResponse>(
    "/api/v1/auth/register",
    {
      method: "POST",

      body: JSON.stringify({
        nome:
          dados.nome,

        email:
          dados.email,

        area_atuacao:
          dados.area_atuacao,

        estado:
          dados.estado,

        sobre:
          dados.sobre ?? "",

        senha:
          dados.senha,

        senha_confirmation:
          dados.senha_confirmation,

        termos:
          dados.termos,

        device_name:
          "app-conexao360",
      }),
    }
  );
}