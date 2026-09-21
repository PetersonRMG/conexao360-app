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

import { criarAlterarSenhaStyles } from "@/styles/alterarSenhaStyles";
import globalStyle from "@/styles/globalStyles";
import { useTema } from "@/contexts/TemaContext";

import MenuSreen from "./menu";

export default function AlterarSenhaScreen() {


    const { coresTema } = useTema();

    const alterarSenhaStyles = criarAlterarSenhaStyles(coresTema);

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [verSenhaAtual, setVerSenhaAtual] = useState(false);
    const [verNovaSenha, setVerNovaSenha] = useState(false);
    const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);


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
                    alterarSenhaStyles.container,
                ]}
            >


                {/* =================================
                    FUNDO
                ================================= */}
                <ImageBackground
                    source={require("@/assets/images/img/fundoLogin.png")}
                    style={alterarSenhaStyles.background}
                    resizeMode="cover"
                >


                    {/* =============================
                        SAFE AREA
                    ============================= */}
                    <SafeAreaView style={globalStyle.areaConteudo}>


                        <View style={alterarSenhaStyles.overlay}>


                            {/* =========================
                                TECLADO
                            ========================= */}
                            <KeyboardAvoidingView
                                style={alterarSenhaStyles.keyboard}
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
                                    style={alterarSenhaStyles.scroll}
                                    contentContainerStyle={
                                        alterarSenhaStyles.scrollConteudo
                                    }
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                >


                                    {/* =================
                                        TOPO
                                    ================= */}
                                    <View style={alterarSenhaStyles.topo}>


                                        {/* VOLTAR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                alterarSenhaStyles.btnVoltar,

                                                pressed &&
                                                alterarSenhaStyles.btnVoltarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/left.png"
                                                )}
                                                style={
                                                    alterarSenhaStyles.voltarImagem
                                                }
                                            />

                                        </Pressable>


                                        {/* LOGO */}
                                        <Image
                                            source={require(
                                                "@/assets/images/img/logo.svg"
                                            )}
                                            style={alterarSenhaStyles.logo}
                                        />


                                        <View
                                            style={
                                                alterarSenhaStyles.espacoTopo
                                            }
                                        />


                                    </View>


                                    {/* =================
                                        APRESENTAÇÃO
                                    ================= */}
                                    <View
                                        style={
                                            alterarSenhaStyles.apresentacao
                                        }
                                    >

                                        <Text
                                            style={
                                                alterarSenhaStyles.titulo
                                            }
                                        >

                                            Alterar{" "}

                                            <Text
                                                style={
                                                    alterarSenhaStyles.tituloDourado
                                                }
                                            >
                                                Senha
                                            </Text>

                                        </Text>


                                        <Text
                                            style={
                                                alterarSenhaStyles.aviso
                                            }
                                        >
                                            Nunca compartilhe sua senha com terceiros.
                                        </Text>

                                    </View>


                                    {/* =================
                                        CARD
                                    ================= */}
                                    <View style={alterarSenhaStyles.card}>


                                        {/* =====================
                                            SENHA ATUAL
                                        ===================== */}
                                        <View style={alterarSenhaStyles.campo}>

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/trancar.png"
                                                )}
                                                style={
                                                    alterarSenhaStyles.iconeCampo
                                                }
                                            />


                                            <View
                                                style={
                                                    alterarSenhaStyles.areaInput
                                                }
                                            >

                                                <Text
                                                    style={
                                                        alterarSenhaStyles.label
                                                    }
                                                >
                                                    Senha Atual
                                                </Text>


                                                <TextInput
                                                    value={senhaAtual}
                                                    onChangeText={setSenhaAtual}

                                                    style={
                                                        alterarSenhaStyles.input
                                                    }

                                                    secureTextEntry={
                                                        !verSenhaAtual
                                                    }

                                                    placeholder="Digite sua senha atual"
                                                    placeholderTextColor="#777777"

                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                />

                                            </View>


                                            {/* MOSTRAR SENHA */}
                                            <Pressable
                                                onPress={() =>
                                                    setVerSenhaAtual(
                                                        (current) => !current
                                                    )
                                                }
                                            >

                                                <Image
                                                    source={
                                                        verSenhaAtual

                                                            ? require(
                                                                "@/assets/images/img/esconder.png"
                                                            )

                                                            : require(
                                                                "@/assets/images/img/olho.png"
                                                            )
                                                    }
                                                    style={
                                                        alterarSenhaStyles.iconeOlho
                                                    }
                                                />

                                            </Pressable>


                                        </View>


                                        {/* =====================
                                            NOVA SENHA
                                        ===================== */}
                                        <View style={alterarSenhaStyles.campo}>

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/trancar.png"
                                                )}
                                                style={
                                                    alterarSenhaStyles.iconeCampo
                                                }
                                            />


                                            <View
                                                style={
                                                    alterarSenhaStyles.areaInput
                                                }
                                            >

                                                <Text
                                                    style={
                                                        alterarSenhaStyles.label
                                                    }
                                                >
                                                    Nova Senha
                                                </Text>


                                                <TextInput
                                                    value={novaSenha}
                                                    onChangeText={setNovaSenha}

                                                    style={
                                                        alterarSenhaStyles.input
                                                    }

                                                    secureTextEntry={
                                                        !verNovaSenha
                                                    }

                                                    placeholder="Digite sua nova senha"
                                                    placeholderTextColor="#777777"

                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                />

                                            </View>


                                            {/* MOSTRAR SENHA */}
                                            <Pressable
                                                onPress={() =>
                                                    setVerNovaSenha(
                                                        (current) => !current
                                                    )
                                                }
                                            >

                                                <Image
                                                    source={
                                                        verNovaSenha

                                                            ? require(
                                                                "@/assets/images/img/esconder.png"
                                                            )

                                                            : require(
                                                                "@/assets/images/img/olho.png"
                                                            )
                                                    }
                                                    style={
                                                        alterarSenhaStyles.iconeOlho
                                                    }
                                                />

                                            </Pressable>


                                        </View>


                                        {/* =====================
                                            CONFIRMAR NOVA SENHA
                                        ===================== */}
                                        <View style={alterarSenhaStyles.campo}>

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/trancar.png"
                                                )}
                                                style={
                                                    alterarSenhaStyles.iconeCampo
                                                }
                                            />


                                            <View
                                                style={
                                                    alterarSenhaStyles.areaInput
                                                }
                                            >

                                                <Text
                                                    style={
                                                        alterarSenhaStyles.label
                                                    }
                                                >
                                                    Confirmar Nova Senha
                                                </Text>


                                                <TextInput
                                                    value={confirmarSenha}
                                                    onChangeText={setConfirmarSenha}

                                                    style={
                                                        alterarSenhaStyles.input
                                                    }

                                                    secureTextEntry={
                                                        !verConfirmarSenha
                                                    }

                                                    placeholder="Digite novamente sua senha"
                                                    placeholderTextColor="#777777"

                                                    autoCapitalize="none"
                                                    autoCorrect={false}
                                                />

                                            </View>


                                            {/* MOSTRAR SENHA */}
                                            <Pressable
                                                onPress={() =>
                                                    setVerConfirmarSenha(
                                                        (current) => !current
                                                    )
                                                }
                                            >

                                                <Image
                                                    source={
                                                        verConfirmarSenha

                                                            ? require(
                                                                "@/assets/images/img/esconder.png"
                                                            )

                                                            : require(
                                                                "@/assets/images/img/olho.png"
                                                            )
                                                    }
                                                    style={
                                                        alterarSenhaStyles.iconeOlho
                                                    }
                                                />

                                            </Pressable>


                                        </View>


                                        {/* =====================
                                            DICAS DE SEGURANÇA
                                        ===================== */}
                                        <View style={alterarSenhaStyles.cardInfo}>

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/info.png"
                                                )}
                                                style={
                                                    alterarSenhaStyles.iconeInfo
                                                }
                                            />


                                            <View
                                                style={
                                                    alterarSenhaStyles.areaInfo
                                                }
                                            >

                                                <Text
                                                    style={
                                                        alterarSenhaStyles.tituloInfo
                                                    }
                                                >
                                                    Dicas para uma senha mais segura
                                                </Text>


                                                <Text
                                                    style={
                                                        alterarSenhaStyles.txtInfo
                                                    }
                                                >
                                                    • Use pelo menos 8 caracteres.
                                                    {"\n"}
                                                    • Combine letras, números e símbolos.
                                                </Text>

                                            </View>


                                        </View>


                                    </View>


                                    {/* =====================
                                        BOTÕES
                                    ===================== */}
                                    <View style={alterarSenhaStyles.areaBotoes}>


                                        {/* SALVAR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                alterarSenhaStyles.btnSalvar,

                                                pressed &&
                                                alterarSenhaStyles.btnSalvarPressed,
                                            ]}
                                            onPress={() => {

                                                // futuramente:
                                                // validar senhaAtual

                                                if (
                                                    novaSenha !== confirmarSenha
                                                ) {

                                                    console.log(
                                                        "As senhas não são iguais"
                                                    );

                                                    return;
                                                }


                                                console.log(
                                                    "Nova senha:",
                                                    novaSenha
                                                );

                                                // chamada da API futuramente

                                            }}
                                        >

                                            <Text
                                                style={
                                                    alterarSenhaStyles.txtSalvar
                                                }
                                            >
                                                Salvar nova senha
                                            </Text>

                                        </Pressable>


                                        {/* CANCELAR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                alterarSenhaStyles.btnCancelar,

                                                pressed &&
                                                alterarSenhaStyles.btnCancelarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                        >

                                            <Text
                                                style={
                                                    alterarSenhaStyles.txtCancelar
                                                }
                                            >
                                                Cancelar
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