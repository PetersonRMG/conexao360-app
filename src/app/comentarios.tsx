import {
    useState
} from "react";

import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import {
    SafeAreaView
} from "react-native-safe-area-context";

import HeaderCreen from "./header";
import MenuSreen from "./menu";

import globalStyle from "@/styles/globalStyles";

import {
    criarComentariosStyles
} from "@/styles/criarComentariosStyles";

import {
    useTema
} from "@/contexts/TemaContext";


interface Comentario {

    id: number;

    nome: string;

    texto: string;

    horario: string;

}


export default function ComentariosScreen() {

    const {
        coresTema
    } = useTema();


    const styles =
        criarComentariosStyles(
            coresTema
        );


    const [comentario, setComentario] =
        useState("");


    const [
        comentarios,
        setComentarios
    ] = useState<Comentario[]>([

        {
            id: 1,

            nome: "Comissão jurídica",

            texto:
                "Obrigada pelo convite. Será um prazer participar!",

            horario: "10m atrás",
        },

        {
            id: 2,

            nome: "Comissão jurídica",

            texto:
                "Obrigada pelo convite. Será um prazer participar!",

            horario: "10m atrás",
        },

        {
            id: 3,

            nome: "Comissão jurídica",

            texto:
                "Obrigada pelo convite. Será um prazer participar!",

            horario: "10m atrás",
        },

    ]);


    // =========================
    // ENVIAR COMENTÁRIO
    // =========================

    const enviarComentario = () => {

        const texto =
            comentario.trim();


        if (!texto) {
            return;
        }


        const novoComentario = {

            id: Date.now(),

            nome: "Fernanda Silva",

            texto,

            horario: "Agora",

        };


        setComentarios(
            (current) => [

                ...current,

                novoComentario,

            ]
        );


        setComentario("");

    };


    return (

        <View
            style={
                globalStyle.container
            }
        >


            {/* =========================
                MOBILE 440px
            ========================= */}

            <View
                style={[
                    globalStyle.background,

                    {
                        backgroundColor:
                            coresTema.fundo,
                    },
                ]}
            >


                <SafeAreaView
                    style={
                        globalStyle.areaConteudo
                    }
                >


                    <KeyboardAvoidingView
                        style={styles.container}

                        behavior={
                            Platform.OS === "ios"
                                ? "padding"
                                : "height"
                        }
                    >


                        {/* =================
                            HEADER
                        ================= */}

                        <HeaderCreen />


                        {/* =================
                            SCROLL
                        ================= */}

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


                            {/* =================
                                POST
                            ================= */}

                            <View
                                style={
                                    styles.post
                                }
                            >

                                <View
                                    style={
                                        styles.postHeader
                                    }
                                >

                                    <Image
                                        source={require(
                                            "@/assets/images/img/avatar.png"
                                        )}
                                        style={
                                            styles.avatarPost
                                        }
                                    />


                                    <View>

                                        <Text
                                            style={
                                                styles.nomePost
                                            }
                                        >
                                            Dr. Simone Baptista
                                        </Text>


                                        <Text
                                            style={
                                                styles.tempoPost
                                            }
                                        >
                                            2h
                                        </Text>

                                    </View>

                                </View>


                                <Text
                                    style={
                                        styles.textoPost
                                    }
                                >
                                    Lorem Ipsum has been the
                                    industry's standard dummy
                                    text ever since 1966.
                                </Text>


                                {/* =================
                                    AÇÕES
                                ================= */}

                                <View
                                    style={
                                        styles.acoes
                                    }
                                >

                                    <View
                                        style={
                                            styles.acao
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/heart.png"
                                            )}
                                            style={
                                                styles.iconeAcao
                                            }
                                        />

                                        <Text
                                            style={
                                                styles.txtAcao
                                            }
                                        >
                                            Curtir
                                        </Text>

                                    </View>


                                    <View
                                        style={
                                            styles.acao
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/coment.png"
                                            )}
                                            style={
                                                styles.iconeAcao
                                            }
                                        />

                                        <Text
                                            style={
                                                styles.txtAcao
                                            }
                                        >
                                            Comentar
                                        </Text>

                                    </View>


                                    <View
                                        style={
                                            styles.acao
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/share.png"
                                            )}
                                            style={
                                                styles.iconeAcao
                                            }
                                        />

                                        <Text
                                            style={
                                                styles.txtAcao
                                            }
                                        >
                                            Compartilhar
                                        </Text>

                                    </View>

                                </View>


                            </View>


                            {/* =================
                                TÍTULO
                            ================= */}

                            <Text
                                style={
                                    styles.tituloComentarios
                                }
                            >
                                Comentários ({comentarios.length})
                            </Text>


                            {/* =================
                                COMENTÁRIOS
                            ================= */}

                            {comentarios.map(
                                (item) => (

                                    <View
                                        key={item.id}
                                        style={
                                            styles.comentario
                                        }
                                    >

                                        <View
                                            style={
                                                styles.avatarComentario
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/usuario.png"
                                                )}
                                                style={
                                                    styles.imgComentario
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.comentarioConteudo
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.nomeComentario
                                                }
                                            >
                                                {item.nome}
                                            </Text>


                                            <Text
                                                style={
                                                    styles.horarioComentario
                                                }
                                            >
                                                {item.horario}
                                            </Text>


                                            <Text
                                                style={
                                                    styles.textoComentario
                                                }
                                            >
                                                {item.texto}
                                            </Text>

                                        </View>


                                    </View>

                                ))}


                        </ScrollView>


                        {/* =========================
                            NOVO COMENTÁRIO
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
                                        comentario
                                    }

                                    onChangeText={
                                        setComentario
                                    }

                                    style={
                                        styles.input
                                    }

                                    placeholder="Escreva um comentário..."

                                    placeholderTextColor={
                                        coresTema.textoSecundario
                                    }
                                />


                                <Pressable
                                    onPress={
                                        enviarComentario
                                    }
                                >

                                    <Image
                                        source={require(
                                            "@/assets/images/img/send.png"
                                        )}
                                        style={
                                            styles.send
                                        }
                                    />

                                </Pressable>

                            </View>


                        </View>


                        {/* =================
                            FOOTER
                        ================= */}

                        <MenuSreen />


                    </KeyboardAvoidingView>


                </SafeAreaView>


            </View>


        </View>

    );

}