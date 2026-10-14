import {
    useEffect,
    useState,
} from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
    useTema,
} from "@/contexts/TemaContext";
import {
    useAuth,
} from "@/contexts/AuthContext";
import {
    buscarComentarios,
    criarComentario,
    ComentarioPublicacao,
} from "@/services/publicacaoService";
import {
    getUrlFotoUsuario,
} from "@/services/usuarioService";
import {
    criarComentariosModalStyles,
} from "@/styles/criarComentariosStyles";
interface ComentariosModalProps {
    visible: boolean;
    onClose: () => void;
    postId?: number | null;
    onComentarioEnviado?: (
        totalComentarios: number
    ) => void;
}
export default function ComentariosModalScreen({
    visible,
    onClose,
    postId,
    onComentarioEnviado,
}: ComentariosModalProps) {
    const {
        coresTema,
    } = useTema();
    const {
        token,
        usuario,
    } = useAuth();
    const styles =
        criarComentariosModalStyles(
            coresTema
        );
    const insets =
        useSafeAreaInsets();
    const [
        novoComentario,
        setNovoComentario,
    ] = useState("");
    const [
        comentarios,
        setComentarios,
    ] = useState<
        ComentarioPublicacao[]
    >([]);
    const [
        carregando,
        setCarregando,
    ] = useState(false);
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
    // =====================================
    // FOTO DO USUÁRIO LOGADO
    // =====================================
    const fotoUsuario =
        getUrlFotoUsuario(
            usuario?.foto_usuario ??
            null
        );
    // =====================================
    // BUSCAR COMENTÁRIOS
    // =====================================
    useEffect(() => {
        let componenteAtivo =
            true;
        async function carregarComentarios() {
            if (!visible) {
                return;
            }
            setNovoComentario("");
            setErro(null);
            setComentarios([]);
            if (!postId) {
                return;
            }
            if (!token) {
                setErro(
                    "Sessão não encontrada."
                );
                return;
            }
            try {
                setCarregando(true);
                const resposta =
                    await buscarComentarios(
                        token,
                        postId
                    );
                if (!resposta.success) {
                    throw new Error(
                        "Não foi possível carregar os comentários."
                    );
                }
                if (componenteAtivo) {
                    setComentarios(
                        resposta.data ??
                        []
                    );
                }
            } catch (error) {
                console.log(
                    "ERRO COMENTÁRIOS:",
                    error
                );
                if (componenteAtivo) {
                    setErro(
                        error instanceof Error
                            ? error.message
                            : "Não foi possível carregar os comentários."
                    );
                }
            } finally {
                if (componenteAtivo) {
                    setCarregando(
                        false
                    );
                }
            }
        }
        carregarComentarios();
        return () => {
            componenteAtivo =
                false;
        };
    }, [
        visible,
        postId,
        token,
    ]);
    // =====================================
    // ABRIR PERFIL DO USUÁRIO
    // =====================================
    function abrirPerfilUsuario(
        idUsuario?: number
    ) {
        if (!idUsuario) {
            return;
        }
        onClose();
        setTimeout(() => {
            router.push({
                pathname: "/perfil",
                params: {
                    idUsuario: String(idUsuario),
                },
            });
        }, 200);
    }
    // =====================================
    // FORMATAR HORÁRIO
    // =====================================
    function formatarHorario(
        data: string
    ) {
        if (!data) {
            return "";
        }
        const dataComentario =
            new Date(data);
        if (
            Number.isNaN(
                dataComentario.getTime()
            )
        ) {
            return "";
        }
        const diferenca =
            Date.now()
            -
            dataComentario.getTime();
        const minutos =
            Math.floor(
                diferenca /
                60000
            );
        if (
            minutos < 1
        ) {
            return "Agora";
        }
        if (
            minutos < 60
        ) {
            return `${minutos}m atrás`;
        }
        const horas =
            Math.floor(
                minutos /
                60
            );
        if (
            horas < 24
        ) {
            return `${horas}h atrás`;
        }
        const dias =
            Math.floor(
                horas /
                24
            );
        if (
            dias < 7
        ) {
            return `${dias}d atrás`;
        }
        return dataComentario
            .toLocaleDateString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }
            );
    }
    // =====================================
    // ENVIAR COMENTÁRIO
    // =====================================
    async function enviarComentario() {
        const texto =
            novoComentario.trim();
        if (!texto) {
            return;
        }
        if (!token) {
            return;
        }
        if (!postId) {
            return;
        }
        if (enviando) {
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
                await criarComentario(
                    token,
                    postId,
                    texto
                );
            if (!resposta.success) {
                throw new Error(
                    "Não foi possível enviar o comentário."
                );
            }
            const comentarioCriado =
                resposta
                    .data
                    .comentario;
            setComentarios(
                (atuais) => [
                    ...atuais,
                    comentarioCriado,
                ]
            );
            setNovoComentario(
                ""
            );
            onComentarioEnviado?.(
                resposta
                    .data
                    .comentarios_count
            );
        } catch (error) {
            console.log(
                "ERRO ENVIAR COMENTÁRIO:",
                error
            );
            setErro(
                error instanceof Error
                    ? error.message
                    : "Não foi possível enviar o comentário."
            );
        } finally {
            setEnviando(
                false
            );
        }
    }
    // =====================================
    // TELA
    // =====================================
    return (
        <Modal
            visible={
                visible
            }
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={
                onClose
            }
        >
            <KeyboardAvoidingView
                style={
                    styles.keyboard
                }
                behavior={
                    Platform.OS ===
                        "ios"
                        ? "padding"
                        : "height"
                }
            >
                {/* =========================
                    FUNDO / FECHAR
                ========================= */}
                <Pressable
                    style={
                        styles.overlay
                    }
                    onPress={
                        onClose
                    }
                >
                    {/* =========================
                        BOTTOM SHEET
                    ========================= */}
                    <Pressable
                        style={[
                            styles.sheet,
                            {
                                paddingBottom:
                                    Math.max(
                                        insets.bottom,
                                        10
                                    ),
                            },
                        ]}
                        onPress={
                            (event) =>
                                event.stopPropagation()
                        }
                    >
                        {/* =========================
                            HANDLE
                        ========================= */}
                        <View
                            style={
                                styles.handle
                            }
                        />
                        {/* =========================
                            TOPO
                        ========================= */}
                        <View
                            style={
                                styles.header
                            }
                        >
                            <Text
                                style={
                                    styles.titulo
                                }
                            >
                                Comentários ({
                                    comentarios.length
                                })
                            </Text>
                            <Pressable
                                style={
                                    styles.btnFechar
                                }
                                onPress={
                                    onClose
                                }
                            >
                                <Text
                                    style={
                                        styles.txtFechar
                                    }
                                >
                                    ×
                                </Text>
                            </Pressable>
                        </View>
                        {/* =========================
                            LISTA
                        ========================= */}
                        <ScrollView
                            style={
                                styles.scroll
                            }
                            contentContainerStyle={
                                styles.scrollConteudo
                            }
                            showsVerticalScrollIndicator={
                                false
                            }
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* CARREGANDO */}
                            {carregando && (
                                <Text
                                    style={
                                        styles.textoComentario
                                    }
                                >
                                    Carregando comentários...
                                </Text>
                            )}
                            {/* ERRO */}
                            {!carregando &&
                                erro && (
                                    <Text
                                        style={
                                            styles.textoComentario
                                        }
                                    >
                                        {erro}
                                    </Text>
                                )}
                            {/* SEM COMENTÁRIOS */}
                            {!carregando &&
                                !erro &&
                                comentarios.length ===
                                0 && (
                                    <Text
                                        style={
                                            styles.textoComentario
                                        }
                                    >
                                        Seja o primeiro a comentar.
                                    </Text>
                                )}
                            {/* COMENTÁRIOS */}
                            {!carregando &&
                                comentarios.map(
                                    (
                                        comentario
                                    ) => {
                                        const fotoAutor =
                                            getUrlFotoUsuario(
                                                comentario
                                                    .usuario
                                                    ?.foto_usuario
                                                ??
                                                null
                                            );
                                        return (
                                            <View
                                                key={
                                                    comentario
                                                        .id_comentario_publicacao
                                                }
                                                style={
                                                    styles.comentario
                                                }
                                            >
                                                {/* FOTO */}
                                                <Pressable
                                                    onPress={() =>
                                                        abrirPerfilUsuario(
                                                            comentario.usuario
                                                                ?.id_usuario
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        source={
                                                            fotoAutor
                                                                ? {
                                                                    uri: fotoAutor,
                                                                }
                                                                : require(
                                                                    "@/assets/images/img/avatar.png"
                                                                )
                                                        }
                                                        style={
                                                            styles.avatar
                                                        }
                                                    />
                                                </Pressable>
                                                {/* CONTEÚDO */}
                                                <View
                                                    style={
                                                        styles.comentarioConteudo
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.comentarioTopo
                                                        }
                                                    >
                                                        <View
                                                            style={
                                                                styles.comentarioAutor
                                                            }
                                                        >
                                                            <Pressable
                                                                onPress={() =>
                                                                    abrirPerfilUsuario(
                                                                        comentario.usuario
                                                                            ?.id_usuario
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.nome
                                                                    }
                                                                >
                                                                    {
                                                                        comentario
                                                                            .usuario
                                                                            ?.nome_usuario
                                                                        ??
                                                                        "Usuário"
                                                                    }
                                                                </Text>
                                                            </Pressable>
                                                            <Text
                                                                style={
                                                                    styles.horario
                                                                }
                                                            >
                                                                {
                                                                    formatarHorario(
                                                                        comentario
                                                                            .criado_em_comentario_publicacao
                                                                    )
                                                                }
                                                            </Text>
                                                        </View>
                                                        <Text
                                                            style={
                                                                styles.mais
                                                            }
                                                        >
                                                            ⋮
                                                        </Text>
                                                    </View>
                                                    <Text
                                                        style={
                                                            styles.textoComentario
                                                        }
                                                    >
                                                        {
                                                            comentario
                                                                .texto_comentario_publicacao
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                )}
                        </ScrollView>
                        {/* =========================
                            ESCREVER COMENTÁRIO
                        ========================= */}
                        <View
                            style={
                                styles.areaEnviar
                            }
                        >
                            {/* FOTO USUÁRIO */}
                            {fotoUsuario ? (
                                <Image
                                    source={{
                                        uri:
                                            fotoUsuario,
                                    }}
                                    style={
                                        styles.avatarInput
                                    }
                                />
                            ) : (
                                <Image
                                    source={require(
                                        "@/assets/images/img/avatar.png"
                                    )}
                                    style={
                                        styles.avatarInput
                                    }
                                />
                            )}
                            {/* INPUT */}
                            <View
                                style={
                                    styles.inputContainer
                                }
                            >
                                <TextInput
                                    value={
                                        novoComentario
                                    }
                                    onChangeText={
                                        setNovoComentario
                                    }
                                    style={
                                        styles.input
                                    }
                                    placeholder="Escreva um comentário..."
                                    placeholderTextColor={
                                        coresTema.textoSecundario
                                    }
                                    multiline
                                    maxLength={
                                        500
                                    }
                                    editable={
                                        !enviando
                                    }
                                />
                                <Image
                                    source={require(
                                        "@/assets/images/img/smile.png"
                                    )}
                                    style={
                                        styles.iconeEmoji
                                    }
                                />
                            </View>
                            {/* ENVIAR */}
                            <Pressable
                                disabled={
                                    enviando ||
                                    !novoComentario.trim()
                                }
                                onPress={
                                    enviarComentario
                                }
                                style={({
                                    pressed,
                                }) => [
                                        styles.btnEnviar,
                                        pressed &&
                                        styles.btnEnviarPressed,
                                        enviando && {
                                            opacity: 0.6,
                                        },
                                    ]}
                            >
                                <Image
                                    source={require(
                                        "@/assets/images/img/send.png"
                                    )}
                                    style={
                                        styles.iconeEnviar
                                    }
                                />
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    );
}
