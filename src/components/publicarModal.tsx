import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarPublicarModalStyles } from "@/styles/publicarModalStyles";

interface PublicarModalProps {
    visible: boolean;
    onClose: () => void;
}

type RotaCriacao = "/criarPost" | "/criarTopico";

export default function PublicarModalScreen({
    visible,
    onClose,
}: PublicarModalProps) {
    const { coresTema } = useTema();
    const { usuario } = useAuth();
    const styles = criarPublicarModalStyles(coresTema);

    // Somente palestrantes e administradores veem a criação de enquetes.
    const perfil = String(usuario?.perfil_usuario ?? "").toLowerCase();
    const podeCriarTopico = perfil === "palestrante" || perfil === "administrador";

    function navegar(rota: RotaCriacao) {
        // Proteção adicional de interface; a API deve validar a permissão também.
        if (rota === "/criarTopico" && !podeCriarTopico) return;

        onClose();
        router.navigate(rota);
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                {/* Toque fora do painel fecha o modal. */}
                <Pressable
                    style={styles.areaExterna}
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Fechar opções de publicação"
                />

                <SafeAreaView
                    edges={["bottom"]}
                    style={styles.caixaMenu}
                    accessibilityViewIsModal
                >
                    <View style={styles.indicador} />

                    <View style={styles.cabecalho}>
                        <View style={styles.textosCabecalho}>
                            <Text style={styles.titulo}>Criar conteúdo</Text>
                            <Text style={styles.subtitulo}>
                                Escolha o que deseja compartilhar
                            </Text>
                        </View>

                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [
                                styles.botaoFechar,
                                pressed && styles.botaoPressionado,
                            ]}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar"
                        >
                            <Ionicons
                                name="close"
                                size={23}
                                color={coresTema.texto}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.listaOpcoes}>
                        {/* NOVO POST: disponível para todos os perfis */}
                        <Pressable
                            onPress={() => navegar("/criarPost")}
                            style={({ pressed }) => [
                                styles.btnMenu,
                                pressed && styles.botaoPressionado,
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel="Novo Post"
                            accessibilityHint="Abre a tela de criação de publicação"
                        >
                            <View style={styles.iconeContainer}>
                                <Image
                                    source={require("@/assets/images/img/novo-post.png")}
                                    style={styles.imagemMenu}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={styles.conteudoOpcao}>
                                <Text style={styles.txtMenu}>Novo Post</Text>
                                <Text style={styles.descricaoOpcao}>
                                    Compartilhe com a comunidade
                                </Text>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={19}
                                color={coresTema.textoSecundario}
                            />
                        </Pressable>

                        {/* NOVA ENQUETE: somente palestrante ou administrador */}
                        {podeCriarTopico && (
                            <Pressable
                                onPress={() => navegar("/criarTopico")}
                                style={({ pressed }) => [
                                    styles.btnMenu,
                                    pressed && styles.botaoPressionado,
                                ]}
                                accessibilityRole="button"
                                accessibilityLabel="Nova Enquete"
                                accessibilityHint="Abre a tela de criação de enquete"
                            >
                                <View style={styles.iconeContainer}>
                                    <Image
                                        source={require("@/assets/images/img/enquete.png")}
                                        style={styles.imagemMenu}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.conteudoOpcao}>
                                    <Text style={styles.txtMenu}>Nova Enquete</Text>
                                    <Text style={styles.descricaoOpcao}>
                                        Faça uma pergunta aos participantes
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={19}
                                    color={coresTema.textoSecundario}
                                />
                            </Pressable>
                        )}
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}
