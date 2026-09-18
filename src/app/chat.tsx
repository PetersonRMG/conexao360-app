import { useState } from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { chatStyles } from "@/styles/chatStyles";
import globalStyle from "@/styles/globalStyles";

import HeaderCreen from "./header";
import MenuSreen from "./menu";

type FiltroChat =
    | "Todas"
    | "Não lidas"
    | "Grupos"
    | "Eventos";

type TipoConversa =
    | "individual"
    | "grupo"
    | "evento";

interface Conversa {
    id: number;
    nome: string;
    mensagem: string;
    horario: string;
    notificacoes: number;
    tipo: TipoConversa;
}

export default function ChatScreen() {

    const [busca, setBusca] = useState("");

    const [filtro, setFiltro] =
        useState<FiltroChat>("Todas");


    // =========================
    // CONVERSAS
    // =========================

    const conversas: Conversa[] = [

        {
            id: 1,
            nome: "Dra. Simone Baptista",
            mensagem:
                "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
            tipo: "individual",
        },

        {
            id: 2,
            nome: "Dr. Carlos Méndez",
            mensagem:
                "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:32",
            notificacoes: 0,
            tipo: "individual",
        },

        {
            id: 3,
            nome: "Comissão jurídica",
            mensagem:
                "Temos algumas atualizações importantes para o grupo.",
            horario: "09:50",
            notificacoes: 1,
            tipo: "grupo",
        },

        {
            id: 4,
            nome: "Organização Conexão 360",
            mensagem:
                "Confira as últimas informações sobre o evento.",
            horario: "09:30",
            notificacoes: 0,
            tipo: "evento",
        },

        {
            id: 5,
            nome: "Grupo Advocacia Exponencial",
            mensagem:
                "Nova mensagem enviada no grupo.",
            horario: "08:45",
            notificacoes: 3,
            tipo: "grupo",
        },

        {
            id: 6,
            nome: "Evento Conexão 360",
            mensagem:
                "A programação do próximo encontro foi atualizada.",
            horario: "Ontem",
            notificacoes: 0,
            tipo: "evento",
        },

    ];


    // =========================
    // NÃO LIDAS
    // =========================

    const quantidadeNaoLidas =
        conversas.filter(
            (conversa) =>
                conversa.notificacoes > 0
        ).length;


    // =========================
    // BUSCA + FILTROS
    // =========================

    const conversasFiltradas =
        conversas.filter((conversa) => {

            const correspondeBusca =
                conversa.nome
                    .toLowerCase()
                    .includes(
                        busca.toLowerCase()
                    );


            let correspondeFiltro = true;


            if (filtro === "Não lidas") {

                correspondeFiltro =
                    conversa.notificacoes > 0;

            }


            if (filtro === "Grupos") {

                correspondeFiltro =
                    conversa.tipo === "grupo";

            }


            if (filtro === "Eventos") {

                correspondeFiltro =
                    conversa.tipo === "evento";

            }


            return (
                correspondeBusca &&
                correspondeFiltro
            );

        });


    return (

        // =========================================
        // TELA EXTERNA
        // =========================================

        <View style={globalStyle.container}>


            {/* =====================================
                ÁREA MOBILE - 440px
            ===================================== */}

            <View
                style={[
                    globalStyle.background,
                    chatStyles.container,
                ]}
            >


                <SafeAreaView
                    style={globalStyle.areaConteudo}
                >


                    {/* =========================
                        HEADER PADRÃO
                    ========================= */}

                    <HeaderCreen />


                    {/* =========================
                        TÍTULO
                    ========================= */}

                    <View style={chatStyles.tituloArea}>

                        <Text style={chatStyles.titulo}>
                            Chat
                        </Text>


                        {/* NOVA CONVERSA */}

                        <Pressable
                            style={({ pressed }) => [

                                chatStyles.btnNovoChat,

                                pressed &&
                                chatStyles.btnNovoChatPressed,

                            ]}
                            onPress={() => {

                                // futuramente:
                                // abrir nova conversa

                            }}
                        >

                            <Image
                                source={require(
                                    "@/assets/images/img/add.png"
                                )}
                                style={
                                    chatStyles.iconeAdicionar
                                }
                            />

                        </Pressable>

                    </View>


                    {/* =========================
                        BUSCA
                    ========================= */}

                    <View style={chatStyles.areaBusca}>

                        <View
                            style={
                                chatStyles.inputBuscaContainer
                            }
                        >

                            <Image
                                source={require(
                                    "@/assets/images/img/search.png"
                                )}
                                style={
                                    chatStyles.iconeBusca
                                }
                            />


                            <TextInput
                                value={busca}

                                onChangeText={setBusca}

                                style={
                                    chatStyles.inputBusca
                                }

                                placeholder="Buscar conversas"

                                placeholderTextColor="#777777"

                                autoCapitalize="none"
                            />

                        </View>

                    </View>


                    {/* =========================
                        FILTROS
                    ========================= */}

                    <View style={chatStyles.filtros}>

                        {[
                            "Todas",
                            "Não lidas",
                            "Grupos",
                            "Eventos",

                        ].map((item) => {

                            const ativo =
                                filtro === item;

                            return (

                                <Pressable
                                    key={item}

                                    style={[

                                        chatStyles.filtro,

                                        ativo &&
                                        chatStyles.filtroAtivo,

                                    ]}

                                    onPress={() =>
                                        setFiltro(
                                            item as FiltroChat
                                        )
                                    }
                                >

                                    <Text
                                        style={[

                                            chatStyles.txtFiltro,

                                            ativo &&
                                            chatStyles.txtFiltroAtivo,

                                        ]}
                                    >
                                        {item}
                                    </Text>


                                    {/* NÃO LIDAS */}

                                    {item === "Não lidas" &&
                                        quantidadeNaoLidas > 0 && (

                                            <View
                                                style={
                                                    chatStyles.badgeFiltro
                                                }
                                            >

                                                <Text
                                                    style={
                                                        chatStyles.txtBadgeFiltro
                                                    }
                                                >
                                                    {
                                                        quantidadeNaoLidas
                                                    }
                                                </Text>

                                            </View>

                                        )}

                                </Pressable>

                            );

                        })}

                    </View>


                    {/* =========================
                        CONVERSAS
                    ========================= */}

                    <ScrollView
                        style={chatStyles.scroll}

                        contentContainerStyle={
                            chatStyles.scrollConteudo
                        }

                        showsVerticalScrollIndicator={
                            false
                        }
                    >

                        {conversasFiltradas.map(
                            (conversa) => (

                                <Pressable
                                    key={conversa.id}

                                    style={({ pressed }) => [

                                        chatStyles.conversa,

                                        pressed &&
                                        chatStyles.conversaPressed,

                                    ]}

                                    onPress={() =>
                                        router.navigate(
                                            "/conversa"
                                        )
                                    }
                                >


                                    {/* AVATAR */}

                                    <View
                                        style={
                                            chatStyles.avatarConversaContainer
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/usuario.png"
                                            )}
                                            style={
                                                chatStyles.avatarConversa
                                            }
                                        />

                                    </View>


                                    {/* CONTEÚDO */}

                                    <View
                                        style={
                                            chatStyles.conversaConteudo
                                        }
                                    >

                                        <Text
                                            style={
                                                chatStyles.nome
                                            }
                                            numberOfLines={1}
                                        >
                                            {conversa.nome}
                                        </Text>


                                        <Text
                                            style={
                                                chatStyles.mensagem
                                            }
                                            numberOfLines={2}
                                        >
                                            {
                                                conversa.mensagem
                                            }
                                        </Text>

                                    </View>


                                    {/* HORÁRIO */}

                                    <View
                                        style={
                                            chatStyles.conversaMeta
                                        }
                                    >

                                        <Text
                                            style={
                                                chatStyles.horario
                                            }
                                        >
                                            {
                                                conversa.horario
                                            }
                                        </Text>


                                        {conversa.notificacoes > 0 && (

                                            <View
                                                style={
                                                    chatStyles.badge
                                                }
                                            >

                                                <Text
                                                    style={
                                                        chatStyles.txtBadge
                                                    }
                                                >
                                                    {
                                                        conversa.notificacoes
                                                    }
                                                </Text>

                                            </View>

                                        )}

                                    </View>

                                </Pressable>

                            )
                        )}


                        {/* =========================
                            SEM RESULTADOS
                        ========================= */}

                        {conversasFiltradas.length === 0 && (

                            <View
                                style={
                                    chatStyles.semResultados
                                }
                            >

                                <Text
                                    style={
                                        chatStyles.txtSemResultados
                                    }
                                >
                                    Nenhuma conversa encontrada.
                                </Text>

                            </View>

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