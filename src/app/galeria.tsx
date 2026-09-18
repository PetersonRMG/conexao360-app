import React, { useState } from "react";

import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import HeaderScreen from "@/app/header";
import MenuScreen from "@/app/menu";

import { galeriaStyles } from "@/styles/galeriaStyles";
import globalStyle from "@/styles/globalStyles";


type FiltroGaleria =
    | "Todas"
    | "Recentes"
    | "Em alta"
    | "Meus Posts";


const IMAGENS_BASE = Array.from(
    { length: 10 },
    (_, index) => ({
        id: String(index + 1),

        source: require(
            "@/assets/images/img/imagem.png"
        ),

        titulo: `Foto ${index + 1}`,

        recente: index < 6,

        emAlta: index === 0 ||
            index === 2 ||
            index === 4,

        meuPost: index === 1 ||
            index === 5 ||
            index === 8,
    })
);


export default function GaleriaScreen() {

    // =========================
    // ESTADOS
    // =========================

    const [busca, setBusca] = useState("");

    const [filtro, setFiltro] =
        useState<FiltroGaleria>("Todas");


    // =========================
    // FILTRAGEM
    // =========================

    const imagensFiltradas =
        IMAGENS_BASE.filter((imagem) => {

            const correspondeBusca =
                imagem.titulo
                    .toLowerCase()
                    .includes(
                        busca.toLowerCase()
                    );


            let correspondeFiltro = true;


            if (filtro === "Recentes") {

                correspondeFiltro =
                    imagem.recente;

            }


            if (filtro === "Em alta") {

                correspondeFiltro =
                    imagem.emAlta;

            }


            if (filtro === "Meus Posts") {

                correspondeFiltro =
                    imagem.meuPost;

            }


            return (
                correspondeBusca &&
                correspondeFiltro
            );

        });


    return (

        // =========================================
        // FUNDO EXTERNO
        // =========================================

        <View style={globalStyle.container}>


            {/* =====================================
                ÁREA MOBILE - MÁXIMO 440px
            ===================================== */}

            <View
                style={[
                    globalStyle.background,
                    galeriaStyles.container,
                ]}
            >


                <SafeAreaView
                    style={globalStyle.areaConteudo}
                >


                    {/* =========================
                        HEADER PADRÃO
                    ========================= */}

                    <HeaderScreen />


                    {/* =========================
                        CONTEÚDO
                    ========================= */}

                    <ScrollView
                        style={galeriaStyles.scroll}
                        contentContainerStyle={
                            galeriaStyles.scrollConteudo
                        }
                        showsVerticalScrollIndicator={
                            false
                        }
                        keyboardShouldPersistTaps="handled"
                    >


                        {/* =====================
                            CABEÇALHO
                        ===================== */}

                        <View
                            style={
                                galeriaStyles.cabecalho
                            }
                        >

                            <View>

                                <Text
                                    style={
                                        galeriaStyles.titulo
                                    }
                                >
                                    Galeria
                                </Text>


                                <Text
                                    style={
                                        galeriaStyles.galeriaTxt
                                    }
                                >
                                    Compartilhe os melhores
                                </Text>


                                <Text
                                    style={
                                        galeriaStyles.galeriaTxt
                                    }
                                >
                                    momentos dos eventos
                                </Text>

                            </View>


                            <Pressable
                                style={({ pressed }) => [

                                    galeriaStyles.btnGaleria,

                                    pressed &&
                                    galeriaStyles.btnGaleriaPressed,

                                ]}
                                onPress={() => {

                                    // ainda não liguei porque
                                    // não está definido o que
                                    // esse botão deve abrir.

                                }}
                            >

                                <Image
                                    style={
                                        galeriaStyles.btnImg
                                    }
                                    source={require(
                                        "@/assets/images/img/olho.png"
                                    )}
                                />


                                <Text
                                    style={
                                        galeriaStyles.btnTxt
                                    }
                                >
                                    Clique Aqui
                                </Text>

                            </Pressable>

                        </View>


                        {/* =====================
                            PESQUISA
                        ===================== */}

                        <View
                            style={
                                galeriaStyles.cxPesquisa
                            }
                        >

                            <Image
                                style={
                                    galeriaStyles.imgPesquisa
                                }
                                source={require(
                                    "@/assets/images/img/search.png"
                                )}
                            />


                            <TextInput
                                value={busca}

                                onChangeText={
                                    setBusca
                                }

                                style={
                                    galeriaStyles.inputPesquisa
                                }

                                placeholder="Buscar fotos"

                                placeholderTextColor="#777777"

                                autoCapitalize="none"
                            />

                        </View>


                        {/* =====================
                            ABAS
                        ===================== */}

                        <View style={galeriaStyles.cxMenu}>

                            {[
                                "Todas",
                                "Recentes",
                                "Em alta",
                                "Meus Posts",

                            ].map((item) => {

                                const ativo =
                                    filtro === item;


                                return (

                                    <Pressable
                                        key={item}

                                        style={[

                                            galeriaStyles.itemMenu,

                                            ativo &&
                                            galeriaStyles.itemMenuAtivo,

                                        ]}

                                        onPress={() =>
                                            setFiltro(
                                                item as FiltroGaleria
                                            )
                                        }
                                    >

                                        <Text
                                            style={[

                                                galeriaStyles.txtMenu,

                                                ativo &&
                                                galeriaStyles.txtMenuAtivo,

                                            ]}
                                        >
                                            {item}
                                        </Text>

                                    </Pressable>

                                );

                            })}

                        </View>


                        {/* =====================
                            EVENTOS / FILTRO
                        ===================== */}

                        <View
                            style={
                                galeriaStyles.cxEventos
                            }
                        >

                            <Pressable
                                style={({ pressed }) => [

                                    galeriaStyles.btnEventos,

                                    pressed &&
                                    galeriaStyles.btnPressed,

                                ]}
                                onPress={() => {

                                    // futuramente:
                                    // selecionar evento

                                }}
                            >

                                <Text
                                    style={
                                        galeriaStyles.txtEventos
                                    }
                                >
                                    Todos os eventos
                                </Text>

                            </Pressable>


                            <Pressable
                                style={({ pressed }) => [

                                    galeriaStyles.btnFiltro,

                                    pressed &&
                                    galeriaStyles.btnPressed,

                                ]}
                                onPress={() => {

                                    // futuramente:
                                    // abrir opções avançadas

                                }}
                            >

                                <Text
                                    style={
                                        galeriaStyles.txtFiltro
                                    }
                                >
                                    Filtrar
                                </Text>


                                <Image
                                    style={
                                        galeriaStyles.btnImgFiltro
                                    }
                                    source={require(
                                        "@/assets/images/img/olho.png"
                                    )}
                                />

                            </Pressable>

                        </View>


                        {/* =====================
                            DESTAQUES
                        ===================== */}

                        <View
                            style={
                                galeriaStyles.cxDestaque
                            }
                        >

                            <View
                                style={
                                    galeriaStyles.tituloDestaqueArea
                                }
                            >

                                <Text
                                    style={
                                        galeriaStyles.desTitulo
                                    }
                                >
                                    Destaques
                                </Text>


                                <Pressable
                                    style={
                                        galeriaStyles.deSubtitulo
                                    }
                                    onPress={() =>
                                        setFiltro("Todas")
                                    }
                                >

                                    <Text
                                        style={
                                            galeriaStyles.txtDestaque
                                        }
                                    >
                                        Ver todos
                                    </Text>

                                </Pressable>

                            </View>


                            {/* =================
                                CARROSSEL
                            ================= */}

                            <ScrollView
                                horizontal

                                showsHorizontalScrollIndicator={
                                    false
                                }

                                nestedScrollEnabled

                                contentContainerStyle={
                                    galeriaStyles.carrosselConteudo
                                }
                            >

                                {IMAGENS_BASE
                                    .slice(0, 5)
                                    .map((item) => (

                                        <Pressable
                                            key={item.id}

                                            style={({ pressed }) => [

                                                galeriaStyles.cardDestaque,

                                                pressed &&
                                                galeriaStyles.btnPressed,

                                            ]}
                                        >

                                            <Image
                                                style={
                                                    galeriaStyles.imgDestaque
                                                }
                                                source={
                                                    item.source
                                                }
                                            />

                                        </Pressable>

                                    ))}

                            </ScrollView>


                            {/* =================
                                FOTOS RECENTES
                            ================= */}

                            <Text
                                style={
                                    galeriaStyles.desTitulos
                                }
                            >
                                Fotos Recentes
                            </Text>


                            <View
                                style={
                                    galeriaStyles.gradeFotos
                                }
                            >

                                {imagensFiltradas.map(
                                    (item) => (

                                        <Pressable
                                            key={item.id}

                                            style={({ pressed }) => [

                                                galeriaStyles.cardFoto,

                                                pressed &&
                                                galeriaStyles.btnPressed,

                                            ]}
                                        >

                                            <Image
                                                style={
                                                    galeriaStyles.postImg
                                                }
                                                source={
                                                    item.source
                                                }
                                            />

                                        </Pressable>

                                    )
                                )}

                            </View>


                            {/* =================
                                SEM RESULTADOS
                            ================= */}

                            {imagensFiltradas.length ===
                                0 && (

                                    <View
                                        style={
                                            galeriaStyles.semResultados
                                        }
                                    >

                                        <Text
                                            style={
                                                galeriaStyles.txtSemResultados
                                            }
                                        >
                                            Nenhuma foto encontrada.
                                        </Text>

                                    </View>

                                )}


                        </View>


                    </ScrollView>


                    {/* =========================
                        FOOTER
                    ========================= */}

                    <MenuScreen />


                </SafeAreaView>


            </View>


        </View>

    );

}