import { useState } from "react";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PublicarModalScreen from "@/components/publicarModal";
import globalStyle from "@/styles/globalStyles";
import { criarMenuStyles } from "@/styles/menuStyles";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";

// Mantido o nome original para não alterar imports nas outras telas.
export default function MenuSreen() {
    const { coresTema } = useTema();
    const menuStyles = criarMenuStyles(coresTema);
    const pathname = usePathname();
    const { usuario } = useAuth();

    // Participante publica diretamente. Palestrante/admin abre as duas opções.
    const perfil = String(usuario?.perfil_usuario ?? "").toLowerCase();
    const podeCriarTopico = perfil === "palestrante" || perfil === "administrador";

    const [modalPublicar, setModalPublicar] = useState(false);

    function menuAtivo(rota: string) {
        return pathname === rota;
    }

    const corAtiva = coresTema.destaque;
    const corInativa = coresTema.textoSecundario;

    return (
        <>
            <View style={menuStyles.menuInferior}>
                {/* HOME */}
                <Pressable
                    style={({ pressed }) => [
                        menuStyles.itemMenu,
                        pressed && globalStyle.pressBtn,
                    ]}
                    onPress={() => router.navigate("/home")}
                    accessibilityRole="button"
                    accessibilityLabel="Home"
                    accessibilityState={{ selected: menuAtivo("/home") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={menuAtivo("/home") ? "home" : "home-outline"}
                            size={22}
                            color={menuAtivo("/home") ? corAtiva : corInativa}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, menuAtivo("/home") && menuStyles.txtMenuAtivo]}>
                        Home
                    </Text>
                    <View style={[menuStyles.indicador, menuAtivo("/home") && menuStyles.indicadorAtivo]} />
                </Pressable>

                {/* CHAT */}
                <Pressable
                    style={({ pressed }) => [
                        menuStyles.itemMenu,
                        pressed && globalStyle.pressBtn,
                    ]}
                    onPress={() => router.navigate("/chat")}
                    accessibilityRole="button"
                    accessibilityLabel="Chat"
                    accessibilityState={{ selected: menuAtivo("/chat") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={menuAtivo("/chat") ? "chatbubble" : "chatbubble-outline"}
                            size={22}
                            color={menuAtivo("/chat") ? corAtiva : corInativa}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, menuAtivo("/chat") && menuStyles.txtMenuAtivo]}>
                        Chat
                    </Text>
                    <View style={[menuStyles.indicador, menuAtivo("/chat") && menuStyles.indicadorAtivo]} />
                </Pressable>

                {/* PUBLICAR — preserva a diferença entre participante e palestrante */}
                <Pressable
                    style={({ pressed }) => [
                        menuStyles.itemMenu,
                        pressed && globalStyle.pressBtn,
                    ]}
                    onPress={() => {
                        if (podeCriarTopico) {
                            setModalPublicar(true);
                        } else {
                            router.navigate("/criarPost");
                        }
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={podeCriarTopico ? "Abrir opções de criação" : "Criar novo post"}
                >
                    <View style={menuStyles.areaIcone}>
                        {podeCriarTopico ? (
                            <View style={menuStyles.btnPublicar}>
                                <Ionicons
                                    name="create-outline"
                                    size={25}
                                    color={coresTema.textoSobreDestaque}
                                />
                            </View>
                        ) : (
                            <Ionicons
                                name="create-outline"
                                size={24}
                                color={menuAtivo("/criarPost") ? corAtiva : corInativa}
                            />
                        )}
                    </View>
                    <Text style={[
                        menuStyles.txtMenu,
                        podeCriarTopico && menuStyles.txtPublicar,
                        !podeCriarTopico && menuAtivo("/criarPost") && menuStyles.txtMenuAtivo,
                    ]}>
                        Publicar
                    </Text>
                    <View style={[
                        menuStyles.indicador,
                        !podeCriarTopico && menuAtivo("/criarPost") && menuStyles.indicadorAtivo,
                    ]} />
                </Pressable>

                {/* EVENTOS */}
                <Pressable
                    style={({ pressed }) => [
                        menuStyles.itemMenu,
                        pressed && globalStyle.pressBtn,
                    ]}
                    onPress={() => router.navigate("/eventos")}
                    accessibilityRole="button"
                    accessibilityLabel="Eventos"
                    accessibilityState={{ selected: menuAtivo("/eventos") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={menuAtivo("/eventos") ? "calendar" : "calendar-outline"}
                            size={22}
                            color={menuAtivo("/eventos") ? corAtiva : corInativa}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, menuAtivo("/eventos") && menuStyles.txtMenuAtivo]}>
                        Eventos
                    </Text>
                    <View style={[menuStyles.indicador, menuAtivo("/eventos") && menuStyles.indicadorAtivo]} />
                </Pressable>

                {/* GALERIA */}
                <Pressable
                    style={({ pressed }) => [
                        menuStyles.itemMenu,
                        pressed && globalStyle.pressBtn,
                    ]}
                    onPress={() => router.navigate("/galeria")}
                    accessibilityRole="button"
                    accessibilityLabel="Galeria"
                    accessibilityState={{ selected: menuAtivo("/galeria") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={menuAtivo("/galeria") ? "images" : "images-outline"}
                            size={22}
                            color={menuAtivo("/galeria") ? corAtiva : corInativa}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, menuAtivo("/galeria") && menuStyles.txtMenuAtivo]}>
                        Galeria
                    </Text>
                    <View style={[menuStyles.indicador, menuAtivo("/galeria") && menuStyles.indicadorAtivo]} />
                </Pressable>

            </View>

            {/* Fora da linha flex: somente os cinco itens participam do alinhamento. */}
            <PublicarModalScreen
                visible={modalPublicar && podeCriarTopico}
                onClose={() => setModalPublicar(false)}
            />
        </>
    );
}
