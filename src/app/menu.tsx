import { useState } from "react";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import PublicarModalScreen from "@/components/publicarModal";
import { criarMenuStyles } from "@/styles/menuStyles";

type AbaMenu = "home" | "chat" | "publicar" | "eventos" | "perfil";
type IconeMenu = keyof typeof Ionicons.glyphMap;
type ItemMenu = {
  aba: AbaMenu;
  titulo: string;
  rota?: "/home" | "/chat" | "/eventos" | "/perfil";
  icon: IconeMenu;
  iconAtivo: IconeMenu;
};

const itens: ItemMenu[] = [
  { aba: "home", titulo: "Início", rota: "/home", icon: "home-outline", iconAtivo: "home" },
  { aba: "chat", titulo: "Chat", rota: "/chat", icon: "chatbubble-outline", iconAtivo: "chatbubble" },
  { aba: "publicar", titulo: "Publicar", icon: "create-outline", iconAtivo: "create" },
  { aba: "eventos", titulo: "Eventos", rota: "/eventos", icon: "calendar-outline", iconAtivo: "calendar" },
  { aba: "perfil", titulo: "Perfil", rota: "/perfil", icon: "person-outline", iconAtivo: "person" },
];

// Mantém a navegação original: participante cria post diretamente;
// palestrante/administrador escolhe entre post e enquete pelo modal existente.
export default function MenuSreen() {
  const { coresTema } = useTema();
  const { usuario } = useAuth();
  const styles = criarMenuStyles(coresTema);
  const pathname = usePathname();
  const [modalPublicar, setModalPublicar] = useState(false);
  const perfil = String(usuario?.perfil_usuario ?? "").toLowerCase();
  const podeCriarEnquete = perfil === "palestrante" || perfil === "administrador";
  const rotaAtual = pathname.replace(/\/+$/, "") || "/";

  const abaAtiva: AbaMenu | null = modalPublicar ? "publicar" :
    rotaAtual === "/home" ? "home" :
    rotaAtual === "/chat" || rotaAtual === "/conversa" ? "chat" :
    rotaAtual === "/criarPost" || rotaAtual === "/criarTopico" ? "publicar" :
    rotaAtual === "/eventos" ? "eventos" :
    rotaAtual === "/perfil" || rotaAtual === "/editarPerfil" ? "perfil" : null;

  function abrirPublicacao() {
    if (podeCriarEnquete) {
      setModalPublicar(true);
    } else {
      router.navigate("/criarPost");
    }
  }

  return (
    <>
      <View style={styles.menuInferior}>
        {itens.map((item) => {
          const ativo = abaAtiva === item.aba;
          return (
            <Pressable
              key={item.aba}
              style={({ pressed }) => [styles.itemMenu, pressed && { opacity: 0.72 }]}
              onPress={() => item.aba === "publicar" ? abrirPublicacao() : item.rota && router.navigate(item.rota)}
              accessibilityRole="button"
              accessibilityLabel={item.titulo}
              accessibilityState={{ selected: ativo }}
            >
              <View style={styles.areaIcone}>
                <Ionicons
                  name={ativo ? item.iconAtivo : item.icon}
                  size={23}
                  color={ativo ? coresTema.destaque : coresTema.textoSecundario}
                />
              </View>
              <Text style={[styles.txtMenu, ativo && styles.txtMenuAtivo]}>{item.titulo}</Text>
              <View style={[styles.indicador, ativo && styles.indicadorAtivo]} />
            </Pressable>
          );
        })}
      </View>
      <PublicarModalScreen
        visible={modalPublicar && podeCriarEnquete}
        onClose={() => setModalPublicar(false)}
      />
    </>
  );
}
