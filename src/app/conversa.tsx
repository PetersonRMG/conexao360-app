import {
    Fragment,
    useCallback,
    useRef,
    useState,
} from "react";

import {
    router,
    useFocusEffect,
    useLocalSearchParams,
} from "expo-router";

import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyles";

import {
    criarConversaStyles,
} from "@/styles/conversaStyles";

import {
    useTema,
} from "@/contexts/TemaContext";

import {
    useAuth,
} from "@/contexts/AuthContext";

import {
    enviarMensagem as enviarMensagemApi,
    listarMensagens,
    type MensagemConversa,
    type UsuarioConversa,
} from "@/services/conversaService";

import {
    getUrlFotoUsuario,
} from "@/services/usuarioService";


export default function ConversaScreen() {

    // =============================================================
    // TEMA
    // =============================================================

    const {
        coresTema,
    } = useTema();


    const conversaStyles =
        criarConversaStyles(
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
    // ID DA CONVERSA
    // =============================================================

    const params =
        useLocalSearchParams<{
            idConversa?:
            string |
            string[];
        }>();


    const idConversaParam =
        Array.isArray(
            params.idConversa
        )
            ? params.idConversa[0]
            : params.idConversa;


    const idConversa =
        Number(
            idConversaParam
        );


    // =============================================================
    // ESTADOS
    // =============================================================

    const [
        mensagem,
        setMensagem,
    ] = useState("");


    const [
        mensagens,
        setMensagens,
    ] = useState<
        MensagemConversa[]
    >([]);


    const [
        outroUsuario,
        setOutroUsuario,
    ] = useState<
        UsuarioConversa | null
    >(null);


    const [
        carregando,
        setCarregando,
    ] = useState(true);


    const [
        enviando,
        setEnviando,
    ] = useState(false);


    const [
        erro,
        setErro,
    ] = useState<
        string | null
    >(null);


    const scrollRef =
        useRef<ScrollView>(
            null
        );


    // =============================================================
    // CARREGAR MENSAGENS
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

                if (
                    !token ||
                    !idConversa ||
                    Number.isNaN(
                        idConversa
                    )
                ) {

                    if (telaAtiva) {

                        setErro(
                            "Conversa inválida."
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
                        await listarMensagens(
                            token,
                            idConversa
                        );


                    if (
                        telaAtiva &&
                        resposta.success
                    ) {

                        setOutroUsuario(
                            resposta
                                .data
                                .conversa
                                .usuario
                        );


                        setMensagens(
                            resposta
                                .data
                                .mensagens
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
                                : "Não foi possível carregar a conversa."
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


            // Atualização temporária da conversa.
            //
            // Depois podemos trocar isso por
            // comunicação em tempo real.

            intervalo =
                setInterval(
                    () => {
                        carregar(false);
                    },
                    3000
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

        }, [
            token,
            idConversa,
        ])
    );


    // =============================================================
    // ENVIAR
    // =============================================================

    async function enviar() {

        const texto =
            mensagem.trim();


        if (
            !texto ||
            !token ||
            !idConversa ||
            Number.isNaN(
                idConversa
            ) ||
            enviando
        ) {

            return;
        }


        try {

            setEnviando(
                true
            );


            setErro(
                null
            );


            const resposta =
                await enviarMensagemApi(
                    token,
                    idConversa,
                    texto
                );


            if (
                resposta.success
            ) {

                setMensagens(
                    (
                        atuais
                    ) => {

                        const jaExiste =
                            atuais.some(
                                (
                                    item
                                ) =>
                                    item.id_mensagem ===
                                    resposta
                                        .data
                                        .id_mensagem
                            );


                        if (jaExiste) {

                            return atuais;

                        }


                        return [
                            ...atuais,
                            resposta.data,
                        ];

                    }
                );


                setMensagem(
                    ""
                );


                setTimeout(
                    () => {

                        scrollRef
                            .current
                            ?.scrollToEnd({
                                animated:
                                    true,
                            });

                    },
                    100
                );

            }

        } catch (error) {

            setErro(
                error instanceof Error
                    ? error.message
                    : "Não foi possível enviar a mensagem."
            );

        } finally {

            setEnviando(
                false
            );

        }

    }


    // =============================================================
    // PERFIL
    // =============================================================

    function abrirPerfil() {

        if (
            !outroUsuario
        ) {

            return;
        }


        router.push({
            pathname:
                "/perfil",

            params: {
                idUsuario:
                    String(
                        outroUsuario
                            .id_usuario
                    ),
            },
        });

    }


    // =============================================================
    // FOTO
    // =============================================================

    const fotoOutroUsuario =
        getUrlFotoUsuario(
            outroUsuario
                ?.foto_usuario ??
            null
        );


    // =============================================================
    // HORÁRIO
    // =============================================================

    function formatarHorario(
        data: string
    ) {

        const valor =
            new Date(
                data
            );


        if (
            Number.isNaN(
                valor.getTime()
            )
        ) {

            return "";

        }


        return valor
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


    // =============================================================
    // CHAVE DA DATA
    // =============================================================

    function chaveData(
        data: string
    ) {

        const valor =
            new Date(
                data
            );


        if (
            Number.isNaN(
                valor.getTime()
            )
        ) {

            return "";

        }


        return [
            valor.getFullYear(),
            valor.getMonth(),
            valor.getDate(),
        ].join("-");

    }


    // =============================================================
    // TEXTO DA DATA
    // =============================================================

    function formatarData(
        data: string
    ) {

        const valor =
            new Date(
                data
            );


        if (
            Number.isNaN(
                valor.getTime()
            )
        ) {

            return "";

        }


        const hoje =
            new Date();


        if (
            valor.toDateString() ===
            hoje.toDateString()
        ) {

            return "Hoje";

        }


        const ontem =
            new Date(
                hoje
            );


        ontem.setDate(
            hoje.getDate() -
            1
        );


        if (
            valor.toDateString() ===
            ontem.toDateString()
        ) {

            return "Ontem";

        }


        return valor
            .toLocaleDateString(
                "pt-BR"
            );

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
                    conversaStyles.container,
                ]}
            >

                <SafeAreaView
                    style={
                        globalStyle.areaConteudo
                    }
                >

                    <KeyboardAvoidingView
                        style={
                            conversaStyles.keyboard
                        }
                        behavior={
                            Platform.OS ===
                                "ios"
                                ? "padding"
                                : "height"
                        }
                    >

                        {/* ================= HEADER ================= */}

                        <View
                            style={
                                conversaStyles.header
                            }
                        >

                            <Pressable
                                style={({
                                    pressed,
                                }) => [

                                        conversaStyles.btnVoltar,

                                        pressed &&
                                        conversaStyles.btnVoltarPressed,
                                    ]}
                                onPress={
                                    () =>
                                        router.back()
                                }
                            >

                                <Image
                                    source={
                                        require(
                                            "@/assets/images/img/left.png"
                                        )
                                    }
                                    style={
                                        conversaStyles.iconeVoltar
                                    }
                                />

                            </Pressable>


                            <Pressable
                                style={
                                    conversaStyles.perfil
                                }
                                onPress={
                                    abrirPerfil
                                }
                                disabled={
                                    !outroUsuario
                                }
                            >

                                <View
                                    style={
                                        conversaStyles.avatarContainer
                                    }
                                >

                                    <Image
                                        source={
                                            fotoOutroUsuario
                                                ? {
                                                    uri:
                                                        fotoOutroUsuario,
                                                }
                                                : require(
                                                    "@/assets/images/img/avatar.png"
                                                )
                                        }
                                        style={
                                            conversaStyles.avatar
                                        }
                                    />

                                </View>


                                <View>

                                    <Text
                                        style={
                                            conversaStyles.nome
                                        }
                                        numberOfLines={
                                            1
                                        }
                                    >
                                        {
                                            outroUsuario
                                                ?.nome_usuario
                                            ??
                                            "Conversa"
                                        }
                                    </Text>


                                    <Text
                                        style={
                                            conversaStyles.status
                                        }
                                    >
                                        Conversa privada
                                    </Text>

                                </View>

                            </Pressable>


                            <View
                                style={
                                    conversaStyles.btnMais
                                }
                            />

                        </View>


                        {/* ================= SEGURANÇA ================= */}

                        <View
                            style={
                                conversaStyles.areaSeguranca
                            }
                        >

                            <View
                                style={
                                    conversaStyles.avisoSeguranca
                                }
                            >

                                <Image
                                    source={
                                        require(
                                            "@/assets/images/img/trancar.png"
                                        )
                                    }
                                    style={
                                        conversaStyles.iconeSeguranca
                                    }
                                />

                                <Text
                                    style={
                                        conversaStyles.txtSeguranca
                                    }
                                >
                                    Suas mensagens permanecem protegidas dentro da plataforma
                                </Text>

                            </View>

                        </View>


                        {/* ================= MENSAGENS ================= */}

                        <ScrollView
                            ref={
                                scrollRef
                            }
                            style={
                                conversaStyles.scroll
                            }
                            contentContainerStyle={
                                conversaStyles.scrollConteudo
                            }
                            showsVerticalScrollIndicator={
                                false
                            }
                            keyboardShouldPersistTaps="handled"
                            onContentSizeChange={
                                () => {

                                    scrollRef
                                        .current
                                        ?.scrollToEnd({
                                            animated:
                                                true,
                                        });

                                }
                            }
                        >

                            {carregando && (

                                <View
                                    style={
                                        conversaStyles.areaSeguranca
                                    }
                                >

                                    <Text
                                        style={
                                            conversaStyles.txtSeguranca
                                        }
                                    >
                                        Carregando mensagens...
                                    </Text>

                                </View>

                            )}


                            {!carregando &&
                                erro &&
                                mensagens.length ===
                                0 && (

                                    <View
                                        style={
                                            conversaStyles.areaSeguranca
                                        }
                                    >

                                        <Text
                                            style={
                                                conversaStyles.txtSeguranca
                                            }
                                        >
                                            {erro}
                                        </Text>

                                    </View>

                                )}


                            {mensagens.map(
                                (
                                    item,
                                    index
                                ) => {

                                    const minha =
                                        Number(
                                            item
                                                .id_usuario_remetente
                                        ) ===
                                        Number(
                                            usuario
                                                ?.id_usuario
                                        );


                                    const dataAtual =
                                        chaveData(
                                            item
                                                .criado_em_mensagem
                                        );


                                    const dataAnterior =
                                        index >
                                            0
                                            ? chaveData(
                                                mensagens[
                                                    index -
                                                    1
                                                ]
                                                    .criado_em_mensagem
                                            )
                                            : null;


                                    const mostrarData =
                                        dataAtual !==
                                        dataAnterior;


                                    return (

                                        <Fragment
                                            key={
                                                item.id_mensagem
                                            }
                                        >

                                            {mostrarData && (

                                                <View
                                                    style={
                                                        conversaStyles.divisorData
                                                    }
                                                >

                                                    <View
                                                        style={
                                                            conversaStyles.linha
                                                        }
                                                    />

                                                    <Text
                                                        style={
                                                            conversaStyles.data
                                                        }
                                                    >
                                                        {
                                                            formatarData(
                                                                item
                                                                    .criado_em_mensagem
                                                            )
                                                        }
                                                    </Text>

                                                    <View
                                                        style={
                                                            conversaStyles.linha
                                                        }
                                                    />

                                                </View>

                                            )}


                                            <View
                                                style={[
                                                    conversaStyles.linhaMensagem,

                                                    minha
                                                        ? conversaStyles.linhaMinhaMensagem
                                                        : conversaStyles.linhaMensagemRecebida,
                                                ]}
                                            >

                                                <View
                                                    style={[
                                                        conversaStyles.balao,

                                                        minha
                                                            ? conversaStyles.balaoMeu
                                                            : conversaStyles.balaoRecebido,
                                                    ]}
                                                >

                                                    <Text
                                                        style={[
                                                            conversaStyles.txtMensagem,

                                                            minha &&
                                                            conversaStyles.txtMinhaMensagem,
                                                        ]}
                                                    >
                                                        {
                                                            item
                                                                .texto_mensagem
                                                        }
                                                    </Text>


                                                    <Text
                                                        style={[
                                                            conversaStyles.horario,

                                                            minha &&
                                                            conversaStyles.horarioMeu,
                                                        ]}
                                                    >
                                                        {
                                                            formatarHorario(
                                                                item
                                                                    .criado_em_mensagem
                                                            )
                                                        }
                                                    </Text>

                                                </View>

                                            </View>

                                        </Fragment>

                                    );

                                }
                            )}

                        </ScrollView>


                        {/* ================= ERRO DE ENVIO ================= */}

                        {erro &&
                            mensagens.length >
                            0 && (

                                <Text
                                    style={
                                        conversaStyles.txtSeguranca
                                    }
                                >
                                    {erro}
                                </Text>

                            )}


                        {/* ================= ENVIO ================= */}

                        <View
                            style={
                                conversaStyles.areaEnviar
                            }
                        >

                            <View
                                style={
                                    conversaStyles.inputContainer
                                }
                            >

                                <TextInput
                                    value={
                                        mensagem
                                    }
                                    onChangeText={
                                        setMensagem
                                    }
                                    style={
                                        conversaStyles.input
                                    }
                                    placeholder="Digite uma mensagem..."
                                    placeholderTextColor="#777777"
                                    multiline
                                    maxLength={
                                        5000
                                    }
                                    returnKeyType="default"
                                    editable={
                                        !enviando
                                    }
                                />

                            </View>


                            <Pressable
                                style={({
                                    pressed,
                                }) => [

                                        conversaStyles.btnEnviar,

                                        pressed &&
                                        conversaStyles.btnEnviarPressed,
                                    ]}
                                onPress={
                                    enviar
                                }
                                disabled={
                                    enviando ||
                                    !mensagem.trim()
                                }
                            >

                                <Image
                                    source={
                                        require(
                                            "@/assets/images/img/send.png"
                                        )
                                    }
                                    style={
                                        conversaStyles.iconeEnviar
                                    }
                                />

                            </Pressable>

                        </View>

                    </KeyboardAvoidingView>

                </SafeAreaView>

            </View>

        </View>

    );

}