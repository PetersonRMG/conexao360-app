import { useMemo, useState } from "react";

import {
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyles";
import { criarEventosStyles } from "@/styles/evetosStyles";
import { useTema } from "@/contexts/TemaContext";

import HeaderCreen from "./header";
import MenuSreen from "./menu";


type FiltroEvento =
    | "Próximos"
    | "Hoje"
    | "Meus ingressos"
    | "Encerrados";


interface Evento {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    horario: string;
    local: string;
    status: "proximo" | "hoje" | "encerrado";
    inscrito: boolean;
}


interface Programacao {
    id: number;
    horario: string;
    titulo: string;
    local: string;
}


interface Palestrante {
    id: number;
    nome: string;
    cargo: string;
}


const EVENTOS: Evento[] = [
    {
        id: 1,
        titulo: "3ª Ed. Conexão 360",
        descricao:
            "Uma experiência presencial de conhecimento, conexões e estratégias para profissionais da advocacia.",
        data: "21 SET",
        horario: "09:00 às 18:00",
        local: "São Paulo - SP",
        status: "hoje",
        inscrito: true,
    },
    {
        id: 2,
        titulo: "Advocacia Exponencial",
        descricao:
            "Estratégia, gestão e posicionamento para escritórios que querem crescer.",
        data: "18 OUT",
        horario: "09:00 às 17:00",
        local: "São Paulo - SP",
        status: "proximo",
        inscrito: false,
    },
    {
        id: 3,
        titulo: "Networking 360",
        descricao:
            "Encontro voltado à construção de conexões profissionais e novas oportunidades.",
        data: "12 NOV",
        horario: "19:00 às 22:00",
        local: "São Paulo - SP",
        status: "proximo",
        inscrito: false,
    },
];


const PROGRAMACAO: Programacao[] = [
    {
        id: 1,
        horario: "09:00",
        titulo: "Abertura e boas-vindas",
        local: "Auditório principal",
    },
    {
        id: 2,
        horario: "10:00",
        titulo: "Advocacia, posicionamento e autoridade",
        local: "Auditório principal",
    },
    {
        id: 3,
        horario: "11:30",
        titulo: "Networking estratégico",
        local: "Espaço Conexões",
    },
];


const PALESTRANTES: Palestrante[] = [
    {
        id: 1,
        nome: "Dra. Simone Baptista",
        cargo: "Palestrante",
    },
    {
        id: 2,
        nome: "Dr. Rafael Menezes",
        cargo: "Convidado",
    },
    {
        id: 3,
        nome: "Dra. Camila Ribeiro",
        cargo: "Convidada",
    },
];


export default function EventosScreen() {

    const { coresTema } = useTema();

    const eventosStyles =
        criarEventosStyles(coresTema);

    const [busca, setBusca] =
        useState("");

    const [filtro, setFiltro] =
        useState<FiltroEvento>("Próximos");


    // =========================
    // EVENTOS FILTRADOS
    // =========================

    const eventosFiltrados =
        useMemo(() => {

            return EVENTOS.filter((evento) => {

                const correspondeBusca =
                    evento.titulo
                        .toLowerCase()
                        .includes(
                            busca.toLowerCase()
                        );

                let correspondeFiltro = true;

                if (filtro === "Hoje") {
                    correspondeFiltro =
                        evento.status === "hoje";
                }

                if (filtro === "Próximos") {
                    correspondeFiltro =
                        evento.status === "proximo" ||
                        evento.status === "hoje";
                }

                if (filtro === "Meus ingressos") {
                    correspondeFiltro =
                        evento.inscrito;
                }

                if (filtro === "Encerrados") {
                    correspondeFiltro =
                        evento.status === "encerrado";
                }

                return (
                    correspondeBusca &&
                    correspondeFiltro
                );

            });

        }, [busca, filtro]);


    const eventoPrincipal =
        EVENTOS[0];


    return (

        <View style={globalStyle.container}>

            <View
                style={[
                    globalStyle.background,
                    eventosStyles.container,
                ]}
            >

                <SafeAreaView
                    style={
                        globalStyle.areaConteudo
                    }
                >

                    {/* =========================
                        HEADER PADRÃO
                    ========================= */}

                    <HeaderCreen />


                    {/* =========================
                        BUSCA
                    ========================= */}

                    <View
                        style={
                            eventosStyles.areaBusca
                        }
                    >

                        <View
                            style={
                                eventosStyles.inputBuscaContainer
                            }
                        >

                            <Image
                                source={require(
                                    "@/assets/images/img/search.png"
                                )}
                                style={
                                    eventosStyles.iconeBusca
                                }
                            />

                            <TextInput
                                value={busca}
                                onChangeText={setBusca}
                                style={
                                    eventosStyles.inputBusca
                                }
                                placeholder="Buscar eventos"
                                placeholderTextColor={
                                    coresTema.textoSecundario
                                }
                            />

                        </View>

                    </View>


                    {/* =========================
                        FILTROS
                    ========================= */}

                    <View
                        style={
                            eventosStyles.filtros
                        }
                    >

                        {([
                            "Próximos",
                            "Hoje",
                            "Meus ingressos",
                            "Encerrados",
                        ] as FiltroEvento[]).map(
                            (item) => {

                                const ativo =
                                    filtro === item;

                                return (

                                    <Pressable
                                        key={item}
                                        onPress={() =>
                                            setFiltro(item)
                                        }
                                        style={[
                                            eventosStyles.filtro,
                                            ativo &&
                                            eventosStyles.filtroAtivo,
                                        ]}
                                    >

                                        <Text
                                            style={[
                                                eventosStyles.txtFiltro,
                                                ativo &&
                                                eventosStyles.txtFiltroAtivo,
                                            ]}
                                        >
                                            {item}
                                        </Text>

                                    </Pressable>

                                );

                            }
                        )}

                    </View>


                    {/* =========================
                        CONTEÚDO
                    ========================= */}

                    <ScrollView
                        style={
                            eventosStyles.scroll
                        }
                        contentContainerStyle={
                            eventosStyles.scrollConteudo
                        }
                        showsVerticalScrollIndicator={
                            false
                        }
                    >

                        {/* =========================
                            EVENTO PRINCIPAL
                        ========================= */}

                        <Text
                            style={
                                eventosStyles.tituloSecao
                            }
                        >
                            Evento em destaque
                        </Text>


                        <View
                            style={
                                eventosStyles.hero
                            }
                        >

                            <ImageBackground
                                source={require(
                                    "@/assets/images/img/imagem.png"
                                )}
                                resizeMode="stretch"
                                style={
                                    eventosStyles.heroImagem
                                }
                                imageStyle={
                                    eventosStyles.heroImagemInterna
                                }
                            >

                                <View
                                    style={
                                        eventosStyles.heroOverlay
                                    }
                                >

                                    <View
                                        style={
                                            eventosStyles.statusEvento
                                        }
                                    >

                                        <Text
                                            style={
                                                eventosStyles.txtStatusEvento
                                            }
                                        >
                                            EM ANDAMENTO
                                        </Text>

                                    </View>


                                    <View
                                        style={
                                            eventosStyles.heroConteudo
                                        }
                                    >

                                        <Text
                                            style={
                                                eventosStyles.heroTitulo
                                            }
                                        >
                                            {
                                                eventoPrincipal.titulo
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                eventosStyles.heroDescricao
                                            }
                                            numberOfLines={3}
                                        >
                                            {
                                                eventoPrincipal.descricao
                                            }
                                        </Text>


                                        <View
                                            style={
                                                eventosStyles.heroInfos
                                            }
                                        >

                                            <View
                                                style={
                                                    eventosStyles.infoLinha
                                                }
                                            >

                                                <Image
                                                    source={require(
                                                        "@/assets/images/img/evento.png"
                                                    )}
                                                    style={
                                                        eventosStyles.infoIcone
                                                    }
                                                />

                                                <Text
                                                    style={
                                                        eventosStyles.infoTexto
                                                    }
                                                >
                                                    {
                                                        eventoPrincipal.data
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        eventosStyles.infoSeparador
                                                    }
                                                >
                                                    •
                                                </Text>

                                                <Text
                                                    style={
                                                        eventosStyles.infoTexto
                                                    }
                                                >
                                                    {
                                                        eventoPrincipal.horario
                                                    }
                                                </Text>

                                            </View>


                                            <View
                                                style={
                                                    eventosStyles.infoLinha
                                                }
                                            >

                                                <Image
                                                    source={require(
                                                        "@/assets/images/img/evento.png"
                                                    )}
                                                    style={
                                                        eventosStyles.infoIcone
                                                    }
                                                />

                                                <Text
                                                    style={
                                                        eventosStyles.infoTexto
                                                    }
                                                >
                                                    {
                                                        eventoPrincipal.local
                                                    }
                                                </Text>

                                            </View>

                                        </View>


                                        <Pressable
                                            style={({ pressed }) => [
                                                eventosStyles.btnPrincipal,
                                                pressed &&
                                                eventosStyles.btnPrincipalPressed,
                                            ]}
                                            onPress={() => {
                                                // Futuramente:
                                                // router.push(`/evento/${eventoPrincipal.id}`);
                                            }}
                                        >

                                            <Text
                                                style={
                                                    eventosStyles.txtBtnPrincipal
                                                }
                                            >
                                                Ver detalhes
                                            </Text>

                                        </Pressable>

                                    </View>

                                </View>

                            </ImageBackground>

                        </View>


                        {/* =========================
                            PROGRAMAÇÃO
                        ========================= */}

                        <View
                            style={
                                eventosStyles.cabecalhoSecao
                            }
                        >

                            <View>

                                <Text
                                    style={
                                        eventosStyles.tituloSecao
                                    }
                                >
                                    Programação de hoje
                                </Text>

                                <Text
                                    style={
                                        eventosStyles.subtituloSecao
                                    }
                                >
                                    Acompanhe o que está acontecendo.
                                </Text>

                            </View>

                        </View>


                        <View
                            style={
                                eventosStyles.cardProgramacao
                            }
                        >

                            {PROGRAMACAO.map(
                                (item, index) => (

                                    <View
                                        key={item.id}
                                        style={[
                                            eventosStyles.programacaoItem,
                                            index !==
                                            PROGRAMACAO.length - 1 &&
                                            eventosStyles.programacaoItemBorda,
                                        ]}
                                    >

                                        <View
                                            style={
                                                eventosStyles.horarioArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    eventosStyles.horario
                                                }
                                            >
                                                {item.horario}
                                            </Text>

                                            <View
                                                style={
                                                    eventosStyles.pontoTimeline
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                eventosStyles.programacaoConteudo
                                            }
                                        >

                                            <Text
                                                style={
                                                    eventosStyles.programacaoTitulo
                                                }
                                            >
                                                {item.titulo}
                                            </Text>

                                            <Text
                                                style={
                                                    eventosStyles.programacaoLocal
                                                }
                                            >
                                                {item.local}
                                            </Text>

                                        </View>

                                    </View>

                                )
                            )}

                        </View>


                        {/* =========================
                            PALESTRANTES
                        ========================= */}

                        <Text
                            style={
                                eventosStyles.tituloSecao
                            }
                        >
                            Palestrantes
                        </Text>


                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={
                                false
                            }
                            contentContainerStyle={
                                eventosStyles.palestrantes
                            }
                        >

                            {PALESTRANTES.map(
                                (palestrante) => (

                                    <View
                                        key={palestrante.id}
                                        style={
                                            eventosStyles.palestrante
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/avatar.png"
                                            )}
                                            style={
                                                eventosStyles.palestranteAvatar
                                            }
                                        />

                                        <Text
                                            style={
                                                eventosStyles.palestranteNome
                                            }
                                            numberOfLines={2}
                                        >
                                            {
                                                palestrante.nome
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                eventosStyles.palestranteCargo
                                            }
                                        >
                                            {
                                                palestrante.cargo
                                            }
                                        </Text>

                                    </View>

                                )
                            )}

                        </ScrollView>


                        {/* =========================
                            OUTROS EVENTOS
                        ========================= */}

                        <Text
                            style={
                                eventosStyles.tituloSecao
                            }
                        >
                            Outros eventos
                        </Text>


                        {eventosFiltrados
                            .filter(
                                (evento) =>
                                    evento.id !==
                                    eventoPrincipal.id
                            )
                            .map((evento) => (

                                <Pressable
                                    key={evento.id}
                                    style={({ pressed }) => [
                                        eventosStyles.cardEvento,
                                        pressed &&
                                        eventosStyles.cardEventoPressed,
                                    ]}
                                >

                                    <View
                                        style={
                                            eventosStyles.dataEvento
                                        }
                                    >

                                        <Text
                                            style={
                                                eventosStyles.txtDataEvento
                                            }
                                        >
                                            {evento.data}
                                        </Text>

                                    </View>


                                    <View
                                        style={
                                            eventosStyles.eventoConteudo
                                        }
                                    >

                                        <Text
                                            style={
                                                eventosStyles.eventoTitulo
                                            }
                                            numberOfLines={1}
                                        >
                                            {evento.titulo}
                                        </Text>

                                        <Text
                                            style={
                                                eventosStyles.eventoDescricao
                                            }
                                            numberOfLines={2}
                                        >
                                            {evento.descricao}
                                        </Text>

                                        <Text
                                            style={
                                                eventosStyles.eventoMeta
                                            }
                                        >
                                            {evento.horario}
                                            {"  •  "}
                                            {evento.local}
                                        </Text>

                                    </View>

                                </Pressable>

                            ))}


                        {eventosFiltrados
                            .filter(
                                (evento) =>
                                    evento.id !==
                                    eventoPrincipal.id
                            ).length === 0 && (

                                <Text
                                    style={
                                        eventosStyles.semEventos
                                    }
                                >
                                    Nenhum outro evento encontrado.
                                </Text>

                            )}

                    </ScrollView>


                    {/* =========================
                        FOOTER
                    ========================= */}

                    <MenuSreen />

                </SafeAreaView>

            </View>

        </View>

    );

}
