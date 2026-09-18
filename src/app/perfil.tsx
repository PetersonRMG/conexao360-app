import { useState } from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { perfilStyles } from "@/styles/perfilStyles";
import globalStyle from "@/styles/globalStyles";

import MenuSreen from "./menu";

export default function PerfilScreen() {

    const [seguindo, setSeguindo] = useState(false);
    const [conexoes, setConexoes] = useState(45);


    // =====================================
    // SEGUIR / DEIXAR DE SEGUIR
    // =====================================
    const alterarSeguir = () => {

        setSeguindo((current) => {

            if (current) {
                setConexoes((valor) => valor - 1);
            } else {
                setConexoes((valor) => valor + 1);
            }

            return !current;
        });

    };


    return (

        // =====================================
        // FUNDO EXTERNO
        // =====================================
        <View style={globalStyle.container}>


            {/* =================================
                LIMITE DO APP - 440px
            ================================= */}
            <View
                style={[
                    globalStyle.background,
                    perfilStyles.container,
                ]}
            >


                {/* ================= FUNDO ================= */}
                <ImageBackground
                    source={require("@/assets/images/img/fundoLogin.png")}
                    style={perfilStyles.background}
                    resizeMode="cover"
                >


                    <SafeAreaView style={globalStyle.areaConteudo}>


                        {/* ESCURECE O FUNDO */}
                        <View style={perfilStyles.overlay}>


                            {/* ================= CONTEÚDO ================= */}
                            <ScrollView
                                style={perfilStyles.scroll}
                                contentContainerStyle={perfilStyles.scrollConteudo}
                                showsVerticalScrollIndicator={false}
                            >


                                {/* ================= TOPO ================= */}
                                <View style={perfilStyles.topo}>


                                    {/* VOLTAR */}
                                    <Pressable
                                        style={({ pressed }) => [
                                            perfilStyles.btnVoltar,
                                            pressed && perfilStyles.btnVoltarPressed,
                                        ]}
                                        onPress={() => router.back()}
                                    >

                                        <Image
                                            style={perfilStyles.voltarImagem}
                                            source={require("@/assets/images/img/left.png")}
                                        />

                                    </Pressable>


                                    {/* LOGO */}
                                    <Image
                                        source={require("@/assets/images/img/logo.svg")}
                                        style={perfilStyles.logo}
                                    />


                                    {/* ESPAÇO */}
                                    <View style={perfilStyles.espacoTopo} />


                                </View>


                                {/* ================= APRESENTAÇÃO ================= */}
                                <View style={perfilStyles.apresentacao}>

                                    <Text style={perfilStyles.titulo}>

                                        Olá,{" "}

                                        <Text style={perfilStyles.tituloDourado}>
                                            Fernanda!
                                        </Text>

                                    </Text>


                                    <Text style={perfilStyles.aviso}>
                                        Nunca compartilhe sua senha com terceiros.
                                    </Text>

                                </View>


                                {/* ================= CARD PERFIL ================= */}
                                <View style={perfilStyles.cardPerfil}>


                                    {/* FOTO */}
                                    <View style={perfilStyles.avatarContainer}>

                                        <Image
                                            source={require("@/assets/images/img/avatar.png")}
                                            style={perfilStyles.avatar}
                                        />

                                    </View>


                                    {/* NOME */}
                                    <Text style={perfilStyles.nome}>
                                        Fernanda Silva
                                    </Text>


                                    {/* FORMAÇÃO */}
                                    <Text style={perfilStyles.descricao}>
                                        Juíza de direito em TJSP
                                    </Text>

                                    <Text style={perfilStyles.descricao}>
                                        USP - Bacharel em Direito - 2008
                                    </Text>

                                    <Text style={perfilStyles.descricao}>
                                        Mackenzie - Doutorado - 2012
                                    </Text>


                                    {/* ================= INFORMAÇÕES ================= */}
                                    <View style={perfilStyles.informacoes}>


                                        {/* LOCALIZAÇÃO */}
                                        <View style={perfilStyles.informacaoItem}>

                                            <Image
                                                source={require("@/assets/images/img/usuario.png")}
                                                style={perfilStyles.iconeInfo}
                                            />

                                            <Text style={perfilStyles.txtInfo}>
                                                São Paulo - SP
                                            </Text>

                                        </View>


                                        {/* CONEXÕES */}
                                        <View style={perfilStyles.informacaoItem}>

                                            <Image
                                                source={require("@/assets/images/img/usuario.png")}
                                                style={perfilStyles.iconeInfo}
                                            />

                                            <Text style={perfilStyles.txtInfo}>
                                                {conexoes} conexões
                                            </Text>

                                        </View>


                                    </View>


                                    {/* ================= BOTÕES ================= */}
                                    <View style={perfilStyles.areaBotoes}>


                                        {/* SEGUIR */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                perfilStyles.btnAcao,

                                                seguindo &&
                                                perfilStyles.btnAcaoAtivo,

                                                pressed &&
                                                perfilStyles.btnAcaoPressed,
                                            ]}
                                            onPress={alterarSeguir}
                                        >

                                            <Text
                                                style={[
                                                    perfilStyles.txtBtnAcao,

                                                    seguindo &&
                                                    perfilStyles.txtBtnAcaoAtivo,
                                                ]}
                                            >
                                                {seguindo
                                                    ? "Seguindo"
                                                    : "Seguir"
                                                }
                                            </Text>

                                        </Pressable>


                                        {/* MENSAGEM */}
                                        <Pressable
                                            style={({ pressed }) => [
                                                perfilStyles.btnAcao,
                                                pressed && perfilStyles.btnAcaoPressed,
                                            ]}
                                            onPress={() => router.navigate("/conversa")}
                                        >

                                            <Text style={perfilStyles.txtBtnAcao}>
                                                Mensagem
                                            </Text>

                                        </Pressable>


                                    </View>


                                </View>


                                {/* ================= CONQUISTAS ================= */}
                                <View style={perfilStyles.cardConquistas}>

                                    <Text style={perfilStyles.tituloConquistas}>
                                        Conquistas
                                    </Text>


                                    <View style={perfilStyles.listaConquistas}>


                                        {/* POSTS */}
                                        <View style={perfilStyles.conquista}>

                                            <Image
                                                source={require("@/assets/images/img/novo-post.png")}
                                                style={perfilStyles.iconeConquista}
                                            />

                                            <Text style={perfilStyles.txtConquista}>
                                                10 Posts
                                            </Text>

                                        </View>


                                        {/* PARCERIAS */}
                                        <View style={perfilStyles.conquista}>

                                            <Image
                                                source={require("@/assets/images/img/usuario.png")}
                                                style={perfilStyles.iconeConquista}
                                            />

                                            <Text style={perfilStyles.txtConquista}>
                                                3 Parcerias
                                            </Text>

                                        </View>


                                        {/* NETWORKS */}
                                        <View style={perfilStyles.conquista}>

                                            <Image
                                                source={require("@/assets/images/img/chat.png")}
                                                style={perfilStyles.iconeConquista}
                                            />

                                            <Text style={perfilStyles.txtConquista}>
                                                5 Networks
                                            </Text>

                                        </View>


                                    </View>

                                </View>


                            </ScrollView>


                            {/* ================= FOOTER ================= */}
                            <MenuSreen />


                        </View>


                    </SafeAreaView>


                </ImageBackground>


            </View>


        </View>

    );
}