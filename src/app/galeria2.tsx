import { useMemo, useState } from "react";

import {
    Alert,
    FlatList,
    Image,
    ImageSourcePropType,
    Modal,
    Pressable,
    Share,
    Text,
    View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderScreen from "./header";
import MenuScreen from "./menu";

import { useTema } from "@/contexts/TemaContext";
import globalStyle from "@/styles/globalStyles";
import { criarGaleria2Styles } from "@/styles/galeria2Styles";


type FiltroGaleria =
    | "Todas as Fotos"
    | "Mais Curtidas"
    | "Minhas Fotos";


type VisualizacaoMinhas =
    | "Publicadas"
    | "Arquivadas";


type MotivoDenuncia =
    | "Conteúdo impróprio"
    | "Spam"
    | "Assédio ou ofensa"
    | "Outro";


interface FotoGaleria {
    id: string;
    source: ImageSourcePropType;
    autor: string;
    detalhe: string;
    curtidas: number;
    minha: boolean;
    curtidaPorMim: boolean;
    salva: boolean;
    arquivada: boolean;
    denunciada: boolean;
}


const FILTROS: FiltroGaleria[] = [
    "Todas as Fotos",
    "Mais Curtidas",
    "Minhas Fotos",
];


const MOTIVOS_DENUNCIA: MotivoDenuncia[] = [
    "Conteúdo impróprio",
    "Spam",
    "Assédio ou ofensa",
    "Outro",
];


const FOTOS_INICIAIS: FotoGaleria[] = [
    {
        id: "1",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Juliana Oliveira",
        detalhe: "2 fotos",
        curtidas: 214,
        minha: false,
        curtidaPorMim: false,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "2",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Juliana Oliveira",
        detalhe: "2 fotos",
        curtidas: 198,
        minha: false,
        curtidaPorMim: true,
        salva: true,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "3",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Fernanda Silva",
        detalhe: "1 foto",
        curtidas: 176,
        minha: true,
        curtidaPorMim: false,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "4",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Carlos Mendes",
        detalhe: "3 fotos",
        curtidas: 161,
        minha: false,
        curtidaPorMim: false,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "5",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Fernanda Silva",
        detalhe: "1 foto",
        curtidas: 149,
        minha: true,
        curtidaPorMim: true,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "6",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Juliana Oliveira",
        detalhe: "2 fotos",
        curtidas: 137,
        minha: false,
        curtidaPorMim: false,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "7",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Simone Baptista",
        detalhe: "1 foto",
        curtidas: 121,
        minha: false,
        curtidaPorMim: false,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
    {
        id: "8",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Fernanda Silva",
        detalhe: "1 foto",
        curtidas: 104,
        minha: true,
        curtidaPorMim: false,
        salva: false,
        arquivada: false,
        denunciada: false,
    },
];


const formatarNumero = (valor: number) => {
    if (valor < 1000) {
        return String(valor);
    }

    return `${(valor / 1000).toFixed(1)}k`
        .replace(".0k", "k");
};


export default function Galeria2Screen() {
    const { coresTema } = useTema();
    const galeria2Styles = criarGaleria2Styles(coresTema);

    const [filtro, setFiltro] =
        useState<FiltroGaleria>("Todas as Fotos");

    const [visualizacaoMinhas, setVisualizacaoMinhas] =
        useState<VisualizacaoMinhas>("Publicadas");

    const [fotos, setFotos] =
        useState<FotoGaleria[]>(FOTOS_INICIAIS);

    const [fotoSelecionadaId, setFotoSelecionadaId] =
        useState<string | null>(null);

    const [fotoMenuId, setFotoMenuId] =
        useState<string | null>(null);

    const [fotoExcluirId, setFotoExcluirId] =
        useState<string | null>(null);

    const [fotoDenunciarId, setFotoDenunciarId] =
        useState<string | null>(null);

    const [motivoDenuncia, setMotivoDenuncia] =
        useState<MotivoDenuncia | null>(null);

    const [imagemParaPublicar, setImagemParaPublicar] =
        useState<string | null>(null);


    const fotoSelecionada =
        fotos.find((foto) => foto.id === fotoSelecionadaId) ?? null;

    const fotoMenu =
        fotos.find((foto) => foto.id === fotoMenuId) ?? null;

    const fotoExcluir =
        fotos.find((foto) => foto.id === fotoExcluirId) ?? null;

    const fotoDenunciar =
        fotos.find((foto) => foto.id === fotoDenunciarId) ?? null;


    const fotosPublicadas = useMemo(
        () => fotos.filter((foto) => !foto.arquivada),
        [fotos]
    );


    const fotosFiltradas = useMemo(() => {
        if (filtro === "Minhas Fotos") {
            return fotos.filter((foto) => {
                if (!foto.minha) {
                    return false;
                }

                return visualizacaoMinhas === "Arquivadas"
                    ? foto.arquivada
                    : !foto.arquivada;
            });
        }

        const publicadas = fotos.filter((foto) => !foto.arquivada);

        if (filtro === "Mais Curtidas") {
            return [...publicadas].sort(
                (a, b) => b.curtidas - a.curtidas
            );
        }

        return publicadas;
    }, [filtro, fotos, visualizacaoMinhas]);


    const totalCurtidas = useMemo(
        () =>
            fotosPublicadas.reduce(
                (total, foto) => total + foto.curtidas,
                0
            ),
        [fotosPublicadas]
    );


    const totalParticipantes = useMemo(
        () =>
            new Set(
                fotosPublicadas.map((foto) => foto.autor)
            ).size,
        [fotosPublicadas]
    );


    const alternarCurtida = (id: string) => {
        setFotos((current) =>
            current.map((foto) => {
                if (foto.id !== id) {
                    return foto;
                }

                const vaiCurtir = !foto.curtidaPorMim;

                return {
                    ...foto,
                    curtidaPorMim: vaiCurtir,
                    curtidas: vaiCurtir
                        ? foto.curtidas + 1
                        : Math.max(foto.curtidas - 1, 0),
                };
            })
        );
    };


    const alternarSalvar = (id: string) => {
        setFotos((current) =>
            current.map((foto) =>
                foto.id === id
                    ? {
                        ...foto,
                        salva: !foto.salva,
                    }
                    : foto
            )
        );

        setFotoMenuId(null);
    };


    const alternarArquivo = (id: string) => {
        const fotoAtual = fotos.find((foto) => foto.id === id);

        if (!fotoAtual?.minha) {
            return;
        }

        setFotos((current) =>
            current.map((foto) =>
                foto.id === id
                    ? {
                        ...foto,
                        arquivada: !foto.arquivada,
                    }
                    : foto
            )
        );

        setFotoMenuId(null);

        if (fotoAtual.arquivada) {
            setFiltro("Minhas Fotos");
            setVisualizacaoMinhas("Publicadas");
        }
    };


    const abrirDetalhes = (id: string) => {
        setFotoMenuId(null);
        setFotoSelecionadaId(id);
    };


    const abrirExclusao = (id: string) => {
        const fotoAtual = fotos.find((foto) => foto.id === id);

        if (!fotoAtual?.minha) {
            return;
        }

        setFotoMenuId(null);
        setFotoExcluirId(id);
    };


    const confirmarExclusao = () => {
        if (!fotoExcluir) {
            return;
        }

        setFotos((current) =>
            current.filter((foto) => foto.id !== fotoExcluir.id)
        );

        if (fotoSelecionadaId === fotoExcluir.id) {
            setFotoSelecionadaId(null);
        }

        setFotoExcluirId(null);
    };


    const abrirDenuncia = (id: string) => {
        const fotoAtual = fotos.find((foto) => foto.id === id);

        if (!fotoAtual || fotoAtual.minha) {
            return;
        }

        setFotoMenuId(null);
        setMotivoDenuncia(null);
        setFotoDenunciarId(id);
    };


    const confirmarDenuncia = () => {
        if (!fotoDenunciar || !motivoDenuncia) {
            return;
        }

        setFotos((current) =>
            current.map((foto) =>
                foto.id === fotoDenunciar.id
                    ? {
                        ...foto,
                        denunciada: true,
                    }
                    : foto
            )
        );

        setFotoDenunciarId(null);
        setMotivoDenuncia(null);

        Alert.alert(
            "Denúncia registrada",
            "A denúncia foi registrada nesta sessão. Quando a API estiver conectada, essa ação será enviada ao backend."
        );
    };


    const selecionarFotoParaPublicar = async () => {
        const permissao =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissao.granted) {
            Alert.alert(
                "Permissão necessária",
                "Permita o acesso às suas fotos para publicar na galeria."
            );

            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.9,
            });

        if (resultado.canceled) {
            return;
        }

        const imagem = resultado.assets[0];

        if (!imagem?.uri) {
            return;
        }

        setImagemParaPublicar(imagem.uri);
    };


    const publicarFoto = () => {
        if (!imagemParaPublicar) {
            return;
        }

        const novaFoto: FotoGaleria = {
            id: `local-${Date.now()}`,
            source: {
                uri: imagemParaPublicar,
            },
            autor: "Fernanda Silva",
            detalhe: "Agora",
            curtidas: 0,
            minha: true,
            curtidaPorMim: false,
            salva: false,
            arquivada: false,
            denunciada: false,
        };

        setFotos((current) => [
            novaFoto,
            ...current,
        ]);

        setImagemParaPublicar(null);
        setFiltro("Minhas Fotos");
        setVisualizacaoMinhas("Publicadas");
    };


    const compartilharFoto = async (foto: FotoGaleria) => {
        try {
            await Share.share({
                message:
                    `Confira esta publicação de ${foto.autor} no Conexão 360°.`
            });
        } catch {
            Alert.alert(
                "Não foi possível compartilhar",
                "Tente novamente em alguns instantes."
            );
        }
    };


    const compartilharPeloMenu = async (foto: FotoGaleria) => {
        setFotoMenuId(null);
        await compartilharFoto(foto);
    };


    const cabecalhoLista = (
        <>
            <View style={galeria2Styles.abas}>
                {FILTROS.map((item) => {
                    const ativo = filtro === item;

                    return (
                        <Pressable
                            key={item}
                            style={({ pressed }) => [
                                galeria2Styles.aba,
                                ativo && galeria2Styles.abaAtiva,
                                pressed && galeria2Styles.abaPressionada,
                            ]}
                            onPress={() => {
                                setFiltro(item);

                                if (item !== "Minhas Fotos") {
                                    setVisualizacaoMinhas("Publicadas");
                                }
                            }}
                            accessibilityRole="button"
                            accessibilityState={{ selected: ativo }}
                        >
                            <Text
                                style={[
                                    galeria2Styles.txtAba,
                                    ativo && galeria2Styles.txtAbaAtiva,
                                ]}
                                numberOfLines={1}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>


            {filtro === "Minhas Fotos" && (
                <View style={galeria2Styles.minhasAlternador}>
                    {(["Publicadas", "Arquivadas"] as VisualizacaoMinhas[])
                        .map((item) => {
                            const ativo = visualizacaoMinhas === item;

                            return (
                                <Pressable
                                    key={item}
                                    style={({ pressed }) => [
                                        galeria2Styles.minhasOpcao,
                                        ativo && galeria2Styles.minhasOpcaoAtiva,
                                        pressed && galeria2Styles.minhasOpcaoPressed,
                                    ]}
                                    onPress={() => setVisualizacaoMinhas(item)}
                                >
                                    <Text
                                        style={[
                                            galeria2Styles.txtMinhasOpcao,
                                            ativo && galeria2Styles.txtMinhasOpcaoAtiva,
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            );
                        })}
                </View>
            )}


            <View style={galeria2Styles.areaCompartilhar}>
                <Pressable
                    style={({ pressed }) => [
                        galeria2Styles.btnCompartilhar,
                        pressed && galeria2Styles.btnCompartilharPressed,
                    ]}
                    onPress={selecionarFotoParaPublicar}
                    accessibilityRole="button"
                    accessibilityLabel="Publicar foto"
                >
                    <Image
                        source={require("@/assets/images/img/galeria.png")}
                        style={galeria2Styles.iconeCompartilhar}
                        tintColor={coresTema.destaque}
                    />

                    <Text style={galeria2Styles.txtCompartilhar}>
                        Publicar foto
                    </Text>
                </Pressable>
            </View>


            <View style={galeria2Styles.resumoCard}>
                <View style={galeria2Styles.resumoItem}>
                    <Image
                        source={require("@/assets/images/img/galeria.png")}
                        style={galeria2Styles.resumoIcone}
                        tintColor={coresTema.destaque}
                    />

                    <View>
                        <Text style={galeria2Styles.resumoNumero}>
                            {fotosPublicadas.length}
                        </Text>

                        <Text style={galeria2Styles.resumoLegenda}>
                            Fotos
                        </Text>
                    </View>
                </View>

                <View style={galeria2Styles.resumoSeparador} />

                <View style={galeria2Styles.resumoItem}>
                    <Image
                        source={require("@/assets/images/img/avatar.png")}
                        style={galeria2Styles.resumoAvatar}
                    />

                    <View>
                        <Text style={galeria2Styles.resumoNumero}>
                            {totalParticipantes}
                        </Text>

                        <Text style={galeria2Styles.resumoLegenda}>
                            Participantes
                        </Text>
                    </View>
                </View>

                <View style={galeria2Styles.resumoSeparador} />

                <View style={galeria2Styles.resumoItem}>
                    <Image
                        source={require("@/assets/images/img/heart.png")}
                        style={galeria2Styles.resumoIcone}
                        tintColor={coresTema.destaque}
                    />

                    <View>
                        <Text style={galeria2Styles.resumoNumero}>
                            {formatarNumero(totalCurtidas)}
                        </Text>

                        <Text style={galeria2Styles.resumoLegenda}>
                            Curtidas
                        </Text>
                    </View>
                </View>
            </View>


            <View style={galeria2Styles.avisoCard}>
                <Image
                    source={require("@/assets/images/img/caution.png")}
                    style={galeria2Styles.avisoIcone}
                />

                <Text style={galeria2Styles.avisoTexto}>
                    Compartilhe suas fotos e registre os melhores momentos!
                    Seu registro ajuda a manter viva a experiência do evento.
                </Text>
            </View>
        </>
    );


    return (
        <View style={globalStyle.container}>
            <View
                style={[
                    globalStyle.background,
                    galeria2Styles.container,
                ]}
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <HeaderScreen />

                    <FlatList
                        data={fotosFiltradas}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        style={galeria2Styles.lista}
                        contentContainerStyle={galeria2Styles.listaConteudo}
                        columnWrapperStyle={galeria2Styles.linhaFotos}
                        ListHeaderComponent={cabecalhoLista}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={galeria2Styles.cardFoto}>
                                <View style={galeria2Styles.areaImagemCard}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            galeria2Styles.areaFoto,
                                            pressed && galeria2Styles.areaFotoPressionada,
                                        ]}
                                        onPress={() => setFotoSelecionadaId(item.id)}
                                        accessibilityRole="button"
                                        accessibilityLabel={`Abrir foto de ${item.autor}`}
                                    >
                                        <Image
                                            source={item.source}
                                            style={galeria2Styles.foto}
                                        />
                                    </Pressable>

                                    <Pressable
                                        style={({ pressed }) => [
                                            galeria2Styles.btnMais,
                                            pressed && galeria2Styles.btnMaisPressed,
                                        ]}
                                        onPress={() => setFotoMenuId(item.id)}
                                        accessibilityRole="button"
                                        accessibilityLabel="Abrir opções da publicação"
                                    >
                                        <Text style={galeria2Styles.txtMais}>
                                            ⋮
                                        </Text>
                                    </Pressable>

                                    {item.salva && (
                                        <View style={galeria2Styles.seloSalvo}>
                                            <Text style={galeria2Styles.txtSeloSalvo}>
                                                ★
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <View style={galeria2Styles.rodapeFoto}>
                                    <View style={galeria2Styles.autorArea}>
                                        <Image
                                            source={require("@/assets/images/img/avatar.png")}
                                            style={galeria2Styles.avatarAutor}
                                        />

                                        <View style={galeria2Styles.autorTextoArea}>
                                            <Text
                                                style={galeria2Styles.autor}
                                                numberOfLines={1}
                                            >
                                                {item.autor}
                                            </Text>

                                            <Text style={galeria2Styles.detalheAutor}>
                                                {item.detalhe}
                                            </Text>
                                        </View>
                                    </View>

                                    <Pressable
                                        style={({ pressed }) => [
                                            galeria2Styles.btnCurtida,
                                            item.curtidaPorMim &&
                                            galeria2Styles.btnCurtidaAtiva,
                                            pressed &&
                                            galeria2Styles.btnCurtidaPressed,
                                        ]}
                                        onPress={() => alternarCurtida(item.id)}
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            item.curtidaPorMim
                                                ? "Descurtir foto"
                                                : "Curtir foto"
                                        }
                                        accessibilityState={{
                                            selected: item.curtidaPorMim,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                galeria2Styles.coracao,
                                                item.curtidaPorMim &&
                                                galeria2Styles.coracaoAtivo,
                                            ]}
                                        >
                                            {item.curtidaPorMim ? "♥" : "♡"}
                                        </Text>

                                        <Text
                                            style={[
                                                galeria2Styles.txtCurtidas,
                                                item.curtidaPorMim &&
                                                galeria2Styles.txtCurtidasAtivo,
                                            ]}
                                        >
                                            {item.curtidas}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View style={galeria2Styles.semResultados}>
                                <Text style={galeria2Styles.txtSemResultados}>
                                    {filtro === "Minhas Fotos" &&
                                    visualizacaoMinhas === "Arquivadas"
                                        ? "Você ainda não possui publicações arquivadas."
                                        : "Nenhuma foto encontrada."}
                                </Text>
                            </View>
                        }
                    />

                    <MenuScreen />


                    {/* PREVIEW DA FOTO */}
                    <Modal
                        visible={fotoSelecionada !== null}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setFotoSelecionadaId(null)}
                    >
                        <View style={galeria2Styles.modalOverlay}>
                            {fotoSelecionada && (
                                <View style={galeria2Styles.modalCard}>
                                    <View style={galeria2Styles.modalTopo}>
                                        <View style={galeria2Styles.modalAutorArea}>
                                            <Image
                                                source={require("@/assets/images/img/avatar.png")}
                                                style={galeria2Styles.modalAvatar}
                                            />

                                            <View>
                                                <Text style={galeria2Styles.modalAutor}>
                                                    {fotoSelecionada.autor}
                                                </Text>

                                                <Text style={galeria2Styles.modalDetalhe}>
                                                    {fotoSelecionada.detalhe}
                                                </Text>
                                            </View>
                                        </View>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.btnFecharModal,
                                                pressed && galeria2Styles.btnModalPressed,
                                            ]}
                                            onPress={() => setFotoSelecionadaId(null)}
                                            accessibilityRole="button"
                                            accessibilityLabel="Fechar foto"
                                        >
                                            <Text style={galeria2Styles.txtFecharModal}>
                                                ×
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <Image
                                        source={fotoSelecionada.source}
                                        style={galeria2Styles.modalImagem}
                                    />

                                    <View style={galeria2Styles.modalAcoes}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.modalAcao,
                                                fotoSelecionada.curtidaPorMim &&
                                                galeria2Styles.modalAcaoAtiva,
                                                pressed && galeria2Styles.btnModalPressed,
                                            ]}
                                            onPress={() =>
                                                alternarCurtida(fotoSelecionada.id)
                                            }
                                        >
                                            <Text
                                                style={[
                                                    galeria2Styles.modalCoracao,
                                                    fotoSelecionada.curtidaPorMim &&
                                                    galeria2Styles.modalCoracaoAtivo,
                                                ]}
                                            >
                                                {fotoSelecionada.curtidaPorMim
                                                    ? "♥"
                                                    : "♡"}
                                            </Text>

                                            <Text
                                                style={[
                                                    galeria2Styles.modalAcaoTexto,
                                                    fotoSelecionada.curtidaPorMim &&
                                                    galeria2Styles.modalAcaoTextoAtivo,
                                                ]}
                                            >
                                                {fotoSelecionada.curtidas} curtidas
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.modalAcao,
                                                pressed && galeria2Styles.btnModalPressed,
                                            ]}
                                            onPress={() => compartilharFoto(fotoSelecionada)}
                                        >
                                            <Text style={galeria2Styles.modalAcaoIconeTexto}>
                                                ↗
                                            </Text>

                                            <Text style={galeria2Styles.modalAcaoTexto}>
                                                Compartilhar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </View>
                    </Modal>


                    {/* PUBLICAR NOVA FOTO */}
                    <Modal
                        visible={imagemParaPublicar !== null}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setImagemParaPublicar(null)}
                    >
                        <View style={galeria2Styles.publicarOverlay}>
                            <View style={galeria2Styles.publicarCard}>
                                <Text style={galeria2Styles.publicarTitulo}>
                                    Publicar foto
                                </Text>

                                <Text style={galeria2Styles.publicarSubtitulo}>
                                    Confira a foto antes de publicar na galeria.
                                </Text>

                                {imagemParaPublicar && (
                                    <Image
                                        source={{ uri: imagemParaPublicar }}
                                        style={galeria2Styles.publicarImagem}
                                    />
                                )}

                                <View style={galeria2Styles.publicarAcoes}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            galeria2Styles.btnCancelarPublicacao,
                                            pressed &&
                                            galeria2Styles.btnPublicacaoPressed,
                                        ]}
                                        onPress={() => setImagemParaPublicar(null)}
                                    >
                                        <Text
                                            style={
                                                galeria2Styles.txtCancelarPublicacao
                                            }
                                        >
                                            Cancelar
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        style={({ pressed }) => [
                                            galeria2Styles.btnConfirmarPublicacao,
                                            pressed &&
                                            galeria2Styles.btnPublicacaoPressed,
                                        ]}
                                        onPress={publicarFoto}
                                    >
                                        <Text
                                            style={
                                                galeria2Styles.txtConfirmarPublicacao
                                            }
                                        >
                                            Publicar
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>


                    {/* MENU DE AÇÕES DO POST */}
                    <Modal
                        visible={fotoMenu !== null}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setFotoMenuId(null)}
                    >
                        <View style={galeria2Styles.sheetOverlay}>
                            <Pressable
                                style={galeria2Styles.sheetBackdrop}
                                onPress={() => setFotoMenuId(null)}
                                accessibilityLabel="Fechar opções"
                            />

                            {fotoMenu && (
                                <View style={galeria2Styles.sheetCard}>
                                    <View style={galeria2Styles.sheetHandle} />

                                    <View style={galeria2Styles.sheetCabecalho}>
                                        <Image
                                            source={fotoMenu.source}
                                            style={galeria2Styles.sheetMiniatura}
                                        />

                                        <View style={galeria2Styles.sheetCabecalhoTexto}>
                                            <Text style={galeria2Styles.sheetRotulo}>
                                                Publicação de
                                            </Text>

                                            <Text style={galeria2Styles.sheetAutor}>
                                                {fotoMenu.autor}
                                            </Text>

                                            <Text style={galeria2Styles.sheetMeta}>
                                                {fotoMenu.detalhe} · {fotoMenu.curtidas} curtidas
                                            </Text>
                                        </View>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.sheetFechar,
                                                pressed && galeria2Styles.sheetAcaoPressed,
                                            ]}
                                            onPress={() => setFotoMenuId(null)}
                                        >
                                            <Text style={galeria2Styles.sheetFecharTexto}>
                                                ×
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <View style={galeria2Styles.sheetLista}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.sheetAcao,
                                                pressed && galeria2Styles.sheetAcaoPressed,
                                            ]}
                                            onPress={() => abrirDetalhes(fotoMenu.id)}
                                        >
                                            <Text style={galeria2Styles.sheetIcone}>ⓘ</Text>
                                            <Text style={galeria2Styles.sheetAcaoTexto}>
                                                Ver detalhes
                                            </Text>
                                            <Text style={galeria2Styles.sheetSeta}>›</Text>
                                        </Pressable>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.sheetAcao,
                                                pressed && galeria2Styles.sheetAcaoPressed,
                                            ]}
                                            onPress={() => alternarSalvar(fotoMenu.id)}
                                        >
                                            <Text style={galeria2Styles.sheetIcone}>
                                                {fotoMenu.salva ? "★" : "☆"}
                                            </Text>
                                            <Text style={galeria2Styles.sheetAcaoTexto}>
                                                {fotoMenu.salva
                                                    ? "Remover dos salvos"
                                                    : "Salvar publicação"}
                                            </Text>
                                            <Text style={galeria2Styles.sheetSeta}>›</Text>
                                        </Pressable>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.sheetAcao,
                                                pressed && galeria2Styles.sheetAcaoPressed,
                                            ]}
                                            onPress={() => compartilharPeloMenu(fotoMenu)}
                                        >
                                            <Text style={galeria2Styles.sheetIcone}>↗</Text>
                                            <Text style={galeria2Styles.sheetAcaoTexto}>
                                                Compartilhar
                                            </Text>
                                            <Text style={galeria2Styles.sheetSeta}>›</Text>
                                        </Pressable>

                                        {fotoMenu.minha ? (
                                            <>
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        galeria2Styles.sheetAcao,
                                                        pressed &&
                                                        galeria2Styles.sheetAcaoPressed,
                                                    ]}
                                                    onPress={() =>
                                                        alternarArquivo(fotoMenu.id)
                                                    }
                                                >
                                                    <Text style={galeria2Styles.sheetIcone}>
                                                        ▣
                                                    </Text>
                                                    <Text
                                                        style={galeria2Styles.sheetAcaoTexto}
                                                    >
                                                        {fotoMenu.arquivada
                                                            ? "Desarquivar publicação"
                                                            : "Arquivar publicação"}
                                                    </Text>
                                                    <Text style={galeria2Styles.sheetSeta}>
                                                        ›
                                                    </Text>
                                                </Pressable>

                                                <View
                                                    style={galeria2Styles.sheetSeparador}
                                                />

                                                <Pressable
                                                    style={({ pressed }) => [
                                                        galeria2Styles.sheetAcao,
                                                        pressed &&
                                                        galeria2Styles.sheetAcaoPressed,
                                                    ]}
                                                    onPress={() => abrirExclusao(fotoMenu.id)}
                                                >
                                                    <Text
                                                        style={[
                                                            galeria2Styles.sheetIcone,
                                                            galeria2Styles.sheetDestrutivo,
                                                        ]}
                                                    >
                                                        ⌫
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            galeria2Styles.sheetAcaoTexto,
                                                            galeria2Styles.sheetDestrutivo,
                                                        ]}
                                                    >
                                                        Apagar publicação
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            galeria2Styles.sheetSeta,
                                                            galeria2Styles.sheetDestrutivo,
                                                        ]}
                                                    >
                                                        ›
                                                    </Text>
                                                </Pressable>
                                            </>
                                        ) : (
                                            <>
                                                <View
                                                    style={galeria2Styles.sheetSeparador}
                                                />

                                                <Pressable
                                                    style={({ pressed }) => [
                                                        galeria2Styles.sheetAcao,
                                                        pressed &&
                                                        galeria2Styles.sheetAcaoPressed,
                                                    ]}
                                                    onPress={() => abrirDenuncia(fotoMenu.id)}
                                                >
                                                    <Text
                                                        style={[
                                                            galeria2Styles.sheetIcone,
                                                            galeria2Styles.sheetDestrutivo,
                                                        ]}
                                                    >
                                                        ⚑
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            galeria2Styles.sheetAcaoTexto,
                                                            galeria2Styles.sheetDestrutivo,
                                                        ]}
                                                    >
                                                        {fotoMenu.denunciada
                                                            ? "Denúncia registrada"
                                                            : "Denunciar publicação"}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            galeria2Styles.sheetSeta,
                                                            galeria2Styles.sheetDestrutivo,
                                                        ]}
                                                    >
                                                        ›
                                                    </Text>
                                                </Pressable>
                                            </>
                                        )}
                                    </View>
                                </View>
                            )}
                        </View>
                    </Modal>


                    {/* CONFIRMAR EXCLUSÃO */}
                    <Modal
                        visible={fotoExcluir !== null}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setFotoExcluirId(null)}
                    >
                        <View style={galeria2Styles.confirmacaoOverlay}>
                            {fotoExcluir && (
                                <View style={galeria2Styles.confirmacaoCard}>
                                    <Text style={galeria2Styles.confirmacaoTitulo}>
                                        Apagar publicação?
                                    </Text>

                                    <Text style={galeria2Styles.confirmacaoTexto}>
                                        Essa foto será removida da galeria nesta sessão.
                                        Essa ação não poderá ser desfeita.
                                    </Text>

                                    <Image
                                        source={fotoExcluir.source}
                                        style={galeria2Styles.confirmacaoImagem}
                                    />

                                    <View style={galeria2Styles.confirmacaoAcoes}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.btnConfirmacaoCancelar,
                                                pressed &&
                                                galeria2Styles.btnPublicacaoPressed,
                                            ]}
                                            onPress={() => setFotoExcluirId(null)}
                                        >
                                            <Text
                                                style={
                                                    galeria2Styles.txtConfirmacaoCancelar
                                                }
                                            >
                                                Cancelar
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.btnConfirmacaoApagar,
                                                pressed &&
                                                galeria2Styles.btnPublicacaoPressed,
                                            ]}
                                            onPress={confirmarExclusao}
                                        >
                                            <Text
                                                style={
                                                    galeria2Styles.txtConfirmacaoApagar
                                                }
                                            >
                                                Apagar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </View>
                    </Modal>


                    {/* DENUNCIAR PUBLICAÇÃO */}
                    <Modal
                        visible={fotoDenunciar !== null}
                        transparent
                        animationType="slide"
                        onRequestClose={() => {
                            setFotoDenunciarId(null);
                            setMotivoDenuncia(null);
                        }}
                    >
                        <View style={galeria2Styles.sheetOverlay}>
                            <Pressable
                                style={galeria2Styles.sheetBackdrop}
                                onPress={() => {
                                    setFotoDenunciarId(null);
                                    setMotivoDenuncia(null);
                                }}
                            />

                            {fotoDenunciar && (
                                <View style={galeria2Styles.denunciaCard}>
                                    <View style={galeria2Styles.sheetHandle} />

                                    <Text style={galeria2Styles.denunciaTitulo}>
                                        Denunciar publicação
                                    </Text>

                                    <Text style={galeria2Styles.denunciaTexto}>
                                        Selecione o motivo da denúncia.
                                    </Text>

                                    <View style={galeria2Styles.denunciaMotivos}>
                                        {MOTIVOS_DENUNCIA.map((motivo) => {
                                            const selecionado =
                                                motivoDenuncia === motivo;

                                            return (
                                                <Pressable
                                                    key={motivo}
                                                    style={({ pressed }) => [
                                                        galeria2Styles.denunciaMotivo,
                                                        selecionado &&
                                                        galeria2Styles.denunciaMotivoAtivo,
                                                        pressed &&
                                                        galeria2Styles.sheetAcaoPressed,
                                                    ]}
                                                    onPress={() =>
                                                        setMotivoDenuncia(motivo)
                                                    }
                                                >
                                                    <View
                                                        style={[
                                                            galeria2Styles.denunciaRadio,
                                                            selecionado &&
                                                            galeria2Styles.denunciaRadioAtivo,
                                                        ]}
                                                    />

                                                    <Text
                                                        style={[
                                                            galeria2Styles.denunciaMotivoTexto,
                                                            selecionado &&
                                                            galeria2Styles.denunciaMotivoTextoAtivo,
                                                        ]}
                                                    >
                                                        {motivo}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </View>

                                    <View style={galeria2Styles.denunciaAcoes}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.btnDenunciaCancelar,
                                                pressed &&
                                                galeria2Styles.btnPublicacaoPressed,
                                            ]}
                                            onPress={() => {
                                                setFotoDenunciarId(null);
                                                setMotivoDenuncia(null);
                                            }}
                                        >
                                            <Text
                                                style={
                                                    galeria2Styles.txtDenunciaCancelar
                                                }
                                            >
                                                Cancelar
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={({ pressed }) => [
                                                galeria2Styles.btnDenunciaEnviar,
                                                !motivoDenuncia &&
                                                galeria2Styles.btnDenunciaDesabilitado,
                                                pressed &&
                                                motivoDenuncia &&
                                                galeria2Styles.btnPublicacaoPressed,
                                            ]}
                                            onPress={confirmarDenuncia}
                                            disabled={!motivoDenuncia}
                                        >
                                            <Text
                                                style={
                                                    galeria2Styles.txtDenunciaEnviar
                                                }
                                            >
                                                Enviar denúncia
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </View>
                    </Modal>
                </SafeAreaView>
            </View>
        </View>
    );
}
