import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
    Animated,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarMenuModalStyles } from "@/styles/menuModalStyles";
import {
    buscarUsuario,
    getUrlFotoUsuario,
    type Usuario,
} from "@/services/usuarioService";
import SairModalScreen from "./modalSair";

interface MenuModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function MenuModalScreen({ visible, onClose }: MenuModalProps) {
    const { tema, coresTema, alternarTema } = useTema();
    const { token, usuario, definirSessao, limparSessao } = useAuth();
    const styles = criarMenuModalStyles(coresTema);
    const { width: larguraTela } = useWindowDimensions();
    const larguraOffcanvas = Math.min(larguraTela * 0.88, 380);
    const translateX = useRef(new Animated.Value(larguraOffcanvas)).current;

    const [btnSair, setBtnSair] = useState(false);
    const [usuarioBanco, setUsuarioBanco] = useState<Usuario | null>(null);

    // Mantém a versão mais recente da função sem refazer o efeito a cada render.
    const definirSessaoRef = useRef(definirSessao);
    definirSessaoRef.current = definirSessao;

    // Sempre que abrir o menu, busca os dados mais recentes do usuário logado.
    useEffect(() => {
        if (!visible || !token) return;

        let ativo = true;
        setUsuarioBanco(null);

        async function carregarUsuario() {
            try {
                const resposta = await buscarUsuario(token!);
                if (!ativo || !resposta.success || !resposta.data) return;

                setUsuarioBanco(resposta.data);

                // Atualiza também o Header e a sessão persistida no AuthContext.
                await definirSessaoRef.current(token!, resposta.data);
            } catch (error) {
                if (ativo) {
                    console.warn("Não foi possível atualizar o usuário do menu:", error);
                    // Caso a API falhe, permanecem os dados salvos na sessão.
                }
            }
        }

        carregarUsuario();
        return () => {
            ativo = false;
        };
    }, [visible, token]);

    const usuarioExibido =
        usuarioBanco && usuarioBanco.id_usuario === usuario?.id_usuario
            ? usuarioBanco
            : usuario;

    const nomeUsuario = usuarioExibido?.nome_usuario?.trim() || "Meu perfil";
    const fotoUsuario = getUrlFotoUsuario(usuarioExibido?.foto_usuario ?? null);

