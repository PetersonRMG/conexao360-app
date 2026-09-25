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

import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import HeaderScreen from "./header";
import MenuScreen from "./menu";

import globalStyle from "@/styles/globalStyles";
import { criarGaleria2Styles } from "@/styles/galeria2Styles";
import { useTema } from "@/contexts/TemaContext";


type FiltroGaleria =
    | "Todas as Fotos"
    | "Mais Curtidas"
    | "Minhas Fotos";


interface FotoGaleria {
    id: string;
    source: ImageSourcePropType;
    autor: string;
    detalhe: string;
    curtidas: number;
    minha: boolean;
    curtidaPorMim: boolean;
}


const FILTROS: FiltroGaleria[] = [
    "Todas as Fotos",
    "Mais Curtidas",
    "Minhas Fotos",
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
    },
    {
        id: "2",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Juliana Oliveira",
        detalhe: "2 fotos",
        curtidas: 198,
        minha: false,
        curtidaPorMim: true,
    },
    {
        id: "3",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Fernanda Silva",
        detalhe: "1 foto",
        curtidas: 176,
        minha: true,
        curtidaPorMim: false,
    },
    {
        id: "4",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Carlos Mendes",
        detalhe: "3 fotos",
        curtidas: 161,
        minha: false,
        curtidaPorMim: false,
    },
    {
        id: "5",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Fernanda Silva",
        detalhe: "1 foto",
        curtidas: 149,
        minha: true,
        curtidaPorMim: true,
    },
    {
        id: "6",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Juliana Oliveira",
        detalhe: "2 fotos",
        curtidas: 137,
        minha: false,
        curtidaPorMim: false,
    },
    {
        id: "7",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Simone Baptista",
        detalhe: "1 foto",
        curtidas: 121,
        minha: false,
        curtidaPorMim: false,
    },
    {
        id: "8",
        source: require("@/assets/images/img/banner 1.png"),
        autor: "Fernanda Silva",
        detalhe: "1 foto",
        curtidas: 104,
        minha: true,
        curtidaPorMim: false,
    },
];


const formatarNumero = (valor: number) => {

    if (valor < 1000) {
        return String(valor);
    }

    const milhares =
        valor / 1000;

    return `${milhares.toFixed(1)}k`
        .replace(".0k", "k");

};


