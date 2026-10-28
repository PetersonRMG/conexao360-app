import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { router, useFocusEffect } from "expo-router";
import { Animated, Image, Pressable, ScrollView, Share, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "@/styles/globalStyles";
import MenuSreen from "./menu";
import HeaderScreen from "./header";
import VisualizarPublicacaoModal from "@/components/VisualizarFotoModal";
import ComentariosModalScreen from "@/components/modalComentarios";
import ModalAcaoPublicacao from "@/components/modalAcaoPublicacao";
import { criarHomeStyle } from "@/styles/homeStyles";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import {
    buscarPublicacoes,
    curtirPublicacao,
    descurtirPublicacao,
    getUrlMidiaPublicacao,
    denunciarPublicacao,
    excluirPublicacao,
    type Publicacao,
} from "@/services/publicacaoService";
import { getUrlFotoUsuario } from "@/services/usuarioService";
import { Ionicons } from "@expo/vector-icons";
type Filtro = "Todas" | "Recentes" | "Em alta" | "Meus posts";
// Superfície com entrada suave: a sombra e o relevo ficam no arquivo homeStyles.ts.
function CardEntrada({ children, delay = 0, style }: { children: ReactNode; delay?: number; style: any }) {
    const progresso = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const animacao = Animated.timing(progresso, {
            toValue: 1,
            duration: 430,
            delay,
            useNativeDriver: Platform.OS !== "web",
        });
        animacao.start();
        return () => animacao.stop();
    }, [progresso, delay]);
    return (
        <Animated.View
            style={[
                style,
                {
                    opacity: progresso,
                    transform: [
                        { translateY: progresso.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
                        { scale: progresso.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) },
                    ],
                },
            ]}
        >
            {children}
        </Animated.View>
    );
}

