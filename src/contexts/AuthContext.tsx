import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export type UsuarioAutenticado = {
    id_usuario: number;
    nome_usuario: string;
    email_usuario: string;
    perfil_usuario: string;
    foto_usuario?: string | null;

    [chave: string]: unknown;
};

type SessaoSalva = {
    token: string;
    usuario: UsuarioAutenticado;
};

type AuthContextData = {
    token: string | null;
    usuario: UsuarioAutenticado | null;

    carregandoSessao: boolean;

    definirSessao: (
        token: string,
        usuario: UsuarioAutenticado
    ) => Promise<void>;

    limparSessao: () => Promise<void>;
};

const AuthContext =
    createContext<AuthContextData | undefined>(
        undefined
    );

const CHAVE_SESSAO =
    "conexao360_sessao";


// =========================================
// SALVAR SESSÃO
// =========================================

async function salvarSessaoLocal(
    sessao: SessaoSalva | null
) {

    // WEB
    if (Platform.OS === "web") {

        if (
            typeof localStorage ===
            "undefined"
        ) {
            return;
        }

        if (!sessao) {

            localStorage.removeItem(
                CHAVE_SESSAO
            );

            return;
        }

        localStorage.setItem(
            CHAVE_SESSAO,
            JSON.stringify(sessao)
        );

        return;
    }


    // ANDROID / IOS

    if (!sessao) {

        await SecureStore.deleteItemAsync(
            CHAVE_SESSAO
        );

        return;
    }

    await SecureStore.setItemAsync(
        CHAVE_SESSAO,
        JSON.stringify(sessao)
    );

}


// =========================================
// RECUPERAR SESSÃO
// =========================================

async function recuperarSessaoLocal():
    Promise<SessaoSalva | null> {

    try {

        let sessaoString:
            string | null = null;


        // WEB

        if (Platform.OS === "web") {

            if (
                typeof localStorage ===
                "undefined"
            ) {
                return null;
            }

            sessaoString =
                localStorage.getItem(
                    CHAVE_SESSAO
                );

        } else {

            // ANDROID / IOS

            sessaoString =
                await SecureStore
                    .getItemAsync(
                        CHAVE_SESSAO
                    );

        }


        if (!sessaoString) {

            return null;

        }


        const sessao =
            JSON.parse(
                sessaoString
            ) as SessaoSalva;


        if (
            !sessao.token ||
            !sessao.usuario
        ) {

            return null;

        }


        return sessao;


    } catch (error) {

        console.log(
            "ERRO AO RECUPERAR SESSÃO:",
            error
        );

        return null;

    }

}


// =========================================
// PROVIDER
// =========================================

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [
        token,
        setToken,
    ] = useState<string | null>(
        null
    );

    const [
        usuario,
        setUsuario,
    ] =
        useState<UsuarioAutenticado | null>(
            null
        );

    const [
        carregandoSessao,
        setCarregandoSessao,
    ] = useState(true);


    // =====================================
    // RECUPERA SESSÃO AO ABRIR / F5
    // =====================================

    useEffect(() => {

        let ativo = true;


        async function carregarSessao() {

            const sessao =
                await recuperarSessaoLocal();


            if (!ativo) {

                return;

            }


            if (sessao) {

                setToken(
                    sessao.token
                );

                setUsuario(
                    sessao.usuario
                );

            }


            setCarregandoSessao(
                false
            );

        }


        carregarSessao();


        return () => {

            ativo = false;

        };

    }, []);


    // =====================================
    // DEFINIR SESSÃO
    // =====================================

    async function definirSessao(
        novoToken: string,
        novoUsuario:
            UsuarioAutenticado
    ) {

        setToken(
            novoToken
        );

        setUsuario(
            novoUsuario
        );


        await salvarSessaoLocal({
            token: novoToken,
            usuario: novoUsuario,
        });

    }


    // =====================================
    // LIMPAR SESSÃO
    // =====================================

    async function limparSessao() {

        setToken(null);

        setUsuario(null);


        await salvarSessaoLocal(
            null
        );

    }


    return (

        <AuthContext.Provider
            value={{
                token,
                usuario,
                carregandoSessao,
                definirSessao,
                limparSessao,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


// =========================================
// HOOK
// =========================================

export function useAuth() {

    const contexto =
        useContext(AuthContext);


    if (!contexto) {

        throw new Error(
            "useAuth deve ser usado dentro de AuthProvider."
        );

    }


    return contexto;

}