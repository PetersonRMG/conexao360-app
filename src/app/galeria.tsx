import React, { useMemo, useState } from "react";
import {
    Alert,
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
import globalStyle from "@/styles/globalStyles";
import { criarGaleriaStyles } from "@/styles/galeriaStyles";
import {
    ALBUNS_GALERIA,
    DADOS_GALERIA_SAO_DEMONSTRATIVOS,
    VIDEOS_GALERIA,
    type AlbumGaleria,
    type FotoGaleria,
    type VideoGaleria,
} from "@/data/galeriaDados";

type Aba = "fotos" | "videos";
type Categoria = {
    id: string;
    titulo: string;
    simbolo: string;
    termos: string[];
};

const CATEGORIAS: Categoria[] = [
    { id: "abertura", titulo: "Abertura", simbolo: "✦", termos: ["abertura", "recepção"] },
    { id: "palestras", titulo: "Palestras", simbolo: "▣", termos: ["palestra", "apresentação"] },
    { id: "networking", titulo: "Networking", simbolo: "◎", termos: ["networking", "conexões"] },
    { id: "momentos", titulo: "Momentos especiais", simbolo: "◇", termos: ["momento", "bastidor", "encerramento"] },
];

function normalizar(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function albunsDaCategoria(categoria: Categoria) {
    return ALBUNS_GALERIA.filter(album => {
        const texto = normalizar(`${album.categoria} ${album.titulo} ${album.descricao}`);
        return categoria.termos.some(termo => texto.includes(normalizar(termo)));
    });
}

export default function GaleriaScreen() {
    const { coresTema } = useTema();
    const styles = criarGaleriaStyles(coresTema);

    const [aba, setAba] = useState<Aba>("fotos");
    const [busca, setBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);
    const [albumSelecionado, setAlbumSelecionado] = useState<AlbumGaleria | null>(null);
    const [indiceFoto, setIndiceFoto] = useState<number | null>(null);

    const albumDestaque = ALBUNS_GALERIA.find(album => album.destaque) ?? ALBUNS_GALERIA[0] ?? null;
    const capaDestaque = albumDestaque?.fotos[0]?.source;
    const buscaNormalizada = normalizar(busca.trim());

    const categoriasVisiveis = useMemo(() =>
        CATEGORIAS.filter(categoria => normalizar(categoria.titulo).includes(buscaNormalizada)),
        [buscaNormalizada]);

    const albunsEncontrados = useMemo(() => {
        if (!buscaNormalizada) return [];
        return ALBUNS_GALERIA.filter(album =>
            normalizar(`${album.titulo} ${album.categoria} ${album.descricao}`).includes(buscaNormalizada)
        );
    }, [buscaNormalizada]);

    const videosVisiveis = useMemo(() => VIDEOS_GALERIA.filter(video =>
        normalizar(`${video.titulo} ${video.palestrante ?? ""} ${video.descricao ?? ""}`).includes(buscaNormalizada)
    ), [buscaNormalizada]);

    const fotosDoDetalhe = useMemo<FotoGaleria[]>(() => {
        if (albumSelecionado) return albumSelecionado.fotos;
        if (categoriaSelecionada) return albunsDaCategoria(categoriaSelecionada).flatMap(album => album.fotos);
        return [];
    }, [albumSelecionado, categoriaSelecionada]);

    const detalheAberto = !!albumSelecionado || !!categoriaSelecionada;
    const fotoAtual = indiceFoto === null ? null : fotosDoDetalhe[indiceFoto] ?? null;

    function fecharDetalhe() {
        setIndiceFoto(null);
        setAlbumSelecionado(null);
        setCategoriaSelecionada(null);
    }

    function selecionarAba(proxima: Aba) {
        setAba(proxima);
        setBusca("");
        fecharDetalhe();
    }

    function navegarFoto(passo: -1 | 1) {
        setIndiceFoto(indice => indice === null
            ? null
            : Math.max(0, Math.min(fotosDoDetalhe.length - 1, indice + passo))
        );
    }

    async function abrirVideo(video: VideoGaleria) {
        if (!/^https:\/\//i.test(video.url)) {
            Alert.alert("Vídeo indisponível", "O link da gravação ainda não foi publicado.");
            return;
        }
        try {
            await Linking.openURL(video.url);
        } catch {
            Alert.alert("Não foi possível abrir", "Tente novamente mais tarde.");
        }
    }

    const tituloDetalhe = albumSelecionado?.titulo ?? categoriaSelecionada?.titulo ?? "";

    return (
        <View style={globalStyle.container}>
            <View style={[globalStyle.background, styles.container]}>
                <SafeAreaView style={[globalStyle.areaConteudo, styles.area]}>
                    <HeaderScreen />

                    <ScrollView
                        style={styles.scroll}
                        contentContainerStyle={styles.conteudo}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {detalheAberto ? (
                            <>
                                <Pressable
                                    onPress={fecharDetalhe}
                                    style={styles.voltar}
                                    accessibilityRole="button"
                                    accessibilityLabel="Voltar para a Galeria"
                                >
                                    <Text style={styles.voltarTexto}>‹  Galeria</Text>
                                </Pressable>

                                <Text style={styles.tituloDetalhe}>{tituloDetalhe}</Text>
                                <Text style={styles.textoDetalhe}>
                                    {fotosDoDetalhe.length > 0
                                        ? `${fotosDoDetalhe.length} ${fotosDoDetalhe.length === 1 ? "fotografia" : "fotografias"}`
                                        : "Registros oficiais desta categoria"}
                                </Text>

                                {fotosDoDetalhe.length > 0 ? (
                                    <View style={styles.grade}>
                                        {fotosDoDetalhe.map((foto, indice) => (
                                            <Pressable
                                                key={`${foto.id}-${indice}`}
                                                style={styles.fotoItem}
                                                onPress={() => setIndiceFoto(indice)}
                                                accessibilityRole="button"
                                                accessibilityLabel={`Ampliar ${foto.titulo}, ${indice + 1} de ${fotosDoDetalhe.length}`}
                                            >
                                                <Image source={foto.source} style={styles.fotoThumb} resizeMode="cover" />
                                                <Text numberOfLines={2} style={styles.fotoTitulo}>{foto.titulo}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                ) : (
                                    <View style={styles.vazioDetalhe}>
                                        <View style={styles.vazioIconeCircular}>
                                            <Text style={styles.vazioIcone}>▣</Text>
                                        </View>
                                        <Text style={styles.vazioTitulo}>Novas fotos em breve</Text>
                                        <Text style={styles.vazioDescricao}>
                                            A organização ainda não disponibilizou fotografias nesta categoria.
                                        </Text>
                                        <Pressable style={styles.voltarVazio} onPress={fecharDetalhe} accessibilityRole="button">
                                            <Text style={styles.voltarVazioTexto}>Explorar outras categorias</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </>
                        ) : (
                            <>
                                <View style={styles.introducao}>
                                    <View style={styles.rotuloLinha}>
                                        <View style={styles.pontoDourado} />
                                        <Text style={styles.rotulo}>CONEXÃO 360°  /  3ª EDIÇÃO</Text>
                                    </View>
                                    <Text style={styles.titulo}>Galeria<Text style={styles.tituloPonto}>.</Text></Text>
                                    <Text style={styles.subtitulo}>Momentos, histórias e palestras para reviver.</Text>
                                </View>

                                {/* Uma capa real de demonstração já existente no projeto. Sem fotos fictícias. */}
                                <Pressable
                                    style={styles.capa}
                                    onPress={() => albumDestaque && setAlbumSelecionado(albumDestaque)}
                                    disabled={!albumDestaque}
                                    accessibilityRole="button"
                                    accessibilityLabel={albumDestaque ? `Explorar álbum ${albumDestaque.titulo}` : "Álbum ainda indisponível"}
                                >
                                    {capaDestaque ? (
                                        <ImageBackground source={capaDestaque} resizeMode="cover" style={styles.capaImagem}>
                                            <View style={styles.capaSombra} />
                                            <View style={styles.capaTopo}>
                                                <View style={styles.seloCapa}>
                                                    <Text style={styles.seloCapaTexto}>
                                                        {DADOS_GALERIA_SAO_DEMONSTRATIVOS ? "PRÉVIA DO LAYOUT" : "EM DESTAQUE"}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.capaRodape}>
                                                <Text style={styles.capaLinha}>O EVENTO EM IMAGENS</Text>
                                                <Text style={styles.capaTitulo} numberOfLines={2}>
                                                    {DADOS_GALERIA_SAO_DEMONSTRATIVOS ? "Momentos que conectam" : albumDestaque?.titulo}
                                                </Text>
                                                <View style={styles.capaAcao}>
                                                    <Text style={styles.capaAcaoTexto}>Explorar álbum</Text>
                                                    <Text style={styles.capaAcaoSeta}>↗</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    ) : (
                                        <View style={styles.capaSemFoto}>
                                            <Text style={styles.capaSemFotoSimbolo}>✦</Text>
                                            <Text style={styles.capaSemFotoTitulo}>Seus melhores momentos, aqui.</Text>
                                            <Text style={styles.capaSemFotoTexto}>A cobertura oficial estará disponível em breve.</Text>
                                        </View>
                                    )}
                                </Pressable>

                                {/* Abas simples. Nenhuma das duas duplica o feed da Home. */}
                                <View style={styles.abas} accessibilityRole="tablist">
                                    <Pressable
                                        style={[styles.aba, aba === "fotos" && styles.abaAtiva]}
                                        onPress={() => selecionarAba("fotos")}
                                        accessibilityRole="tab"
                                        accessibilityLabel="Ver fotografias do evento"
                                        accessibilityState={{ selected: aba === "fotos" }}
                                    >
                                        <Text style={[styles.abaTexto, aba === "fotos" && styles.abaTextoAtiva]}>Fotos</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.aba, aba === "videos" && styles.abaAtiva]}
                                        onPress={() => selecionarAba("videos")}
                                        accessibilityRole="tab"
                                        accessibilityLabel="Ver vídeos das palestras"
                                        accessibilityState={{ selected: aba === "videos" }}
                                    >
                                        <Text style={[styles.abaTexto, aba === "videos" && styles.abaTextoAtiva]}>Vídeos</Text>
                                    </Pressable>
                                </View>

                                <View style={styles.buscaBarra}>
                                    <Text style={styles.buscaIcone} accessible={false}>⌕</Text>
                                    <TextInput
                                        value={busca}
                                        onChangeText={setBusca}
                                        style={styles.buscaInput}
                                        placeholder={aba === "fotos" ? "Buscar momentos" : "Buscar palestras e vídeos"}
                                        placeholderTextColor="#999794"
                                        returnKeyType="search"
                                        accessibilityLabel={aba === "fotos" ? "Buscar categorias e álbuns" : "Buscar vídeos e palestras"}
                                    />
                                    {busca.length > 0 && (
                                        <Pressable
                                            onPress={() => setBusca("")}
                                            style={styles.limparBusca}
                                            accessibilityRole="button"
                                            accessibilityLabel="Limpar busca"
                                        >
                                            <Text style={styles.limparBuscaTexto}>×</Text>
                                        </Pressable>
                                    )}
                                </View>

                                {aba === "fotos" ? (
                                    <>
                                        <View style={styles.cabecalhoSecao}>
                                            <View>
                                                <Text style={styles.tituloSecao}>Explore os momentos</Text>
                                                <Text style={styles.subtituloSecao}>Cobertura e registros da edição</Text>
                                            </View>
                                            <Text style={styles.contadorSecao}>04</Text>
                                        </View>
                                        {categoriasVisiveis.length > 0 && (
                                            <View style={styles.grade}>
                                                {categoriasVisiveis.map((categoria, indice) => {
                                                    const albuns = albunsDaCategoria(categoria);
                                                    const numeroFotos = albuns.reduce((total, album) => total + album.fotos.length, 0);
                                                    return (
                                                        <Pressable
                                                            key={categoria.id}
                                                            onPress={() => setCategoriaSelecionada(categoria)}
                                                            style={[styles.cardCategoria, indice % 2 === 1 && styles.cardCategoriaAlternado]}
                                                            accessibilityRole="button"
                                                            accessibilityLabel={`Abrir ${categoria.titulo}. ${numeroFotos > 0 ? `${numeroFotos} fotografias` : "Fotos em breve"}`}
                                                        >
                                                            <View style={styles.cardDecoracao} />
                                                            <View style={styles.cardTopo}>
                                                                <View style={styles.cardIconeArea}>
                                                                    <Text style={styles.cardIcone}>{categoria.simbolo}</Text>
                                                                </View>
                                                                <Text style={styles.cardSeta}>↗</Text>
                                                            </View>
                                                            <View style={styles.cardRodape}>
                                                                <Text style={styles.cardTitulo} numberOfLines={2}>{categoria.titulo}</Text>
                                                                <Text style={styles.cardLegenda}>
                                                                    {numeroFotos ? `${numeroFotos} ${numeroFotos === 1 ? "foto" : "fotos"}` : "Em breve"}
                                                                </Text>
                                                            </View>
                                                        </Pressable>
                                                    );
                                                })}
                                            </View>
                                        )}

                                        {albunsEncontrados.length > 0 && (
                                            <View style={styles.resultadosBusca}>
                                                <Text style={styles.tituloSecao}>Álbuns encontrados</Text>
                                                {albunsEncontrados.map(album => (
                                                    <Pressable
                                                        key={album.id}
                                                        onPress={() => setAlbumSelecionado(album)}
                                                        style={styles.linhaAlbum}
                                                        accessibilityRole="button"
                                                        accessibilityLabel={`Abrir álbum ${album.titulo}`}
                                                    >
                                                        {album.fotos[0] && (
                                                            <Image source={album.fotos[0].source} style={styles.linhaAlbumImagem} />
                                                        )}
                                                        <Text style={styles.linhaAlbumTitulo} numberOfLines={2}>{album.titulo}</Text>
                                                        <Text style={styles.cardSeta}>↗</Text>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        )}
                                        {buscaNormalizada && categoriasVisiveis.length === 0 && albunsEncontrados.length === 0 && (
                                            <View style={styles.buscaVazia}>
                                                <Text style={styles.buscaVaziaTitulo}>Nenhum resultado</Text>
                                                <Text style={styles.buscaVaziaTexto}>Tente outra palavra ou limpe a busca.</Text>
                                            </View>
                                        )}
                                        {!buscaNormalizada && (
                                            <Text style={styles.notaRodape}>
                                                Os registros oficiais serão adicionados pela organização dos eventos.
                                            </Text>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.cabecalhoSecao}>
                                            <View>
                                                <Text style={styles.tituloSecao}>Vídeos e palestras</Text>
                                                <Text style={styles.subtituloSecao}>Gravações e conteúdos oficiais</Text>
                                            </View>
                                        </View>
                                        {videosVisiveis.length > 0 ? (
                                            <View style={styles.videosLista}>
                                                {videosVisiveis.map(video => (
                                                    <Pressable
                                                        key={video.id}
                                                        style={styles.videoCard}
                                                        onPress={() => void abrirVideo(video)}
                                                        accessibilityRole="button"
                                                        accessibilityLabel={`Assistir ${video.titulo}${video.palestrante ? `, ${video.palestrante}` : ""}`}
                                                    >
                                                        <View style={styles.videoImagemContainer}>
                                                            {video.imagem ? (
                                                                <Image style={styles.videoImagem} source={video.imagem} resizeMode="cover" />
                                                            ) : (
                                                                <Text style={styles.videoPlay}>▶</Text>
                                                            )}
                                                        </View>
                                                        <View style={styles.videoInfo}>
                                                            <Text style={styles.videoTitulo} numberOfLines={2}>{video.titulo}</Text>
                                                            <Text style={styles.videoDescricao} numberOfLines={2}>
                                                                {video.palestrante ?? video.descricao ?? "Gravação oficial"}
                                                            </Text>
                                                        </View>
                                                        <Text style={styles.cardSeta}>↗</Text>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        ) : (
                                            <View style={styles.videosVazio}>
                                                <View style={styles.videosVazioIconeArea}>
                                                    <Text style={styles.videosVazioIcone}>▶</Text>
                                                </View>
                                                <Text style={styles.videosVazioTitulo}>
                                                    {buscaNormalizada ? "Nenhum vídeo encontrado" : "Palestras para rever"}
                                                </Text>
                                                <Text style={styles.videosVazioTexto}>
                                                    {buscaNormalizada
                                                        ? "Tente outra palavra na busca."
                                                        : "As gravações vão aparecer aqui quando forem publicadas pela organização."}
                                                </Text>
                                            </View>
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
                animationType="fade"
                transparent={false}
                statusBarTranslucent
                onRequestClose={() => setIndiceFoto(null)}
            >
                <SafeAreaView style={styles.visualizador}>
                    <View style={styles.visualizadorTopo}>
                        <Text style={styles.visualizadorContador}>
                            {indiceFoto === null ? "Galeria" : `${indiceFoto + 1} / ${fotosDoDetalhe.length}`}
                        </Text>
                        <Pressable
                            style={styles.visualizadorFechar}
                            onPress={() => setIndiceFoto(null)}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar fotografia"
                        >
                            <Text style={styles.visualizadorFecharTexto}>×</Text>
                        </Pressable>
                    </View>
                    <View style={styles.visualizadorImagemArea}>
                        {fotoAtual && (
                            <Image
                                source={fotoAtual.source}
                                style={styles.visualizadorImagem}
                                resizeMode="contain"
                                accessible
                                accessibilityLabel={fotoAtual.descricao ?? fotoAtual.titulo}
                            />
                        )}
                    </View>
                    <View style={styles.visualizadorRodape}>
                        <Text style={styles.visualizadorTitulo}>{fotoAtual?.titulo ?? ""}</Text>
                        <View style={styles.visualizadorNavegacao}>
                            <Pressable
                                onPress={() => navegarFoto(-1)}
                                disabled={indiceFoto === null || indiceFoto <= 0}
                                accessibilityRole="button"
                                accessibilityLabel="Fotografia anterior"
                                accessibilityState={{ disabled: indiceFoto === null || indiceFoto <= 0 }}
                                style={[styles.visualizadorBotao, (indiceFoto === null || indiceFoto <= 0) && styles.visualizadorBotaoInativo]}
                            >
                                <Text style={styles.visualizadorBotaoTexto}>‹  Anterior</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navegarFoto(1)}
                                disabled={indiceFoto === null || indiceFoto >= fotosDoDetalhe.length - 1}
                                accessibilityRole="button"
                                accessibilityLabel="Próxima fotografia"
                                accessibilityState={{ disabled: indiceFoto === null || indiceFoto >= fotosDoDetalhe.length - 1 }}
                                style={[styles.visualizadorBotao, (indiceFoto === null || indiceFoto >= fotosDoDetalhe.length - 1) && styles.visualizadorBotaoInativo]}
                            >
                                <Text style={styles.visualizadorBotaoTexto}>Próxima  ›</Text>
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}
