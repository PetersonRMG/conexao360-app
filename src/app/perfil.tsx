import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
} from "react-native";

import { perfilStyles } from "@/styles/perfilStyles";
import MenuSreen from "./menu";

export default function PerfilScreen() {

    return (

        <View style={perfilStyles.container}>

            {/* ================= FUNDO ================= */}
            <ImageBackground
                source={require("@/assets/images/img/fundoLogin.png")}
                style={perfilStyles.background}
                resizeMode="cover"
            >

                {/* ESCURECE UM POUCO O FUNDO */}
                <View style={perfilStyles.overlay}>


                    {/* ================= CONTEÚDO COM SCROLL ================= */}
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
                                    source={require("@/assets/images/img/left.png")} />



                            </Pressable>


                            {/* LOGO */}
                            <Image
                                source={require("@/assets/images/img/logo.svg")}
                                style={perfilStyles.logo}
                            />


                            {/* ESPAÇO PARA CENTRALIZAR A LOGO */}
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
                                        source={require("@/assets/images/img/e-mail.png")}
                                        style={perfilStyles.iconeInfo}
                                    />

                                    <Text style={perfilStyles.txtInfo}>
                                        São Paulo - SP
                                    </Text>

                                </View>


                                {/* CONEXÕES */}
                                <View style={perfilStyles.informacaoItem}>

                                    <Image
                                        source={require("@/assets/images/img/e-mail.png")}
                                        style={perfilStyles.iconeInfo}
                                    />

                                    <Text style={perfilStyles.txtInfo}>
                                        45 conexões
                                    </Text>

                                </View>

                            </View>


                            {/* ================= BOTÕES ================= */}
                            <View style={perfilStyles.areaBotoes}>


                                {/* SEGUIR */}
                                <Pressable
                                    style={({ pressed }) => [
                                        perfilStyles.btnAcao,
                                        pressed && perfilStyles.btnAcaoPressed,
                                    ]}
                                    onPress={() => {

                                        // lógica para seguir

                                    }}
                                >

                                    <Text style={perfilStyles.txtBtnAcao}>
                                        Seguir
                                    </Text>

                                </Pressable>


                                {/* MENSAGEM */}
                                <Pressable
                                    style={({ pressed }) => [
                                        perfilStyles.btnAcao,
                                        pressed && perfilStyles.btnAcaoPressed,
                                    ]}
                                    onPress={() => {

                                        // futuramente abrir chat

                                    }}
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
                                        source={require("@/assets/images/img/e-mail.png")}
                                        style={perfilStyles.iconeConquista}
                                    />

                                    <Text style={perfilStyles.txtConquista}>
                                        10 Post
                                    </Text>

                                </View>


                                {/* PARCERIAS */}
                                <View style={perfilStyles.conquista}>

                                    <Image
                                        source={require("@/assets/images/img/e-mail.png")}
                                        style={perfilStyles.iconeConquista}
                                    />

                                    <Text style={perfilStyles.txtConquista}>
                                        3 Parcerias
                                    </Text>

                                </View>


                                {/* NETWORKS */}
                                <View style={perfilStyles.conquista}>

                                    <Image
                                        source={require("@/assets/images/img/e-mail.png")}
                                        style={perfilStyles.iconeConquista}
                                    />

                                    <Text style={perfilStyles.txtConquista}>
                                        5 Networks
                                    </Text>

                                </View>


                            </View>

                        </View>


                    </ScrollView>


                    {/* ================= MENU INFERIOR ================= */}
                    <MenuSreen />


                </View>

            </ImageBackground>

        </View>

    );
}