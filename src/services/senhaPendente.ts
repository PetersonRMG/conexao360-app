// Dados temporários apenas em memória. Nunca inclua senha, código ou token na URL.
// Ao atualizar a página no Expo Web, o fluxo deverá ser iniciado novamente.

export type RecuperacaoPendente = {
    tipo: "recuperacao";
    email: string;
    enviadoEm: number;
    codigo?: string;
};

export type AlteracaoPendente = {
    tipo: "alteracao";
    senhaAtual: string;
    novaSenha: string;
    confirmarSenha: string;
    enviadoEm: number;
};

export type SenhaPendente = RecuperacaoPendente | AlteracaoPendente;

let pendente: SenhaPendente | null = null;

export function iniciarRecuperacaoSenha(email: string): void {
    pendente = { tipo: "recuperacao", email, enviadoEm: Date.now() };
}

export function iniciarAlteracaoSenha(
    senhaAtual: string,
    novaSenha: string,
    confirmarSenha: string,
): void {
    pendente = {
        tipo: "alteracao",
        senhaAtual,
        novaSenha,
        confirmarSenha,
        enviadoEm: Date.now(),
    };
}

export function obterSenhaPendente(): SenhaPendente | null {
    return pendente;
}

export function registrarReenvioSenha(): SenhaPendente | null {
    if (!pendente) return null;
    pendente = { ...pendente, enviadoEm: Date.now(), ...(pendente.tipo === "recuperacao" ? { codigo: undefined } : {}) };
    return pendente;
}

export function guardarCodigoRecuperacao(codigo: string): void {
    if (!pendente || pendente.tipo !== "recuperacao") return;
    pendente = { ...pendente, codigo };
}

export function limparSenhaPendente(): void {
    pendente = null;
}
