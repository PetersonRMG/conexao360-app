import { useState } from "react";
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
import HeaderCreen from "./header";
import ComentariosModalScreen from "@/components/modalComentarios";

import { criarHomeStyle } from "@/styles/homeStyles";
import { useTema } from "@/contexts/TemaContext";



type Filtro = "Todas" | "Recentes" | "Em alta" | "Meus posts";


interface Post {
    id: number;
    autor: string;
    tempo: string;
    texto?: string;
    imagem?: boolean;

    recente: boolean;
    emAlta: boolean;
    meu: boolean;

    curtidas: number;
    comentarios: number;
}


export default function HomeScreen() {

    const { coresTema } = useTema();

    const homeStyle = criarHomeStyle(coresTema);

    // =====================================
    // FILTRO ATIVO
    // =====================================
    const [filtro, setFiltro] = useState<Filtro>("Todas");


    // =====================================
    // POSTS
    // =====================================
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            autor: "Dr. Simone Baptista",
            tempo: "2h",

            texto:
                "Compartilhando conhecimento, experiências e conexões que fazem parte da nossa rede.",

            recente: true,
            emAlta: false,
            meu: false,

            curtidas: 12,
            comentarios: 3,
        },

        {
            id: 2,
            autor: "Dr. Simone Baptista",
            tempo: "3h",

            imagem: true,

            recente: false,
            emAlta: true,
            meu: false,

            curtidas: 27,
            comentarios: 8,
        },

        {
            id: 3,
            autor: "Fernanda Silva",
            tempo: "5h",

            texto:
                "Muito feliz em participar da comunidade Conexão 360.",

            recente: false,
            emAlta: false,
            meu: true,

            curtidas: 5,
            comentarios: 1,
        },
    ]);


    // =====================================
    // POSTS CURTIDOS
    // =====================================
    const [curtidos, setCurtidos] = useState<number[]>([]);


    // =====================================
    // MODAL DE COMENTÁRIOS
    // =====================================
    const [comentariosAberto, setComentariosAberto] =
        useState(false);

    const [postSelecionado, setPostSelecionado] =
        useState<number | null>(null);


    // =====================================
    // FILTRAR POSTS
    // =====================================
    const postsFiltrados = posts.filter((post) => {

        if (filtro === "Recentes") {
            return post.recente;
        }

        if (filtro === "Em alta") {
            return post.emAlta;
        }

        if (filtro === "Meus posts") {
            return post.meu;
        }

        return true;

    });


    // =====================================
    // CURTIR
    // =====================================
    const curtirPost = (id: number) => {

        const jaCurtiu = curtidos.includes(id);


        setCurtidos((current) => {

            if (jaCurtiu) {

                return current.filter(
                    (postId) => postId !== id
                );

            }

            return [...current, id];

        });


        setPosts((current) =>
            current.map((post) => {

                if (post.id !== id) {
                    return post;
                }

                return {
                    ...post,

                    curtidas:
                        jaCurtiu
                            ? post.curtidas - 1
                            : post.curtidas + 1,
                };

            })
        );

    };


    // =====================================
    // ABRIR COMENTÁRIOS
    // =====================================
    const abrirComentarios = (id: number) => {

        setPostSelecionado(id);

        setComentariosAberto(true);

    };


    // =====================================
    // FECHAR COMENTÁRIOS
    // =====================================
    const fecharComentarios = () => {

        setComentariosAberto(false);

        setPostSelecionado(null);

    };


    // =====================================
    // ATUALIZAR CONTADOR DE COMENTÁRIOS
    // =====================================
    const comentarioEnviado = () => {

        if (postSelecionado === null) {
            return;
        }

        setPosts((current) =>
            current.map((post) => {

                if (post.id !== postSelecionado) {
                    return post;
                }

                return {
                    ...post,
                    comentarios:
                        post.comentarios + 1,
                };

            })
        );

    };


    // =====================================
    // COMPARTILHAR
    // =====================================
    const compartilharPost = async (post: Post) => {

        await Share.share({
            message:
                post.texto ??
                "Confira esta publicação no Conexão 360°.",
        });

    };


    return (

        // =====================================
        // FUNDO EXTERNO
        // =====================================
        <View style={globalStyle.container}>


            {/* =================================
                LIMITE 440px
            ================================= */}
            <View
                style={[
                    globalStyle.background,
                    homeStyle.container,
                ]}
            >


                <SafeAreaView style={globalStyle.areaConteudo}>


                    {/* ================= HEADER ================= */}
                    <HeaderCreen />


                    {/* ================= BUSCA ================= */}
                    <View style={homeStyle.areaBusca}>

                        <View style={homeStyle.inputBusca}>

                            <Image
                                source={require("@/assets/images/img/search.png")}
                                style={homeStyle.iconeBusca}
                            />

                            <TextInput
                                style={homeStyle.txtBusca}
                                placeholder="Buscar"
                                placeholderTextColor="#888888"
                            />

                        </View>

                    </View>


                    {/* ================= FILTROS ================= */}
                    <View style={homeStyle.filtros}>

                        {[
                            "Todas",
                            "Recentes",
                            "Em alta",
                            "Meus posts",
                        ].map((item) => {

                            const ativo = filtro === item;

                            return (

                                <Pressable
                                    key={item}

                                    style={[
                                        homeStyle.filtro,

                                        ativo &&
                                        homeStyle.filtroAtivo,
                                    ]}

                                    onPress={() =>
                                        setFiltro(item as Filtro)
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
                        style={homeStyle.scroll}
                        contentContainerStyle={homeStyle.scrollConteudo}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >


                        {/* ================= BANNER ================= */}
                        <View style={homeStyle.bannerContainer}>

                            <Image
                                source={require("@/assets/images/img/banner 1.png")}
                                style={homeStyle.banner}
                            />

                        </View>


                        {/* INDICADORES */}
                        <View style={homeStyle.indicadores}>

                            <View style={homeStyle.indicadorAtivo} />
                            <View style={homeStyle.indicador} />
                            <View style={homeStyle.indicador} />

                        </View>


                        {/* ================= TÍTULO ================= */}
                        <Text style={homeStyle.tituloSecao}>
                            Publicações
                        </Text>


                        {/* ================= POSTS ================= */}
                        {postsFiltrados.map((post) => {

                            const curtido =
                                curtidos.includes(post.id);


                            return (

                                <View
                                    key={post.id}
                                    style={homeStyle.cardPublicacao}
                                >


                                    {/* ================= AUTOR ================= */}
                                    <View style={homeStyle.publicacaoHeader}>

                                        <Image
                                            source={require("@/assets/images/img/avatar.png")}
                                            style={homeStyle.avatarPublicacao}
                                        />


                                        <View style={homeStyle.autorContainer}>

                                            <Text style={homeStyle.nomeAutor}>
                                                {post.autor}
                                            </Text>

                                            <Text style={homeStyle.tempoPublicacao}>
                                                {post.tempo}
                                            </Text>

                                        </View>

                                    </View>


                                    {/* ================= TEXTO ================= */}
                                    {post.texto && (

                                        <Text style={homeStyle.textoPublicacao}>
                                            {post.texto}
                                        </Text>

                                    )}


                                    {/* ================= IMAGEM ================= */}
                                    {post.imagem && (

                                        <Image
                                            source={require("@/assets/images/img/banner 1.png")}
                                            style={homeStyle.imagemPublicacao}
                                        />

                                    )}


                                    {/* ================= NÚMEROS ================= */}
                                    <View style={homeStyle.areaContadores}>

                                        <Text style={homeStyle.txtContador}>
                                            {post.curtidas} curtidas
                                        </Text>

                                        <Text style={homeStyle.txtContador}>
                                            {post.comentarios} comentários
                                        </Text>

                                    </View>


                                    {/* ================= AÇÕES ================= */}
                                    <View style={homeStyle.acoesPublicacao}>


                                        {/* CURTIR */}
                                        <Pressable
                                            style={homeStyle.acao}
                                            onPress={() =>
                                                curtirPost(post.id)
                                            }
                                        >

                                            <Image
                                                source={require("@/assets/images/img/heart.png")}
                                                style={[
                                                    homeStyle.iconeAcao,

                                                    curtido &&
                                                    homeStyle.iconeAcaoAtivo,
                                                ]}
                                            />

                                            <Text
                                                style={[
                                                    homeStyle.txtAcao,

                                                    curtido &&
                                                    homeStyle.txtAcaoAtivo,
                                                ]}
                                            >
                                                {curtido
                                                    ? "Curtido"
                                                    : "Curtir"
                                                }
                                            </Text>

                                        </Pressable>


                                        {/* COMENTAR */}
                                        <Pressable
                                            style={homeStyle.acao}
                                            onPress={() =>
                                                abrirComentarios(
                                                    post.id
                                                )
                                            }
                                        >

                                            <Image
                                                source={require("@/assets/images/img/coment.png")}
                                                style={homeStyle.iconeAcao}
                                            />

                                            <Text style={homeStyle.txtAcao}>
                                                Comentar
                                            </Text>

                                        </Pressable>


                                        {/* COMPARTILHAR */}
                                        <Pressable
                                            style={homeStyle.acao}
                                            onPress={() =>
                                                compartilharPost(post)
                                            }
                                        >

                                            <Image
                                                source={require("@/assets/images/img/share.png")}
                                                style={homeStyle.iconeAcao}
                                            />

                                            <Text style={homeStyle.txtAcao}>
                                                Compartilhar
                                            </Text>

                                        </Pressable>


                                    </View>


                                </View>

                            );

                        })}


                        {/* SEM RESULTADOS */}
                        {postsFiltrados.length === 0 && (

                            <Text style={homeStyle.semPublicacoes}>
                                Nenhuma publicação encontrada.
                            </Text>

                        )}


                    </ScrollView>


                    {/* ================= FOOTER ================= */}
                    <MenuSreen />


                    {/* ================= MODAL DE COMENTÁRIOS ================= */}
                    <ComentariosModalScreen
                        visible={
                            comentariosAberto
                        }
                        postId={
                            postSelecionado
                        }
                        onClose={
                            fecharComentarios
                        }
                        onComentarioEnviado={
                            comentarioEnviado
                        }
                    />


                </SafeAreaView>


            </View>


        </View>

    );
}