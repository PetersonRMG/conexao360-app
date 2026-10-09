import { useEffect, useState } from "react";

import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    Share,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import globalStyle from "@/styles/globalStyles";

import MenuSreen from "./menu";
import HeaderScreen from "./header";

import { criarHomeStyle } from "@/styles/homeStyles";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";

import {
    buscarPublicacoes,
    getUrlMidiaPublicacao,
    Publicacao,
} from "@/services/publicacaoService";

import {
    getUrlFotoUsuario,
} from "@/services/usuarioService";


type Filtro =
    | "Todas"
    | "Meus posts";


export default function HomeScreen() {

    const { coresTema } = useTema();

    const homeStyle =
        criarHomeStyle(coresTema);


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

    const [
        publicacoes,
        setPublicacoes,
    ] = useState<Publicacao[]>([]);


    const [
        carregando,
        setCarregando,
    ] = useState(true);


    const [
        erro,
        setErro,
    ] = useState<string | null>(null);


    // =====================================
    // FILTRO
    // =====================================

    const [
        filtro,
        setFiltro,
    ] = useState<Filtro>("Todas");


    // =====================================
    // BUSCAR PUBLICAÇÕES
    // =====================================

    useEffect(() => {

        let telaAtiva = true;


        async function carregarPublicacoes() {

            if (!token) {

                if (telaAtiva) {

                    setErro(
                        "Sessão não encontrada. Faça login novamente."
                    );

                    setCarregando(false);

                }

                return;

            }


            try {

                setCarregando(true);

                setErro(null);


                const resposta =
                    await buscarPublicacoes(token);


                console.log(
                    "PUBLICAÇÕES:",
                    resposta
                );


                if (!resposta.success) {

                    throw new Error(
                        "Não foi possível carregar as publicações."
                    );

                }


                if (telaAtiva) {

                    setPublicacoes(
                        resposta.data ?? []
                    );

                }


            } catch (error) {

                console.log(
                    "ERRO PUBLICAÇÕES:",
                    error
                );


                if (telaAtiva) {

                    setErro(
                        error instanceof Error
                            ? error.message
                            : "Não foi possível carregar as publicações."
                    );

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

    }, [token]);


    // =====================================
    // FILTRAR PUBLICAÇÕES
    // =====================================

    const publicacoesFiltradas =
        publicacoes.filter((publicacao) => {

            if (
                filtro === "Meus posts"
            ) {

                return (
                    publicacao.id_usuario ===
                    usuario?.id_usuario
                );

            }


            return true;

        });


    // =====================================
    // FORMATAR DATA
    // =====================================

    function formatarData(
        data: string
    ) {

        if (!data) {

            return "";

        }


        const dataPublicacao =
            new Date(data);


        if (
            Number.isNaN(
                dataPublicacao.getTime()
            )
        ) {

            return "";

        }


        return dataPublicacao
            .toLocaleDateString(
                "pt-BR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }
            );

    }


    // =====================================
    // COMPARTILHAR
    // =====================================

    async function compartilharPost(
        publicacao: Publicacao
    ) {

        try {

            await Share.share({

                message:
                    publicacao.texto_publicacao ??
                    "Confira esta publicação no Conexão 360°.",

            });


        } catch (error) {

            console.log(
                "ERRO COMPARTILHAR:",
                error
            );

        }

    }


    // =====================================
    // TELA
    // =====================================

    return (

        <View
            style={
                globalStyle.container
            }
        >

            <View
                style={[
                    globalStyle.background,
                    homeStyle.container,
                ]}
            >

                <SafeAreaView
                    style={
                        globalStyle.areaConteudo
                    }
                >


                    {/* ================= HEADER ================= */}

                    <HeaderScreen />


                    {/* ================= BUSCA ================= */}

                    <View
                        style={
                            homeStyle.areaBusca
                        }
                    >

                        <View
                            style={
                                homeStyle.inputBusca
                            }
                        >

                            <Image
                                source={require(
                                    "@/assets/images/img/search.png"
                                )}
                                style={
                                    homeStyle.iconeBusca
                                }
                            />


                            <TextInput
                                style={
                                    homeStyle.txtBusca
                                }
                                placeholder="Buscar"
                                placeholderTextColor="#888888"
                            />

                        </View>

                    </View>


                    {/* ================= FILTROS ================= */}

                    <View
                        style={
                            homeStyle.filtros
                        }
                    >

                        {[
                            "Todas",
                            "Meus posts",
                        ].map((item) => {

                            const ativo =
                                filtro === item;


                            return (

                                <Pressable
                                    key={item}

                                    style={[
                                        homeStyle.filtro,

                                        ativo &&
                                        homeStyle.filtroAtivo,
                                    ]}

                                    onPress={() =>
                                        setFiltro(
                                            item as Filtro
                                        )
                                    }
                                >

                                    <Text
                                        style={[
                                            homeStyle.txtFiltro,

                                            ativo &&
                                            homeStyle.txtFiltroAtivo,
                                        ]}
                                    >

                                        {item}

                                    </Text>

                                </Pressable>

                            );

                        })}

                    </View>


                    {/* ================= CONTEÚDO ================= */}

                    <ScrollView
                        style={
                            homeStyle.scroll
                        }

                        contentContainerStyle={
                            homeStyle.scrollConteudo
                        }

                        showsVerticalScrollIndicator={
                            false
                        }

                        keyboardShouldPersistTaps="handled"
                    >


                        {/* ================= BANNER ================= */}

                        <View
                            style={
                                homeStyle.bannerContainer
                            }
                        >

                            <Image
                                source={require(
                                    "@/assets/images/img/banner 1.png"
                                )}
                                style={
                                    homeStyle.banner
                                }
                            />

                        </View>


                        {/* ================= INDICADORES ================= */}

                        <View
                            style={
                                homeStyle.indicadores
                            }
                        >

                            <View
                                style={
                                    homeStyle.indicadorAtivo
                                }
                            />

                            <View
                                style={
                                    homeStyle.indicador
                                }
                            />

                            <View
                                style={
                                    homeStyle.indicador
                                }
                            />

                        </View>


                        {/* ================= TÍTULO ================= */}

                        <Text
                            style={
                                homeStyle.tituloSecao
                            }
                        >
                            Publicações
                        </Text>


                        {/* ================= CARREGANDO ================= */}

                        {carregando && (

                            <Text
                                style={
                                    homeStyle.semPublicacoes
                                }
                            >
                                Carregando publicações...
                            </Text>

                        )}


                        {/* ================= ERRO ================= */}

                        {!carregando &&
                            erro && (

                                <Text
                                    style={
                                        homeStyle.semPublicacoes
                                    }
                                >
                                    {erro}
                                </Text>

                            )}


                        {/* ================= PUBLICAÇÕES ================= */}

                        {!carregando &&
                            !erro &&
                            publicacoesFiltradas.map(
                                (publicacao) => {


                                    // =====================================
                                    // FOTO DO AUTOR
                                    // =====================================

                                    const fotoAutor =
                                        getUrlFotoUsuario(
                                            publicacao
                                                .usuario
                                                ?.foto_usuario ??
                                            null
                                        );


                                    // =====================================
                                    // MÍDIA
                                    // =====================================

                                    const midia =
                                        getUrlMidiaPublicacao(
                                            publicacao
                                                .midia_publicacao
                                        );


                                    return (

                                        <View
                                            key={
                                                publicacao
                                                    .id_publicacao
                                            }

                                            style={
                                                homeStyle.cardPublicacao
                                            }
                                        >


                                            {/* ================= AUTOR ================= */}

                                            <View
                                                style={
                                                    homeStyle.publicacaoHeader
                                                }
                                            >


                                                {fotoAutor ? (

                                                    <Image
                                                        source={{
                                                            uri: fotoAutor,
                                                        }}

                                                        style={
                                                            homeStyle.avatarPublicacao
                                                        }

                                                        resizeMode="cover"
                                                    />

                                                ) : (

                                                    <Image
                                                        source={require(
                                                            "@/assets/images/img/avatar.png"
                                                        )}

                                                        style={
                                                            homeStyle.avatarPublicacao
                                                        }

                                                        resizeMode="cover"
                                                    />

                                                )}


                                                <View
                                                    style={
                                                        homeStyle.autorContainer
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            homeStyle.nomeAutor
                                                        }
                                                    >

                                                        {
                                                            publicacao
                                                                .usuario
                                                                ?.nome_usuario ??
                                                            "Usuário"
                                                        }

                                                    </Text>


                                                    <Text
                                                        style={
                                                            homeStyle.tempoPublicacao
                                                        }
                                                    >

                                                        {
                                                            formatarData(
                                                                publicacao
                                                                    .criado_em_publicacao
                                                            )
                                                        }

                                                    </Text>

                                                </View>

                                            </View>


                                            {/* ================= TEXTO ================= */}

                                            {publicacao
                                                .texto_publicacao && (

                                                    <Text
                                                        style={
                                                            homeStyle.textoPublicacao
                                                        }
                                                    >

                                                        {
                                                            publicacao
                                                                .texto_publicacao
                                                        }

                                                    </Text>

                                                )}


                                            {/* ================= MÍDIA ================= */}

                                            {midia && (

                                                <Image
                                                    source={{
                                                        uri: midia,
                                                    }}

                                                    style={
                                                        homeStyle.imagemPublicacao
                                                    }

                                                    resizeMode="cover"
                                                />

                                            )}


                                            {/* ================= AÇÕES ================= */}

                                            <View
                                                style={
                                                    homeStyle.acoesPublicacao
                                                }
                                            >


                                                {/* CURTIR */}

                                                <Pressable
                                                    style={
                                                        homeStyle.acao
                                                    }

                                                    disabled
                                                >

                                                    <Image
                                                        source={require(
                                                            "@/assets/images/img/heart.png"
                                                        )}

                                                        style={
                                                            homeStyle.iconeAcao
                                                        }
                                                    />


                                                    <Text
                                                        style={
                                                            homeStyle.txtAcao
                                                        }
                                                    >
                                                        Curtir
                                                    </Text>

                                                </Pressable>


                                                {/* COMENTAR */}

                                                <Pressable
                                                    style={
                                                        homeStyle.acao
                                                    }

                                                    disabled
                                                >

                                                    <Image
                                                        source={require(
                                                            "@/assets/images/img/coment.png"
                                                        )}

                                                        style={
                                                            homeStyle.iconeAcao
                                                        }
                                                    />


                                                    <Text
                                                        style={
                                                            homeStyle.txtAcao
                                                        }
                                                    >
                                                        Comentar
                                                    </Text>

                                                </Pressable>


                                                {/* COMPARTILHAR */}

                                                <Pressable
                                                    style={
                                                        homeStyle.acao
                                                    }

                                                    onPress={() =>
                                                        compartilharPost(
                                                            publicacao
                                                        )
                                                    }
                                                >

                                                    <Image
                                                        source={require(
                                                            "@/assets/images/img/share.png"
                                                        )}

                                                        style={
                                                            homeStyle.iconeAcao
                                                        }
                                                    />


                                                    <Text
                                                        style={
                                                            homeStyle.txtAcao
                                                        }
                                                    >
                                                        Compartilhar
                                                    </Text>

                                                </Pressable>


                                            </View>


                                        </View>

                                    );

                                }
                            )}


                        {/* ================= SEM PUBLICAÇÕES ================= */}

                        {!carregando &&
                            !erro &&
                            publicacoesFiltradas.length ===
                            0 && (

                                <Text
                                    style={
                                        homeStyle.semPublicacoes
                                    }
                                >
                                    Nenhuma publicação encontrada.
                                </Text>

                            )}


                    </ScrollView>


                    {/* ================= FOOTER ================= */}

                    <MenuSreen />


                </SafeAreaView>

            </View>

        </View>

    );

}