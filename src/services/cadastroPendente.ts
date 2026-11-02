import type { DadosCadastroVerificado } from "@/services/verificacaoEmailService";

// O cadastro é mantido somente na memória durante a navegação entre telas.
// Não armazenar a senha na URL, em AsyncStorage ou em parâmetros do router.
export type CadastroPendente = {
    dados: Omit<DadosCadastroVerificado, "codigo">;
    enviadoEm: number;
};

let cadastroPendente: CadastroPendente | null = null;

export function salvarCadastroPendente(
    dados: Omit<DadosCadastroVerificado, "codigo">,
): void {
    cadastroPendente = { dados, enviadoEm: Date.now() };
}

export function obterCadastroPendente(): CadastroPendente | null {
    return cadastroPendente;
}

export function registrarReenvioCadastro(): CadastroPendente | null {
    if (!cadastroPendente) return null;
    cadastroPendente = { ...cadastroPendente, enviadoEm: Date.now() };
    return cadastroPendente;
}

export function limparCadastroPendente(): void {
    cadastroPendente = null;
}
