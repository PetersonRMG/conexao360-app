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

import { excluirContaStyles } from "@/styles/excluirContaStyles";
import MenuSreen from "./menu";

export default function ExcluirContaScreen() {

    const [senha, setSenha] = useState("");
    const [verSenha, setVerSenha] = useState(false);

    return (
        <View style={excluirContaStyles.container}>

            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={excluirContaStyles.background}
                resizeMode="cover"
            >

                <View style={excluirContaStyles.overlay}>

                    <KeyboardAvoidingView
                        style={excluirContaStyles.keyboard}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >

                        <ScrollView
                            style={excluirContaStyles.scroll}
                            contentContainerStyle={excluirContaStyles.scrollConteudo}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >

                            {/* ================= TOPO ================= */}
                            <View style={excluirContaStyles.topo}>

                                <Pressable
                                    style={({ pressed }) => [
                                        excluirContaStyles.btnVoltar,
                                        pressed && excluirContaStyles.btnVoltarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Image
                                        source={require("@/assets/images/img/left.png")}
                                        style={excluirContaStyles.voltarImagem}
                                    />

                                </Pressable>

                                <Image
                                    source={require("@/assets/images/img/logo.svg")}
                                    style={excluirContaStyles.logo}
                                />

                                <View style={excluirContaStyles.espacoTopo} />

                            </View>


                            {/* ================= TÍTULO ================= */}
                            <View style={excluirContaStyles.apresentacao}>

                                <Text style={excluirContaStyles.titulo}>
                                    Excluir{" "}
                                    <Text style={excluirContaStyles.tituloDourado}>
                                        Conta
                                    </Text>
                                </Text>

                                <Text style={excluirContaStyles.aviso}>
                                    Esta é uma ação irreversível. Por isso, tenha certeza.
                                </Text>

                            </View>


                            {/* ================= CARD ================= */}
                            <View style={excluirContaStyles.card}>

                                {/* TÍTULO CARD */}
                                <View style={excluirContaStyles.cardTituloArea}>

                                    <Image
                                        source={require("@/assets/images/img/caution.png")}
                                        style={excluirContaStyles.iconeAviso}
                                    />

                                    <Text style={excluirContaStyles.cardTitulo}>
                                        Confirme a Exclusão{"\n"}
                                        da Sua Conta
                                    </Text>

                                </View>


                                {/* AVISOS */}
                                <View style={excluirContaStyles.listaAvisos}>

                                    <View style={excluirContaStyles.avisoItem}>
                                        <Text style={excluirContaStyles.bullet}>
                                            •
                                        </Text>

                                        <Text style={excluirContaStyles.txtAviso}>
                                            Todos os seus dados pessoais, nome,
                                            e-mail, telefone e informações serão
                                            permanentemente excluídos.
                                        </Text>
                                    </View>


                                    <View style={excluirContaStyles.avisoItem}>
                                        <Text style={excluirContaStyles.bullet}>
                                            •
                                        </Text>

                                        <Text style={excluirContaStyles.txtAviso}>
                                            Todo o seu histórico de publicações e
                                            interações será deletado.
                                        </Text>
                                    </View>


                                    <View style={excluirContaStyles.avisoItem}>
                                        <Text style={excluirContaStyles.bullet}>
                                            •
                                        </Text>

                                        <Text style={excluirContaStyles.txtAviso}>
                                            Suas conexões e mensagens de chat serão
                                            perdidas.
                                        </Text>
                                    </View>


                                    <View style={excluirContaStyles.avisoItem}>
                                        <Text style={excluirContaStyles.bullet}>
                                            •
                                        </Text>

                                        <Text style={excluirContaStyles.txtAviso}>
                                            Você perderá o acesso imediatamente.
                                        </Text>
                                    </View>


                                    <View style={excluirContaStyles.avisoItem}>
                                        <Text style={excluirContaStyles.bullet}>
                                            •
                                        </Text>

                                        <Text style={excluirContaStyles.txtAviso}>
                                            Não é possível recuperar uma conta
                                            excluída.
                                        </Text>
                                    </View>

                                </View>


                                {/* TEXTO CONFIRMAÇÃO */}
                                <Text style={excluirContaStyles.txtConfirmacao}>
                                    Para confirmar, por favor, digite sua senha atual:
                                </Text>


                                {/* SENHA */}
                                <View style={excluirContaStyles.inputContainer}>

                                    <Image
                                        source={require("@/assets/images/img/trancar.png")}
                                        style={excluirContaStyles.iconeInput}
                                    />

                                    <TextInput
                                        value={senha}
                                        onChangeText={setSenha}
                                        style={excluirContaStyles.input}
                                        placeholder="Digite sua senha"
                                        placeholderTextColor="#777777"
                                        secureTextEntry={!verSenha}
                                    />

                                    <Pressable
                                        onPress={() => setVerSenha(!verSenha)}
                                    >

                                        <Image
                                            source={require("@/assets/images/img/olho.png")}
                                            style={excluirContaStyles.iconeOlho}
                                        />

                                    </Pressable>

                                </View>


                                {/* ESQUECI SENHA */}
                                <Pressable
                                    style={excluirContaStyles.esqueciSenha}
                                    onPress={() => {
                                        // colocar rota de recuperação
                                    }}
                                >

                                    <Text style={excluirContaStyles.txtEsqueciSenha}>
                                        Esqueci minha senha
                                    </Text>

                                </Pressable>

                            </View>


                            {/* ================= BOTÕES ================= */}
                            <View style={excluirContaStyles.areaBotoes}>

                                <Pressable
                                    style={({ pressed }) => [
                                        excluirContaStyles.btnCancelar,
                                        pressed && excluirContaStyles.btnCancelarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Text style={excluirContaStyles.txtCancelar}>
                                        Cancelar
                                    </Text>

                                </Pressable>


                                <Pressable
                                    style={({ pressed }) => [
                                        excluirContaStyles.btnExcluir,
                                        pressed && excluirContaStyles.btnExcluirPressed,
                                    ]}
                                    onPress={() => {

                                        // futuramente:
                                        // validar senha
                                        // excluir conta na API
                                        // logout
                                        // router.replace("/");

                                    }}
                                >

                                    <Text style={excluirContaStyles.txtExcluir}>
                                        Excluir
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