export default function HomeScreen() {
    // =====================================
    // TEMA
    // =====================================
    const { coresTema } = useTema();
    const homeStyle = criarHomeStyle(coresTema);
    // =====================================
    // AUTENTICAÇÃO
    // =====================================
    const {
        token,
        usuario,
    } = useAuth();
    // =====================================
    // PUBLICAÇÕES
    // =====================================
    const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    // =====================================
    // FILTRO
    // =====================================
    const [filtro, setFiltro] = useState<Filtro>("Todas");
    const [postsExpandidos, setPostsExpandidos] = useState<Record<number, boolean>>({});
    // =====================================
    // CURTIDA EM PROCESSAMENTO
    // =====================================
    const [processandoCurtida, setProcessandoCurtida] = useState<number | null>(null);
    // =====================================
    // Modal de denúncia/exclusão. Apenas uma ação de cada vez.
    const [acaoPublicacao, setAcaoPublicacao] = useState<{
        idPublicacao: number;
        tipo: "denunciar" | "excluir";
        totalDenuncias: number;
    } | null>(null);
    const [processandoAcao, setProcessandoAcao] = useState(false);
    const [erroAcao, setErroAcao] = useState<string | null>(null);
    // MODAL DE COMENTÁRIOS
    // =====================================
    const [comentariosAberto, setComentariosAberto] = useState(false);
    const [postSelecionado, setPostSelecionado] = useState<number | null>(null);
    // =====================================
    // PLACEHOLDER
    // =====================================
    const placeholderOpacity = useRef(new Animated.Value(0.35)).current;
    useEffect(() => {
        if (!carregando) {
            return;
        }
        const animacao = Animated.loop(
            Animated.sequence([
                Animated.timing(
                    placeholderOpacity,
                    {
                        toValue: 0.8,
                        duration: 700,
                        useNativeDriver: Platform.OS !== "web",
                    },
                ),
                Animated.timing(
                    placeholderOpacity,
                    {
                        toValue: 0.35,
                        duration: 700,
                        useNativeDriver: Platform.OS !== "web",
                    },
                ),
            ]),
        );
        animacao.start();
        return () => {
            animacao.stop();
        };
    }, [carregando, placeholderOpacity]);
    // =====================================
    // BUSCAR PUBLICAÇÕES
    // =====================================
    useFocusEffect(
        useCallback(() => {
            let telaAtiva = true;
            async function carregarPublicacoes() {
                if (!token) {
                    if (telaAtiva) {
                        setErro("Sessão não encontrada. Faça login novamente.");
                        setCarregando(false);
                    }
                    return;
                }
                try {
                    setCarregando(true);
                    setErro(null);
                    const resposta = await buscarPublicacoes(token);
                    // console.log(
                    //     "PUBLICAÇÕES:",
                    //     resposta,
                    // );
                    if (!resposta.success) {
                        throw new Error("Não foi possível carregar as publicações.");
                    }
                    if (telaAtiva) {
                        setPublicacoes(resposta.data ?? []);
                    }
                } catch (error) {
                    console.log(
                        "ERRO PUBLICAÇÕES:",
                        error,
                    );
                    if (telaAtiva) {
                        setErro(error instanceof Error ? error.message : "Não foi possível carregar as publicações.");
                    }
                } finally {
                    if (telaAtiva) {
                        setCarregando(false);
                    }
                }
            }
            carregarPublicacoes();
            return () => {
                telaAtiva = false;
            };
        }, [token]),
    );
    // =====================================
    // FILTRAR PUBLICAÇÕES
    // =====================================
    const publicacoesFiltradas = (() => {
        let resultado = [...publicacoes];
        // =============================
        // MEUS POSTS
        // =============================
        if (filtro === "Meus posts") {
            resultado = resultado.filter((publicacao) => publicacao.id_usuario === usuario?.id_usuario);
        }
        // =============================
        // RECENTES
        // =============================
        if (filtro === "Recentes") {
            resultado.sort(
                (
                    a,
                    b,
                ) => {
                    const dataA = new Date(a.criado_em_publicacao).getTime();
                    const dataB = new Date(b.criado_em_publicacao).getTime();
                    return dataB - dataA;
                },
            );
        }
        // =============================
        // EM ALTA
        // =============================
        if (filtro === "Em alta") {
            resultado.sort(
                (
                    a,
                    b,
                ) => {
                    const totalA = (a.curtidas_count ?? 0) + (a.comentarios_count ?? 0);
                    const totalB = (b.curtidas_count ?? 0) + (b.comentarios_count ?? 0);
                    return totalB - totalA;
                },
            );
        }
        return resultado;
    })();
    // =====================================
    // CURTIR / DESCURTIR
    // =====================================
    async function alternarCurtida(publicacao: Publicacao) {
        if (!token) {
            return;
        }
        if (processandoCurtida === publicacao.id_publicacao) {
            return;
        }
        try {
            setProcessandoCurtida(publicacao.id_publicacao);
            const jaCurtiu = Boolean(publicacao.curtido_por_mim);
            const resposta = jaCurtiu
                ? await descurtirPublicacao(
                    token,
                    publicacao.id_publicacao,
                )
                : await curtirPublicacao(
                    token,
                    publicacao.id_publicacao,
                );
            if (!resposta.success) {
                throw new Error("Não foi possível atualizar a curtida.");
            }
            setPublicacoes((atuais) =>
                atuais.map((item) => {
                    if (item.id_publicacao !== publicacao.id_publicacao) {
                        return item;
                    }
                    return {
                        ...item,
                        curtido_por_mim: resposta.data.curtido_por_mim,
                        curtidas_count: resposta.data.curtidas_count,
                    };
                }),
            );
        } catch (error) {
            console.log(
                "ERRO CURTIDA:",
                error,
            );
        } finally {
            setProcessandoCurtida(null);
        }
    }
    // =====================================
    // ABRIR COMENTÁRIOS
    // =====================================
    function abrirComentarios(idPublicacao: number) {
        setPostSelecionado(idPublicacao);
        setComentariosAberto(true);
    }
    // =====================================
    // FECHAR COMENTÁRIOS
    // =====================================
    function fecharComentarios() {
        setComentariosAberto(false);
        setPostSelecionado(null);
    }
    // =====================================
    // COMENTÁRIO ENVIADO
    // =====================================
    function comentarioEnviado(totalComentarios?: number) {
        if (postSelecionado === null) {
            return;
        }
        setPublicacoes((atuais) =>
            atuais.map((publicacao) => {
                if (publicacao.id_publicacao !== postSelecionado) {
                    return publicacao;
                }
                return {
                    ...publicacao,
                    comentarios_count:
                        totalComentarios !== undefined ? totalComentarios : (publicacao.comentarios_count ?? 0) + 1,
                };
            }),
        );
    }
    // =====================================
    // ABRIR PERFIL DO USUÁRIO
    // =====================================
    function abrirPerfilUsuario(idUsuario?: number) {
        if (!idUsuario) {
            return;
        }
        router.push({
            pathname: "/perfil",
            params: {
                idUsuario: String(idUsuario),
            },
        });
    }
    // =====================================
    // FORMATAR DATA
    // =====================================
    function formatarData(data: string) {
        if (!data) {
            return "";
        }
        const dataPublicacao = new Date(data);
        if (Number.isNaN(dataPublicacao.getTime())) {
            return "";
        }
        return dataPublicacao.toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            },
        );
    }
    // Data em formato amigável no feed; a data completa permanece no modal.
    function formatarTempoRelativo(data: string) {
        const publicadaEm = new Date(data).getTime();
        if (!Number.isFinite(publicadaEm)) return "";
        const minutos = Math.max(0, Math.floor((Date.now() - publicadaEm) / 60000));
        if (minutos < 1) return "Agora";
        if (minutos < 60) return `${minutos}min atrás`;
        const horas = Math.floor(minutos / 60);
        if (horas < 24) return `${horas}h atrás`;
        const dias = Math.floor(horas / 24);
        if (dias < 7) return `${dias}d atrás`;
        return formatarData(data);
    }
    // =====================================
    // COMPARTILHAR
    // =====================================
    async function compartilharPost(publicacao: Publicacao) {
        try {
            await Share.share({
                message: publicacao.texto_publicacao ?? "Confira esta publicação no Conexão 360°.",
            });
        } catch (error) {
            console.log(
                "ERRO COMPARTILHAR:",
                error,
            );
        }
    }
    // =====================================
    // =====================================
    // DENUNCIAR OU EXCLUIR PUBLICAÇÃO
    // =====================================
    function abrirAcao(publicacao: Publicacao) {
        if (!usuario || processandoAcao) return;
        const proprioPost = Number(publicacao.id_usuario) === Number(usuario.id_usuario);
        const total = Number(publicacao.denuncias_count ?? 0);
        if (!proprioPost && (total >= 3 || Boolean(publicacao.denunciado_por_mim))) return;
        setErroAcao(null);
        setAcaoPublicacao({
            idPublicacao: publicacao.id_publicacao,
            tipo: proprioPost ? "excluir" : "denunciar",
            totalDenuncias: total,
        });
    }
    async function confirmarAcao(motivo: string, descricao: string) {
        if (!token || !acaoPublicacao || processandoAcao) return;
        setProcessandoAcao(true);
        setErroAcao(null);
        try {
            const resposta =
                acaoPublicacao.tipo === "denunciar"
                    ? await denunciarPublicacao(token, acaoPublicacao.idPublicacao, motivo, descricao)
                    : await excluirPublicacao(token, acaoPublicacao.idPublicacao);
            if (!resposta.success) {
                throw new Error(resposta.message || "Não foi possível concluir a operação.");
            }
            const idRemovido = acaoPublicacao.idPublicacao;
            setPublicacoes((atuais) => atuais.filter((post) => post.id_publicacao !== idRemovido));
            setAcaoPublicacao(null);
        } catch (error) {
            setErroAcao(error instanceof Error ? error.message : "Não foi possível concluir a operação.");
        } finally {
            setProcessandoAcao(false);
        }
    }
    const [publicacaoAmpliadaId, setPublicacaoAmpliadaId] = useState<number | null>(null);
    const publicacaoAmpliada = publicacoes.find(
        p => p.id_publicacao === publicacaoAmpliadaId
    ) ?? null;
    const fotoAmpliada = publicacaoAmpliada
        ? getUrlMidiaPublicacao(publicacaoAmpliada.midia_publicacao)
        : null;
    const autorFotoAmpliada = publicacaoAmpliada
        ? getUrlFotoUsuario(publicacaoAmpliada.usuario?.foto_usuario ?? null)
        : null;
    // ============================================================
    // HOME — composição inspirada na referência (claro e escuro)
    // ============================================================
    const filtros = ["Todas", "Recentes", "Em alta", "Meus posts", "Enquetes"] as const;

    return (
        <View style={globalStyle.container}>
            <View style={[globalStyle.background, homeStyle.container]}>
                <SafeAreaView style={globalStyle.areaConteudo}>
                    {/* Header original preservado: sino e notificações continuam ativos. */}
                    <HeaderScreen />

                    {/* Busca e filtro seguem a referência. */}
                    <View style={homeStyle.areaBusca}>
                        <Pressable
                            style={({ pressed }) => [homeStyle.inputBusca, pressed && homeStyle.botaoPressionado]}
                            onPress={() => router.push("/explorar")}
                            accessibilityRole="button"
                            accessibilityLabel="Buscar pessoas e conexões"
                        >
                            <Ionicons name="search-outline" size={19} color={coresTema.destaque} />
                            <Text style={homeStyle.txtBusca}>Buscar</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [homeStyle.btnFiltrosBusca, pressed && homeStyle.botaoPressionado]}
                            onPress={() => router.push("/explorar")}
                            accessibilityRole="button"
                            accessibilityLabel="Abrir filtros de busca"
                        >
                            <Ionicons name="options-outline" size={20} color={coresTema.texto} />
                        </Pressable>
                    </View>

                    {/* Enquetes volta a ficar visível junto dos filtros, como antes. */}
                    <View style={homeStyle.filtros}>
                        {filtros.map((item) => {
                            const ativo = item !== "Enquetes" && filtro === item;
                            return (
                                <Pressable
                                    key={item}
                                    onPress={() => {
                                        if (item === "Enquetes") {
                                            router.push("/enquetes");
                                            return;
                                        }
                                        setFiltro(item);
                                    }}
                                    style={[homeStyle.filtro, ativo && homeStyle.filtroAtivo]}
                                    accessibilityRole="tab"
                                    accessibilityLabel={item === "Enquetes" ? "Abrir enquetes" : `Filtrar por ${item}`}
                                    accessibilityState={{ selected: ativo }}
                                >
                                    <Text
                                        style={[homeStyle.txtFiltro, ativo && homeStyle.txtFiltroAtivo]}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                        minimumFontScale={0.85}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    <ScrollView
                        style={homeStyle.scroll}
                        contentContainerStyle={homeStyle.scrollConteudo}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Banner reservado para integração posterior. */}
                        <View style={homeStyle.secaoTopo}>
                            <Text style={homeStyle.tituloSecao}>Publicações</Text>
                            <Pressable
                                style={homeStyle.verTodas}
                                onPress={() => setFiltro("Todas")}
                                accessibilityRole="button"
                            >
                                <Text style={homeStyle.verTodasTexto}>Ver todas</Text>
                                <Ionicons name="chevron-forward" size={14} color={coresTema.destaque} />
                            </Pressable>
                        </View>

                        {/* Placeholders com o mesmo relevo dos posts reais. */}
                        {carregando && [1, 2, 3].map((item) => (
                            <View key={item} style={homeStyle.cardCamada}>
                                <View pointerEvents="none" style={homeStyle.cardBase3d} />
                                <View style={homeStyle.cardPublicacao}>
                                    <Animated.View style={{ opacity: placeholderOpacity }}>
                                        <View style={homeStyle.skeletonHeader}>
                                            <View style={homeStyle.skeletonAvatar} />
                                            <View style={homeStyle.skeletonAutor}>
                                                <View style={[homeStyle.skeletonLinha, homeStyle.skeletonNome]} />
                                                <View style={[homeStyle.skeletonLinhaPequena, homeStyle.skeletonData]} />
                                            </View>
                                        </View>
                                        <View style={[homeStyle.skeletonLinha, homeStyle.skeletonTexto1]} />
                                        <View style={[homeStyle.skeletonLinha, homeStyle.skeletonTexto2]} />
                                        <View style={[homeStyle.skeletonLinha, homeStyle.skeletonTexto3]} />
                                        <View style={homeStyle.skeletonContadores}>
                                            <View style={homeStyle.skeletonContadorCurto} />
                                            <View style={homeStyle.skeletonContadorLongo} />
                                        </View>
                                        <View style={homeStyle.skeletonAcoes}>
                                            <View style={homeStyle.skeletonAcao} />
                                            <View style={homeStyle.skeletonAcao} />
                                            <View style={homeStyle.skeletonAcao} />
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                        ))}

                        {!carregando && erro && (
                            <Text style={homeStyle.semPublicacoes}>{erro}</Text>
                        )}

                        {!carregando && !erro && publicacoesFiltradas.map((publicacao, indice) => {
                            const fotoAutor = getUrlFotoUsuario(publicacao.usuario?.foto_usuario ?? null);
                            const midia = getUrlMidiaPublicacao(publicacao.midia_publicacao);
                            const curtido = Boolean(publicacao.curtido_por_mim);
                            const quantidadeCurtidas = publicacao.curtidas_count ?? 0;
                            const quantidadeComentarios = publicacao.comentarios_count ?? 0;
                            const proprioPost = Number(publicacao.id_usuario) === Number(usuario?.id_usuario);
                            const totalDenuncias = Number(publicacao.denuncias_count ?? 0);
                            const jaDenunciou = Boolean(publicacao.denunciado_por_mim);
                            const denunciaIndisponivel = !proprioPost && (jaDenunciou || totalDenuncias >= 3);
                            return (
                                <View key={publicacao.id_publicacao} style={homeStyle.cardCamada}>
                                    <View pointerEvents="none" style={homeStyle.cardBase3d} />
                                    <CardEntrada style={homeStyle.cardPublicacao} delay={Math.min(indice * 70, 280)}>
                                        {/* Fio de luz superior para profundidade, sem simular efeitos pesados. */}
                                        <View pointerEvents="none" style={homeStyle.cardReflexo} />
                                        <View style={homeStyle.publicacaoHeader}>
                                            <Pressable
                                                onPress={() => abrirPerfilUsuario(publicacao.usuario?.id_usuario)}
                                                accessibilityRole="button"
                                                accessibilityLabel={`Abrir perfil de ${publicacao.usuario?.nome_usuario ?? "usuário"}`}
                                            >
                                                <Image
                                                    source={fotoAutor ? { uri: fotoAutor } : require("@/assets/images/img/avatar.png")}
                                                    style={homeStyle.avatarPublicacao}
                                                    resizeMode="cover"
                                                />
                                            </Pressable>
                                            <Pressable
                                                style={homeStyle.autorContainer}
                                                onPress={() => abrirPerfilUsuario(publicacao.usuario?.id_usuario)}
                                                accessibilityRole="button"
                                            >
                                                <Text numberOfLines={1} style={homeStyle.nomeAutor}>
                                                    {publicacao.usuario?.nome_usuario ?? "Usuário"}
                                                </Text>
                                                <Text style={homeStyle.tempoPublicacao}>
                                                    {formatarTempoRelativo(publicacao.criado_em_publicacao)}
                                                </Text>
                                            </Pressable>
                                            {/* Mantém denúncia/exclusão, porém em menu discreto de três pontos. */}
                                            <Pressable
                                                style={({ pressed }) => [homeStyle.botaoMais, pressed && homeStyle.botaoPressionado]}
                                                onPress={() => abrirAcao(publicacao)}
                                                disabled={denunciaIndisponivel || processandoAcao}
                                                accessibilityRole="button"
                                                accessibilityLabel={proprioPost ? "Excluir minha publicação" : "Denunciar publicação"}
                                                accessibilityState={{ disabled: denunciaIndisponivel || processandoAcao }}
                                            >
                                                <Ionicons
                                                    name={proprioPost ? "ellipsis-vertical" : jaDenunciou ? "checkmark-circle-outline" : totalDenuncias >= 3 ? "lock-closed-outline" : "ellipsis-vertical"}
                                                    size={19}
                                                    color={coresTema.textoSecundario}
                                                />
                                            </Pressable>
                                        </View>
                                        {publicacao.texto_publicacao && (
                                            <View style={homeStyle.conteudoTexto}>
                                                <Text
                                                    style={homeStyle.textoPublicacao}
                                                    numberOfLines={postsExpandidos[publicacao.id_publicacao] ? undefined : 3}
                                                >
                                                    {publicacao.texto_publicacao}
                                                </Text>
                                                {(publicacao.texto_publicacao.length > 90 ||
                                                    publicacao.texto_publicacao.split("\n").length > 3) && (
                                                        <Pressable
                                                            onPress={() => setPostsExpandidos((atual) => ({
                                                                ...atual,
                                                                [publicacao.id_publicacao]: !atual[publicacao.id_publicacao],
                                                            }))}
                                                            accessibilityRole="button"
                                                        >
                                                            <Text style={homeStyle.lerMais}>
                                                                {postsExpandidos[publicacao.id_publicacao] ? "Ver menos" : "Ler mais"}
                                                            </Text>
                                                        </Pressable>
                                                    )}
                                            </View>
                                        )}
                                        {midia && (
                                            <Pressable
                                                onPress={() => setPublicacaoAmpliadaId(publicacao.id_publicacao)}
                                                accessibilityRole="button"
                                                accessibilityLabel="Ampliar imagem da publicação"
                                            >
                                                <Image source={{ uri: midia }} style={homeStyle.imagemPublicacao} resizeMode="cover" />
                                            </Pressable>
                                        )}
                                        <View style={homeStyle.areaContadores}>
                                            <View style={homeStyle.contadorComIcone}>
                                                <Ionicons name="heart" size={13} color="#E84D62" />
                                                <Text style={homeStyle.txtContador}>
                                                    {quantidadeCurtidas} {quantidadeCurtidas === 1 ? "curtida" : "curtidas"}
                                                </Text>
                                            </View>
                                            <Pressable
                                                style={homeStyle.contadorComIcone}
                                                onPress={() => abrirComentarios(publicacao.id_publicacao)}
                                                accessibilityRole="button"
                                            >
                                                <Ionicons name="chatbubble-outline" size={13} color={coresTema.textoSecundario} />
                                                <Text style={homeStyle.txtContador}>
                                                    {quantidadeComentarios} {quantidadeComentarios === 1 ? "comentário" : "comentários"}
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={homeStyle.acoesPublicacao}>
                                            <Pressable
                                                style={({ pressed }) => [homeStyle.acao, pressed && homeStyle.acaoPressionada]}
                                                disabled={processandoCurtida === publicacao.id_publicacao}
                                                onPress={() => alternarCurtida(publicacao)}
                                                accessibilityRole="button"
                                                accessibilityLabel={curtido ? "Descurtir publicação" : "Curtir publicação"}
                                            >
                                                <Ionicons
                                                    name={curtido ? "heart" : "heart-outline"}
                                                    size={18}
                                                    color={curtido ? coresTema.destaque : coresTema.textoSecundario}
                                                />
                                                <Text style={[homeStyle.txtAcao, curtido && homeStyle.txtAcaoAtivo]}>
                                                    {curtido ? "Curtido" : "Curtir"}
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                style={({ pressed }) => [homeStyle.acao, pressed && homeStyle.acaoPressionada]}
                                                onPress={() => abrirComentarios(publicacao.id_publicacao)}
                                                accessibilityRole="button"
                                                accessibilityLabel="Comentar publicação"
                                            >
                                                <Ionicons name="chatbubble-outline" size={17} color={coresTema.textoSecundario} />
                                                <Text style={homeStyle.txtAcao}>Comentar</Text>
                                            </Pressable>
                                            <Pressable
                                                style={({ pressed }) => [homeStyle.acao, pressed && homeStyle.acaoPressionada]}
                                                onPress={() => compartilharPost(publicacao)}
                                                accessibilityRole="button"
                                                accessibilityLabel="Compartilhar publicação"
                                            >
                                                <Ionicons name="paper-plane-outline" size={18} color={coresTema.textoSecundario} />
                                                <Text style={homeStyle.txtAcao}>Compartilhar</Text>
                                            </Pressable>
                                        </View>
                                    </CardEntrada>
                                </View>
                            );
                        })}

                        {!carregando && !erro && publicacoesFiltradas.length === 0 && (
                            <Text style={homeStyle.semPublicacoes}>Nenhuma publicação encontrada.</Text>
                        )}
                    </ScrollView>
                    <MenuSreen />
                    {/* Todos os modais existentes permanecem conectados à mesma API. */}
                    <ModalAcaoPublicacao
                        visible={acaoPublicacao !== null}
                        tipo={acaoPublicacao?.tipo ?? "denunciar"}
                        totalDenuncias={acaoPublicacao?.totalDenuncias ?? 0}
                        carregando={processandoAcao}
                        erro={erroAcao}
                        onClose={() => {
                            if (processandoAcao) return;
                            setAcaoPublicacao(null);
                            setErroAcao(null);
                        }}
                        onConfirm={confirmarAcao}
                    />
                    <ComentariosModalScreen
                        visible={comentariosAberto}
                        postId={postSelecionado}
                        onClose={fecharComentarios}
                        onComentarioEnviado={comentarioEnviado}
                    />
                    <VisualizarPublicacaoModal
                        publicacao={publicacaoAmpliada}
                        imagem={fotoAmpliada}
                        fotoAutor={autorFotoAmpliada}
                        dataFormatada={publicacaoAmpliada ? formatarData(publicacaoAmpliada.criado_em_publicacao) : ""}
                        curtindo={processandoCurtida === publicacaoAmpliadaId}
                        aoFechar={() => setPublicacaoAmpliadaId(null)}
                        aoCurtir={alternarCurtida}
                        aoVerComentarios={(id) => {
                            setPublicacaoAmpliadaId(null);
                            abrirComentarios(id);
                        }}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
}
