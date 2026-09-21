import {
    useEffect,
    useState,
} from "react";

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

import { criarComentariosModalStyles } from "@/styles/criarComentariosStyles";


interface Comentario {
    id: number;
    nome: string;
    horario: string;
    texto: string;
}


interface ComentariosModalProps {
    visible: boolean;
    onClose: () => void;
    postId?: number | string | null;
    onComentarioEnviado?: () => void;
}


const COMENTARIOS_INICIAIS: Comentario[] = [
    {
        id: 1,
        nome: "Comissão jurídica",
        horario: "10m atrás",
        texto:
            "Obrigada pelo convite. Será um prazer participar!",
    },
    {
        id: 2,
        nome: "Dra. Fernanda Silva",
        horario: "8m atrás",
        texto:
            "Excelente conteúdo. Muito importante para quem está participando do evento.",
    },
    {
        id: 3,
        nome: "Dr. Rafael Mendes",
        horario: "2m atrás",
        texto:
            "Concordo. Networking também faz parte da experiência.",
    },
];


export default function ComentariosModalScreen({

    visible,
    onClose,
    postId,
    onComentarioEnviado,

}: ComentariosModalProps) {

    const { coresTema } =
        useTema();

    const styles =
        criarComentariosModalStyles(
            coresTema
        );

    const insets =
        useSafeAreaInsets();

    const [novoComentario, setNovoComentario] =
        useState("");

    const [comentarios, setComentarios] =
        useState<Comentario[]>(
            COMENTARIOS_INICIAIS
        );


    // =========================
    // TROCA DE POST
    // =========================

    useEffect(() => {

        if (visible) {

            setNovoComentario("");

            // Futuramente:
            // GET /api/feeds/{postId}/comentarios

        }

    }, [visible, postId]);


    // =========================
    // ENVIAR COMENTÁRIO
    // =========================

    const enviarComentario = () => {

        const texto =
            novoComentario.trim();

        if (!texto) {
            return;
        }

        const comentario: Comentario = {
            id: Date.now(),
            nome: "Você",
            horario: "Agora",
            texto,
        };

        setComentarios(
            (atuais) => [
                ...atuais,
                comentario,
            ]
        );

        setNovoComentario("");

        onComentarioEnviado?.();

        // Futuramente:
        // POST /api/feeds/{postId}/comentarios

    };


    return (

        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >

            <KeyboardAvoidingView
                style={styles.keyboard}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                {/* =========================
                    FUNDO / FECHAR
                ========================= */}

                <Pressable
                    style={styles.overlay}
                    onPress={onClose}
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
                                onPress={onClose}
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
                            style={styles.scroll}
                            contentContainerStyle={
                                styles.scrollConteudo
                            }
                            showsVerticalScrollIndicator={
                                false
                            }
                            keyboardShouldPersistTaps="handled"
                        >

                            {comentarios.map(
                                (comentario) => (

                                    <View
                                        key={
                                            comentario.id
                                        }
                                        style={
                                            styles.comentario
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/avatar.png"
                                            )}
                                            style={
                                                styles.avatar
                                            }
                                        />


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

                                                    <Text
                                                        style={
                                                            styles.nome
                                                        }
                                                    >
                                                        {
                                                            comentario.nome
                                                        }
                                                    </Text>

                                                    <Text
                                                        style={
                                                            styles.horario
                                                        }
                                                    >
                                                        {
                                                            comentario.horario
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
                                                    comentario.texto
                                                }
                                            </Text>

                                        </View>

                                    </View>

                                )
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

                            <Image
                                source={require(
                                    "@/assets/images/img/avatar.png"
                                )}
                                style={
                                    styles.avatarInput
                                }
                            />


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
                                    maxLength={500}
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


                            <Pressable
                                onPress={
                                    enviarComentario
                                }
                                style={({ pressed }) => [
                                    styles.btnEnviar,
                                    pressed &&
                                    styles.btnEnviarPressed,
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
