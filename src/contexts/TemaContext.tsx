import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    useColorScheme,
} from "react-native";

import AsyncStorage from
    "@react-native-async-storage/async-storage";

import {
    temaClaro,
    temaEscuro,
    CoresTema,
} from "@/styles/temas";


type TemaNome =
    | "claro"
    | "escuro";

type PreferenciaTema =
    | TemaNome
    | "sistema";


interface TemaContextProps {

    tema: TemaNome;

    preferenciaTema:
    PreferenciaTema;

    coresTema:
    CoresTema;

    alternarTema: () => void;

    usarTemaSistema: () => void;

}


const TemaContext =
    createContext<TemaContextProps>(
        {} as TemaContextProps
    );


interface TemaProviderProps {

    children: ReactNode;

}


const CHAVE_TEMA =
    "@conexao360:tema";


export function TemaProvider({

    children,

}: TemaProviderProps) {

    // =========================
    // TEMA DO CELULAR
    // =========================

    const temaSistema =
        useColorScheme();


    // =========================
    // PREFERÊNCIA DO USUÁRIO
    // =========================

    const [
        preferenciaTema,
        setPreferenciaTema,
    ] = useState<PreferenciaTema>(
        "sistema"
    );


    // =========================
    // CARREGAR TEMA SALVO
    // =========================

    useEffect(() => {

        const carregarTema = async () => {

            try {

                const temaSalvo =
                    await AsyncStorage.getItem(
                        CHAVE_TEMA
                    );


                if (
                    temaSalvo === "claro" ||
                    temaSalvo === "escuro" ||
                    temaSalvo === "sistema"
                ) {

                    setPreferenciaTema(
                        temaSalvo
                    );

                }

            } catch (error) {

                console.log(
                    "Erro ao carregar tema:",
                    error
                );

            }

        };


        carregarTema();

    }, []);


    // =========================
    // DEFINE TEMA ATUAL
    // =========================

    const tema: TemaNome =

        preferenciaTema === "sistema"

            ? (
                temaSistema === "light"
                    ? "claro"
                    : "escuro"
            )

            : preferenciaTema;


    // =========================
    // CORES DO TEMA
    // =========================

    const coresTema =

        tema === "claro"

            ? temaClaro

            : temaEscuro;


    // =========================
    // ALTERNAR TEMA
    // =========================

    const alternarTema = async () => {

        const novoTema: TemaNome =

            tema === "escuro"

                ? "claro"

                : "escuro";


        setPreferenciaTema(
            novoTema
        );


        await AsyncStorage.setItem(

            CHAVE_TEMA,

            novoTema

        );

    };


    // =========================
    // VOLTAR AO TEMA DO SISTEMA
    // =========================

    const usarTemaSistema =
        async () => {

            setPreferenciaTema(
                "sistema"
            );


            await AsyncStorage.setItem(

                CHAVE_TEMA,

                "sistema"

            );

        };


    return (

        <TemaContext.Provider
            value={{

                tema,

                preferenciaTema,

                coresTema,

                alternarTema,

                usarTemaSistema,

            }}
        >

            {children}

        </TemaContext.Provider>

    );

}


export function useTema() {

    return useContext(
        TemaContext
    );

}