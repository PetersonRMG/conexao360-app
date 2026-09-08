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

import { criarPostStyles } from "@/styles/criarPostStyles";
import MenuSreen from "./menu";

export default function CriarPostScreen() {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    const [tags, setTags] = useState([
        "Negócios",
        "Design",
        "Eventos 360",
    ]);

    return (
        <View style={criarPostStyles.container}>

            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={criarPostStyles.background}
                resizeMode="cover"
            >

                <View style={criarPostStyles.overlay}>

                    <KeyboardAvoidingView
                        style={criarPostStyles.keyboard}
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                    >

                        <ScrollView
                            style={criarPostStyles.scroll}
                            contentContainerStyle={criarPostStyles.scrollConteudo}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >

                            {/* ================= TOPO ================= */}
                            <View style={criarPostStyles.topo}>

                                <Pressable
                                    style={({ pressed }) => [
                                        criarPostStyles.btnVoltar,
                                        pressed && criarPostStyles.btnVoltarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Image
                                        style={criarPostStyles.voltarImagem}
                                        source={require("@/assets/images/img/left.png")}
                                    />

                                </Pressable>

                                <Image
                                    source={require("@/assets/images/img/logo.svg")}
                                    style={criarPostStyles.logo}
                                />

                                <View style={criarPostStyles.espacoTopo} />

                            </View>


                            {/* ================= TÍTULO DA PÁGINA ================= */}
                            <View style={criarPostStyles.apresentacao}>

                                <Text style={criarPostStyles.tituloPagina}>
                                    Criar{" "}
                                    <Text style={criarPostStyles.tituloDourado}>
                                        post
                                    </Text>
                                </Text>

                                <Text style={criarPostStyles.aviso}>
                                    Compartilhe algo relevante no network.
                                </Text>

                            </View>


                            {/* ================= TÍTULO POST ================= */}
                            <View style={criarPostStyles.card}>

                                <Text style={criarPostStyles.label}>
                                    Título do post
                                </Text>

                                <TextInput
                                    value={titulo}
                                    onChangeText={setTitulo}
                                    style={criarPostStyles.input}
                                    placeholder="Digite um texto claro e objetivo"
                                    placeholderTextColor="#777777"
                                    maxLength={55}
                                />

                                <Text style={criarPostStyles.contador}>
                                    {titulo.length}/55
                                </Text>

                            </View>


                            {/* ================= FOTO ================= */}
                            <View style={criarPostStyles.card}>

                                <Text style={criarPostStyles.label}>
                                    Adicione uma foto
                                </Text>

                                <Pressable
                                    style={({ pressed }) => [
                                        criarPostStyles.areaImagem,
                                        pressed && criarPostStyles.areaImagemPressed,
                                    ]}
                                    onPress={() => {
                                        // futuramente abrir galeria/câmera
                                    }}
                                >

                                    <Image
                                        source={require("@/assets/images/img/galeria.png")}
                                        style={criarPostStyles.iconeImagem}
                                    />

                                    <Text style={criarPostStyles.txtImagem}>
                                        Selecione uma foto para o post
                                    </Text>

                                </Pressable>

                            </View>


                            {/* ================= DESCRIÇÃO ================= */}
                            <View style={criarPostStyles.card}>

                                <Text style={criarPostStyles.label}>
                                    Descrição
                                </Text>

                                <TextInput
                                    value={descricao}
                                    onChangeText={setDescricao}
                                    style={criarPostStyles.inputDescricao}
                                    placeholder="Digite um texto claro e objetivo"
                                    placeholderTextColor="#777777"
                                    multiline
                                    textAlignVertical="top"
                                    maxLength={150}
                                />

                                <Text style={criarPostStyles.contador}>
                                    {descricao.length}/150
                                </Text>

                            </View>


                            {/* ================= TAGS ================= */}
                            <View style={criarPostStyles.card}>

                                <Text style={criarPostStyles.label}>
                                    Adicione opções de tag
                                </Text>

                                <View style={criarPostStyles.areaTags}>

                                    {tags.map((tag, index) => (

                                        <Pressable
                                            key={index}
                                            style={criarPostStyles.tag}
                                        >

                                            <Text style={criarPostStyles.txtTag}>
                                                {tag}
                                            </Text>

                                        </Pressable>

                                    ))}


                                    <Pressable
                                        style={criarPostStyles.btnNovaTag}
                                        onPress={() => {
                                            // futuramente abrir campo/modal para nova tag
                                        }}
                                    >

                                        <Text style={criarPostStyles.txtNovaTag}>
                                            + Nova
                                        </Text>

                                    </Pressable>

                                </View>

                            </View>


                            {/* ================= BOTÕES ================= */}
                            <View style={criarPostStyles.areaBotoes}>

                                <Pressable
                                    style={({ pressed }) => [
                                        criarPostStyles.btnPublicar,
                                        pressed && criarPostStyles.btnPublicarPressed,
                                    ]}
                                    onPress={() => {

                                        // futuramente enviar post para API

                                    }}
                                >

                                    <Text style={criarPostStyles.txtPublicar}>
                                        Publicar
                                    </Text>

                                </Pressable>


                                <Pressable
                                    style={({ pressed }) => [
                                        criarPostStyles.btnCancelar,
                                        pressed && criarPostStyles.btnCancelarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Text style={criarPostStyles.txtCancelar}>
                                        Cancelar
                                    </Text>

                                </Pressable>

                            </View>

                        </ScrollView>


                        {/* ================= FOOTER ================= */}
                        <MenuSreen />

                    </KeyboardAvoidingView>

                </View>

            </ImageBackground>

        </View>
    );
}