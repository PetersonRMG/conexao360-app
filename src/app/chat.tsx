import { useState } from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import { chatStyles } from "@/styles/chatStyles";
import MenuSreen from "./menu";

export default function ChatScreen() {

    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("Todas");

    const conversas = [
        {
            id: 1,
            nome: "Dra. Simone Baptista",
            mensagem: "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
        },
        {
            id: 2,
            nome: "Dr. Carlos Méndez",
            mensagem: "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
        },
        {
            id: 3,
            nome: "Comissão jurídica",
            mensagem: "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
        },
        {
            id: 4,
            nome: "Organização conexão 360",
            mensagem: "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
        },
        {
            id: 5,
            nome: "Organização conexão 360",
            mensagem: "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
        },
        {
            id: 6,
            nome: "Organização conexão 360",
            mensagem: "Obrigada pelo convite. Será um prazer participar!",
            horario: "10:45",
            notificacoes: 2,
        },
    ];

    const conversasFiltradas = conversas.filter((conversa) =>
        conversa.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={chatStyles.container}>

            {/* ================= HEADER ================= */}
            <View style={chatStyles.header}>

                <View style={chatStyles.headerTopo}>

                    {/* AVATAR */}
                    <Image
                        source={require("@/assets/images/img/avatar.png")}
                        style={chatStyles.avatarUsuario}
                    />


                    {/* LOGO */}
                    <View style={chatStyles.logoArea}>

                        <Image
                            source={require("@/assets/images/img/logo.svg")}
                            style={chatStyles.logo}
                        />

                        <Text style={chatStyles.logoTexto}>
                            Conexão 360°
                        </Text>

                    </View>


                    {/* MENU */}
                    <Pressable
                        style={chatStyles.btnHeader}
                        onPress={() => {
                            // abrir modal do menu
                        }}
                    >

                        <Image
                            source={require("@/assets/images/img/menu.png")}
                            style={chatStyles.iconeHeader}
                        />

                    </Pressable>

                </View>


                {/* TÍTULO + NOVA CONVERSA */}
                <View style={chatStyles.tituloArea}>

                    <Text style={chatStyles.titulo}>
                        Chat
                    </Text>

                    <Pressable
                        style={({ pressed }) => [
                            chatStyles.btnNovoChat,
                            pressed && chatStyles.btnNovoChatPressed,
                        ]}
                        onPress={() => {
                            // futuramente nova conversa
                        }}
                    >

                        <Image
                            source={require("@/assets/images/img/add.png")}
                            style={chatStyles.iconeAdicionar}
                        />

                    </Pressable>

                </View>

            </View>


            {/* ================= BUSCA ================= */}
            <View style={chatStyles.areaBusca}>

                <View style={chatStyles.inputBuscaContainer}>

                    <Image
                        source={require("@/assets/images/img/search.png")}
                        style={chatStyles.iconeBusca}
                    />

                    <TextInput
                        value={busca}
                        onChangeText={setBusca}
                        style={chatStyles.inputBusca}
                        placeholder="Buscar conversas"
                        placeholderTextColor="#777777"
                    />

                </View>

            </View>


            {/* ================= FILTROS ================= */}
            <View style={chatStyles.filtros}>

                {["Todas", "Não lidas", "Grupos", "Eventos"].map((item) => (

                    <Pressable
                        key={item}
                        style={[
                            chatStyles.filtro,
                            filtro === item && chatStyles.filtroAtivo,
                        ]}
                        onPress={() => setFiltro(item)}
                    >

                        <Text
                            style={[
                                chatStyles.txtFiltro,
                                filtro === item && chatStyles.txtFiltroAtivo,
                            ]}
                        >
                            {item}
                        </Text>


                        {item === "Não lidas" && (

                            <View style={chatStyles.badgeFiltro}>

                                <Text style={chatStyles.txtBadgeFiltro}>
                                    3
                                </Text>

                            </View>

                        )}

                    </Pressable>

                ))}

            </View>


            {/* ================= CONVERSAS ================= */}
            <ScrollView
                style={chatStyles.scroll}
                contentContainerStyle={chatStyles.scrollConteudo}
                showsVerticalScrollIndicator={false}
            >

                {conversasFiltradas.map((conversa) => (

                    <Pressable
                        key={conversa.id}
                        style={({ pressed }) => [
                            chatStyles.conversa,
                            pressed && chatStyles.conversaPressed,
                        ]}
                        onPress={() => router.navigate("/conversa")}
                    >

                        {/* AVATAR */}
                        <View style={chatStyles.avatarConversaContainer}>

                            <Image
                                source={require("@/assets/images/img/usuario.png")}
                                style={chatStyles.avatarConversa}
                            />

                        </View>


                        {/* DADOS */}
                        <View style={chatStyles.conversaConteudo}>

                            <Text
                                style={chatStyles.nome}
                                numberOfLines={1}
                            >
                                {conversa.nome}
                            </Text>

                            <Text
                                style={chatStyles.mensagem}
                                numberOfLines={2}
                            >
                                {conversa.mensagem}
                            </Text>

                        </View>


                        {/* HORÁRIO / NOTIFICAÇÃO */}
                        <View style={chatStyles.conversaMeta}>

                            <Text style={chatStyles.horario}>
                                {conversa.horario}
                            </Text>

                            {conversa.notificacoes > 0 && (

                                <View style={chatStyles.badge}>

                                    <Text style={chatStyles.txtBadge}>
                                        {conversa.notificacoes}
                                    </Text>

                                </View>

                            )}

                        </View>

                    </Pressable>

                ))}

            </ScrollView>


            {/* ================= FOOTER ================= */}
            <MenuSreen />

        </View>
    );
}