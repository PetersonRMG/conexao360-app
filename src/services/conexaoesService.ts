import { apiFetch } from "@/services/api";

export type Conexao = {
    id_conexao: number;
    id_usuario_solicitante: number;
    id_usuario_destino: number;
    status_conexao: string;
    criado_em_conexao?: string;
    atualizado_em_conexao?: string;
};

type ConexaoResponse = {
    success: boolean;
    message: string;
    data?: Conexao;
};

export async function solicitarConexao(
    token: string,
    idUsuario: number,
): Promise<ConexaoResponse> {
    return apiFetch<ConexaoResponse>(
        `/api/v1/conexoes/${idUsuario}`,
        {
            method: "POST",
            token,
        },
    );
}

export async function aceitarConexao(
    token: string,
    idConexao: number,
): Promise<ConexaoResponse> {
    return apiFetch<ConexaoResponse>(
        `/api/v1/conexoes/${idConexao}/aceitar`,
        {
            method: "PATCH",
            token,
        },
    );
}

export async function recusarConexao(
    token: string,
    idConexao: number,
): Promise<ConexaoResponse> {
    return apiFetch<ConexaoResponse>(
        `/api/v1/conexoes/${idConexao}/recusar`,
        {
            method: "PATCH",
            token,
        },
    );
}

export async function removerConexao(
    token: string,
    idConexao: number,
): Promise<ConexaoResponse> {
    return apiFetch<ConexaoResponse>(
        `/api/v1/conexoes/${idConexao}`,
        {
            method: "DELETE",
            token,
        },
    );
}