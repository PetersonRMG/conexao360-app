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

import { editarPerfilStyles } from "@/styles/editarPerfilStyles";
import MenuSreen from "./menu";

export default function EditarPerfilScreen() {

    const [nome, setNome] = useState("Fernanda Silva");
    const [usuario, setUsuario] = useState("adv_fernandasilva");
    const [ocupacao, setOcupacao] = useState("Advogada na area trabalhista");
    const [cidadeAtual, setCidadeAtual] = useState("São Paulo - SP");
    const [cidadeNatal, setCidadeNatal] = useState("São Paulo - SP");
    const [dataNascimento, setDataNascimento] = useState("18/08/1997");
    const [descricao, setDescricao] = useState(
        "A justiça começa com o conhecimento."
    );

    return (
        <View style={editarPerfilStyles.container}>

            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={editarPerfilStyles.background}
                resizeMode="cover"
            >

                <View style={editarPerfilStyles.overlay}>

                    <KeyboardAvoidingView
                        style={editarPerfilStyles.keyboard}
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                    >

                        <ScrollView
                            style={editarPerfilStyles.scroll}
                            contentContainerStyle={editarPerfilStyles.scrollConteudo}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >

                            {/* ================= TOPO ================= */}
                            <View style={editarPerfilStyles.topo}>

                                <Pressable
                                    style={({ pressed }) => [
                                        editarPerfilStyles.btnVoltar,
                                        pressed && editarPerfilStyles.btnVoltarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >
                                    <Image
                                        style={editarPerfilStyles.voltarImagem}
                                        source={require("@/assets/images/img/left.png")}
                                    />
                                </Pressable>

                                <Image
                                    source={require("@/assets/images/img/logo.svg")}
                                    style={editarPerfilStyles.logo}
                                />

                                <View style={editarPerfilStyles.espacoTopo} />

                            </View>


                            {/* ================= TÍTULO ================= */}
                            <View style={editarPerfilStyles.apresentacao}>

                                <Text style={editarPerfilStyles.titulo}>
                                    Editar{" "}
                                    <Text style={editarPerfilStyles.tituloDourado}>
                                        Perfil
                                    </Text>
                                </Text>

                                <Text style={editarPerfilStyles.aviso}>
                                    Nunca compartilhe sua senha com terceiros.
                                </Text>

                            </View>


                            {/* ================= FOTO ================= */}
                            <View style={editarPerfilStyles.areaAvatar}>

                                <Pressable style={editarPerfilStyles.avatarContainer}>

                                    <Image
                                        source={require("@/assets/images/img/avatar.png")}
                                        style={editarPerfilStyles.avatar}
                                    />

                                    <View style={editarPerfilStyles.btnEditarFoto}>

                                        <Image
                                            source={require("@/assets/images/img/edit.png")}
                                            style={editarPerfilStyles.iconeEditarFoto}
                                        />

                                    </View>

                                </Pressable>

                            </View>


                            {/* ================= INFORMAÇÕES PESSOAIS ================= */}
                            <Text style={editarPerfilStyles.tituloGrupo}>
                                Informações pessoais
                            </Text>


                            {/* NOME */}
                            <View style={editarPerfilStyles.cardCampo}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Nome
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Público
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={nome}
                                    onChangeText={setNome}
                                    style={editarPerfilStyles.input}
                                />

                            </View>


                            {/* USUÁRIO */}
                            <View style={editarPerfilStyles.cardCampo}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Nome de usuário
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Público
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={usuario}
                                    onChangeText={setUsuario}
                                    style={editarPerfilStyles.input}
                                    autoCapitalize="none"
                                />

                            </View>


                            {/* OCUPAÇÃO */}
                            <View style={editarPerfilStyles.cardCampo}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Ocupação
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Público
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={ocupacao}
                                    onChangeText={setOcupacao}
                                    style={editarPerfilStyles.input}
                                />

                            </View>


                            {/* CIDADE ATUAL */}
                            <View style={editarPerfilStyles.cardCampo}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Cidade atual
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Privado
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={cidadeAtual}
                                    onChangeText={setCidadeAtual}
                                    style={editarPerfilStyles.input}
                                />

                            </View>


                            {/* CIDADE NATAL */}
                            <View style={editarPerfilStyles.cardCampo}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Cidade natal
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Privado
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={cidadeNatal}
                                    onChangeText={setCidadeNatal}
                                    style={editarPerfilStyles.input}
                                />

                            </View>


                            {/* DATA NASCIMENTO */}
                            <View style={editarPerfilStyles.cardCampo}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Data de nascimento
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Privado
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={dataNascimento}
                                    onChangeText={setDataNascimento}
                                    style={editarPerfilStyles.input}
                                    keyboardType="number-pad"
                                />

                            </View>


                            {/* ================= DESCRIÇÃO ================= */}
                            <View style={editarPerfilStyles.cardDescricao}>

                                <View style={editarPerfilStyles.campoTopo}>

                                    <Text style={editarPerfilStyles.label}>
                                        Descrição
                                    </Text>

                                    <View style={editarPerfilStyles.status}>
                                        <Text style={editarPerfilStyles.txtStatus}>
                                            Público
                                        </Text>
                                    </View>

                                </View>

                                <TextInput
                                    value={descricao}
                                    onChangeText={setDescricao}
                                    style={editarPerfilStyles.inputDescricao}
                                    multiline
                                    textAlignVertical="top"
                                />

                            </View>


                            {/* ================= SEGURANÇA ================= */}
                            <Text style={editarPerfilStyles.tituloGrupo}>
                                Segurança e dados pessoais
                            </Text>


                            {/* EMAIL */}
                            <View style={editarPerfilStyles.cardSeguranca}>

                                <View>
                                    <Text style={editarPerfilStyles.label}>
                                        E-mail
                                    </Text>

                                    <Text style={editarPerfilStyles.txtDadoSeguranca}>
                                        fernandasilva@gmail.com
                                    </Text>
                                </View>

                                <Text style={editarPerfilStyles.verificado}>
                                    Verificado
                                </Text>

                            </View>


                            {/* TELEFONE */}
                            <View style={editarPerfilStyles.cardSeguranca}>

                                <View>
                                    <Text style={editarPerfilStyles.label}>
                                        Telefone
                                    </Text>

                                    <Text style={editarPerfilStyles.txtDadoSeguranca}>
                                        (11) 99999-9999
                                    </Text>
                                </View>

                                <Text style={editarPerfilStyles.verificado}>
                                    Verificado
                                </Text>

                            </View>


                            {/* SENHA */}
                            <Pressable
                                style={editarPerfilStyles.cardSeguranca}
                                onPress={() => {
                                    // rota futura para alterar senha
                                }}
                            >

                                <View>

                                    <Text style={editarPerfilStyles.label}>
                                        Senha
                                    </Text>

                                    <Text style={editarPerfilStyles.txtDadoSeguranca}>
                                        ••••••••
                                    </Text>

                                </View>


                                <View style={editarPerfilStyles.alterarSenha}>

                                    <Image
                                        source={require("@/assets/images/img/trancar.png")}
                                        style={editarPerfilStyles.iconeSenha}
                                    />

                                    <Text style={editarPerfilStyles.txtAlterarSenha}>
                                        Alterar senha
                                    </Text>

                                </View>

                            </Pressable>

                        </ScrollView>


                        {/* ================= FOOTER ================= */}
                        <MenuSreen />

                    </KeyboardAvoidingView>

                </View>

            </ImageBackground>

        </View>
    );
}