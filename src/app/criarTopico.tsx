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

import globalStyle from "@/styles/globalStyles";
import { criarTopicosStyle } from "@/styles/criarTopicos";
import { useTema } from "@/contexts/TemaContext";

import MenuSreen from "./menu";


export default function CriarTopicosScreen() {
        const { coresTema } = useTema();
    
    const criarTopicosStyles = criarTopicosStyle(coresTema);

    // =========================
    // DADOS DO TÓPICO
    // =========================

    const [titulo, setTitulo] = useState("");

    const [descricao, setDescricao] = useState("");


    // =========================
    // OPÇÕES
    // =========================

    const [opcoes, setOpcoes] = useState([
        "Direito",
        "Design",
        "Eventos 360",
    ]);

    const [novaOpcao, setNovaOpcao] = useState("");

    const [mostrarNovaOpcao, setMostrarNovaOpcao] =
        useState(false);


    // =========================
    // ADICIONAR OPÇÃO
    // =========================

    const adicionarOpcao = () => {

        const opcao = novaOpcao.trim();

        if (!opcao) {
            return;
        }

        if (opcoes.includes(opcao)) {
            return;
        }

        setOpcoes((current) => [
            ...current,
            opcao,
        ]);

        setNovaOpcao("");

        setMostrarNovaOpcao(false);

    };


    // =========================
    // REMOVER OPÇÃO
    // =========================

    const removerOpcao = (
        opcaoRemover: string
    ) => {

        setOpcoes((current) =>
            current.filter(
                (opcao) =>
                    opcao !== opcaoRemover
            )
        );

    };


    // =========================
    // PUBLICAR
    // =========================

    const publicarTopico = () => {

        if (!titulo.trim()) {

            console.log(
                "Informe um título."
            );

            return;

        }


        if (!descricao.trim()) {

            console.log(
                "Informe uma descrição."
            );

            return;

        }


        if (opcoes.length < 2) {

            console.log(
                "Adicione pelo menos duas opções."
            );

            return;

        }


        console.log({

            titulo,
            descricao,
            opcoes,

        });


        // futuramente:
        // enviar tópico para API

        // após salvar:
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
                    criarTopicosStyles.container,
                ]}
            >


                {/* =================================
                    FUNDO
                ================================= */}

                <ImageBackground
                    source={require(
                        "@/assets/images/img/fundoLogin.png"
                    )}
                    style={
                        criarTopicosStyles.background
                    }
                    resizeMode="cover"
                >


                    {/* =============================
                        SAFE AREA
                    ============================= */}

                    <SafeAreaView
                        style={
                            globalStyle.areaConteudo
                        }
                    >


                        <View
                            style={
                                criarTopicosStyles.overlay
                            }
                        >


                            {/* =====================
                                TECLADO
                            ===================== */}

                            <KeyboardAvoidingView
                                style={
                                    criarTopicosStyles.keyboard
                                }
                                behavior={
                                    Platform.OS === "ios"
                                        ? "padding"
                                        : "height"
                                }
                            >


                                {/* =================
                                    CONTEÚDO
                                ================= */}

                                <ScrollView
                                    style={
                                        criarTopicosStyles.scroll
                                    }
                                    contentContainerStyle={
                                        criarTopicosStyles.scrollConteudo
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
                                            criarTopicosStyles.topo
                                        }
                                    >


                                        {/* VOLTAR */}

                                        <Pressable
                                            style={({ pressed }) => [

                                                criarTopicosStyles.btnVoltar,

                                                pressed &&
                                                criarTopicosStyles.btnVoltarPressed,

                                            ]}
                                            onPress={() =>
                                                router.back()
                                            }
                                        >

                                            <Image
                                                style={
                                                    criarTopicosStyles.voltarImagem
                                                }
                                                source={require(
                                                    "@/assets/images/img/left.png"
                                                )}
                                            />

                                        </Pressable>


                                        {/* LOGO */}

                                        <Image
                                            source={require(
                                                "@/assets/images/img/logo.svg"
                                            )}
                                            style={
                                                criarTopicosStyles.logo
                                            }
                                        />


                                        {/* ESPAÇO */}

                                        <View
                                            style={
                                                criarTopicosStyles.espacoTopo
                                            }
                                        />


                                    </View>


                                    {/* =================
                                        APRESENTAÇÃO
                                    ================= */}

                                    <View
                                        style={
                                            criarTopicosStyles.apresentacao
                                        }
                                    >

                                        <Text
                                            style={
                                                criarTopicosStyles.tituloPagina
                                            }
                                        >

                                            Criar{" "}

                                            <Text
                                                style={
                                                    criarTopicosStyles.tituloDourado
                                                }
                                            >
                                                tópico
                                            </Text>

                                        </Text>


                                        <Text
                                            style={
                                                criarTopicosStyles.aviso
                                            }
                                        >
                                            Compartilhe um assunto relevante com a comunidade.
                                        </Text>

                                    </View>


                                    {/* =================
                                        TÍTULO
                                    ================= */}

                                    <View
                                        style={
                                            criarTopicosStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarTopicosStyles.label
                                            }
                                        >
                                            Título do tópico
                                        </Text>


                                        <TextInput
                                            value={titulo}

                                            onChangeText={
                                                setTitulo
                                            }

                                            style={
                                                criarTopicosStyles.input
                                            }

                                            placeholder="Digite um texto claro e objetivo"

                                            placeholderTextColor={
                                                "#777777"
                                            }

                                            maxLength={55}
                                        />


                                        <Text
                                            style={
                                                criarTopicosStyles.contador
                                            }
                                        >
                                            {titulo.length}/55
                                        </Text>

                                    </View>


                                    {/* =================
                                        ÍCONE
                                    ================= */}

                                    <View
                                        style={
                                            criarTopicosStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarTopicosStyles.label
                                            }
                                        >
                                            Selecione um ícone
                                        </Text>


                                        <Pressable
                                            style={({ pressed }) => [

                                                criarTopicosStyles.seletor,

                                                pressed &&
                                                criarTopicosStyles.seletorPressed,

                                            ]}
                                            onPress={() => {

                                                /*
                                                    Aqui ainda não vou inventar
                                                    modal ou seletor.

                                                    Podemos montar a seleção
                                                    usando os ícones que já
                                                    existem no projeto.
                                                */

                                            }}
                                        >

                                            <Text
                                                style={
                                                    criarTopicosStyles.txtSeletor
                                                }
                                            >
                                                Selecione um ícone
                                            </Text>


                                            <Image
                                                source={require(
                                                    "@/assets/images/img/galeria.png"
                                                )}
                                                style={
                                                    criarTopicosStyles.iconeSeletor
                                                }
                                            />

                                        </Pressable>

                                    </View>


                                    {/* =================
                                        DESCRIÇÃO
                                    ================= */}

                                    <View
                                        style={
                                            criarTopicosStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarTopicosStyles.label
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
                                                criarTopicosStyles.inputDescricao
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
                                                criarTopicosStyles.contador
                                            }
                                        >
                                            {descricao.length}/150
                                        </Text>

                                    </View>


                                    {/* =================
                                        VOTAÇÃO
                                    ================= */}

                                    <View
                                        style={
                                            criarTopicosStyles.card
                                        }
                                    >

                                        <Text
                                            style={
                                                criarTopicosStyles.label
                                            }
                                        >
                                            Adicione opções para votação
                                        </Text>


                                        <View
                                            style={
                                                criarTopicosStyles.areaOpcoes
                                            }
                                        >


                                            {/* OPÇÕES */}

                                            {opcoes.map(
                                                (opcao) => (

                                                    <Pressable
                                                        key={
                                                            opcao
                                                        }
                                                        style={
                                                            criarTopicosStyles.opcao
                                                        }
                                                        onPress={() =>
                                                            removerOpcao(
                                                                opcao
                                                            )
                                                        }
                                                    >

                                                        <Text
                                                            style={
                                                                criarTopicosStyles.txtOpcao
                                                            }
                                                        >
                                                            {opcao} ×
                                                        </Text>

                                                    </Pressable>

                                                )
                                            )}


                                            {/* NOVA OPÇÃO */}

                                            <Pressable
                                                style={
                                                    criarTopicosStyles.btnNovaOpcao
                                                }
                                                onPress={() =>
                                                    setMostrarNovaOpcao(
                                                        (current) =>
                                                            !current
                                                    )
                                                }
                                            >

                                                <Text
                                                    style={
                                                        criarTopicosStyles.txtNovaOpcao
                                                    }
                                                >
                                                    + Nova
                                                </Text>

                                            </Pressable>


                                        </View>


                                        {/* =================
                                            CAMPO NOVA OPÇÃO
                                        ================= */}

                                        {mostrarNovaOpcao && (

                                            <View
                                                style={
                                                    criarTopicosStyles.areaNovaOpcao
                                                }
                                            >

                                                <TextInput
                                                    value={
                                                        novaOpcao
                                                    }

                                                    onChangeText={
                                                        setNovaOpcao
                                                    }

                                                    style={
                                                        criarTopicosStyles.inputNovaOpcao
                                                    }

                                                    placeholder="Nova opção"

                                                    placeholderTextColor={
                                                        "#777777"
                                                    }

                                                    maxLength={40}

                                                    onSubmitEditing={
                                                        adicionarOpcao
                                                    }
                                                />


                                                <Pressable
                                                    style={({ pressed }) => [

                                                        criarTopicosStyles.btnAdicionarOpcao,

                                                        pressed &&
                                                        criarTopicosStyles.btnAdicionarOpcaoPressed,

                                                    ]}
                                                    onPress={
                                                        adicionarOpcao
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            criarTopicosStyles.txtAdicionarOpcao
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
                                            criarTopicosStyles.areaBotoes
                                        }
                                    >


                                        {/* PUBLICAR */}

                                        <Pressable
                                            style={({ pressed }) => [

                                                criarTopicosStyles.btnPublicar,

                                                pressed &&
                                                criarTopicosStyles.btnPublicarPressed,

                                            ]}
                                            onPress={
                                                publicarTopico
                                            }
                                        >

                                            <Text
                                                style={
                                                    criarTopicosStyles.txtPublicar
                                                }
                                            >
                                                Publicar
                                            </Text>

                                        </Pressable>


                                        {/* CANCELAR */}

                                        <Pressable
                                            style={({ pressed }) => [

                                                criarTopicosStyles.btnCancelar,

                                                pressed &&
                                                criarTopicosStyles.btnCancelarPressed,

                                            ]}
                                            onPress={() =>
                                                router.back()
                                            }
                                        >

                                            <Text
                                                style={
                                                    criarTopicosStyles.txtCancelar
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