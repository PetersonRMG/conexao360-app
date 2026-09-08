import { useState } from "react";
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

import { conversaStyles } from "@/styles/conversaStyles";

export default function ConversaScreen() {

    const [mensagem, setMensagem] = useState("");

    const [mensagens, setMensagens] = useState([
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
            horario: "09:15",
            minha: false,
        },
        {
            id: 4,
            texto: "Excelente!\nMuito obrigado",
            horario: "09:18",
            minha: true,
        },
        {
            id: 5,
            texto: "Claro!\nTudo certo, já enviei o material",
            horario: "09:15",
            minha: false,
        },
        {
            id: 6,
            texto: "Excelente!\nMuito obrigado",
            horario: "09:18",
            minha: true,
        },
    ]);


    const enviarMensagem = () => {

        if (!mensagem.trim()) {
            return;
        }

        const novaMensagem = {
            id: Date.now(),
            texto: mensagem.trim(),
            horario: "Agora",
            minha: true,
        };

        setMensagens([
            ...mensagens,
            novaMensagem,
        ]);

        setMensagem("");
    };


    return (
        <KeyboardAvoidingView
            style={conversaStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

            {/* ================= HEADER ================= */}
            <View style={conversaStyles.header}>

                {/* VOLTAR */}
                <Pressable
                    style={conversaStyles.btnVoltar}
                    onPress={() => router.back()}
                >

                    <Image
                        source={require("@/assets/images/img/left.png")}
                        style={conversaStyles.iconeVoltar}
                    />

                </Pressable>


                {/* PERFIL */}
                <View style={conversaStyles.perfil}>

                    <View style={conversaStyles.avatarContainer}>

                        <Image
                            source={require("@/assets/images/img/avatar.png")}
                            style={conversaStyles.avatar}
                        />

                        <View style={conversaStyles.online} />

                    </View>


                    <View>

                        <Text style={conversaStyles.nome}>
                            Dra. Simone Baptista
                        </Text>

                        <Text style={conversaStyles.status}>
                            Online
                        </Text>

                    </View>

                </View>


                {/* MENU */}
                <Pressable
                    style={conversaStyles.btnMais}
                    onPress={() => {
                        // opções da conversa futuramente
                    }}
                >

                    <Text style={conversaStyles.mais}>
                        ⋮
                    </Text>

                </Pressable>

            </View>


            {/* ================= SEGURANÇA ================= */}
            <View style={conversaStyles.areaSeguranca}>

                <View style={conversaStyles.avisoSeguranca}>

                    <Image
                        source={require("@/assets/images/img/trancar.png")}
                        style={conversaStyles.iconeSeguranca}
                    />

                    <Text style={conversaStyles.txtSeguranca}>
                        Todas as mensagens são protegidas{"\n"}
                        com criptografia de ponta a ponta
                    </Text>

                </View>

            </View>


            {/* ================= HOJE ================= */}
            <View style={conversaStyles.divisorData}>

                <View style={conversaStyles.linha} />

                <Text style={conversaStyles.data}>
                    Hoje
                </Text>

                <View style={conversaStyles.linha} />

            </View>


            {/* ================= MENSAGENS ================= */}
            <ScrollView
                style={conversaStyles.scroll}
                contentContainerStyle={conversaStyles.scrollConteudo}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
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


            {/* ================= ENVIO ================= */}
            <View style={conversaStyles.areaEnviar}>

                {/* ANEXO */}
                <Pressable
                    style={conversaStyles.btnAnexo}
                    onPress={() => {
                        // futuramente anexar arquivo
                    }}
                >

                    <Image
                        source={require("@/assets/images/img/paper-clip.png")}
                        style={conversaStyles.iconeAnexo}
                    />

                </Pressable>


                {/* INPUT */}
                <View style={conversaStyles.inputContainer}>

                    <TextInput
                        value={mensagem}
                        onChangeText={setMensagem}
                        style={conversaStyles.input}
                        placeholder="Digite uma mensagem..."
                        placeholderTextColor="#777777"
                        multiline
                    />


                    <Pressable
                        onPress={() => {
                            // emojis futuramente
                        }}
                    >

                        <Image
                            source={require("@/assets/images/img/smile.png")}
                            style={conversaStyles.iconeEmoji}
                        />

                    </Pressable>

                </View>


                {/* ENVIAR */}
                <Pressable
                    style={({ pressed }) => [
                        conversaStyles.btnEnviar,
                        pressed && conversaStyles.btnEnviarPressed,
                    ]}
                    onPress={enviarMensagem}
                >

                    <Image
                        source={require("@/assets/images/img/send.png")}
                        style={conversaStyles.iconeEnviar}
                    />

                </Pressable>

            </View>

        </KeyboardAvoidingView>
    );
}