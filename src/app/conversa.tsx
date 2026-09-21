import { useRef, useState } from "react";
import { router } from "expo-router";

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

import { SafeAreaView } from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyles";
import { criarConversaStyles } from "@/styles/conversaStyles";
import { useTema } from "@/contexts/TemaContext";


interface Mensagem {
    id: number;
    texto: string;
    horario: string;
    minha: boolean;
}


export default function ConversaScreen() {

        const { coresTema } = useTema();
    
    const conversaStyles = criarConversaStyles(coresTema);

    const [mensagem, setMensagem] = useState("");

    const scrollRef = useRef<ScrollView>(null);


    // =========================
    // MENSAGENS
    // =========================

    const [mensagens, setMensagens] = useState<Mensagem[]>([

        {
            id: 1,
            texto: "Bom dia!!",
            horario: "09:15",
            minha: false,
        },

        {
            id: 2,
            texto: "Bom dia!\nTudo certo para o evento?",
            horario: "09:18",
            minha: true,
        },

        {
            id: 3,
            texto: "Claro!\nTudo certo, já enviei o material",
            horario: "09:20",
            minha: false,
        },

        {
            id: 4,
            texto: "Excelente!\nMuito obrigado",
            horario: "09:21",
            minha: true,
        },

        {
            id: 5,
            texto: "Claro!\nTudo certo, já enviei o material",
            horario: "09:23",
            minha: false,
        },

        {
            id: 6,
            texto: "Excelente!\nMuito obrigado",
            horario: "09:24",
            minha: true,
        },

    ]);


    // =========================
    // ENVIAR MENSAGEM
    // =========================

    const enviarMensagem = () => {

        const texto = mensagem.trim();

        if (!texto) {
            return;
        }


        const agora = new Date();

        const horario = agora.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );


        const novaMensagem: Mensagem = {

            id: Date.now(),

            texto,

            horario,

            minha: true,

        };


        setMensagens((current) => [
            ...current,
            novaMensagem,
        ]);


        setMensagem("");

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
                    conversaStyles.container,
                ]}
            >


                <SafeAreaView
                    style={globalStyle.areaConteudo}
                >


                    <KeyboardAvoidingView
                        style={conversaStyles.keyboard}

                        behavior={
                            Platform.OS === "ios"
                                ? "padding"
                                : "height"
                        }
                    >


                        {/* =========================
                            HEADER DA CONVERSA
                        ========================= */}

                        <View style={conversaStyles.header}>


                            {/* VOLTAR */}

                            <Pressable
                                style={({ pressed }) => [

                                    conversaStyles.btnVoltar,

                                    pressed &&
                                    conversaStyles.btnVoltarPressed,

                                ]}
                                onPress={() => router.back()}
                            >

                                <Image
                                    source={require(
                                        "@/assets/images/img/left.png"
                                    )}
                                    style={
                                        conversaStyles.iconeVoltar
                                    }
                                />

                            </Pressable>


                            {/* =====================
                                PERFIL
                            ===================== */}

                            <Pressable
                                style={conversaStyles.perfil}

                                onPress={() =>
                                    router.navigate("/perfil")
                                }
                            >


                                <View
                                    style={
                                        conversaStyles.avatarContainer
                                    }
                                >

                                    <Image
                                        source={require(
                                            "@/assets/images/img/avatar.png"
                                        )}
                                        style={
                                            conversaStyles.avatar
                                        }
                                    />


                                    <View
                                        style={
                                            conversaStyles.online
                                        }
                                    />

                                </View>


                                <View>

                                    <Text
                                        style={
                                            conversaStyles.nome
                                        }
                                    >
                                        Dra. Simone Baptista
                                    </Text>


                                    <Text
                                        style={
                                            conversaStyles.status
                                        }
                                    >
                                        Online
                                    </Text>

                                </View>


                            </Pressable>


                            {/* =====================
                                MENU DA CONVERSA
                            ===================== */}

                            <Pressable
                                style={
                                    conversaStyles.btnMais
                                }

                                onPress={() => {

                                    // futuramente:
                                    // abrir menu específico
                                    // da conversa

                                }}
                            >

                                <Text
                                    style={
                                        conversaStyles.mais
                                    }
                                >
                                    ⋮
                                </Text>

                            </Pressable>


                        </View>


                        {/* =========================
                            SEGURANÇA
                        ========================= */}

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
                                    source={require(
                                        "@/assets/images/img/trancar.png"
                                    )}
                                    style={
                                        conversaStyles.iconeSeguranca
                                    }
                                />


                                <Text
                                    style={
                                        conversaStyles.txtSeguranca
                                    }
                                >
                                    Suas mensagens permanecem
                                    protegidas dentro da plataforma
                                </Text>

                            </View>

                        </View>


                        {/* =========================
                            DATA
                        ========================= */}

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
                                Hoje
                            </Text>


                            <View
                                style={
                                    conversaStyles.linha
                                }
                            />

                        </View>


                        {/* =========================
                            MENSAGENS
                        ========================= */}

                        <ScrollView
                            ref={scrollRef}

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

                            onContentSizeChange={() => {

                                scrollRef.current?.scrollToEnd({
                                    animated: true,
                                });

                            }}
                        >

                            {mensagens.map((item) => (

                                <View
                                    key={item.id}

                                    style={[
                                        conversaStyles.linhaMensagem,

                                        item.minha
                                            ? conversaStyles.linhaMinhaMensagem
                                            : conversaStyles.linhaMensagemRecebida,
                                    ]}
                                >

                                    <View
                                        style={[
                                            conversaStyles.balao,

                                            item.minha
                                                ? conversaStyles.balaoMeu
                                                : conversaStyles.balaoRecebido,
                                        ]}
                                    >

                                        <Text
                                            style={[
                                                conversaStyles.txtMensagem,

                                                item.minha &&
                                                conversaStyles.txtMinhaMensagem,
                                            ]}
                                        >
                                            {item.texto}
                                        </Text>


                                        <Text
                                            style={[
                                                conversaStyles.horario,

                                                item.minha &&
                                                conversaStyles.horarioMeu,
                                            ]}
                                        >
                                            {item.horario}
                                        </Text>

                                    </View>

                                </View>

                            ))}

                        </ScrollView>


                        {/* =========================
                            ENVIO
                        ========================= */}

                        <View
                            style={
                                conversaStyles.areaEnviar
                            }
                        >


                            {/* ANEXO */}

                            <Pressable
                                style={({ pressed }) => [

                                    conversaStyles.btnAnexo,

                                    pressed &&
                                    conversaStyles.btnAnexoPressed,

                                ]}
                                onPress={() => {

                                    // futuramente:
                                    // abrir seletor de arquivo

                                }}
                            >

                                <Image
                                    source={require(
                                        "@/assets/images/img/paper-clip.png"
                                    )}
                                    style={
                                        conversaStyles.iconeAnexo
                                    }
                                />

                            </Pressable>


                            {/* =====================
                                INPUT
                            ===================== */}

                            <View
                                style={
                                    conversaStyles.inputContainer
                                }
                            >

                                <TextInput
                                    value={mensagem}

                                    onChangeText={
                                        setMensagem
                                    }

                                    style={
                                        conversaStyles.input
                                    }

                                    placeholder="Digite uma mensagem..."

                                    placeholderTextColor="#777777"

                                    multiline

                                    maxLength={1000}

                                    returnKeyType="default"
                                />


                                {/* EMOJI */}

                                <Pressable
                                    onPress={() => {

                                        // futuramente:
                                        // abrir seletor de emoji

                                    }}
                                >

                                    <Image
                                        source={require(
                                            "@/assets/images/img/smile.png"
                                        )}
                                        style={
                                            conversaStyles.iconeEmoji
                                        }
                                    />

                                </Pressable>


                            </View>


                            {/* =====================
                                ENVIAR
                            ===================== */}

                            <Pressable
                                style={({ pressed }) => [

                                    conversaStyles.btnEnviar,

                                    pressed &&
                                    conversaStyles.btnEnviarPressed,

                                ]}
                                onPress={
                                    enviarMensagem
                                }
                            >

                                <Image
                                    source={require(
                                        "@/assets/images/img/send.png"
                                    )}
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