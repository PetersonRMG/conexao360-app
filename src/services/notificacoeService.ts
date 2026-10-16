import {
    apiFetch,
} from "./api";


// =====================================
// USUÁRIO DE ORIGEM DA NOTIFICAÇÃO
// =====================================

export type UsuarioOrigemNotificacao = {
    id_usuario: number;
    nome_usuario: string;
    foto_usuario: string | null;
};


// =====================================
// NOTIFICAÇÃO
// =====================================

export type NotificacaoApi = {
    id_notificacao: number;

    id_usuario_destino: number;
    id_usuario_origem: number | null;

    tipo_notificacao: string;

    titulo_notificacao: string;
    mensagem_notificacao: string | null;

    id_referencia: number | null;
    tipo_referencia: string | null;

    lida_notificacao:
    boolean | number;

    criado_em_notificacao:
    string | null;

    atualizado_em_notificacao:
    string | null;

    usuario_origem?:
    UsuarioOrigemNotificacao | null;
};


// =====================================
// RESPOSTA DA LISTAGEM
// =====================================

type NotificacoesResponse = {
    success: boolean;

    data:
    NotificacaoApi[];
};


// =====================================
// RESPOSTA DA QUANTIDADE NÃO LIDA
// =====================================

type NotificacoesNaoLidasResponse = {
    success: boolean;

    data: {
        quantidade: number;
    };
};


// =====================================
// RESPOSTA DAS AÇÕES
// =====================================

type AcaoNotificacaoResponse = {
    success: boolean;
    message: string;
};


// =====================================
// BUSCAR TODAS AS NOTIFICAÇÕES
// =====================================

export async function buscarNotificacoes(
    token: string
) {

    return apiFetch<NotificacoesResponse>(
        "/api/v1/notificacoes",
        {
            method: "GET",
            token,
        }
    );
}


// =====================================
// BUSCAR QUANTIDADE NÃO LIDA
// =====================================

export async function buscarNotificacoesNaoLidas(
    token: string
) {

    return apiFetch<NotificacoesNaoLidasResponse>(
        "/api/v1/notificacoes/nao-lidas",
        {
            method: "GET",
            token,
        }
    );
}


// =====================================
// MARCAR UMA NOTIFICAÇÃO COMO LIDA
// =====================================

export async function marcarNotificacaoComoLida(
    token: string,
    idNotificacao: number
) {

    return apiFetch<AcaoNotificacaoResponse>(
        `/api/v1/notificacoes/${idNotificacao}/ler`,
        {
            method: "PATCH",
            token,
        }
    );
}


// =====================================
// MARCAR TODAS COMO LIDAS
// =====================================

export async function marcarTodasNotificacoesComoLidas(
    token: string
) {

    return apiFetch<AcaoNotificacaoResponse>(
        "/api/v1/notificacoes/ler-todas",
        {
            method: "PATCH",
            token,
        }
    );
}