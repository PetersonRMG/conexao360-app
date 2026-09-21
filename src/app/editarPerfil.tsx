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

import { criarEditarPerfilStyles } from "@/styles/editarPerfilStyles";
import { useTema } from "@/contexts/TemaContext";
import MenuSreen from "./menu";

type CampoPrivacidade =
    | "nome"
    | "usuario"
    | "ocupacao"
    | "cidadeAtual"
    | "cidadeNatal"
    | "dataNascimento"
    | "descricao";

type Privacidade =
    | "publico"
    | "privado";


export default function EditarPerfilScreen() {

    const { coresTema } = useTema();

    const editarPerfilStyles =
        criarEditarPerfilStyles(coresTema);


    // =========================
    // DADOS DO PERFIL
    // =========================

    const [nome, setNome] = useState("Fernanda Silva");
    const [usuario, setUsuario] = useState("adv_fernandasilva");
    const [ocupacao, setOcupacao] = useState("Advogada na area trabalhista");
    const [cidadeAtual, setCidadeAtual] = useState("São Paulo - SP");
    const [cidadeNatal, setCidadeNatal] = useState("São Paulo - SP");
    const [dataNascimento, setDataNascimento] = useState("18/08/1997");
    const [descricao, setDescricao] = useState(
        "A justiça começa com o conhecimento."
    );


    // =========================
    // PRIVACIDADE DOS CAMPOS
    // =========================

    const [privacidade, setPrivacidade] =
        useState<Record<CampoPrivacidade, Privacidade>>({

            nome: "publico",
            usuario: "publico",
            ocupacao: "publico",

            cidadeAtual: "privado",
            cidadeNatal: "privado",
            dataNascimento: "privado",

            descricao: "publico",

        });


    const alternarPrivacidade = (
        campo: CampoPrivacidade
    ) => {

        setPrivacidade((current) => ({

            ...current,

            [campo]:
                current[campo] === "publico"
                    ? "privado"
                    : "publico",

        }));

    };


    const botaoPrivacidade = (
        campo: CampoPrivacidade
    ) => {

        const publico =
            privacidade[campo] === "publico";

        return (

            <Pressable
                onPress={() =>
                    alternarPrivacidade(campo)
                }
                style={({ pressed }) => [

                    editarPerfilStyles.status,

                    publico
                        ? editarPerfilStyles.statusPublico
                        : editarPerfilStyles.statusPrivado,

                    pressed &&
                    editarPerfilStyles.statusPressed,

                ]}
                accessibilityRole="button"
                accessibilityLabel={
                    publico
                        ? "Alterar para privado"
                        : "Alterar para público"
                }
            >

                <View
                    style={[

                        editarPerfilStyles.statusIndicador,

                        publico
                            ? editarPerfilStyles.statusIndicadorPublico
                            : editarPerfilStyles.statusIndicadorPrivado,

                    ]}
                />

                <Text
                    style={[

                        editarPerfilStyles.txtStatus,

                        publico
                            ? editarPerfilStyles.txtStatusPublico
                            : editarPerfilStyles.txtStatusPrivado,

                    ]}
                >
                    {publico
                        ? "Público"
                        : "Privado"}
                </Text>

            </Pressable>

        );

    };


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

                                    {botaoPrivacidade("nome")}

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

                                    {botaoPrivacidade("usuario")}

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

                                    {botaoPrivacidade("ocupacao")}

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

                                    {botaoPrivacidade("cidadeAtual")}

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

                                    {botaoPrivacidade("cidadeNatal")}

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

                                    {botaoPrivacidade("dataNascimento")}

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

                                    {botaoPrivacidade("descricao")}

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