export default function Galeria2Screen() {

    const { coresTema } = useTema();

    const galeria2Styles =
        criarGaleria2Styles(coresTema);


    const [filtro, setFiltro] =
        useState<FiltroGaleria>("Todas as Fotos");

    const [fotos, setFotos] =
        useState<FotoGaleria[]>(FOTOS_INICIAIS);

    const [fotoSelecionadaId, setFotoSelecionadaId] =
        useState<string | null>(null);

    const [imagemParaPublicar, setImagemParaPublicar] =
        useState<string | null>(null);


    // =========================
    // FOTO SELECIONADA
    // =========================

    const fotoSelecionada =
        fotos.find(
            (foto) =>
                foto.id === fotoSelecionadaId
        ) ?? null;


    // =========================
    // FILTROS
    // =========================

    const fotosFiltradas = useMemo(() => {

        if (filtro === "Minhas Fotos") {

            return fotos.filter(
                (foto) => foto.minha
            );

        }


        if (filtro === "Mais Curtidas") {

            return [...fotos].sort(
                (a, b) =>
                    b.curtidas - a.curtidas
            );

        }


        return fotos;

    }, [filtro, fotos]);


    // =========================
    // RESUMO
    // =========================

    const totalCurtidas = useMemo(
        () =>
            fotos.reduce(
                (total, foto) =>
                    total + foto.curtidas,
                0
            ),
        [fotos]
    );

    const totalParticipantes = useMemo(
        () =>
            new Set(
                fotos.map(
                    (foto) => foto.autor
                )
            ).size,
        [fotos]
    );


    // =========================
    // CURTIR / DESCURTIR
    // =========================

    const alternarCurtida = (
        id: string
    ) => {

        setFotos((current) =>
            current.map((foto) => {

                if (foto.id !== id) {
                    return foto;
                }

                const vaiCurtir =
                    !foto.curtidaPorMim;

                return {
                    ...foto,

                    curtidaPorMim:
                        vaiCurtir,

                    curtidas:
                        vaiCurtir
                            ? foto.curtidas + 1
                            : Math.max(
                                foto.curtidas - 1,
                                0
                            ),
                };

            })
        );

    };


    // =========================
    // SELECIONAR FOTO PARA POSTAR
    // =========================

    const selecionarFotoParaPublicar =
        async () => {

            const permissao =
                await ImagePicker
                    .requestMediaLibraryPermissionsAsync();


            if (!permissao.granted) {

                Alert.alert(
                    "Permissão necessária",
                    "Permita o acesso às suas fotos para publicar na galeria."
                );

                return;

            }


            const resultado =
                await ImagePicker
                    .launchImageLibraryAsync({

                        mediaTypes: [
                            "images",
                        ],

                        allowsEditing: true,

                        aspect: [
                            4,
                            3,
                        ],

                        quality: 0.9,

                    });


            if (resultado.canceled) {
                return;
            }


            const imagem =
                resultado.assets[0];


            if (!imagem?.uri) {
                return;
            }


            setImagemParaPublicar(
                imagem.uri
            );

        };


    // =========================
    // PUBLICAR FOTO
    // =========================

    const publicarFoto = () => {

        if (!imagemParaPublicar) {
            return;
        }


        const novaFoto: FotoGaleria = {

            id:
                `local-${Date.now()}`,

            source: {
                uri: imagemParaPublicar,
            },

            autor:
                "Fernanda Silva",

            detalhe:
                "1 foto",

            curtidas: 0,

            minha: true,

            curtidaPorMim: false,

        };


        setFotos((current) => [
            novaFoto,
            ...current,
        ]);


        setImagemParaPublicar(
            null
        );


        setFiltro(
            "Minhas Fotos"
        );

    };


    // =========================
    // COMPARTILHAR FOTO
    // =========================

    const compartilharFoto =
        async (
            foto: FotoGaleria
        ) => {

            try {

                await Share.share({
                    message:
                        `Confira esta foto compartilhada por ${foto.autor} no Conexão 360°.`,
                });

            } catch {

                Alert.alert(
                    "Não foi possível compartilhar",
                    "Tente novamente em alguns instantes."
                );

            }

        };


    // =========================
    // CABEÇALHO DA LISTA
    // =========================

    const cabecalhoLista = (

        <>

            {/* =========================
                ABAS
            ========================= */}

            <View style={galeria2Styles.abas}>

                {FILTROS.map((item) => {

                    const ativo =
                        filtro === item;

                    return (

                        <Pressable
                            key={item}

                            style={({ pressed }) => [

                                galeria2Styles.aba,

                                ativo &&
                                galeria2Styles.abaAtiva,

                                pressed &&
                                galeria2Styles.abaPressionada,

                            ]}

                            onPress={() =>
                                setFiltro(item)
                            }

                            accessibilityRole="button"

                            accessibilityState={{
                                selected: ativo,
                            }}
                        >

                            <Text
                                style={[

                                    galeria2Styles.txtAba,

                                    ativo &&
                                    galeria2Styles.txtAbaAtiva,

                                ]}
                                numberOfLines={1}
                            >
                                {item}
                            </Text>

                        </Pressable>

                    );

                })}

            </View>


            {/* =========================
                COMPARTILHAR
            ========================= */}

            <View
                style={
                    galeria2Styles.areaCompartilhar
                }
            >

                <Pressable
                    style={({ pressed }) => [

                        galeria2Styles.btnCompartilhar,

                        pressed &&
                        galeria2Styles.btnCompartilharPressed,

                    ]}

                    onPress={
                        selecionarFotoParaPublicar
                    }

                    accessibilityRole="button"

                    accessibilityLabel="Selecionar foto para publicar"
                >

                    <Image
                        source={require(
                            "@/assets/images/img/galeria.png"
                        )}
                        style={
                            galeria2Styles.iconeCompartilhar
                        }
                        tintColor={
                            coresTema.destaque
                        }
                    />

                    <Text
                        style={
                            galeria2Styles.txtCompartilhar
                        }
                    >
                        Compartilhar
                    </Text>

                </Pressable>

            </View>


            {/* =========================
                RESUMO
            ========================= */}

            <View style={galeria2Styles.resumoCard}>

                <View style={galeria2Styles.resumoItem}>

                    <Image
                        source={require(
                            "@/assets/images/img/galeria.png"
                        )}
                        style={galeria2Styles.resumoIcone}
                        tintColor={coresTema.destaque}
                    />

                    <View>

                        <Text
                            style={
                                galeria2Styles.resumoNumero
                            }
                        >
                            {fotos.length}
                        </Text>

                        <Text
                            style={
                                galeria2Styles.resumoLegenda
                            }
                        >
                            Fotos
                        </Text>

                    </View>

                </View>


                <View
                    style={
                        galeria2Styles.resumoSeparador
                    }
                />


                <View style={galeria2Styles.resumoItem}>

                    <Image
                        source={require(
                            "@/assets/images/img/avatar.png"
                        )}
                        style={
                            galeria2Styles.resumoAvatar
                        }
                    />

                    <View>

                        <Text
                            style={
                                galeria2Styles.resumoNumero
                            }
                        >
                            {totalParticipantes}
                        </Text>

                        <Text
                            style={
                                galeria2Styles.resumoLegenda
                            }
                        >
                            Participantes
                        </Text>

                    </View>

                </View>


                <View
                    style={
                        galeria2Styles.resumoSeparador
                    }
                />


                <View style={galeria2Styles.resumoItem}>

                    <Image
                        source={require(
                            "@/assets/images/img/heart.png"
                        )}
                        style={
                            galeria2Styles.resumoIcone
                        }
                        tintColor={
                            coresTema.destaque
                        }
                    />

                    <View>

                        <Text
                            style={
                                galeria2Styles.resumoNumero
                            }
                        >
                            {formatarNumero(
                                totalCurtidas
                            )}
                        </Text>

                        <Text
                            style={
                                galeria2Styles.resumoLegenda
                            }
                        >
                            Curtidas
                        </Text>

                    </View>

                </View>

            </View>


            {/* =========================
                AVISO
            ========================= */}

            <View style={galeria2Styles.avisoCard}>

                <Image
                    source={require(
                        "@/assets/images/img/caution.png"
                    )}
                    style={
                        galeria2Styles.avisoIcone
                    }
                />

                <Text
                    style={
                        galeria2Styles.avisoTexto
                    }
                >
                    Compartilhe suas fotos e registre os melhores
                    momentos! Seu registro ajuda a manter viva a
                    experiência do evento.
                </Text>

            </View>

        </>

    );


    // =========================
    // TELA
    // =========================

    return (

        <View style={globalStyle.container}>

            <View
                style={[
                    globalStyle.background,
                    galeria2Styles.container,
                ]}
            >

                <SafeAreaView
                    style={
                        globalStyle.areaConteudo
                    }
                >

                    <HeaderScreen />


                    <FlatList
                        data={
                            fotosFiltradas
                        }

                        keyExtractor={
                            (item) => item.id
                        }

                        numColumns={2}

                        style={
                            galeria2Styles.lista
                        }

                        contentContainerStyle={
                            galeria2Styles.listaConteudo
                        }

                        columnWrapperStyle={
                            galeria2Styles.linhaFotos
                        }

                        ListHeaderComponent={
                            cabecalhoLista
                        }

                        showsVerticalScrollIndicator={
                            false
                        }

                        renderItem={({ item }) => (

                            <View
                                style={
                                    galeria2Styles.cardFoto
                                }
                            >

                                {/* =========================
                                    IMAGEM / ABRIR PREVIEW
                                ========================= */}

                                <Pressable
                                    style={({ pressed }) => [
                                        galeria2Styles.areaFoto,

                                        pressed &&
                                        galeria2Styles.areaFotoPressionada,
                                    ]}

                                    onPress={() =>
                                        setFotoSelecionadaId(
                                            item.id
                                        )
                                    }

                                    accessibilityRole="button"

                                    accessibilityLabel={
                                        `Abrir foto de ${item.autor}`
                                    }
                                >

                                    <Image
                                        source={
                                            item.source
                                        }
                                        style={
                                            galeria2Styles.foto
                                        }
                                    />

                                </Pressable>


                                {/* =========================
                                    RODAPÉ
                                ========================= */}

                                <View
                                    style={
                                        galeria2Styles.rodapeFoto
                                    }
                                >

                                    <View
                                        style={
                                            galeria2Styles.autorArea
                                        }
                                    >

                                        <Image
                                            source={require(
                                                "@/assets/images/img/avatar.png"
                                            )}
                                            style={
                                                galeria2Styles.avatarAutor
                                            }
                                        />


                                        <View
                                            style={
                                                galeria2Styles.autorTextoArea
                                            }
                                        >

                                            <Text
                                                style={
                                                    galeria2Styles.autor
                                                }
                                                numberOfLines={1}
                                            >
                                                {item.autor}
                                            </Text>

                                            <Text
                                                style={
                                                    galeria2Styles.detalheAutor
                                                }
                                            >
                                                {item.detalhe}
                                            </Text>

                                        </View>

                                    </View>


                                    {/* =========================
                                        CURTIDA
                                    ========================= */}

                                    <Pressable
                                        style={({ pressed }) => [

                                            galeria2Styles.btnCurtida,

                                            item.curtidaPorMim &&
                                            galeria2Styles.btnCurtidaAtiva,

                                            pressed &&
                                            galeria2Styles.btnCurtidaPressed,

                                        ]}

                                        onPress={() =>
                                            alternarCurtida(
                                                item.id
                                            )
                                        }

                                        accessibilityRole="button"

                                        accessibilityLabel={
                                            item.curtidaPorMim
                                                ? "Descurtir foto"
                                                : "Curtir foto"
                                        }

                                        accessibilityState={{
                                            selected:
                                                item.curtidaPorMim,
                                        }}
                                    >

                                        <Text
                                            style={[

                                                galeria2Styles.coracao,

                                                item.curtidaPorMim &&
                                                galeria2Styles.coracaoAtivo,

                                            ]}
                                        >
                                            {
                                                item.curtidaPorMim
                                                    ? "♥"
                                                    : "♡"
                                            }
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

                            <View
                                style={
                                    galeria2Styles.semResultados
                                }
                            >

                                <Text
                                    style={
                                        galeria2Styles.txtSemResultados
                                    }
                                >
                                    Nenhuma foto encontrada.
                                </Text>

                            </View>

                        }
                    />


                    <MenuScreen />


                    {/* =========================
                        PREVIEW DA FOTO
                    ========================= */}

                    <Modal
                        visible={
                            fotoSelecionada !== null
                        }

                        transparent

                        animationType="fade"

                        onRequestClose={() =>
                            setFotoSelecionadaId(
                                null
                            )
                        }
                    >

                        <View
                            style={
                                galeria2Styles.modalOverlay
                            }
                        >

                            {fotoSelecionada && (

                                <View
                                    style={
                                        galeria2Styles.modalCard
                                    }
                                >

                                    <View
                                        style={
                                            galeria2Styles.modalTopo
                                        }
                                    >

                                        <View
                                            style={
                                                galeria2Styles.modalAutorArea
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/avatar.png"
                                                )}
                                                style={
                                                    galeria2Styles.modalAvatar
                                                }
                                            />

                                            <View>

                                                <Text
                                                    style={
                                                        galeria2Styles.modalAutor
                                                    }
                                                >
                                                    {
                                                        fotoSelecionada.autor
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        galeria2Styles.modalDetalhe
                                                    }
                                                >
                                                    {
                                                        fotoSelecionada.detalhe
                                                    }
                                                </Text>

                                            </View>

                                        </View>


                                        <Pressable
                                            style={({ pressed }) => [

                                                galeria2Styles.btnFecharModal,

                                                pressed &&
                                                galeria2Styles.btnModalPressed,

                                            ]}

                                            onPress={() =>
                                                setFotoSelecionadaId(
                                                    null
                                                )
                                            }

                                            accessibilityRole="button"

                                            accessibilityLabel="Fechar foto"
                                        >

                                            <Text
                                                style={
                                                    galeria2Styles.txtFecharModal
                                                }
                                            >
                                                ×
                                            </Text>

                                        </Pressable>

                                    </View>


                                    <Image
                                        source={
                                            fotoSelecionada.source
                                        }
                                        style={
                                            galeria2Styles.modalImagem
                                        }
                                    />


                                    <View
                                        style={
                                            galeria2Styles.modalAcoes
                                        }
                                    >

                                        <Pressable
                                            style={({ pressed }) => [

                                                galeria2Styles.modalAcao,

                                                fotoSelecionada.curtidaPorMim &&
                                                galeria2Styles.modalAcaoAtiva,

                                                pressed &&
                                                galeria2Styles.btnModalPressed,

                                            ]}

                                            onPress={() =>
                                                alternarCurtida(
                                                    fotoSelecionada.id
                                                )
                                            }
                                        >

                                            <Text
                                                style={[

                                                    galeria2Styles.modalCoracao,

                                                    fotoSelecionada.curtidaPorMim &&
                                                    galeria2Styles.modalCoracaoAtivo,

                                                ]}
                                            >
                                                {
                                                    fotoSelecionada.curtidaPorMim
                                                        ? "♥"
                                                        : "♡"
                                                }
                                            </Text>

                                            <Text
                                                style={[
                                                    galeria2Styles.modalAcaoTexto,

                                                    fotoSelecionada.curtidaPorMim &&
                                                    galeria2Styles.modalAcaoTextoAtivo,
                                                ]}
                                            >
                                                {
                                                    fotoSelecionada.curtidas
                                                }{" "}
                                                curtidas
                                            </Text>

                                        </Pressable>


                                        <Pressable
                                            style={({ pressed }) => [

                                                galeria2Styles.modalAcao,

                                                pressed &&
                                                galeria2Styles.btnModalPressed,

                                            ]}

                                            onPress={() =>
                                                compartilharFoto(
                                                    fotoSelecionada
                                                )
                                            }
                                        >

                                            <Image
                                                source={require(
                                                    "@/assets/images/img/galeria.png"
                                                )}
                                                style={
                                                    galeria2Styles.modalAcaoIcone
                                                }
                                                tintColor={
                                                    coresTema.destaque
                                                }
                                            />

                                            <Text
                                                style={
                                                    galeria2Styles.modalAcaoTexto
                                                }
                                            >
                                                Compartilhar
                                            </Text>

                                        </Pressable>

                                    </View>

                                </View>

                            )}

                        </View>

                    </Modal>


                    {/* =========================
                        PUBLICAR NOVA FOTO
                    ========================= */}

                    <Modal
                        visible={
                            imagemParaPublicar !== null
                        }

                        transparent

                        animationType="fade"

                        onRequestClose={() =>
                            setImagemParaPublicar(
                                null
                            )
                        }
                    >

                        <View
                            style={
                                galeria2Styles.publicarOverlay
                            }
                        >

                            <View
                                style={
                                    galeria2Styles.publicarCard
                                }
                            >

                                <Text
                                    style={
                                        galeria2Styles.publicarTitulo
                                    }
                                >
                                    Publicar foto
                                </Text>

                                <Text
                                    style={
                                        galeria2Styles.publicarSubtitulo
                                    }
                                >
                                    Confira a foto antes de compartilhar
                                    com a comunidade.
                                </Text>


                                {imagemParaPublicar && (

                                    <Image
                                        source={{
                                            uri:
                                                imagemParaPublicar,
                                        }}
                                        style={
                                            galeria2Styles.publicarImagem
                                        }
                                    />

                                )}


                                <View
                                    style={
                                        galeria2Styles.publicarAcoes
                                    }
                                >

                                    <Pressable
                                        style={({ pressed }) => [

                                            galeria2Styles.btnCancelarPublicacao,

                                            pressed &&
                                            galeria2Styles.btnPublicacaoPressed,

                                        ]}

                                        onPress={() =>
                                            setImagemParaPublicar(
                                                null
                                            )
                                        }
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

                                        onPress={
                                            publicarFoto
                                        }
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


                </SafeAreaView>

            </View>

        </View>

    );

}
