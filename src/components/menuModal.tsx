import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    router,
} from "expo-router";

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

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    useTema,
} from "@/contexts/TemaContext";

import {
    useAuth,
} from "@/contexts/AuthContext";

import {
    criarMenuModalStyles,
} from "@/styles/menuModalStyles";

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


export default function MenuModalScreen({
    visible,
    onClose,
}: MenuModalProps) {

    // =========================================================
    // TEMA
    // =========================================================

    const {
        tema,
        coresTema,
        alternarTema,
    } = useTema();


    const styles =
        criarMenuModalStyles(
            coresTema
        );


    // =========================================================
    // AUTENTICAÇÃO
    // =========================================================

    const {
        token,
        usuario,
        definirSessao,
        limparSessao,
    } = useAuth();


    // =========================================================
    // OFFCANVAS
    // =========================================================

    const {
        width: larguraTela,
    } = useWindowDimensions();


    const larguraOffcanvas =
        Math.min(
            larguraTela * 0.88,
            380
        );


    const translateX =
        useRef(
            new Animated.Value(
                larguraOffcanvas
            )
        ).current;


    // =========================================================
    // ESTADOS
    // =========================================================

    const [
        btnSair,
        setBtnSair,
    ] = useState(
        false
    );


    const [
        usuarioBanco,
        setUsuarioBanco,
    ] = useState<
        Usuario | null
    >(
        null
    );


    // =========================================================
    // SESSÃO
    // =========================================================

    const definirSessaoRef =
        useRef(
            definirSessao
        );


    definirSessaoRef.current =
        definirSessao;


    // =========================================================
    // ATUALIZAR USUÁRIO AO ABRIR MENU
    // =========================================================

    useEffect(() => {

        if (
            !visible ||
            !token
        ) {

            return;

        }


        let ativo =
            true;


        setUsuarioBanco(
            null
        );


        async function carregarUsuario() {

            try {

                const resposta =
                    await buscarUsuario(
                        token!
                    );


                if (
                    !ativo ||
                    !resposta.success ||
                    !resposta.data
                ) {

                    return;

                }


                setUsuarioBanco(
                    resposta.data
                );


                await definirSessaoRef
                    .current(
                        token!,
                        resposta.data
                    );

            } catch (error) {

                if (ativo) {

                    console.warn(
                        "Não foi possível atualizar o usuário do menu:",
                        error
                    );

                }

            }

        }


        carregarUsuario();


        return () => {

            ativo =
                false;

        };

    }, [
        visible,
        token,
    ]);


    // =========================================================
    // USUÁRIO EXIBIDO
    // =========================================================

    const usuarioExibido =
        usuarioBanco &&
            usuarioBanco.id_usuario ===
            usuario?.id_usuario
            ? usuarioBanco
            : usuario;


    const nomeUsuario =
        usuarioExibido
            ?.nome_usuario
            ?.trim()
        ||
        "Meu perfil";


    const fotoUsuario =
        getUrlFotoUsuario(
            usuarioExibido
                ?.foto_usuario ??
            null
        );


    // =========================================================
    // PERFIL
    // =========================================================

    function getNomePerfil() {

        switch (
        usuarioExibido
            ?.perfil_usuario
        ) {

            case "administrador":

                return "Administrador";


            case "palestrante":

                return "Palestrante";


            case "usuario":

                return "Participante";


            default:

                return "Membro";

        }

    }


    const nomePerfil =
        getNomePerfil();


    // =========================================================
    // ANIMAÇÃO DE ABERTURA
    // =========================================================

    useEffect(() => {

        if (!visible) {

            return;

        }


        translateX.setValue(
            larguraOffcanvas
        );


        requestAnimationFrame(
            () => {

                Animated.timing(
                    translateX,
                    {
                        toValue:
                            0,

                        duration:
                            260,

                        useNativeDriver:
                            true,
                    }
                ).start();

            }
        );

    }, [
        larguraOffcanvas,
        translateX,
        visible,
    ]);


    // =========================================================
    // FECHAR MENU
    // =========================================================

    const fecharMenu = (
        depoisDeFechar?: () => void
    ) => {

        Animated.timing(
            translateX,
            {
                toValue:
                    larguraOffcanvas,

                duration:
                    220,

                useNativeDriver:
                    true,
            }
        ).start(
            () => {

                onClose();

                depoisDeFechar?.();

            }
        );

    };


    // =========================================================
    // NAVEGAR
    // =========================================================

    const navegar = (
        rota: string
    ) => {

        fecharMenu(
            () =>
                router.navigate(
                    rota as Parameters<
                        typeof router.navigate
                    >[0]
                )
        );

    };


    // =========================================================
    // SAIR
    // =========================================================

    const abrirConfirmacaoSaida =
        () => {

            fecharMenu(
                () =>
                    setBtnSair(
                        true
                    )
            );

        };


    const confirmarSaida =
        async () => {

            setBtnSair(
                false
            );


            try {

                await limparSessao();


                router.replace(
                    "/"
                );

            } catch (error) {

                console.error(
                    "Erro ao encerrar a sessão:",
                    error
                );

            }

        };


    // =========================================================
    // RENDER
    // =========================================================

    return (
        <>
            <Modal
                visible={
                    visible
                }
                transparent
                animationType="none"
                statusBarTranslucent
                onRequestClose={() =>
                    fecharMenu()
                }
            >

                <View
                    style={
                        styles.overlay
                    }
                >

                    {/* FUNDO */}

                    <Pressable
                        style={
                            styles.backdrop
                        }
                        onPress={() =>
                            fecharMenu()
                        }
                    />


                    {/* MENU */}

                    <Animated.View
                        style={[
                            styles.offcanvas,

                            {
                                width:
                                    larguraOffcanvas,

                                transform: [
                                    {
                                        translateX,
                                    },
                                ],
                            },
                        ]}
                    >

                        <SafeAreaView
                            style={
                                styles.safeArea
                            }
                        >

                            {/* =========================
                                CABEÇALHO
                            ========================= */}

                            <View
                                style={
                                    styles.header
                                }
                            >

                                <View
                                    style={
                                        styles.headerTituloArea
                                    }
                                >

                                    <Text
                                        style={
                                            styles.headerTitulo
                                        }
                                    >
                                        Menu
                                    </Text>


                                    <Text
                                        style={
                                            styles.headerSubtitulo
                                        }
                                    >
                                        Comunidade, conta e preferências
                                    </Text>

                                </View>


                                <Pressable
                                    style={({
                                        pressed,
                                    }) => [
                                            styles.btnFechar,

                                            pressed &&
                                            styles.pressed,
                                        ]}
                                    onPress={() =>
                                        fecharMenu()
                                    }
                                    accessibilityRole="button"
                                    accessibilityLabel="Fechar menu"
                                >

                                    <Text
                                        style={
                                            styles.btnFecharTexto
                                        }
                                    >
                                        ×
                                    </Text>

                                </Pressable>

                            </View>


                            {/* =========================
                                CONTEÚDO
                            ========================= */}

                            <ScrollView
                                style={
                                    styles.scroll
                                }
                                contentContainerStyle={
                                    styles.scrollConteudo
                                }
                                showsVerticalScrollIndicator={
                                    false
                                }
                            >

                                {/* =========================
                                    PERFIL
                                ========================= */}

                                <Pressable
                                    style={({
                                        pressed,
                                    }) => [
                                            styles.perfilCard,

                                            pressed &&
                                            styles.pressed,
                                        ]}
                                    onPress={() =>
                                        navegar(
                                            "/perfil"
                                        )
                                    }
                                >

                                    <Image
                                        source={
                                            fotoUsuario
                                                ? {
                                                    uri:
                                                        fotoUsuario,
                                                }
                                                : require(
                                                    "@/assets/images/img/avatar.png"
                                                )
                                        }
                                        style={
                                            styles.avatar
                                        }
                                    />


                                    <View
                                        style={
                                            styles.perfilTextoArea
                                        }
                                    >

                                        <Text
                                            style={
                                                styles.perfilNome
                                            }
                                            numberOfLines={
                                                2
                                            }
                                        >
                                            {
                                                nomeUsuario
                                            }
                                        </Text>


                                        <Text
                                            style={
                                                styles.perfilAcao
                                            }
                                        >
                                            {nomePerfil} · Ver meu perfil
                                        </Text>

                                    </View>


                                    <Text
                                        style={
                                            styles.seta
                                        }
                                    >
                                        ›
                                    </Text>

                                </Pressable>


                                {/* =========================
                                    COMUNIDADE
                                ========================= */}

                                <Text
                                    style={
                                        styles.secaoTitulo
                                    }
                                >
                                    Comunidade
                                </Text>


                                <View
                                    style={
                                        styles.grupo
                                    }
                                >

                                    {/* ENCONTRAR PESSOAS */}

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={() =>
                                            navegar(
                                                "/explorar"
                                            )
                                        }
                                    >

                                        <View
                                            style={
                                                styles.itemIconeArea
                                            }
                                        >

                                            <Ionicons
                                                name="people-outline"
                                                size={
                                                    21
                                                }
                                                color={
                                                    coresTema.destaque
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.itemTitulo
                                                }
                                            >
                                                Encontrar pessoas
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Descubra outros membros da comunidade
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                styles.seta
                                            }
                                        >
                                            ›
                                        </Text>

                                    </Pressable>


                                    <View
                                        style={
                                            styles.divisor
                                        }
                                    />


                                    {/* ENQUETES */}

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={() =>
                                            navegar(
                                                "/enquetes"
                                            )
                                        }
                                    >

                                        <View
                                            style={
                                                styles.itemIconeArea
                                            }
                                        >

                                            <Ionicons
                                                name="bar-chart-outline"
                                                size={
                                                    21
                                                }
                                                color={
                                                    coresTema.destaque
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.itemTitulo
                                                }
                                            >
                                                Enquetes
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Participe das discussões da comunidade
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                styles.seta
                                            }
                                        >
                                            ›
                                        </Text>

                                    </Pressable>

                                </View>


                                {/* =========================
                                    CONTA
                                ========================= */}

                                <Text
                                    style={
                                        styles.secaoTitulo
                                    }
                                >
                                    Conta
                                </Text>


                                <View
                                    style={
                                        styles.grupo
                                    }
                                >

                                    {/* EDITAR PERFIL */}

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={() =>
                                            navegar(
                                                "/editarPerfil"
                                            )
                                        }
                                    >

                                        <View
                                            style={
                                                styles.itemIconeArea
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/edit.png"
                                                )}
                                                style={
                                                    styles.itemIcone
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.itemTitulo
                                                }
                                            >
                                                Editar perfil
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Atualize seus dados e informações
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                styles.seta
                                            }
                                        >
                                            ›
                                        </Text>

                                    </Pressable>


                                    <View
                                        style={
                                            styles.divisor
                                        }
                                    />


                                    {/* SENHA */}

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={() =>
                                            navegar(
                                                "/alterarSenha"
                                            )
                                        }
                                    >

                                        <View
                                            style={
                                                styles.itemIconeArea
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/trancar.png"
                                                )}
                                                style={
                                                    styles.itemIcone
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.itemTitulo
                                                }
                                            >
                                                Alterar senha
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Segurança e acesso à conta
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                styles.seta
                                            }
                                        >
                                            ›
                                        </Text>

                                    </Pressable>

                                </View>


                                {/* =========================
                                    APARÊNCIA
                                ========================= */}

                                <Text
                                    style={
                                        styles.secaoTitulo
                                    }
                                >
                                    Aparência
                                </Text>


                                <View
                                    style={
                                        styles.grupo
                                    }
                                >

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={
                                            alternarTema
                                        }
                                    >

                                        <View
                                            style={
                                                styles.itemIconeArea
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/tema.png"
                                                )}
                                                style={
                                                    styles.itemIcone
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.itemTitulo
                                                }
                                            >
                                                {
                                                    tema ===
                                                        "escuro"
                                                        ? "Tema claro"
                                                        : "Tema escuro"
                                                }
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Alterar aparência do aplicativo
                                            </Text>

                                        </View>


                                        <View
                                            style={[
                                                styles.switchBase,

                                                tema ===
                                                "claro" &&
                                                styles.switchAtivo,
                                            ]}
                                        >

                                            <View
                                                style={[
                                                    styles.switchBolinha,

                                                    tema ===
                                                    "claro" &&
                                                    styles.switchBolinhaAtiva,
                                                ]}
                                            />

                                        </View>

                                    </Pressable>

                                </View>


                                {/* =========================
                                    CONTA E SESSÃO
                                ========================= */}

                                <Text
                                    style={
                                        styles.secaoTitulo
                                    }
                                >
                                    Conta e sessão
                                </Text>


                                <View
                                    style={
                                        styles.grupo
                                    }
                                >

                                    {/* SAIR */}

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={
                                            abrirConfirmacaoSaida
                                        }
                                    >

                                        <View
                                            style={
                                                styles.itemIconeArea
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/exit.png"
                                                )}
                                                style={
                                                    styles.itemIcone
                                                }
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    styles.itemTitulo
                                                }
                                            >
                                                Sair
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Encerrar esta sessão
                                            </Text>

                                        </View>

                                    </Pressable>


                                    <View
                                        style={
                                            styles.divisor
                                        }
                                    />


                                    {/* EXCLUIR CONTA */}

                                    <Pressable
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.item,

                                                pressed &&
                                                styles.itemPressed,
                                            ]}
                                        onPress={() =>
                                            navegar(
                                                "/excluirConta"
                                            )
                                        }
                                    >

                                        <View
                                            style={[
                                                styles.itemIconeArea,
                                                styles.itemIconeAreaPerigo,
                                            ]}
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/excluir-conta.png"
                                                )}
                                                style={[
                                                    styles.itemIcone,
                                                    styles.itemIconePerigo,
                                                ]}
                                            />

                                        </View>


                                        <View
                                            style={
                                                styles.itemTextoArea
                                            }
                                        >

                                            <Text
                                                style={[
                                                    styles.itemTitulo,
                                                    styles.itemTituloPerigo,
                                                ]}
                                            >
                                                Excluir conta
                                            </Text>


                                            <Text
                                                style={
                                                    styles.itemDescricao
                                                }
                                            >
                                                Gerenciar exclusão da conta
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                styles.seta
                                            }
                                        >
                                            ›
                                        </Text>

                                    </Pressable>

                                </View>


                                {/* =========================
                                    RODAPÉ
                                ========================= */}

                                <Text
                                    style={
                                        styles.rodape
                                    }
                                >
                                    Conexão 360°
                                </Text>

                            </ScrollView>

                        </SafeAreaView>

                    </Animated.View>

                </View>

            </Modal>


            <SairModalScreen
                visible={
                    btnSair
                }
                onClose={() =>
                    setBtnSair(
                        false
                    )
                }
                onConfirm={
                    confirmarSaida
                }
            />

        </>
    );

}