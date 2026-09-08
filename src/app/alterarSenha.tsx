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

import { alterarSenhaStyles } from "@/styles/alterarSenhaStyles";
import MenuSreen from "./menu";

export default function AlterarSenhaScreen() {

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [verSenhaAtual, setVerSenhaAtual] = useState(false);
    const [verNovaSenha, setVerNovaSenha] = useState(false);
    const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

    return (
        <View style={alterarSenhaStyles.container}>

            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={alterarSenhaStyles.background}
                resizeMode="cover"
            >

                <View style={alterarSenhaStyles.overlay}>

                    <KeyboardAvoidingView
                        style={alterarSenhaStyles.keyboard}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >

                        <ScrollView
                            style={alterarSenhaStyles.scroll}
                            contentContainerStyle={alterarSenhaStyles.scrollConteudo}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >

                            {/* ================= TOPO ================= */}
                            <View style={alterarSenhaStyles.topo}>

                                <Pressable
                                    style={({ pressed }) => [
                                        alterarSenhaStyles.btnVoltar,
                                        pressed && alterarSenhaStyles.btnVoltarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Image
                                        source={require("@/assets/images/img/left.png")}
                                        style={alterarSenhaStyles.voltarImagem}
                                    />

                                </Pressable>


                                <Image
                                    source={require("@/assets/images/img/logo.svg")}
                                    style={alterarSenhaStyles.logo}
                                />


                                <View style={alterarSenhaStyles.espacoTopo} />

                            </View>


                            {/* ================= APRESENTAÇÃO ================= */}
                            <View style={alterarSenhaStyles.apresentacao}>

                                <Text style={alterarSenhaStyles.titulo}>
                                    Alterar{" "}
                                    <Text style={alterarSenhaStyles.tituloDourado}>
                                        Senha
                                    </Text>
                                </Text>

                                <Text style={alterarSenhaStyles.aviso}>
                                    Nunca compartilhe sua senha com terceiros.
                                </Text>

                            </View>


                            {/* ================= CARD ================= */}
                            <View style={alterarSenhaStyles.card}>


                                {/* SENHA ATUAL */}
                                <View style={alterarSenhaStyles.campo}>

                                    <Image
                                        source={require("@/assets/images/img/trancar.png")}
                                        style={alterarSenhaStyles.iconeCampo}
                                    />

                                    <View style={alterarSenhaStyles.areaInput}>

                                        <Text style={alterarSenhaStyles.label}>
                                            Senha Atual
                                        </Text>

                                        <TextInput
                                            value={senhaAtual}
                                            onChangeText={setSenhaAtual}
                                            style={alterarSenhaStyles.input}
                                            secureTextEntry={!verSenhaAtual}
                                            placeholder="Digite sua senha atual"
                                            placeholderTextColor="#777777"
                                        />

                                    </View>

                                    <Pressable
                                        onPress={() => setVerSenhaAtual(!verSenhaAtual)}
                                    >

                                        <Image
                                            source={require("@/assets/images/img/olho.png")}
                                            style={alterarSenhaStyles.iconeOlho}
                                        />

                                    </Pressable>

                                </View>


                                {/* NOVA SENHA */}
                                <View style={alterarSenhaStyles.campo}>

                                    <Image
                                        source={require("@/assets/images/img/trancar.png")}
                                        style={alterarSenhaStyles.iconeCampo}
                                    />

                                    <View style={alterarSenhaStyles.areaInput}>

                                        <Text style={alterarSenhaStyles.label}>
                                            Nova Senha
                                        </Text>

                                        <TextInput
                                            value={novaSenha}
                                            onChangeText={setNovaSenha}
                                            style={alterarSenhaStyles.input}
                                            secureTextEntry={!verNovaSenha}
                                            placeholder="Digite sua nova senha"
                                            placeholderTextColor="#777777"
                                        />

                                    </View>

                                    <Pressable
                                        onPress={() => setVerNovaSenha(!verNovaSenha)}
                                    >

                                        <Image
                                            source={require("@/assets/images/img/olho.png")}
                                            style={alterarSenhaStyles.iconeOlho}
                                        />

                                    </Pressable>

                                </View>


                                {/* CONFIRMAR SENHA */}
                                <View style={alterarSenhaStyles.campo}>

                                    <Image
                                        source={require("@/assets/images/img/trancar.png")}
                                        style={alterarSenhaStyles.iconeCampo}
                                    />

                                    <View style={alterarSenhaStyles.areaInput}>

                                        <Text style={alterarSenhaStyles.label}>
                                            Confirmar Nova Senha
                                        </Text>

                                        <TextInput
                                            value={confirmarSenha}
                                            onChangeText={setConfirmarSenha}
                                            style={alterarSenhaStyles.input}
                                            secureTextEntry={!verConfirmarSenha}
                                            placeholder="Digite novamente sua senha"
                                            placeholderTextColor="#777777"
                                        />

                                    </View>

                                    <Pressable
                                        onPress={() =>
                                            setVerConfirmarSenha(!verConfirmarSenha)
                                        }
                                    >

                                        <Image
                                            source={require("@/assets/images/img/olho.png")}
                                            style={alterarSenhaStyles.iconeOlho}
                                        />

                                    </Pressable>

                                </View>


                                {/* ================= INFORMAÇÃO ================= */}
                                <View style={alterarSenhaStyles.cardInfo}>

                                    <Image
                                        source={require("@/assets/images/img/info.png")}
                                        style={alterarSenhaStyles.iconeInfo}
                                    />

                                    <View style={alterarSenhaStyles.areaInfo}>

                                        <Text style={alterarSenhaStyles.tituloInfo}>
                                            Dicas para uma senha mais segura
                                        </Text>

                                        <Text style={alterarSenhaStyles.txtInfo}>
                                            • Use pelo menos 8 caracteres.{"\n"}
                                            • Combine letras, números e símbolos.
                                        </Text>

                                    </View>

                                </View>

                            </View>


                            {/* ================= BOTÕES ================= */}
                            <View style={alterarSenhaStyles.areaBotoes}>

                                <Pressable
                                    style={({ pressed }) => [
                                        alterarSenhaStyles.btnSalvar,
                                        pressed && alterarSenhaStyles.btnSalvarPressed,
                                    ]}
                                    onPress={() => {

                                        // futuramente:
                                        // validar senha atual
                                        // conferir novaSenha === confirmarSenha
                                        // enviar para API

                                    }}
                                >

                                    <Text style={alterarSenhaStyles.txtSalvar}>
                                        Salvar nova senha
                                    </Text>

                                </Pressable>


                                <Pressable
                                    style={({ pressed }) => [
                                        alterarSenhaStyles.btnCancelar,
                                        pressed && alterarSenhaStyles.btnCancelarPressed,
                                    ]}
                                    onPress={() => router.back()}
                                >

                                    <Text style={alterarSenhaStyles.txtCancelar}>
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