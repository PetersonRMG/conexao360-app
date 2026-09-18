import { useState } from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { criarPostStyles } from "@/styles/criarPostStyles";
import globalStyle from "@/styles/globalStyles";

import MenuSreen from "./menu";

export default function CriarPostScreen() {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    const [tags, setTags] = useState([
        "Negócios",
        "Design",
        "Eventos 360",
    ]);

    const [novaTag, setNovaTag] = useState("");
    const [mostrarNovaTag, setMostrarNovaTag] = useState(false);


    // =========================
    // ADICIONAR TAG
    // =========================

    const adicionarTag = () => {

        const tag = novaTag.trim();

        if (!tag) {
            return;
        }

        if (tags.includes(tag)) {
            return;
        }

        setTags((current) => [
            ...current,
            tag,
        ]);

        setNovaTag("");
        setMostrarNovaTag(false);

    };


    // =========================
    // REMOVER TAG
    // =========================

    const removerTag = (tagRemover: string) => {

        setTags((current) =>
            current.filter(
                (tag) => tag !== tagRemover
            )
        );

    };


    // =========================
    // PUBLICAR
    // =========================

    const publicarPost = () => {

        if (!titulo.trim()) {

            console.log(
                "Informe um título para o post."
            );

            return;
        }

        if (!descricao.trim()) {

            console.log(
                "Informe uma descrição."
            );

            return;
        }


        console.log({
            titulo,
            descricao,
            tags,
        });


        // futuramente:
        // enviar para API


        // após salvar com sucesso:
        // router.replace("/home");

    };


    return (

        // =========================================
        // FUNDO EXTERNO
        // =========================================

        <View style={globalStyle.container}>


            {/* =====================================
                ÁREA MOBILE - MÁXIMO 440px
            ===================================== */}

            <View
                style={[
                    globalStyle.background,
                    criarPostStyles.container,
                ]}
            >


                <ImageBackground
                    source={require(
                        "@/assets/images/img/fundoLogin.png"
                    )}
                    style={criarPostStyles.background}
                    resizeMode="cover"
                >


                    <SafeAreaView
                        style={globalStyle.areaConteudo}
                    >


                        <View
                            style={
                                criarPostStyles.overlay
                            }
                        >


                            <KeyboardAvoidingView
                                style={
                                    criarPostStyles.keyboard
                                }
                                behavior={
                                    Platform.OS === "ios"
                                        ? "padding"
                                        : "height"
                                }
                            >


                                <ScrollView
                                    style={
                                        criarPostStyles.scroll
                                    }
                                    contentContainerStyle={
                                        criarPostStyles.scrollConteudo
                                    }
                                    showsVerticalScrollIndicator={
                                        false
                                    }
                                    keyboardShouldPersistTaps="handled"
                                >


                                    {/* =================
                                        TOPO
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.topo
                                        }
                                    >


                                        <Pressable
                                            style={({ pressed }) => [

                                                criarPostStyles.btnVoltar,

                                                pressed &&
                                                criarPostStyles.btnVoltarPressed,

                                            ]}
                                            onPress={() =>
                                                router.back()
                                            }
                                        >

                                            <Image
                                                style={
                                                    criarPostStyles.voltarImagem
                                                }
                                                source={require(
                                                    "@/assets/images/img/left.png"
                                                )}
                                            />

                                        </Pressable>


                                        <Image
                                            source={require(
                                                "@/assets/images/img/logo.svg"
                                            )}
                                            style={
                                                criarPostStyles.logo
                                            }
                                        />


                                        <View
                                            style={
                                                criarPostStyles.espacoTopo
                                            }
                                        />


                                    </View>


                                    {/* =================
                                        TÍTULO
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.apresentacao
                                        }
                                    >

                                        <Text
                                            style={
                                                criarPostStyles.tituloPagina
                                            }
                                        >

                                            Criar{" "}

                                            <Text
                                                style={
                                                    criarPostStyles.tituloDourado
                                                }
                                            >
                                                post
                                            </Text>

                                        </Text>


                                        <Text
                                            style={
                                                criarPostStyles.aviso
                                            }
                                        >
                                            Compartilhe algo relevante no network.
                                        </Text>

                                    </View>


                                    {/* =================
                                        TÍTULO DO POST
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarPostStyles.label
                                            }
                                        >
                                            Título do post
                                        </Text>


                                        <TextInput
                                            value={titulo}

                                            onChangeText={
                                                setTitulo
                                            }

                                            style={
                                                criarPostStyles.input
                                            }

                                            placeholder="Digite um texto claro e objetivo"

                                            placeholderTextColor={
                                                "#777777"
                                            }

                                            maxLength={55}
                                        />


                                        <Text
                                            style={
                                                criarPostStyles.contador
                                            }
                                        >
                                            {titulo.length}/55
                                        </Text>

                                    </View>


                                    {/* =================
                                        FOTO
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarPostStyles.label
                                            }
                                        >
                                            Adicione uma foto
                                        </Text>


                                        <Pressable
                                            style={({ pressed }) => [

                                                criarPostStyles.areaImagem,

                                                pressed &&
                                                criarPostStyles.areaImagemPressed,

                                            ]}
                                            onPress={() => {

                                                /*
                                                    Ainda não liguei aqui porque
                                                    precisamos decidir qual solução
                                                    de seleção de imagem o projeto
                                                    vai usar.

                                                    Não vou inventar dependência.
                                                */

                                            }}
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/galeria.png"
                                                )}
                                                style={
                                                    criarPostStyles.iconeImagem
                                                }
                                            />


                                            <Text
                                                style={
                                                    criarPostStyles.txtImagem
                                                }
                                            >
                                                Selecione uma foto para o post
                                            </Text>

                                        </Pressable>

                                    </View>


                                    {/* =================
                                        DESCRIÇÃO
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarPostStyles.label
                                            }
                                        >
                                            Descrição
                                        </Text>


                                        <TextInput
                                            value={descricao}

                                            onChangeText={
                                                setDescricao
                                            }

                                            style={
                                                criarPostStyles.inputDescricao
                                            }

                                            placeholder="Digite um texto claro e objetivo"

                                            placeholderTextColor={
                                                "#777777"
                                            }

                                            multiline

                                            textAlignVertical="top"

                                            maxLength={150}
                                        />


                                        <Text
                                            style={
                                                criarPostStyles.contador
                                            }
                                        >
                                            {descricao.length}/150
                                        </Text>

                                    </View>


                                    {/* =================
                                        TAGS
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarPostStyles.label
                                            }
                                        >
                                            Adicione opções de tag
                                        </Text>


                                        <View
                                            style={
                                                criarPostStyles.areaTags
                                            }
                                        >


                                            {tags.map((tag) => (

                                                <Pressable
                                                    key={tag}

                                                    style={
                                                        criarPostStyles.tag
                                                    }

                                                    onPress={() =>
                                                        removerTag(tag)
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            criarPostStyles.txtTag
                                                        }
                                                    >
                                                        {tag} ×
                                                    </Text>

                                                </Pressable>

                                            ))}


                                            <Pressable
                                                style={
                                                    criarPostStyles.btnNovaTag
                                                }
                                                onPress={() =>
                                                    setMostrarNovaTag(
                                                        (current) => !current
                                                    )
                                                }
                                            >

                                                <Text
                                                    style={
                                                        criarPostStyles.txtNovaTag
                                                    }
                                                >
                                                    + Nova
                                                </Text>

                                            </Pressable>


                                        </View>


                                        {/* =================
                                            NOVA TAG
                                        ================= */}

                                        {mostrarNovaTag && (

                                            <View
                                                style={
                                                    criarPostStyles.areaNovaTag
                                                }
                                            >

                                                <TextInput
                                                    value={
                                                        novaTag
                                                    }

                                                    onChangeText={
                                                        setNovaTag
                                                    }

                                                    style={
                                                        criarPostStyles.inputNovaTag
                                                    }

                                                    placeholder="Nome da tag"

                                                    placeholderTextColor={
                                                        "#777777"
                                                    }

                                                    maxLength={30}

                                                    onSubmitEditing={
                                                        adicionarTag
                                                    }
                                                />


                                                <Pressable
                                                    style={({ pressed }) => [

                                                        criarPostStyles.btnAdicionarTag,

                                                        pressed &&
                                                        criarPostStyles.btnAdicionarTagPressed,

                                                    ]}
                                                    onPress={
                                                        adicionarTag
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            criarPostStyles.txtAdicionarTag
                                                        }
                                                    >
                                                        Adicionar
                                                    </Text>

                                                </Pressable>

                                            </View>

                                        )}


                                    </View>


                                    {/* =================
                                        BOTÕES
                                    ================= */}

                                    <View
                                        style={
                                            criarPostStyles.areaBotoes
                                        }
                                    >


                                        <Pressable
                                            style={({ pressed }) => [

                                                criarPostStyles.btnPublicar,

                                                pressed &&
                                                criarPostStyles.btnPublicarPressed,

                                            ]}
                                            onPress={
                                                publicarPost
                                            }
                                        >

                                            <Text
                                                style={
                                                    criarPostStyles.txtPublicar
                                                }
                                            >
                                                Publicar
                                            </Text>

                                        </Pressable>


                                        <Pressable
                                            style={({ pressed }) => [

                                                criarPostStyles.btnCancelar,

                                                pressed &&
                                                criarPostStyles.btnCancelarPressed,

                                            ]}
                                            onPress={() =>
                                                router.back()
                                            }
                                        >

                                            <Text
                                                style={
                                                    criarPostStyles.txtCancelar
                                                }
                                            >
                                                Cancelar
                                            </Text>

                                        </Pressable>


                                    </View>


                                </ScrollView>


                                {/* =================
                                    FOOTER
                                ================= */}

                                <MenuSreen />


                            </KeyboardAvoidingView>


                        </View>


                    </SafeAreaView>


                </ImageBackground>


            </View>


        </View>

    );

}