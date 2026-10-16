import { apiFetch } from "@/services/api";


// =============================================================
// TIPOS
// =============================================================

export type UsuarioConversa = {
    id_usuario: number;
    nome_usuario: string;
    foto_usuario: string | null;
    perfil_usuario?: string;
    status_usuario?: string;
};


export type MensagemConversa = {
    id_mensagem: number;
    id_conversa: number;
    id_usuario_remetente: number;
    texto_mensagem: string;
    lida_mensagem: boolean;
    criado_em_mensagem: string;
    atualizado_em_mensagem?: string;

    remetente?: {
        id_usuario: number;
        nome_usuario: string;
        foto_usuario: string | null;
    };
};


export type ConversaResumo = {
    id_conversa: number;

    usuario: UsuarioConversa;

    ultima_mensagem: MensagemConversa | null;

    nao_lidas_count: number;

    criado_em_conversa: string;

    atualizado_em_conversa: string;
};


export type ConversaAberta = {
    id_conversa: number;

    usuario: UsuarioConversa;

    nova_conversa?: boolean;
};


// =============================================================
// RESPOSTAS DA API
// =============================================================

type ListarConversasResponse = {
    success: boolean;

    data: ConversaResumo[];
};


type AbrirConversaResponse = {
    success: boolean;

    message: string;

    data: ConversaAberta;
};


type ListarMensagensResponse = {
    success: boolean;

    data: {
        conversa: {
            id_conversa: number;

            usuario: UsuarioConversa;
        };

        mensagens: MensagemConversa[];
    };
};


type EnviarMensagemResponse = {
    success: boolean;

    message: string;

    data: MensagemConversa;
};


// =============================================================
// LISTAR CONVERSAS
// =============================================================

export async function listarConversas(
    token: string,
): Promise<ListarConversasResponse> {

    return apiFetch<ListarConversasResponse>(
        "/api/v1/conversas",
        {
            method: "GET",
            token,
        },
    );
}


// =============================================================
// ABRIR OU CRIAR CONVERSA
// =============================================================

export async function abrirConversa(
    token: string,
    idUsuario: number,
): Promise<AbrirConversaResponse> {

    return apiFetch<AbrirConversaResponse>(
        `/api/v1/conversas/${idUsuario}`,
        {
            method: "POST",
            token,
        },
    );
}


// =============================================================
// LISTAR MENSAGENS
// =============================================================

export async function listarMensagens(
    token: string,
    idConversa: number,
): Promise<ListarMensagensResponse> {

    return apiFetch<ListarMensagensResponse>(
        `/api/v1/conversas/${idConversa}/mensagens`,
        {
            method: "GET",
            token,
        },
    );
}


// =============================================================
// ENVIAR MENSAGEM
// =============================================================

export async function enviarMensagem(
    token: string,
    idConversa: number,
    texto: string,
): Promise<EnviarMensagemResponse> {

    return apiFetch<EnviarMensagemResponse>(
        `/api/v1/conversas/${idConversa}/mensagens`,
        {
            method: "POST",

            token,

            body: JSON.stringify({
                texto,
            }),
        },
    );
}