    useEffect(() => {
        if (!visible) return;

        translateX.setValue(larguraOffcanvas);
        requestAnimationFrame(() => {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 260,
                useNativeDriver: true,
            }).start();
        });
    }, [larguraOffcanvas, translateX, visible]);

    const fecharMenu = (depoisDeFechar?: () => void) => {
        Animated.timing(translateX, {
            toValue: larguraOffcanvas,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            onClose();
            depoisDeFechar?.();
        });
    };

    const navegar = (rota: string) => {
        fecharMenu(() => router.navigate(rota as Parameters<typeof router.navigate>[0]));
    };

    const abrirConfirmacaoSaida = () => {
        fecharMenu(() => setBtnSair(true));
    };

    const confirmarSaida = async () => {
        setBtnSair(false);
        try {
            // Apaga também o token salvo no SecureStore/localStorage.
            await limparSessao();
            router.replace("/");
        } catch (error) {
            console.error("Erro ao encerrar a sessão:", error);
        }
    };

    return (
        <>
            <Modal
                visible={visible}
                transparent
                animationType="none"
                statusBarTranslucent
                onRequestClose={() => fecharMenu()}
            >
                <View style={styles.overlay}>
                    <Pressable style={styles.backdrop} onPress={() => fecharMenu()} />

                    <Animated.View
                        style={[
                            styles.offcanvas,
                            { width: larguraOffcanvas, transform: [{ translateX }] },
                        ]}
                    >
                        <SafeAreaView style={styles.safeArea}>
                            {/* CABEÇALHO */}
                            <View style={styles.header}>
                                <View style={styles.headerTituloArea}>
                                    <Text style={styles.headerTitulo}>Menu</Text>
                                    <Text style={styles.headerSubtitulo}>
                                        Conta e configurações
                                    </Text>
                                </View>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.btnFechar,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={() => fecharMenu()}
                                    accessibilityRole="button"
                                    accessibilityLabel="Fechar menu"
                                >
                                    <Text style={styles.btnFecharTexto}>×</Text>
                                </Pressable>
                            </View>

                            <ScrollView
                                style={styles.scroll}
                                contentContainerStyle={styles.scrollConteudo}
                                showsVerticalScrollIndicator={false}
                            >
                                {/* PERFIL DO USUÁRIO LOGADO */}
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.perfilCard,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={() => navegar("/perfil")}
                                >
                                    <Image
                                        source={
                                            fotoUsuario
                                                ? { uri: fotoUsuario }
                                                : require("@/assets/images/img/avatar.png")
                                        }
                                        style={styles.avatar}
                                    />
                                    <View style={styles.perfilTextoArea}>
                                        <Text style={styles.perfilNome} numberOfLines={2}>
                                            {nomeUsuario}
                                        </Text>
                                        <Text style={styles.perfilAcao}>Ver perfil</Text>
                                    </View>
                                    <Text style={styles.seta}>›</Text>
                                </Pressable>

                                {/* CONTA */}
                                <Text style={styles.secaoTitulo}>Conta</Text>
                                <View style={styles.grupo}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={() => navegar("/editarPerfil")}
                                    >
                                        <View style={styles.itemIconeArea}>
                                            <Image
                                                source={require("@/assets/images/img/edit.png")}
                                                style={styles.itemIcone}
                                            />
                                        </View>
                                        <View style={styles.itemTextoArea}>
                                            <Text style={styles.itemTitulo}>Editar perfil</Text>
                                            <Text style={styles.itemDescricao}>
                                                Atualize seus dados e informações
                                            </Text>
                                        </View>
                                        <Text style={styles.seta}>›</Text>
                                    </Pressable>

                                    <View style={styles.divisor} />

                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={() => navegar("/alterarSenha")}
                                    >
                                        <View style={styles.itemIconeArea}>
                                            <Image
                                                source={require("@/assets/images/img/trancar.png")}
                                                style={styles.itemIcone}
                                            />
                                        </View>
                                        <View style={styles.itemTextoArea}>
                                            <Text style={styles.itemTitulo}>Mudar senha</Text>
                                            <Text style={styles.itemDescricao}>
                                                Segurança e acesso à conta
                                            </Text>
                                        </View>
                                        <Text style={styles.seta}>›</Text>
                                    </Pressable>
                                </View>

                                {/* APARÊNCIA */}
                                <Text style={styles.secaoTitulo}>Aparência</Text>
                                <View style={styles.grupo}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={alternarTema}
                                    >
                                        <View style={styles.itemIconeArea}>
                                            <Image
                                                source={require("@/assets/images/img/tema.png")}
                                                style={styles.itemIcone}
                                            />
                                        </View>
                                        <View style={styles.itemTextoArea}>
                                            <Text style={styles.itemTitulo}>
                                                {tema === "escuro" ? "Tema claro" : "Tema escuro"}
                                            </Text>
                                            <Text style={styles.itemDescricao}>
                                                Alterar aparência do aplicativo
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.switchBase,
                                                tema === "claro" && styles.switchAtivo,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.switchBolinha,
                                                    tema === "claro" && styles.switchBolinhaAtiva,
                                                ]}
                                            />
                                        </View>
                                    </Pressable>
                                </View>

                                {/* CONTA E SESSÃO */}
                                <Text style={styles.secaoTitulo}>Conta e sessão</Text>
                                <View style={styles.grupo}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={() => navegar("/excluirConta")}
                                    >
                                        <View
                                            style={[
                                                styles.itemIconeArea,
                                                styles.itemIconeAreaPerigo,
                                            ]}
                                        >
                                            <Image
                                                source={require("@/assets/images/img/excluir-conta.png")}
                                                style={[
                                                    styles.itemIcone,
                                                    styles.itemIconePerigo,
                                                ]}
                                            />
                                        </View>
                                        <View style={styles.itemTextoArea}>
                                            <Text style={[styles.itemTitulo, styles.itemTituloPerigo]}>
                                                Excluir conta
                                            </Text>
                                            <Text style={styles.itemDescricao}>
                                                Remover permanentemente sua conta
                                            </Text>
                                        </View>
                                        <Text style={styles.seta}>›</Text>
                                    </Pressable>

                                    <View style={styles.divisor} />

                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.item,
                                            pressed && styles.itemPressed,
                                        ]}
                                        onPress={abrirConfirmacaoSaida}
                                    >
                                        <View style={styles.itemIconeArea}>
                                            <Image
                                                source={require("@/assets/images/img/exit.png")}
                                                style={styles.itemIcone}
                                            />
                                        </View>
                                        <View style={styles.itemTextoArea}>
                                            <Text style={styles.itemTitulo}>Sair</Text>
                                            <Text style={styles.itemDescricao}>
                                                Encerrar esta sessão
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>

                                <Text style={styles.rodape}>Conexão 360°</Text>
                            </ScrollView>
                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>

            <SairModalScreen
                visible={btnSair}
                onClose={() => setBtnSair(false)}
                onConfirm={confirmarSaida}
            />
        </>
    );
}
