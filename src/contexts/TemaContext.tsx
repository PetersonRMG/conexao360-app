import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import {
    temaClaro,
    temaEscuro,
    CoresTema,
} from "@/styles/temas";


type TemaNome = "claro" | "escuro";


interface TemaContextProps {

    tema: TemaNome;

    coresTema: CoresTema;

    mudarTema: (
        tema: TemaNome
    ) => void;

    alternarTema: () => void;

}


const TemaContext =
    createContext<TemaContextProps>(
        {} as TemaContextProps
    );


interface TemaProviderProps {
    children: ReactNode;
}


export function TemaProvider({
    children,
}: TemaProviderProps) {

    const [tema, setTema] =
        useState<TemaNome>("escuro");


    const coresTema =
        tema === "escuro"
            ? temaEscuro
            : temaClaro;


    const mudarTema = (
        novoTema: TemaNome
    ) => {

        setTema(novoTema);

    };


    const alternarTema = () => {

        setTema((current) =>
            current === "escuro"
                ? "claro"
                : "escuro"
        );

    };


    return (

        <TemaContext.Provider
            value={{
                tema,
                coresTema,
                mudarTema,
                alternarTema,
            }}
        >

            {children}

        </TemaContext.Provider>

    );

}


export function useTema() {

    return useContext(TemaContext);

}