import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import HeaderScreen from "@/app/header";
import MenuScreen from "@/app/menu";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import globalStyle from "@/styles/globalStyles";
import { criarEventosStyles } from "@/styles/evetosStyles";
import type { EventoApp } from "@/data/eventoDados";
import { buscarEventos } from "@/services/eventosService";
import type { AlbumGaleria, VideoGaleria } from "@/data/galeriaDados";
import { buscarGaleriaEvento } from "@/services/galeriaEventoService";

type FiltroEventos = "todos" | "andamento" | "proximos" | "encerrados";
type AbaEvento = "programacao" | "enquetes" | "galeria";
type AbaMidia = "fotos" | "videos";
type SituacaoEvento = "andamento" | "proximos" | "encerrados";

const FILTROS: { id: FiltroEventos; titulo: string }[] = [
    { id: "todos", titulo: "Todos" },
    { id: "proximos", titulo: "Próximos" },
    { id: "andamento", titulo: "Em andamento" },
    { id: "encerrados", titulo: "Realizados" },
];

const ABAS: { id: AbaEvento; titulo: string }[] = [
    { id: "programacao", titulo: "Programação" },
    { id: "enquetes", titulo: "Enquetes" },
    { id: "galeria", titulo: "Galeria" },
];

function situacaoEvento(evento: EventoApp): SituacaoEvento {
    const agora = Date.now();
    const inicio = new Date(evento.inicio).getTime();
    const termino = new Date(evento.termino).getTime();
    if (Number.isNaN(inicio) || Number.isNaN(termino)) return "encerrados";
    if (agora < inicio) return "proximos";
    if (agora > termino) return "encerrados";
    return "andamento";
}

function descricaoSituacao(situacao: SituacaoEvento) {
    if (situacao === "andamento") return "EM ANDAMENTO";
    if (situacao === "proximos") return "EM BREVE";
    return "ENCERRADO";
}

function dataLegivel(iso: string) {
    const data = new Date(iso);
    if (Number.isNaN(data.getTime())) return "Data a confirmar";
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(data);
}

function diaMesEvento(iso: string): { dia: string; mes: string } {
    const data = new Date(iso);
    if (Number.isNaN(data.getTime())) return { dia: "--", mes: "---" };
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "short" })
        .format(data).replace(".", "");
    return { dia: String(data.getDate()).padStart(2, "0"), mes };
}

function horaEvento(iso: string) {
    const data = new Date(iso);
    if (Number.isNaN(data.getTime())) return "Horário a confirmar";
    return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(data);
}

