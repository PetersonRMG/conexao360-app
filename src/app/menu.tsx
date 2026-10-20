import { useState } from "react";
import { router, usePathname } from "expo-router";
import {
    View,
    Text,
    Image,
    Pressable,
} from "react-native";

import PublicarModalScreen from "@/components/publicarModal";

import globalStyle from "@/styles/globalStyles";
import { criarMenuStyles } from "@/styles/menuStyles";
import { useTema } from "@/contexts/TemaContext";

export default function MenuSreen() {
    const { coresTema } = useTema();
    const menuStyles = criarMenuStyles(coresTema);

    const pathname = usePathname();

    function menuAtivo(rota: string) {
        return pathname === rota;
    }

    const [modalPublicar, setModalPublicar] = useState(false);

    return (
        <View style={menuStyles.menuInferior}>
            {/* HOME */}
            <Pressable
                style={({ pressed }) => [
                    menuStyles.itemMenu,
                    pressed && globalStyle.pressBtn,
                ]}
                onPress={() => {
                    router.navigate("/home");
                }}
            >
                <Image
                    source={require("@/assets/images/img/home.png")}
                    style={[
                        menuStyles.iconeMenu,
                        menuStyles.iconeMenuAtivo,
                    ]}
                />

                <Text style={[menuStyles.txtMenu, menuAtivo("/home") && menuStyles.txtMenuAtivo]}>
                    Home
                </Text>
            </Pressable>

            {/* CHAT */}
            <Pressable
                style={({ pressed }) => [
                    menuStyles.itemMenu,
                    pressed && globalStyle.pressBtn,
                ]}
                onPress={() => {
                    router.navigate("/chat");
                }}
            >
                <Image
                    source={require("@/assets/images/img/chat.png")}
                    style={menuStyles.iconeMenu}
                />
                <Text style={[menuStyles.txtMenu, menuAtivo("/chat") && menuStyles.txtMenuAtivo]}>

                    Chat
                </Text>
            </Pressable>

            {/* PUBLICAR */}
            <Pressable
                style={({ pressed }) => [
                    menuStyles.itemMenu,
                    pressed && globalStyle.pressBtn,
                ]}
                onPress={() => {
                    setModalPublicar(true);
                }}
            >
                <View style={menuStyles.btnPublicar}>
                    <Text style={menuStyles.maisPublicar}>
                        +
                    </Text>
                </View>

                <Text style={menuStyles.txtMenu}>
                    Publicar
                </Text>
            </Pressable>

            {/* EVENTOS */}
            <Pressable
                style={({ pressed }) => [
                    menuStyles.itemMenu,
                    pressed && globalStyle.pressBtn,
                ]}
                onPress={() => {
                    router.navigate("/eventos");
                }}
            >
                <Image
                    source={require("@/assets/images/img/evento.png")}
                    style={menuStyles.iconeMenu}
                />

                <Text style={[menuStyles.txtMenu, menuAtivo("/eventos") && menuStyles.txtMenuAtivo]}>
                    Eventos
                </Text>
            </Pressable>

            {/* GALERIA */}
            <Pressable
                style={({ pressed }) => [
                    menuStyles.itemMenu,
                    pressed && globalStyle.pressBtn,
                ]}
                onPress={() => {
                    router.navigate("/galeria");
                }}
            >
                <Image
                    source={require("@/assets/images/img/galeria.png")}
                    style={menuStyles.iconeMenu}
                />

                <Text style={[menuStyles.txtMenu, menuAtivo("/galeria") && menuStyles.txtMenuAtivo]}>
                    Galeria
                </Text>
            </Pressable>

            <PublicarModalScreen
                visible={modalPublicar}
                onClose={() => setModalPublicar(false)}
            />
        </View>
    );
}
