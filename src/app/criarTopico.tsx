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

import { criarTopicosStyles } from "@/styles/criarTopicos";
import MenuSreen from "./menu";

export default function CriarTopicosScreen() {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    const [opcoes, setOpcoes] = useState([
        "Direito",
        "Design",
        "Eventos 360",
    ]);

    return (
        <View style={criarTopicosStyles.container}>

            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={criarTopicosStyles.background}
                resizeMode="cover"
            >

                <View style={criarTopicosStyles.overlay}>

                    <KeyboardAvoidingView
                        style={criarTopicosStyles.keyboard}
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                    >

                        <ScrollView
                            style={criarTopicosStyles.scroll}
                            contentContainerStyle={
                                criarTopicosStyles.scrollConteudo
                            }
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >

                            {/* ================= TOPO ================= */}
                            <View style={criarTopicosStyles.topo}>

                                <Pressable
                                    style={({ pressed }) => [
                                        criarTopicosStyles.btnVoltar,
                                        pressed &&
                                        criarTopicosStyles.btnVoltarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Image
                                        style={criarTopicosStyles.voltarImagem}
                                        source={require("@/assets/images/img/left.png")}
                                    />

                                </Pressable>


                                <Image
                                    source={require("@/assets/images/img/logo.svg")}
                                    style={criarTopicosStyles.logo}
                                />


                                <View style={criarTopicosStyles.espacoTopo} />

                            </View>


                            {/* ================= APRESENTAÇÃO ================= */}
                            <View style={criarTopicosStyles.apresentacao}>

                                <Text style={criarTopicosStyles.tituloPagina}>
                                    Criar{" "}

                                    <Text
                                        style={criarTopicosStyles.tituloDourado}
                                    >
                                        tópico
                                    </Text>
                                </Text>


                                <Text style={criarTopicosStyles.aviso}>
                                    Compartilhe um assunto relevante com a comunidade.
                                </Text>

                            </View>


                            {/* ================= TÍTULO ================= */}
                            <View style={criarTopicosStyles.card}>

                                <Text style={criarTopicosStyles.label}>
                                    Título do tópico
                                </Text>

                                <TextInput
                                    value={titulo}
                                    onChangeText={setTitulo}
                                    style={criarTopicosStyles.input}
                                    placeholder="Digite um texto claro e objetivo"
                                    placeholderTextColor="#777777"
                                    maxLength={55}
                                />

                                <Text style={criarTopicosStyles.contador}>
                                    {titulo.length}/55
                                </Text>

                            </View>


                            {/* ================= ÍCONE ================= */}
                            <View style={criarTopicosStyles.card}>

                                <Text style={criarTopicosStyles.label}>
                                    Selecione um ícone
                                </Text>

                                <Pressable
                                    style={({ pressed }) => [
                                        criarTopicosStyles.seletor,
                                        pressed &&
                                        criarTopicosStyles.seletorPressed,
                                    ]}
                                    onPress={() => {

                                        // futuramente abrir seleção de ícones

                                    }}
                                >

                                    <Text style={criarTopicosStyles.txtSeletor}>
                                        Selecione um ícone
                                    </Text>

                                    <Image
                                        source={require("@/assets/images/img/galeria.png")}
                                        style={criarTopicosStyles.iconeSeletor}
                                    />

                                </Pressable>

                            </View>


                            {/* ================= DESCRIÇÃO ================= */}
                            <View style={criarTopicosStyles.card}>

                                <Text style={criarTopicosStyles.label}>
                                    Descrição
                                </Text>

                                <TextInput
                                    value={descricao}
                                    onChangeText={setDescricao}
                                    style={criarTopicosStyles.inputDescricao}
                                    placeholder="Digite um texto claro e objetivo"
                                    placeholderTextColor="#777777"
                                    multiline
                                    textAlignVertical="top"
                                    maxLength={150}
                                />

                                <Text style={criarTopicosStyles.contador}>
                                    {descricao.length}/150
                                </Text>

                            </View>


                            {/* ================= VOTAÇÃO ================= */}
                            <View style={criarTopicosStyles.card}>

                                <Text style={criarTopicosStyles.label}>
                                    Adicione opções para votação
                                </Text>


                                <View style={criarTopicosStyles.areaOpcoes}>

                                    {opcoes.map((opcao, index) => (

                                        <Pressable
                                            key={index}
                                            style={criarTopicosStyles.opcao}
                                        >

                                            <Text
                                                style={
                                                    criarTopicosStyles.txtOpcao
                                                }
                                            >
                                                {opcao}
                                            </Text>

                                        </Pressable>

                                    ))}


                                    <Pressable
                                        style={criarTopicosStyles.btnNovaOpcao}
                                        onPress={() => {

                                            // futuramente adicionar nova opção

                                        }}
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

                            </View>


                            {/* ================= BOTÕES ================= */}
                            <View style={criarTopicosStyles.areaBotoes}>

                                <Pressable
                                    style={({ pressed }) => [
                                        criarTopicosStyles.btnPublicar,

                                        pressed &&
                                        criarTopicosStyles.btnPublicarPressed,
                                    ]}
                                    onPress={() => {

                                        // futuramente publicar tópico

                                    }}
                                >

                                    <Text
                                        style={
                                            criarTopicosStyles.txtPublicar
                                        }
                                    >
                                        Publicar
                                    </Text>

                                </Pressable>


                                <Pressable
                                    style={({ pressed }) => [
                                        criarTopicosStyles.btnCancelar,

                                        pressed &&
                                        criarTopicosStyles.btnCancelarPressed,
                                    ]}
                                    onPress={() => router.back()}
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


                        {/* ================= FOOTER ================= */}
                        <MenuSreen />

                    </KeyboardAvoidingView>

                </View>

            </ImageBackground>

        </View>
    );
}