function correspondeBusca(evento: EventoApp, busca: string) {
    const alvo = `${evento.titulo} ${evento.edicao ?? ""} ${evento.local} ${evento.descricao}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const termo = busca.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return alvo.includes(termo);
}

export default function EventosScreen() {
    const { coresTema } = useTema();
    const { token, carregandoSessao } = useAuth();
    const styles = criarEventosStyles(coresTema);
    const scrollRef = useRef<ScrollView>(null);

    const [eventos, setEventos] = useState<EventoApp[]>([]);
    const [carregandoEventos, setCarregandoEventos] = useState(true);
    const [erroEventos, setErroEventos] = useState("");
    const [tentativa, setTentativa] = useState(0);
    const [busca, setBusca] = useState("");
    const [buscaVisivel, setBuscaVisivel] = useState(false);
    const [filtro, setFiltro] = useState<FiltroEventos>("todos");
    const [eventoSelecionado, setEventoSelecionado] = useState<EventoApp | null>(null);
    const [aba, setAba] = useState<AbaEvento>("programacao");
    const [abaMidia, setAbaMidia] = useState<AbaMidia>("fotos");
    const [albumAberto, setAlbumAberto] = useState<AlbumGaleria | null>(null);
    const [indiceFoto, setIndiceFoto] = useState<number | null>(null);
    const [erroVideo, setErroVideo] = useState("");
    const [galeria, setGaleria] = useState<{
        eventoId: string;
        carregando: boolean;
        albuns: AlbumGaleria[];
        videos: VideoGaleria[];
        erro: string;
    } | null>(null);

    useEffect(() => {
        if (carregandoSessao) return;

        if (!token) {
            setEventos([]);
            setErroEventos("Faça login para consultar os eventos.");
            setCarregandoEventos(false);
            return;
        }

        let ativo = true;
        setCarregandoEventos(true);
        setErroEventos("");

        buscarEventos(token)
            .then(resultado => {
                if (!ativo) return;
                setEventos(resultado);
            })
            .catch(error => {
                if (!ativo) return;
                setEventos([]);
                setErroEventos(error instanceof Error
                    ? error.message
                    : "Não foi possível carregar os eventos.");
            })
            .finally(() => {
                if (ativo) setCarregandoEventos(false);
            });

        return () => { ativo = false; };
    }, [token, carregandoSessao, tentativa]);

    // A galeria é consultada somente para a edição selecionada.
    // A checagem do eventoId impede mostrar conteúdo de outra edição durante a troca.
    useEffect(() => {
        const eventoId = eventoSelecionado?.id;
        if (!eventoId || !token) return;

        let ativo = true;
        buscarGaleriaEvento(token, eventoId)
            .then(resultado => {
                if (!ativo) return;
                setGaleria({ eventoId, carregando: false, ...resultado, erro: "" });
            })
            .catch(error => {
                if (!ativo) return;
                setGaleria({
                    eventoId,
                    carregando: false,
                    albuns: [],
                    videos: [],
                    erro: error instanceof Error ? error.message : "Não foi possível consultar a galeria.",
                });
            });

        return () => { ativo = false; };
    }, [eventoSelecionado?.id, token]);

    const eventosVisiveis = useMemo(() => eventos.filter(evento => {
        const situacao = situacaoEvento(evento);
        return (filtro === "todos" || filtro === situacao) && correspondeBusca(evento, busca);
    }), [eventos, filtro, busca]);

    const situacaoSelecionado = eventoSelecionado ? situacaoEvento(eventoSelecionado) : null;
    const encerrado = situacaoSelecionado === "encerrados";

    const galeriaDaEdicao = galeria?.eventoId === eventoSelecionado?.id ? galeria : null;
    const albuns = galeriaDaEdicao?.albuns ?? [];
    const videos = galeriaDaEdicao?.videos ?? [];
    const carregandoGaleria = !!eventoSelecionado && (!galeriaDaEdicao || galeriaDaEdicao.carregando);
    const erroGaleria = galeriaDaEdicao?.erro ?? "";
    const fotoAtual = indiceFoto === null ? null : albumAberto?.fotos[indiceFoto] ?? null;

    function irParaTopo() {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }

    function abrirEvento(evento: EventoApp) {
        setEventoSelecionado(evento);
        // Depois do evento, a Galeria é mais relevante que a agenda passada.
        const status = situacaoEvento(evento);
        setAba(status === "encerrados" ? "galeria" : "programacao");
        setAbaMidia("fotos");
        setAlbumAberto(null);
        setIndiceFoto(null);
        setErroVideo("");
        setGaleria({ eventoId: evento.id, carregando: true, albuns: [], videos: [], erro: "" });
        irParaTopo();
    }

    function voltar() {
        if (indiceFoto !== null) {
            setIndiceFoto(null);
        } else if (albumAberto !== null) {
            setAlbumAberto(null);
        } else {
            setEventoSelecionado(null);
        }
        irParaTopo();
    }

    async function abrirVideo(url: string) {
        if (!/^https:\/\//i.test(url)) {
            setErroVideo("O vídeo ainda não possui um link válido.");
            return;
        }
        try {
            await Linking.openURL(url);
        } catch {
            setErroVideo("Não foi possível abrir o vídeo neste dispositivo.");
        }
    }

    function abrirAlbum(album: AlbumGaleria) {
        setAlbumAberto(album);
        setIndiceFoto(null);
        irParaTopo();
    }

    return (
        <View style={globalStyle.container}>
            <View style={[globalStyle.background, styles.container]}>
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <HeaderScreen />

                    <ScrollView
                        ref={scrollRef}
                        style={styles.scroll}
                        contentContainerStyle={styles.scrollConteudo}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {!eventoSelecionado ? (
                            <>
                                <View style={styles.cabecalhoPagina}>
                                    <View style={styles.cabecalhoTexto}>
                                        <Text style={styles.titulo} accessibilityRole="header">Eventos</Text>
                                        <Text style={styles.subtitulo}>
                                            Confira os eventos da comunidade.
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() => {
                                            if (buscaVisivel) setBusca("");
                                            setBuscaVisivel(!buscaVisivel);
                                        }}
                                        style={styles.acaoBusca}
                                        accessibilityRole="button"
                                        accessibilityLabel={buscaVisivel ? "Fechar busca de eventos" : "Buscar eventos"}
                                    >
                                        <Ionicons
                                            name={buscaVisivel ? "close-outline" : "search-outline"}
                                            size={24}
                                            color={coresTema.destaque}
                                        />
                                    </Pressable>
                                </View>

                                {buscaVisivel && (
                                    <View style={styles.barraBusca}>
                                        <Ionicons name="search-outline" size={20} color={coresTema.textoSecundario} />
                                        <TextInput
                                            value={busca}
                                            onChangeText={setBusca}
                                            placeholder="Buscar eventos"
                                            placeholderTextColor={coresTema.textoSecundario}
                                            accessibilityLabel="Buscar eventos por nome ou local"
                                            style={styles.campoBusca}
                                            returnKeyType="search"
                                        />
                                        {busca.length > 0 && (
                                            <Pressable
                                                onPress={() => setBusca("")}
                                                style={styles.limparBusca}
                                                accessibilityRole="button"
                                                accessibilityLabel="Limpar busca"
                                            >
                                                <Ionicons name="close-circle" size={20} color={coresTema.textoSecundario} />
                                            </Pressable>
                                        )}
                                    </View>
                                )}

                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.filtros}
                                    style={styles.filtrosScroll}
                                    accessibilityLabel="Filtrar eventos por situação"
                                >
                                    {FILTROS.map(item => (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => setFiltro(item.id)}
                                            style={[styles.filtro, filtro === item.id && styles.filtroAtivo]}
                                            accessibilityRole="button"
                                            accessibilityState={{ selected: filtro === item.id }}
                                            accessibilityLabel={`Filtrar: ${item.titulo}`}
                                        >
                                            <Text style={[styles.filtroTexto, filtro === item.id && styles.filtroTextoAtivo]}>
                                                {item.titulo}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>

                                {carregandoSessao || carregandoEventos ? (
                                    <View style={styles.vazio}>
                                        <ActivityIndicator color={coresTema.destaque} size="small" />
                                        <Text style={styles.vazioTexto}>Carregando eventos...</Text>
                                    </View>
                                ) : erroEventos ? (
                                    <View style={styles.vazio}>
                                        <Text style={styles.vazioTitulo}>Não foi possível carregar os eventos</Text>
                                        <Text style={styles.vazioTexto}>{erroEventos}</Text>
                                        <Pressable
                                            style={[styles.botaoPrincipal, { paddingHorizontal: 24, marginTop: 15 }]}
                                            onPress={() => setTentativa(valor => valor + 1)}
                                            accessibilityRole="button"
                                            accessibilityLabel="Tentar carregar eventos novamente"
                                        >
                                            <Text style={styles.botaoPrincipalTexto}>Tentar novamente</Text>
                                        </Pressable>
                                    </View>
                                ) : eventosVisiveis.length === 0 ? (
                                    <View style={styles.vazio}>
                                        <Text style={styles.vazioTitulo}>Nenhum evento encontrado</Text>
                                        <Text style={styles.vazioTexto}>
                                            Selecione outro filtro ou ajuste sua busca.
                                        </Text>
                                    </View>
                                ) : eventosVisiveis.map(evento => {
                                    const data = diaMesEvento(evento.inicio);
                                    const situacao = situacaoEvento(evento);
                                    return (
                                        <Pressable
                                            key={evento.id}
                                            style={({ pressed }) => [styles.cartaoEvento, pressed && styles.cartaoEventoPressed]}
                                            onPress={() => abrirEvento(evento)}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Ver detalhes de ${evento.titulo}`}
                                        >
                                            <View style={styles.dataSelo}>
                                                <Text style={styles.dataDia}>{data.dia}</Text>
                                                <Text style={styles.dataMes}>{data.mes}</Text>
                                            </View>
                                            <View style={styles.cardCorpo}>
                                                <Text style={styles.cardTitulo} numberOfLines={2}>{evento.titulo}</Text>
                                                <View style={styles.cardMetas}>
                                                    <View style={styles.cardMetaLinha}>
                                                        <Ionicons name="time-outline" size={17} color={coresTema.textoSecundario} />
                                                        <Text style={styles.cardMetaTexto}>{horaEvento(evento.inicio)}</Text>
                                                    </View>
                                                    <View style={styles.cardMetaLinha}>
                                                        <Ionicons name="location-outline" size={17} color={coresTema.textoSecundario} />
                                                        <Text style={styles.cardMetaTexto} numberOfLines={1}>{evento.local || "Local a confirmar"}</Text>
                                                    </View>
                                                </View>
                                                {situacao === "andamento" && (
                                                    <Text style={styles.cardAndamento}>Em andamento</Text>
                                                )}
                                            </View>
                                            <Ionicons name="chevron-forward" size={22} color={coresTema.textoSecundario} />
                                        </Pressable>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <Pressable
                                    style={styles.voltar}
                                    onPress={voltar}
                                    accessibilityRole="button"
                                    accessibilityLabel="Voltar à lista de eventos"
                                >
                                    <Ionicons name="arrow-back-outline" size={24} color={coresTema.texto} />
                                    <Text style={styles.voltarTexto}>Detalhes do Evento</Text>
                                </Pressable>

                                {eventoSelecionado.imagem ? (
                                    <ImageBackground
                                        source={eventoSelecionado.imagem}
                                        style={styles.imagemDetalhe}
                                        imageStyle={styles.imagemDetalheBordas}
                                        resizeMode="cover"
                                    >
                                        <View style={styles.selo}>
                                            <Text style={styles.seloTexto}>
                                                {descricaoSituacao(situacaoSelecionado ?? "encerrados")}
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                ) : (
                                    <View style={styles.semImagemDetalhe}>
                                        <Ionicons name="calendar-outline" size={48} color={coresTema.destaque} />
                                        <Text style={styles.semImagemTexto}>Conexão 360°</Text>
                                    </View>
                                )}

                                <Text style={styles.detalheTitulo} accessibilityRole="header">{eventoSelecionado.titulo}</Text>
                                <View style={styles.detalheMetas}>
                                    <View style={styles.detalheMetaLinha}>
                                        <Ionicons name="calendar-outline" size={20} color={coresTema.textoSecundario} />
                                        <Text style={styles.metaBloco}>{dataLegivel(eventoSelecionado.inicio)}</Text>
                                    </View>
                                    <View style={styles.detalheMetaLinha}>
                                        <Ionicons name="time-outline" size={20} color={coresTema.textoSecundario} />
                                        <Text style={styles.metaBloco}>
                                            {horaEvento(eventoSelecionado.inicio)} às {horaEvento(eventoSelecionado.termino)}
                                        </Text>
                                    </View>
                                    <View style={styles.detalheMetaLinha}>
                                        <Ionicons name="location-outline" size={20} color={coresTema.textoSecundario} />
                                        <Text style={styles.metaBloco}>{eventoSelecionado.local || "Local a confirmar"}</Text>
                                    </View>
                                </View>
                                <View style={styles.separadorDetalhe} />
                                <Text style={styles.tituloSecao}>Sobre o evento</Text>
                                <Text style={styles.detalheSubtitulo}>{eventoSelecionado.descricao}</Text>

                                <View style={styles.abas}>
                                    {ABAS.map(item => (
                                        <Pressable
                                            key={item.id}
                                            style={[styles.aba, aba === item.id && styles.abaAtiva]}
                                            onPress={() => {
                                                setAba(item.id);
                                                setAlbumAberto(null);
                                                setIndiceFoto(null);
                                            }}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Abrir ${item.titulo.toLowerCase()} do evento`}
                                            accessibilityState={{ selected: aba === item.id }}
                                        >
                                            <Text style={[styles.abaTexto, aba === item.id && styles.abaTextoAtivo]}>
                                                {item.titulo}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>

                                {aba === "programacao" ? (
                                    <>
                                        <Text style={styles.tituloSecao} accessibilityRole="header">
                                            {encerrado ? "Programação realizada" : "Programação"}
                                        </Text>
                                        {eventoSelecionado.programacao.length === 0 ? (
                                            <View style={styles.vazio}>
                                                <Text style={styles.vazioTitulo}>Programação ainda não integrada</Text>
                                                <Text style={styles.vazioTexto}>A programação deste evento será exibida quando o módulo estiver integrado à API.</Text>
                                            </View>
                                        ) : (
                                            <View style={styles.painel}>
                                                {eventoSelecionado.programacao.map(item => (
                                                    <View style={styles.itemProgramacao} key={item.id}>
                                                        <Text style={styles.horario}>{item.horario}</Text>
                                                        <View style={styles.atividade}>
                                                            <Text style={styles.atividadeTitulo}>{item.titulo}</Text>
                                                            {item.local ? <Text style={styles.atividadeLocal}>{item.local}</Text> : null}
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                        {eventoSelecionado.palestrantes.length > 0 ? (
                                            <>
                                                <Text style={styles.menuSecao} accessibilityRole="header">Palestrantes</Text>
                                                {eventoSelecionado.palestrantes.map(palestrante => (
                                                    <View style={[styles.painel, styles.painelConteudo]} key={palestrante.id}>
                                                        <Text style={styles.painelTitulo}>{palestrante.nome}</Text>
                                                        {palestrante.assunto && (
                                                            <Text style={styles.painelTexto}>{palestrante.assunto}</Text>
                                                        )}
                                                    </View>
                                                ))}
                                            </>
                                        ) : null}
                                    </>
                                ) : aba === "enquetes" ? (
                                    <>
                                        <Text style={styles.tituloSecao} accessibilityRole="header">Enquetes do evento</Text>
                                        {eventoSelecionado.enquetes.length === 0 ? (
                                            <View style={styles.vazio}>
                                                <Text style={styles.vazioTitulo}>Enquetes ainda não integradas</Text>
                                                <Text style={styles.vazioTexto}>
                                                    As enquetes vinculadas a este evento aparecerão após a integração com a API.
                                                </Text>
                                            </View>
                                        ) : eventoSelecionado.enquetes.map(enquete => (
                                            <View key={enquete.id} style={[styles.painel, styles.painelConteudo]}>
                                                <Text style={styles.painelTitulo}>{enquete.pergunta}</Text>
                                                <Text style={styles.painelTexto}>
                                                    {enquete.encerrada || encerrado
                                                        ? "Enquete encerrada. Os resultados só aparecerão quando forem divulgados pela organização."
                                                        : "Enquete disponível. A votação será ativada após integração com o endpoint de respostas."}
                                                </Text>
                                            </View>
                                        ))}
                                        {encerrado && (
                                            <View style={styles.aviso}>
                                                <Text style={styles.avisoTitulo}>Esta edição foi encerrada</Text>
                                                <Text style={styles.avisoTexto}>A votação dependerá das regras de encerramento definidas na API de enquetes.</Text>
                                            </View>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.tituloSecao} accessibilityRole="header">Memórias do evento</Text>
                                        <Text style={styles.detalheSubtitulo}>
                                            Fotos oficiais, gravações das palestras e melhores momentos desta edição.
                                        </Text>
                                        <View style={styles.abas}>
                                            {(["fotos", "videos"] as const).map(item => (
                                                <Pressable
                                                    key={item}
                                                    style={[styles.aba, abaMidia === item && styles.abaAtiva]}
                                                    onPress={() => {
                                                        setAbaMidia(item);
                                                        setAlbumAberto(null);
                                                        setIndiceFoto(null);
                                                    }}
                                                    accessibilityRole="button"
                                                    accessibilityLabel={item === "fotos" ? "Ver fotos oficiais" : "Ver gravações das palestras"}
                                                    accessibilityState={{ selected: abaMidia === item }}
                                                >
                                                    <Text style={[styles.abaTexto, abaMidia === item && styles.abaTextoAtivo]}>
                                                        {item === "fotos" ? "Fotos" : "Vídeos"}
                                                    </Text>
                                                </Pressable>
                                            ))}
                                        </View>

                                        {carregandoGaleria ? (
                                            <View style={styles.vazio}>
                                                <ActivityIndicator size="small" color={coresTema.destaque} />
                                                <Text style={styles.vazioTexto}>Carregando galeria do evento...</Text>
                                            </View>
                                        ) : erroGaleria ? (
                                            <View style={styles.vazio}>
                                                <Text style={styles.vazioTitulo}>Galeria indisponível</Text>
                                                <Text style={styles.vazioTexto}>{erroGaleria}</Text>
                                            </View>
                                        ) : abaMidia === "fotos" ? (
                                            albumAberto ? (
                                                <>
                                                    <Pressable
                                                        onPress={() => setAlbumAberto(null)}
                                                        style={styles.linhaVoltar}
                                                        accessibilityRole="button"
                                                        accessibilityLabel="Voltar para os álbuns"
                                                    >
                                                        <Text style={styles.voltarTexto}>‹  Voltar aos álbuns</Text>
                                                    </Pressable>
                                                    <Text style={styles.menuSecao}>{albumAberto.titulo}</Text>
                                                    <View style={styles.grade}>
                                                        {albumAberto.fotos.map((foto, indice) => (
                                                            <Pressable
                                                                key={foto.id}
                                                                style={styles.cardFoto}
                                                                onPress={() => setIndiceFoto(indice)}
                                                                accessibilityRole="button"
                                                                accessibilityLabel={`Ampliar ${foto.titulo}, ${indice + 1} de ${albumAberto.fotos.length}`}
                                                            >
                                                                <Image source={foto.source} style={styles.imagemFoto} resizeMode="cover" />
                                                                <Text numberOfLines={2} style={styles.descricaoFoto}>{foto.titulo}</Text>
                                                            </Pressable>
                                                        ))}
                                                    </View>
                                                </>
                                            ) : albuns.length === 0 ? (
                                                <View style={styles.vazio}>
                                                    <Text style={styles.vazioTitulo}>Fotos em breve</Text>
                                                    <Text style={styles.vazioTexto}>Os álbuns oficiais deste evento aparecerão após a integração da Galeria.</Text>
                                                </View>
                                            ) : (
                                                <View style={styles.listaAlbuns}>
                                                    {albuns.map(album => (
                                                        <Pressable
                                                            key={album.id}
                                                            onPress={() => abrirAlbum(album)}
                                                            style={styles.album}
                                                            accessibilityRole="button"
                                                            accessibilityLabel={`Abrir álbum ${album.titulo}, ${album.fotos.length} fotos`}
                                                        >
                                                            {album.fotos[0] ? (
                                                                <Image source={album.fotos[0].source} style={styles.albumCapa} resizeMode="cover" />
                                                            ) : (
                                                                <View style={styles.albumCapa}><Text style={styles.meta}>Sem capa</Text></View>
                                                            )}
                                                            <View style={styles.albumInfo}>
                                                                <Text style={styles.albumTitulo}>{album.titulo}</Text>
                                                                <Text style={styles.albumDescricao}>{album.descricao}</Text>
                                                            </View>
                                                        </Pressable>
                                                    ))}
                                                </View>
                                            )
                                        ) : videos.length === 0 ? (
                                            <View style={styles.vazio}>
                                                <Text style={styles.vazioTitulo}>Vídeos em breve</Text>
                                                <Text style={styles.vazioTexto}>Os vídeos vinculados a este evento aparecerão após a integração com Conteúdos.</Text>
                                            </View>
                                        ) : (
                                            <>
                                                {videos.map(video => (
                                                    <Pressable
                                                        key={video.id}
                                                        onPress={() => void abrirVideo(video.url)}
                                                        style={styles.videoRow}
                                                        accessibilityRole="button"
                                                        accessibilityLabel={`Assistir vídeo ${video.titulo}`}
                                                    >
                                                        <View style={styles.videoCapa}>
                                                            {video.imagem ? (
                                                                <Image source={video.imagem} resizeMode="cover" style={{ width: "100%", height: "100%" }} />
                                                            ) : <Text style={styles.play}>▶</Text>}
                                                        </View>
                                                        <View style={styles.videoInfo}>
                                                            <Text style={styles.videoTitulo} numberOfLines={2}>{video.titulo}</Text>
                                                            <Text style={styles.videoDescricao} numberOfLines={2}>
                                                                {video.palestrante ?? video.descricao ?? "Conteúdo oficial"}
                                                            </Text>
                                                        </View>
                                                    </Pressable>
                                                ))}
                                                {erroVideo ? <Text style={styles.avisoTexto}>{erroVideo}</Text> : null}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </ScrollView>

                    <MenuScreen />
                </SafeAreaView>
            </View>

            <Modal
                visible={fotoAtual !== null}
                transparent={false}
                animationType="fade"
                onRequestClose={() => setIndiceFoto(null)}
                statusBarTranslucent
            >
                <SafeAreaView style={styles.visualizador}>
                    <View style={styles.visualizadorTopo}>
                        <Text style={styles.visualizadorNumero}>
                            {indiceFoto === null ? "Galeria" : `${indiceFoto + 1} de ${albumAberto?.fotos.length ?? 0}`}
                        </Text>
                        <Pressable
                            onPress={() => setIndiceFoto(null)}
                            style={styles.fechar}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar fotografia"
                        >
                            <Text style={styles.fecharTexto}>×</Text>
                        </Pressable>
                    </View>
                    {fotoAtual && (
                        <Image
                            source={fotoAtual.source}
                            resizeMode="contain"
                            style={styles.fotoVisualizador}
                            accessibilityLabel={fotoAtual.descricao ?? fotoAtual.titulo}
                        />
                    )}
                    <Text style={styles.legenda}>{fotoAtual?.titulo ?? ""}</Text>
                    <View style={styles.controlesFoto}>
                        <Pressable
                            onPress={() => setIndiceFoto(indice => indice === null ? null : Math.max(0, indice - 1))}
                            disabled={indiceFoto === null || indiceFoto === 0}
                            style={[styles.controlarFoto, (indiceFoto === null || indiceFoto === 0) && styles.controlarFotoInativo]}
                            accessibilityRole="button"
                            accessibilityLabel="Fotografia anterior"
                        >
                            <Text style={styles.controlarFotoTexto}>‹  Anterior</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setIndiceFoto(indice => indice === null ? null : Math.min((albumAberto?.fotos.length ?? 1) - 1, indice + 1))}
                            disabled={indiceFoto === null || indiceFoto >= (albumAberto?.fotos.length ?? 0) - 1}
                            style={[styles.controlarFoto, (indiceFoto === null || indiceFoto >= (albumAberto?.fotos.length ?? 0) - 1) && styles.controlarFotoInativo]}
                            accessibilityRole="button"
                            accessibilityLabel="Próxima fotografia"
                        >
                            <Text style={styles.controlarFotoTexto}>Próxima  ›</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}
