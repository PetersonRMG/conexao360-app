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

import { editarPerfilStyles } from "@/styles/editarPerfilStyles";
import globalStyle from "@/styles/globalStyles";

import MenuSreen from "./menu";

export default function EditarPerfilScreen() {

    // =========================
    // DADOS DO PERFIL
    // =========================

    const [nome, setNome] = useState("Fernanda Silva");

    const [usuario, setUsuario] = useState(
        "adv_fernandasilva"
    );

    const [ocupacao, setOcupacao] = useState(
        "Advogada na area trabalhista"
    );

    const [cidadeAtual, setCidadeAtual] = useState(
        "São Paulo - SP"
    );

    const [cidadeNatal, setCidadeNatal] = useState(
        "São Paulo - SP"
    );

    const [dataNascimento, setDataNascimento] = useState(
        "18/08/1997"
    );

    const [descricao, setDescricao] = useState(
        "A justiça começa com o conhecimento."
    );


    return (

        // =================================================
        // FUNDO EXTERNO
        // centraliza o app no navegador
        // =================================================
        <View style={globalStyle.container}>


            {/* =============================================
                ÁREA MOBILE
                máximo 440px
            ============================================= */}
            <View
                style={[
                    globalStyle.background,
                    editarPerfilStyles.container,
                ]}
            >


                {/* =========================================
                    FUNDO DA PÁGINA
                ========================================= */}
                <ImageBackground
                    source={require("@/assets/images/img/fundoLogin.png")}
                    style={editarPerfilStyles.background}
                    resizeMode="cover"
                >


                    {/* =====================================
                        SAFE AREA
                    ===================================== */}
                    <SafeAreaView style={globalStyle.areaConteudo}>


                        {/* =================================
                            OVERLAY
                        ================================= */}
                        <View style={editarPerfilStyles.overlay}>


                            {/* =============================
                                TECLADO
                            ============================= */}
                            <KeyboardAvoidingView
                                style={editarPerfilStyles.keyboard}
                                behavior={
                                    Platform.OS === "ios"
                                        ? "padding"
                                        : "height"
                                }
                            >


                                {/* =========================
                                    CONTEÚDO
                                ========================= */}
                                <ScrollView
                                    style={editarPerfilStyles.scroll}
                                    contentContainerStyle={
                                        editarPerfilStyles.scrollConteudo
                                    }
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                >


                                    {/* =====================
                                        TOPO
                                    ===================== */}
                                    <View style={editarPerfilStyles.topo}>


                                        {/* VOLTAR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                editarPerfilStyles.btnVoltar,

                                                pressed &&
                                                editarPerfilStyles.btnVoltarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                        >

                                            <Image
                                                style={
                                                    editarPerfilStyles.voltarImagem
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
                                            style={editarPerfilStyles.logo}
                                        />


                                        {/* ESPAÇO PARA CENTRALIZAR LOGO */}
                                        <View
                                            style={
                                                editarPerfilStyles.espacoTopo
                                            }
                                        />


                                    </View>


                                    {/* =====================
                                        APRESENTAÇÃO
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.apresentacao
                                        }
                                    >

                                        <Text
                                            style={
                                                editarPerfilStyles.titulo
                                            }
                                        >

                                            Editar{" "}

                                            <Text
                                                style={
                                                    editarPerfilStyles.tituloDourado
                                                }
                                            >
                                                Perfil
                                            </Text>

                                        </Text>


                                        <Text
                                            style={
                                                editarPerfilStyles.aviso
                                            }
                                        >
                                            Nunca compartilhe sua senha com terceiros.
                                        </Text>

                                    </View>


                                    {/* =====================
                                        FOTO
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.areaAvatar
                                        }
                                    >

                                        <Pressable
                                            style={
                                                editarPerfilStyles.avatarContainer
                                            }
                                            onPress={() => {

                                                // futuramente:
                                                // abrir galeria para trocar foto

                                            }}
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/avatar.png"
                                                )}
                                                style={
                                                    editarPerfilStyles.avatar
                                                }
                                            />


                                            <View
                                                style={
                                                    editarPerfilStyles.btnEditarFoto
                                                }
                                            >

                                                <Image
                                                    source={require(
                                                        "@/assets/images/img/edit.png"
                                                    )}
                                                    style={
                                                        editarPerfilStyles.iconeEditarFoto
                                                    }
                                                />

                                            </View>

                                        </Pressable>

                                    </View>


                                    {/* =================================
                                        INFORMAÇÕES PESSOAIS
                                    ================================= */}
                                    <Text
                                        style={
                                            editarPerfilStyles.tituloGrupo
                                        }
                                    >
                                        Informações pessoais
                                    </Text>


                                    {/* =====================
                                        NOME
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardCampo
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Nome
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Público
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={nome}
                                            onChangeText={setNome}
                                            style={
                                                editarPerfilStyles.input
                                            }
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =====================
                                        NOME DE USUÁRIO
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardCampo
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Nome de usuário
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Público
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={usuario}
                                            onChangeText={setUsuario}
                                            style={
                                                editarPerfilStyles.input
                                            }
                                            autoCapitalize="none"
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =====================
                                        OCUPAÇÃO
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardCampo
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Ocupação
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Público
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={ocupacao}
                                            onChangeText={setOcupacao}
                                            style={
                                                editarPerfilStyles.input
                                            }
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =====================
                                        CIDADE ATUAL
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardCampo
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Cidade atual
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Privado
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={cidadeAtual}
                                            onChangeText={setCidadeAtual}
                                            style={
                                                editarPerfilStyles.input
                                            }
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =====================
                                        CIDADE NATAL
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardCampo
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Cidade natal
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Privado
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={cidadeNatal}
                                            onChangeText={setCidadeNatal}
                                            style={
                                                editarPerfilStyles.input
                                            }
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =====================
                                        DATA NASCIMENTO
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardCampo
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Data de nascimento
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Privado
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={dataNascimento}
                                            onChangeText={setDataNascimento}
                                            style={
                                                editarPerfilStyles.input
                                            }
                                            keyboardType="number-pad"
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =====================
                                        DESCRIÇÃO
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardDescricao
                                        }
                                    >

                                        <View
                                            style={
                                                editarPerfilStyles.campoTopo
                                            }
                                        >

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Descrição
                                            </Text>


                                            <View
                                                style={
                                                    editarPerfilStyles.status
                                                }
                                            >

                                                <Text
                                                    style={
                                                        editarPerfilStyles.txtStatus
                                                    }
                                                >
                                                    Público
                                                </Text>

                                            </View>

                                        </View>


                                        <TextInput
                                            value={descricao}
                                            onChangeText={setDescricao}
                                            style={
                                                editarPerfilStyles.inputDescricao
                                            }
                                            multiline
                                            textAlignVertical="top"
                                            placeholderTextColor="#888888"
                                        />

                                    </View>


                                    {/* =================================
                                        SEGURANÇA
                                    ================================= */}
                                    <Text
                                        style={
                                            editarPerfilStyles.tituloGrupo
                                        }
                                    >
                                        Segurança e dados pessoais
                                    </Text>


                                    {/* =====================
                                        EMAIL
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardSeguranca
                                        }
                                    >

                                        <View>

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                E-mail
                                            </Text>


                                            <Text
                                                style={
                                                    editarPerfilStyles.txtDadoSeguranca
                                                }
                                            >
                                                fernandasilva@gmail.com
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                editarPerfilStyles.verificado
                                            }
                                        >
                                            Verificado
                                        </Text>

                                    </View>


                                    {/* =====================
                                        TELEFONE
                                    ===================== */}
                                    <View
                                        style={
                                            editarPerfilStyles.cardSeguranca
                                        }
                                    >

                                        <View>

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Telefone
                                            </Text>


                                            <Text
                                                style={
                                                    editarPerfilStyles.txtDadoSeguranca
                                                }
                                            >
                                                (11) 99999-9999
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                editarPerfilStyles.verificado
                                            }
                                        >
                                            Verificado
                                        </Text>

                                    </View>


                                    {/* =====================
                                        SENHA
                                    ===================== */}
                                    <Pressable
                                        style={({ pressed }) => [
                                            editarPerfilStyles.cardSeguranca,

                                            pressed &&
                                            editarPerfilStyles.btnVoltarPressed,
                                        ]}
                                        onPress={() =>
                                            router.navigate("/alterarSenha")
                                        }
                                    >

                                        <View>

                                            <Text
                                                style={
                                                    editarPerfilStyles.label
                                                }
                                            >
                                                Senha
                                            </Text>


                                            <Text
                                                style={
                                                    editarPerfilStyles.txtDadoSeguranca
                                                }
                                            >
                                                ••••••••
                                            </Text>

                                        </View>


                                        <View
                                            style={
                                                editarPerfilStyles.alterarSenha
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/trancar.png"
                                                )}
                                                style={
                                                    editarPerfilStyles.iconeSenha
                                                }
                                            />


                                            <Text
                                                style={
                                                    editarPerfilStyles.txtAlterarSenha
                                                }
                                            >
                                                Alterar senha
                                            </Text>

                                        </View>

                                    </Pressable>


                                </ScrollView>


                                {/* =========================
                                    FOOTER
                                ========================= */}
                                <MenuSreen />


                            </KeyboardAvoidingView>


                        </View>


                    </SafeAreaView>


                </ImageBackground>


            </View>


        </View>

    );
}