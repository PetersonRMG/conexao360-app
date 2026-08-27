import { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";
import { router } from "expo-router";

import { headerStyles } from "@/styles/headerStyles";
import MenuModalScreen from "@/components/menuModal";
    
export default function HeaderCreen() {
    const [modalLinkSenha, setModalLinkSenha] = useState(false);
    return (
        <View style={headerStyles.header}>
                {/* ================= HEADER ================= */ }

                {/* FOTO PERFIL */}
                <Pressable style={headerStyles.perfil}>
                    <Image
                        source={require("@/assets/images/img/avatar.png")}
                        style={headerStyles.fotoPerfil}
                    />
                </Pressable>


                {/* LOGO / NOME */}
                <View style={headerStyles.logoContainer}>

                    <Image
                        source={require("@/assets/images/img/logo.svg")}
                        style={headerStyles.logo}
                    />

                    <Text style={headerStyles.nomeProjeto}>
                        Conexão 360°
                    </Text>

                </View>


                {/* MENU */}
                <Pressable
                    style={({ pressed }) => [
                        headerStyles.btnMenu,
                        pressed && headerStyles.btnPressed,
                    ]}
                onPress={() => setModalLinkSenha(true)}
                >

                    <Image
                        source={require("@/assets/images/img/menu.png")}
                        style={headerStyles.iconeHeader}
                    />

            </Pressable>
            <MenuModalScreen
                visible={modalLinkSenha}
                onClose={() => {
                    router.back;
                    setModalLinkSenha(false);
                }}
            />

            </View>
        
    )
}