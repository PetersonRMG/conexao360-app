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

import HeaderScreen from "@/app/header";
import MenuScreen from "@/app/menu";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import globalStyle from "@/styles/globalStyles";
import { criarEventosStyles } from "@/styles/evetosStyles";
import type { EventoApp } from "@/data/eventoDados";
import { buscarEventos } from "@/services/eventosService";
import {
    ALBUNS_GALERIA,
    VIDEOS_GALERIA,
    DADOS_GALERIA_SAO_DEMONSTRATIVOS,
    type AlbumGaleria,
} from "@/data/galeriaDados";

type FiltroEventos = "todos" | "andamento" | "proximos" | "encerrados";
type AbaEvento = "programacao" | "enquetes" | "galeria";
type AbaMidia = "fotos" | "videos";
type SituacaoEvento = "andamento" | "proximos" | "encerrados";

const FILTROS: { id: FiltroEventos; titulo: string }[] = [
    { id: "todos", titulo: "Todos" },
    { id: "andamento", titulo: "Em andamento" },
    { id: "proximos", titulo: "Próximos" },
    { id: "encerrados", titulo: "Encerrados" },
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
    const [filtro, setFiltro] = useState<FiltroEventos>("todos");
    const [eventoSelecionado, setEventoSelecionado] = useState<EventoApp | null>(null);
    const [aba, setAba] = useState<AbaEvento>("programacao");
    const [abaMidia, setAbaMidia] = useState<AbaMidia>("fotos");
    const [albumAberto, setAlbumAberto] = useState<AlbumGaleria | null>(null);
    const [indiceFoto, setIndiceFoto] = useState<number | null>(null);
    const [erroVideo, setErroVideo] = useState("");

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

    const eventosVisiveis = useMemo(() => eventos.filter(evento => {
        const situacao = situacaoEvento(evento);
        return (filtro === "todos" || filtro === situacao) && correspondeBusca(evento, busca);
    }), [eventos, filtro, busca]);

    const situacaoSelecionado = eventoSelecionado ? situacaoEvento(eventoSelecionado) : null;
    const encerrado = situacaoSelecionado === "encerrados";

    const albuns = useMemo(() => eventoSelecionado
        ? ALBUNS_GALERIA.filter(item => item.eventoId === eventoSelecionado.id)
        : [], [eventoSelecionado]);
    const videos = useMemo(() => eventoSelecionado
        ? VIDEOS_GALERIA.filter(item => item.eventoId === eventoSelecionado.id)
        : [], [eventoSelecionado]);
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
                                <Text style={styles.titulo} accessibilityRole="header">Eventos</Text>
                                <Text style={styles.subtitulo}>
                                    Palestras, enquetes e registros de cada edição em um só lugar.
                                </Text>

                                <View style={styles.barraBusca}>
                                    <Text style={styles.iconeBusca} accessible={false}>⌕</Text>
                                    <TextInput
                                        value={busca}
                                        onChangeText={setBusca}
                                        placeholder="Buscar eventos"
                                        placeholderTextColor={coresTema.textoSecundario}
                                        accessibilityLabel="Buscar eventos por nome ou local"
                                        style={styles.campoBusca}
                                        returnKeyType="search"
                                    />
                                    {busca.length > 0 ? (
                                        <Pressable
                                            onPress={() => setBusca("")}
                                            style={styles.limparBusca}
                                            accessibilityRole="button"
                                            accessibilityLabel="Limpar busca"
                                        >
                                            <Text style={styles.limparTexto}>×</Text>
                                        </Pressable>
                                    ) : null}
                                </View>

                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.filtros}
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

                                <Text style={styles.tituloSecao} accessibilityRole="header">
                                    {filtro === "todos" ? "Edições do evento" : FILTROS.find(item => item.id === filtro)?.titulo}
                                </Text>
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
                                            Ajuste sua busca ou selecione outra categoria.
                                        </Text>
                                    </View>
                                ) : eventosVisiveis.map(evento => {
                                    const situacao = situacaoEvento(evento);
                                    return (
                                        <Pressable
                                            key={evento.id}
                                            style={({ pressed }) => [styles.cartaoEvento, pressed && { opacity: 0.93 }]}
                                            onPress={() => abrirEvento(evento)}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Ver detalhes de ${evento.titulo}`}
                                        >
                                            {evento.imagem ? (
                                                <ImageBackground
                                                    source={evento.imagem}
                                                    style={styles.imagemEvento}
                                                    resizeMode="cover"
                                                    imageStyle={{ opacity: 0.94 }}
                                                >
                                                    <View style={styles.imagemSombra} pointerEvents="none" />
                                                    <View style={styles.selo}>
                                                        <Text style={styles.seloTexto}>{descricaoSituacao(situacao)}</Text>
                                                    </View>
                                                    <Text style={styles.capaTexto}>{evento.titulo}</Text>
                                                </ImageBackground>
                                            ) : (
                                                <View style={styles.semImagem}>
                                                    <Text style={styles.semImagemTexto}>Imagem do evento</Text>
                                                </View>
                                            )}
                                            <View style={styles.cartaoInfo}>
                                                <Text numberOfLines={3} style={styles.resumo}>{evento.descricao}</Text>
                                                <View style={styles.linhaMeta}>
                                                    <Text style={styles.ponto} accessible={false}>•</Text>
                                                    <Text style={styles.meta}>{dataLegivel(evento.inicio)}</Text>
                                                </View>
                                                <View style={styles.linhaMeta}>
                                                    <Text style={styles.ponto} accessible={false}>•</Text>
                                                    <Text style={styles.meta}>{evento.local}</Text>
                                                </View>
                                                <View style={styles.botaoPrincipal}>
                                                    <Text style={styles.botaoPrincipalTexto}>
                                                        {situacao === "encerrados" ? "Reviver edição" : "Ver detalhes"}
                                                    </Text>
                                                </View>
                                            </View>
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
                                    <Text style={styles.voltarTexto}>‹  Todos os eventos</Text>
                                </Pressable>

                                <Text style={styles.detalheTitulo} accessibilityRole="header">{eventoSelecionado.titulo}</Text>
                                <Text style={styles.detalheSubtitulo}>{eventoSelecionado.descricao}</Text>
                                <View style={styles.miniMeta}>
                                    <Text style={styles.metaBloco}>{dataLegivel(eventoSelecionado.inicio)}</Text>
                                    <Text style={styles.metaBloco}>{eventoSelecionado.local}</Text>
                                </View>

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

                                        {abaMidia === "fotos" ? (
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
                                                    {DADOS_GALERIA_SAO_DEMONSTRATIVOS && (
                                                        <Text style={styles.marcaDemo}>Fotografia de demonstração, não é cobertura oficial.</Text>
                                                    )}
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
