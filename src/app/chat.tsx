import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    router,
    useFocusEffect,
} from "expo-router";

import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyles";

import {
    criarChatStyles,
} from "@/styles/chatStyles";

import {
    useTema,
} from "@/contexts/TemaContext";

import {
    useAuth,
} from "@/contexts/AuthContext";

import {
    listarConversas,
    type ConversaResumo,
} from "@/services/conversaService";

import {
    getUrlFotoUsuario,
} from "@/services/usuarioService";

import HeaderCreen from "./header";

import MenuSreen from "./menu";


type FiltroChat =
    | "Todas"
    | "Não lidas";


export default function ChatScreen() {

    // =============================================================
    // TEMA
    // =============================================================

    const {
        coresTema,
    } = useTema();


    const chatStyles =
        criarChatStyles(
            coresTema
        );


    // =============================================================
    // AUTENTICAÇÃO
    // =============================================================

    const {
        token,
        usuario,
    } = useAuth();


    // =============================================================
    // ESTADOS
    // =============================================================

    const [
        busca,
        setBusca,
    ] = useState("");


    const [
        filtro,
        setFiltro,
    ] = useState<FiltroChat>(
        "Todas"
    );


    const [
        conversas,
        setConversas,
    ] = useState<
        ConversaResumo[]
    >([]);


    const [
        carregando,
        setCarregando,
    ] = useState(true);


    const [
        erro,
        setErro,
    ] = useState<
        string | null
    >(null);


    // =============================================================
    // CARREGAR CONVERSAS
    // =============================================================

    useFocusEffect(
        useCallback(() => {

            let telaAtiva =
                true;


            let intervalo:
                ReturnType<typeof setInterval>
                | null = null;


            async function carregar(
                mostrarCarregando = false
            ) {

                if (!token) {

                    if (telaAtiva) {

                        setErro(
                            "Sessão não encontrada."
                        );

                        setCarregando(
                            false
                        );

                    }

                    return;
                }


                try {

                    if (
                        mostrarCarregando &&
                        telaAtiva
                    ) {

                        setCarregando(
                            true
                        );

                    }


                    const resposta =
                        await listarConversas(
                            token
                        );


                    if (
                        telaAtiva &&
                        resposta.success
                    ) {

                        setConversas(
                            resposta.data
                        );

                        setErro(
                            null
                        );

                    }

                } catch (error) {

                    if (telaAtiva) {

                        setErro(
                            error instanceof Error
                                ? error.message
                                : "Não foi possível carregar as conversas."
                        );

                    }

                } finally {

                    if (
                        mostrarCarregando &&
                        telaAtiva
                    ) {

                        setCarregando(
                            false
                        );

                    }

                }

            }


            carregar(true);


            // Atualização simples enquanto a tela
            // estiver aberta.
            //
            // Nesta primeira versão ainda não
            // utilizaremos WebSocket.

            intervalo =
                setInterval(
                    () => {
                        carregar(false);
                    },
                    5000
                );


            return () => {

                telaAtiva =
                    false;


                if (intervalo) {

                    clearInterval(
                        intervalo
                    );

                }

            };

        }, [token])
    );


    // =============================================================
    // FOTO DO USUÁRIO LOGADO
    // =============================================================

    const fotoUsuario =
        getUrlFotoUsuario(
            usuario?.foto_usuario ??
            null
        );


    // =============================================================
    // TOTAL DE MENSAGENS NÃO LIDAS
    // =============================================================

    const quantidadeNaoLidas =
        useMemo(
            () =>
                conversas.reduce(
                    (
                        total,
                        conversa
                    ) =>
                        total +
                        conversa
                            .nao_lidas_count,
                    0
                ),
            [
                conversas,
            ]
        );


    // =============================================================
    // FILTRAR CONVERSAS
    // =============================================================

    const conversasFiltradas =
        useMemo(
            () => {

                const termo =
                    busca
                        .trim()
                        .toLowerCase();


                return conversas.filter(
                    (
                        conversa
                    ) => {

                        const nome =
                            conversa
                                .usuario
                                .nome_usuario
                                .toLowerCase();


                        const mensagem =
                            conversa
                                .ultima_mensagem
                                ?.texto_mensagem
                                ?.toLowerCase()
                            ?? "";


                        const correspondeBusca =
                            !termo ||
                            nome.includes(
                                termo
                            ) ||
                            mensagem.includes(
                                termo
                            );


                        const correspondeFiltro =
                            filtro ===
                                "Todas"
                                ? true
                                : conversa
                                    .nao_lidas_count >
                                0;


                        return (
                            correspondeBusca &&
                            correspondeFiltro
                        );

                    }
                );

            },
            [
                busca,
                filtro,
                conversas,
            ]
        );


    // =============================================================
    // FORMATAR HORÁRIO
    // =============================================================

    function formatarHorario(
        data?: string | null
    ) {

        if (!data) {

            return "";

        }


        const dataMensagem =
            new Date(
                data
            );


        if (
            Number.isNaN(
                dataMensagem.getTime()
            )
        ) {

            return "";

        }


        const agora =
            new Date();


        const hoje =
            dataMensagem
                .toDateString() ===
            agora
                .toDateString();


        if (hoje) {

            return dataMensagem
                .toLocaleTimeString(
                    "pt-BR",
                    {
                        hour:
                            "2-digit",

                        minute:
                            "2-digit",
                    }
                );

        }


        const ontem =
            new Date(
                agora
            );


        ontem.setDate(
            agora.getDate() -
            1
        );


        if (
            dataMensagem
                .toDateString() ===
            ontem
                .toDateString()
        ) {

            return "Ontem";

        }


        return dataMensagem
            .toLocaleDateString(
                "pt-BR",
                {
                    day:
                        "2-digit",

                    month:
                        "2-digit",
                }
            );

    }


    // =============================================================
    // ABRIR CONVERSA
    // =============================================================

    function abrirConversa(
        idConversa: number
    ) {

        router.push({
            pathname:
                "/conversa",

            params: {
                idConversa:
                    String(
                        idConversa
                    ),
            },
        });

    }


    // =============================================================
    // TELA
    // =============================================================

    return (

        <View
            style={
                globalStyle.container
            }
        >

            <View
                style={[
                    globalStyle.background,
                    chatStyles.container,
                ]}
            >

                <SafeAreaView
                    style={
                        globalStyle.areaConteudo
                    }
                >

                    {/* ================= HEADER ================= */}

                    <HeaderCreen
                        fotoUsuario={
                            fotoUsuario
                        }
                    />


                    {/* ================= TÍTULO ================= */}

                    <View
                        style={
                            chatStyles.tituloArea
                        }
                    >

                        <Text
                            style={
                                chatStyles.titulo
                            }
                        >
                            Chat
                        </Text>

                    </View>


                    {/* ================= BUSCA ================= */}

                    <View
                        style={
                            chatStyles.areaBusca
                        }
                    >

                        <View
                            style={
                                chatStyles.inputBuscaContainer
                            }
                        >

                            <Image
                                source={
                                    require(
                                        "@/assets/images/img/search.png"
                                    )
                                }
                                style={
                                    chatStyles.iconeBusca
                                }
                            />

                            <TextInput
                                value={
                                    busca
                                }
                                onChangeText={
                                    setBusca
                                }
                                style={
                                    chatStyles.inputBusca
                                }
                                placeholder="Buscar conversas"
                                placeholderTextColor="#777777"
                                autoCapitalize="none"
                            />

                        </View>

                    </View>


                    {/* ================= FILTROS ================= */}

                    <View
                        style={
                            chatStyles.filtros
                        }
                    >

                        {[
                            "Todas",
                            "Não lidas",
                        ].map(
                            (
                                item
                            ) => {

                                const ativo =
                                    filtro ===
                                    item;


                                return (

                                    <Pressable
                                        key={
                                            item
                                        }
                                        style={[
                                            chatStyles.filtro,

                                            ativo &&
                                            chatStyles.filtroAtivo,
                                        ]}
                                        onPress={
                                            () =>
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


                                        {item ===
                                            "Não lidas" &&
                                            quantidadeNaoLidas >
                                            0 && (

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

                            }
                        )}

                    </View>


                    {/* ================= CONVERSAS ================= */}

                    <ScrollView
                        style={
                            chatStyles.scroll
                        }
                        contentContainerStyle={
                            chatStyles.scrollConteudo
                        }
                        showsVerticalScrollIndicator={
                            false
                        }
                    >

                        {carregando && (

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
                                    Carregando conversas...
                                </Text>

                            </View>

                        )}


                        {!carregando &&
                            erro && (

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
                                        {erro}
                                    </Text>

                                </View>

                            )}


                        {!carregando &&
                            !erro &&
                            conversasFiltradas.map(
                                (
                                    conversa
                                ) => {

                                    const foto =
                                        getUrlFotoUsuario(
                                            conversa
                                                .usuario
                                                .foto_usuario
                                        );


                                    return (

                                        <Pressable
                                            key={
                                                conversa.id_conversa
                                            }
                                            style={({
                                                pressed,
                                            }) => [

                                                    chatStyles.conversa,

                                                    pressed &&
                                                    chatStyles.conversaPressed,
                                                ]}
                                            onPress={
                                                () =>
                                                    abrirConversa(
                                                        conversa.id_conversa
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
                                                    source={
                                                        foto
                                                            ? {
                                                                uri:
                                                                    foto,
                                                            }
                                                            : require(
                                                                "@/assets/images/img/usuario.png"
                                                            )
                                                    }
                                                    style={
                                                        foto
                                                            ? chatStyles.avatarUsuario
                                                            : chatStyles.avatarConversa
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
                                                    numberOfLines={
                                                        1
                                                    }
                                                >
                                                    {
                                                        conversa
                                                            .usuario
                                                            .nome_usuario
                                                    }
                                                </Text>


                                                <Text
                                                    style={
                                                        chatStyles.mensagem
                                                    }
                                                    numberOfLines={
                                                        2
                                                    }
                                                >
                                                    {
                                                        conversa
                                                            .ultima_mensagem
                                                            ?.texto_mensagem
                                                        ??
                                                        "Conversa iniciada."
                                                    }
                                                </Text>

                                            </View>


                                            {/* META */}

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
                                                        formatarHorario(
                                                            conversa
                                                                .ultima_mensagem
                                                                ?.criado_em_mensagem
                                                            ??
                                                            conversa
                                                                .atualizado_em_conversa
                                                        )
                                                    }
                                                </Text>


                                                {conversa
                                                    .nao_lidas_count >
                                                    0 && (

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
                                                                    conversa
                                                                        .nao_lidas_count
                                                                }
                                                            </Text>

                                                        </View>

                                                    )}

                                            </View>

                                        </Pressable>

                                    );

                                }
                            )}


                        {!carregando &&
                            !erro &&
                            conversasFiltradas.length ===
                            0 && (

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


                    {/* ================= MENU ================= */}

                    <MenuSreen />

                </SafeAreaView>

            </View>

        </View>

    );

}