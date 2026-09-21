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

import { criarExcluirContaStyles } from "@/styles/excluirContaStyles";
import { useTema } from "@/contexts/TemaContext";
import globalStyle from "@/styles/globalStyles";

import MenuSreen from "./menu";

export default function ExcluirContaScreen() {

    const { coresTema } = useTema();

    const excluirContaStyles = criarExcluirContaStyles(coresTema);

    const [senha, setSenha] = useState("");
    const [verSenha, setVerSenha] = useState(false);

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
                    excluirContaStyles.container,
                ]}
            >


                {/* =================================
                    FUNDO
                ================================= */}
                <ImageBackground
                    source={require("@/assets/images/img/fundoLogin.png")}
                    style={excluirContaStyles.background}
                    resizeMode="cover"
                >


                    {/* =============================
                        SAFE AREA
                    ============================= */}
                    <SafeAreaView style={globalStyle.areaConteudo}>


                        <View style={excluirContaStyles.overlay}>


                            {/* =========================
                                TECLADO
                            ========================= */}
                            <KeyboardAvoidingView
                                style={excluirContaStyles.keyboard}
                                behavior={
                                    Platform.OS === "ios"
                                        ? "padding"
                                        : "height"
                                }
                            >


                                {/* =====================
                                    CONTEÚDO
                                ===================== */}
                                <ScrollView
                                    style={excluirContaStyles.scroll}
                                    contentContainerStyle={
                                        excluirContaStyles.scrollConteudo
                                    }
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                >


                                    {/* =================
                                        TOPO
                                    ================= */}
                                    <View style={excluirContaStyles.topo}>


                                        {/* VOLTAR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                excluirContaStyles.btnVoltar,

                                                pressed &&
                                                excluirContaStyles.btnVoltarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/left.png"
                                                )}
                                                style={
                                                    excluirContaStyles.voltarImagem
                                                }
                                            />

                                        </Pressable>


                                        {/* LOGO */}
                                        <Image
                                            source={require(
                                                "@/assets/images/img/logo.svg"
                                            )}
                                            style={excluirContaStyles.logo}
                                        />


                                        {/* ESPAÇO PARA CENTRALIZAR LOGO */}
                                        <View
                                            style={
                                                excluirContaStyles.espacoTopo
                                            }
                                        />


                                    </View>


                                    {/* =================
                                        APRESENTAÇÃO
                                    ================= */}
                                    <View
                                        style={
                                            excluirContaStyles.apresentacao
                                        }
                                    >

                                        <Text
                                            style={
                                                excluirContaStyles.titulo
                                            }
                                        >

                                            Excluir{" "}

                                            <Text
                                                style={
                                                    excluirContaStyles.tituloDourado
                                                }
                                            >
                                                Conta
                                            </Text>

                                        </Text>


                                        <Text
                                            style={
                                                excluirContaStyles.aviso
                                            }
                                        >
                                            Esta é uma ação irreversível.
                                            Por isso, tenha certeza.
                                        </Text>

                                    </View>


                                    {/* =================
                                        CARD
                                    ================= */}
                                    <View style={excluirContaStyles.card}>


                                        {/* TÍTULO DO CARD */}
                                        <View
                                            style={
                                                excluirContaStyles.cardTituloArea
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/caution.png"
                                                )}
                                                style={
                                                    excluirContaStyles.iconeAviso
                                                }
                                            />


                                            <Text
                                                style={
                                                    excluirContaStyles.cardTitulo
                                                }
                                            >
                                                Confirme a Exclusão
                                                {"\n"}
                                                da Sua Conta
                                            </Text>

                                        </View>


                                        {/* =====================
                                            AVISOS
                                        ===================== */}
                                        <View
                                            style={
                                                excluirContaStyles.listaAvisos
                                            }
                                        >


                                            <View
                                                style={
                                                    excluirContaStyles.avisoItem
                                                }
                                            >

                                                <Text
                                                    style={
                                                        excluirContaStyles.bullet
                                                    }
                                                >
                                                    •
                                                </Text>

                                                <Text
                                                    style={
                                                        excluirContaStyles.txtAviso
                                                    }
                                                >
                                                    Todos os seus dados pessoais,
                                                    nome, e-mail, telefone e
                                                    informações serão permanentemente
                                                    excluídos.
                                                </Text>

                                            </View>


                                            <View
                                                style={
                                                    excluirContaStyles.avisoItem
                                                }
                                            >

                                                <Text
                                                    style={
                                                        excluirContaStyles.bullet
                                                    }
                                                >
                                                    •
                                                </Text>

                                                <Text
                                                    style={
                                                        excluirContaStyles.txtAviso
                                                    }
                                                >
                                                    Todo o seu histórico de
                                                    publicações e interações será
                                                    deletado.
                                                </Text>

                                            </View>


                                            <View
                                                style={
                                                    excluirContaStyles.avisoItem
                                                }
                                            >

                                                <Text
                                                    style={
                                                        excluirContaStyles.bullet
                                                    }
                                                >
                                                    •
                                                </Text>

                                                <Text
                                                    style={
                                                        excluirContaStyles.txtAviso
                                                    }
                                                >
                                                    Suas conexões e mensagens de
                                                    chat serão perdidas.
                                                </Text>

                                            </View>


                                            <View
                                                style={
                                                    excluirContaStyles.avisoItem
                                                }
                                            >

                                                <Text
                                                    style={
                                                        excluirContaStyles.bullet
                                                    }
                                                >
                                                    •
                                                </Text>

                                                <Text
                                                    style={
                                                        excluirContaStyles.txtAviso
                                                    }
                                                >
                                                    Você perderá o acesso
                                                    imediatamente.
                                                </Text>

                                            </View>


                                            <View
                                                style={
                                                    excluirContaStyles.avisoItem
                                                }
                                            >

                                                <Text
                                                    style={
                                                        excluirContaStyles.bullet
                                                    }
                                                >
                                                    •
                                                </Text>

                                                <Text
                                                    style={
                                                        excluirContaStyles.txtAviso
                                                    }
                                                >
                                                    Não é possível recuperar uma
                                                    conta excluída.
                                                </Text>

                                            </View>


                                        </View>


                                        {/* =====================
                                            CONFIRMAÇÃO
                                        ===================== */}
                                        <Text
                                            style={
                                                excluirContaStyles.txtConfirmacao
                                            }
                                        >
                                            Para confirmar, por favor,
                                            digite sua senha atual:
                                        </Text>


                                        {/* =====================
                                            INPUT SENHA
                                        ===================== */}
                                        <View
                                            style={
                                                excluirContaStyles.inputContainer
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/trancar.png"
                                                )}
                                                style={
                                                    excluirContaStyles.iconeInput
                                                }
                                            />


                                            <TextInput
                                                value={senha}
                                                onChangeText={setSenha}

                                                style={
                                                    excluirContaStyles.input
                                                }

                                                placeholder="Digite sua senha"
                                                placeholderTextColor="#888888"

                                                secureTextEntry={!verSenha}

                                                autoCapitalize="none"
                                                autoCorrect={false}
                                            />


                                            {/* MOSTRAR SENHA */}
                                            <Pressable
                                                onPress={() =>
                                                    setVerSenha(
                                                        (current) => !current
                                                    )
                                                }
                                            >

                                                <Image
                                                    source={
                                                        verSenha

                                                            ? require(
                                                                "@/assets/images/img/esconder.png"
                                                            )

                                                            : require(
                                                                "@/assets/images/img/olho.png"
                                                            )
                                                    }
                                                    style={
                                                        excluirContaStyles.iconeOlho
                                                    }
                                                />

                                            </Pressable>


                                        </View>


                                        {/* =====================
                                            ESQUECI SENHA
                                        ===================== */}
                                        <Pressable
                                            style={
                                                excluirContaStyles.esqueciSenha
                                            }
                                            onPress={() =>
                                                router.navigate("/esqueciSenha")
                                            }
                                        >

                                            <Text
                                                style={
                                                    excluirContaStyles.txtEsqueciSenha
                                                }
                                            >
                                                Esqueci minha senha
                                            </Text>

                                        </Pressable>


                                    </View>


                                    {/* =====================
                                        BOTÕES
                                    ===================== */}
                                    <View
                                        style={
                                            excluirContaStyles.areaBotoes
                                        }
                                    >


                                        {/* CANCELAR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                excluirContaStyles.btnCancelar,

                                                pressed &&
                                                excluirContaStyles.btnCancelarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                        >

                                            <Text
                                                style={
                                                    excluirContaStyles.txtCancelar
                                                }
                                            >
                                                Cancelar
                                            </Text>

                                        </Pressable>


                                        {/* EXCLUIR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                excluirContaStyles.btnExcluir,

                                                pressed &&
                                                excluirContaStyles.btnExcluirPressed,
                                            ]}
                                            onPress={() => {

                                                if (!senha.trim()) {

                                                    console.log(
                                                        "Digite sua senha para continuar"
                                                    );

                                                    return;
                                                }


                                                // futuramente:
                                                // validar senha na API
                                                // excluir conta
                                                // limpar autenticação
                                                // router.replace("/");

                                                console.log(
                                                    "Solicitação para excluir conta"
                                                );

                                            }}
                                        >

                                            <Text
                                                style={
                                                    excluirContaStyles.txtExcluir
                                                }
                                            >
                                                Excluir
                                            </Text>

                                        </Pressable>


                                    </View>


                                </ScrollView>


                                {/* =====================
                                    FOOTER
                                ===================== */}
                                <MenuSreen />


                            </KeyboardAvoidingView>


                        </View>


                    </SafeAreaView>


                </ImageBackground>


            </View>


        </View>

    );
}