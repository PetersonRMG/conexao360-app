export const API_URL = "http://localhost:8081";
// export const API_URL = "http://192.168.56.1:8081";
//export const API_URL = "https://hardsettings.tipi5.smpsistema.com.br/conexao";

type ApiOptions = RequestInit & {
  token?: string;
};

export async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const usandoFormData = typeof FormData !== "undefined" && rest.body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,

    headers: {
      Accept: "application/json",

      ...(usandoFormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao realizar requisição.");
  }

  return data;
}
