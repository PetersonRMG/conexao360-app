import {
    Fragment,
    type ReactNode,
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
    Linking,
    Alert,
} from "react-native";
import {
    SafeAreaView,
} from "react-native-safe-area-context";
import globalStyle from "@/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/styles/variaveis";
import HeaderScreen from "./header";
import MenuSreen from "./menu";
import SeletorEmojis from "@/components/SeletorEmojis";
import PontinhosEnviando from "@/components/PontinhosEnviando";
import { Keyboard } from "react-native";
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
/** Torna links HTTP(S) clicáveis sem alterar a mensagem original. */
function renderizarTextoComLinks(texto: string, corLink: string): ReactNode[] {
    const partes: ReactNode[] = [];
    const expressao = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
    let inicio = 0;
    let ocorrencia: RegExpExecArray | null;

    while ((ocorrencia = expressao.exec(texto)) !== null) {
        const bruto = ocorrencia[0];
        const endereco = bruto.replace(/[.,!?;:)\]}>]+$/g, "");
        const inicioLink = ocorrencia.index;
        const fimLink = inicioLink + endereco.length;

        if (inicioLink > inicio) {
            partes.push(texto.slice(inicio, inicioLink));
        }

        if (endereco) {
            const url = /^www\./i.test(endereco) ? `https://${endereco}` : endereco;
            partes.push(
                <Text
                    key={`link-${inicioLink}`}
                    accessibilityRole="link"
                    style={{ color: corLink, textDecorationLine: "underline" }}
                    onPress={() => {
                        Linking.openURL(url).catch(() => {
                            Alert.alert(
                                "Não foi possível abrir o link",
                                "Verifique o endereço e tente novamente."
                            );
                        });
                    }}
                >
                    {endereco}
                </Text>
            );
        }

        if (fimLink < inicioLink + bruto.length) {
            partes.push(texto.slice(fimLink, inicioLink + bruto.length));
        }
        inicio = inicioLink + bruto.length;
    }

    if (inicio < texto.length) {
        partes.push(texto.slice(inicio));
    }
    return partes.length > 0 ? partes : [texto];
}

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
    const [emojiAberto, setEmojiAberto] = useState(false);
    const [mensagemPendente, setMensagemPendente] = useState<string | null>(null);
    // Evita que a atualização a cada 3 segundos substitua a lista durante um envio.
    const envioEmAndamento = useRef(false);
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
                        resposta.success && !envioEmAndamento.current
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
            envioEmAndamento.current = true;
            setMensagemPendente(texto);
            setMensagem("");
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
            if (!resposta.success) {
                throw new Error("Não foi possível enviar a mensagem. Tente novamente.");
            }
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
            setMensagem((atual) => atual.trim() ? `${texto}\n${atual}` : texto);
            setErro(
                error instanceof Error
                    ? error.message
                    : "Não foi possível enviar a mensagem."
            );
        } finally {
            envioEmAndamento.current = false;
            setMensagemPendente(null);
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
                    <HeaderScreen fotoUsuario={getUrlFotoUsuario(usuario?.foto_usuario ?? null)} />
                    <View style={conversaStyles.conteudoComRodape}>
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
                                <Ionicons
                                    name="arrow-back"
                                    size={24}
                                    color={coresTema.texto}
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
                                <View style={{ flex: 1, minWidth: 0 }}>
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
                                                        {renderizarTextoComLinks(
                                                            item.texto_mensagem,
                                                            minha ? "#674B10" : coresTema.destaque
                                                        )}
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

                            {enviando && mensagemPendente !== null && (
                                <View style={[conversaStyles.linhaMensagem, conversaStyles.linhaMinhaMensagem]}>
                                    <View style={[conversaStyles.balao, conversaStyles.balaoMeu, { opacity: 0.9 }]}>
                                        <Text style={[conversaStyles.txtMensagem, conversaStyles.txtMinhaMensagem]}>
                                            {renderizarTextoComLinks(mensagemPendente, "#674B10")}
                                        </Text>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 7, marginTop: 6 }}>
                                            <Text style={conversaStyles.txtEnviando}>Enviando</Text>
                                            <PontinhosEnviando cor={coresTema.destaque} />
                                        </View>
                                    </View>
                                </View>
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
                        {/* Seletor local de emojis. Não depende de endpoint adicional. */}
                        {emojiAberto && (
                            <View style={{ paddingHorizontal: 12, marginBottom: 6 }}>
                                <SeletorEmojis
                                    onSelect={(emoji) => setMensagem((atual) => atual.length + emoji.length <= 5000 ? atual + emoji : atual)}
                                    corDestaque={coresTema.destaque}
                                    corTexto={coresTema.texto}
                                    corFundo={coresTema.cardSecundario}
                                    corBorda={coresTema.borda}
                                />
                            </View>
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
                                <Pressable
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        setEmojiAberto((atual) => !atual);
                                    }}
                                    disabled={enviando}
                                    accessibilityRole="button"
                                    accessibilityLabel={emojiAberto ? "Fechar emojis" : "Abrir emojis"}
                                    style={conversaStyles.btnEmoji}
                                >
                                    <Ionicons
                                        name={emojiAberto ? "close-circle-outline" : "happy-outline"}
                                        size={24}
                                        color={coresTema.destaque}
                                    />
                                </Pressable>
                                <TextInput
                                    value={
                                        mensagem
                                    }
                                    onChangeText={
                                        setMensagem
                                    }
                                    style={conversaStyles.input}
                                    placeholder="Digite uma mensagem..."
                                    placeholderTextColor={coresTema.textoSecundario}
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
                                        (enviando || !mensagem.trim()) && conversaStyles.btnEnviarDesabilitado,
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
                                <Ionicons
                                    name="send"
                                    size={23}
                                    color={cores.pretoPrincipal}
                                />
                            </Pressable>
                        </View>
                    </KeyboardAvoidingView>
                    </View>
                    <MenuSreen />
                </SafeAreaView>
            </View>
        </View>
    );
}