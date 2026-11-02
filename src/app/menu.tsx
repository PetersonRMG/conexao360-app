import { useState } from "react";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PublicarModalScreen from "@/components/publicarModal";
import globalStyle from "@/styles/globalStyles";
import { criarMenuStyles } from "@/styles/menuStyles";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";

type AbaMenu = "home" | "chat" | "publicar" | "eventos" | "galeria";

// O nome MenuSreen permanece igual ao da versão original.
export default function MenuSreen() {
    const { coresTema } = useTema();
    const menuStyles = criarMenuStyles(coresTema);
    const { usuario } = useAuth();
    const pathname = usePathname();
    const [modalPublicar, setModalPublicar] = useState(false);

    const perfil = String(usuario?.perfil_usuario ?? "").toLowerCase();
    const podeCriarTopico = perfil === "palestrante" || perfil === "administrador";

    // Uma única fonte para o estado ativo: nunca existem duas abas selecionadas.
    // Enquanto o palestrante estiver no modal, Publicar substitui o destaque atual.
    const rotaAtual = pathname.replace(/\/+$/, "") || "/";
    const abaAtiva: AbaMenu | null = modalPublicar
        ? "publicar"
        : rotaAtual === "/home"
          ? "home"
          : rotaAtual === "/chat"
            ? "chat"
            : rotaAtual === "/criarPost" || rotaAtual === "/criarTopico"
              ? "publicar"
              : rotaAtual === "/eventos"
                ? "eventos"
                : rotaAtual === "/galeria"
                  ? "galeria"
                  : null;

    const ativo = (aba: AbaMenu) => abaAtiva === aba;
    const corDoIcone = (aba: AbaMenu) =>
        ativo(aba) ? coresTema.destaque : coresTema.textoSecundario;

    function abrirPublicacao() {
        if (podeCriarTopico) {
            setModalPublicar(true);
        } else {
            router.navigate("/criarPost");
        }
    }

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
                    accessibilityState={{ selected: ativo("home") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={ativo("home") ? "home" : "home-outline"}
                            size={22}
                            color={corDoIcone("home")}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, ativo("home") && menuStyles.txtMenuAtivo]}>
                        Home
                    </Text>
                    <View style={[menuStyles.indicador, ativo("home") && menuStyles.indicadorAtivo]} />
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
                    accessibilityState={{ selected: ativo("chat") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={ativo("chat") ? "chatbubble" : "chatbubble-outline"}
                            size={22}
                            color={corDoIcone("chat")}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, ativo("chat") && menuStyles.txtMenuAtivo]}>
                        Chat
                    </Text>
                    <View style={[menuStyles.indicador, ativo("chat") && menuStyles.indicadorAtivo]} />
                </Pressable>

                {/* PUBLICAR: participante cria post; palestrante/admin abre modal. */}
                <Pressable
                    style={({ pressed }) => [
                        menuStyles.itemMenu,
                        pressed && globalStyle.pressBtn,
                    ]}
                    onPress={abrirPublicacao}
                    accessibilityRole="button"
                    accessibilityLabel={podeCriarTopico ? "Abrir opções de criação" : "Criar novo post"}
                    accessibilityState={{ selected: ativo("publicar") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={ativo("publicar") ? "create" : "create-outline"}
                            size={22}
                            color={corDoIcone("publicar")}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, ativo("publicar") && menuStyles.txtMenuAtivo]}>
                        Publicar
                    </Text>
                    <View style={[menuStyles.indicador, ativo("publicar") && menuStyles.indicadorAtivo]} />
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
                    accessibilityState={{ selected: ativo("eventos") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={ativo("eventos") ? "calendar" : "calendar-outline"}
                            size={22}
                            color={corDoIcone("eventos")}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, ativo("eventos") && menuStyles.txtMenuAtivo]}>
                        Eventos
                    </Text>
                    <View style={[menuStyles.indicador, ativo("eventos") && menuStyles.indicadorAtivo]} />
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
                    accessibilityState={{ selected: ativo("galeria") }}
                >
                    <View style={menuStyles.areaIcone}>
                        <Ionicons
                            name={ativo("galeria") ? "images" : "images-outline"}
                            size={22}
                            color={corDoIcone("galeria")}
                        />
                    </View>
                    <Text style={[menuStyles.txtMenu, ativo("galeria") && menuStyles.txtMenuAtivo]}>
                        Galeria
                    </Text>
                    <View style={[menuStyles.indicador, ativo("galeria") && menuStyles.indicadorAtivo]} />
                </Pressable>
            </View>

            {/* O modal fica fora do flex do rodapé, sem alterar o alinhamento. */}
            <PublicarModalScreen
                visible={modalPublicar && podeCriarTopico}
                onClose={() => setModalPublicar(false)}
            />
        </>
    );
}
