import {

    useEffect,

    useRef,

    useState,

} from "react";

import { router } from "expo-router";



import {

    View,

    Text,

    Image,

    TextInput,

    Pressable,

    ScrollView,

    Share,

    Animated,

} from "react-native";





import {

    SafeAreaView,

} from "react-native-safe-area-context";



import globalStyle from "@/styles/globalStyles";



import MenuSreen from "./menu";

import HeaderScreen from "./header";



import ComentariosModalScreen from "@/components/modalComentarios";



import {

    criarHomeStyle,

} from "@/styles/homeStyles";



import {

    useTema,

} from "@/contexts/TemaContext";



import {

    useAuth,

} from "@/contexts/AuthContext";



import {

    buscarPublicacoes,

    curtirPublicacao,

    descurtirPublicacao,

    getUrlMidiaPublicacao,

    Publicacao,

} from "@/services/publicacaoService";



import {

    getUrlFotoUsuario,

} from "@/services/usuarioService";



import { Ionicons } from "@expo/vector-icons";





type Filtro =

    | "Todas"

    | "Recentes"

    | "Em alta"

    | "Meus posts";





export default function HomeScreen() {



    // =====================================

    // TEMA

    // =====================================



    const {

        coresTema,

    } = useTema();





    const homeStyle =

        criarHomeStyle(

            coresTema

        );





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

    ] = useState<

        string | null

    >(null);





    // =====================================

    // FILTRO

    // =====================================



    const [

        filtro,

        setFiltro,

    ] = useState<Filtro>(

        "Todas"

    );





    // =====================================

    // CURTIDA EM PROCESSAMENTO

    // =====================================



    const [

        processandoCurtida,

        setProcessandoCurtida,

    ] = useState<

        number | null

    >(null);





    // =====================================

    // MODAL DE COMENTÁRIOS

    // =====================================



    const [

        comentariosAberto,

        setComentariosAberto,

    ] = useState(false);





    const [

        postSelecionado,

        setPostSelecionado,

    ] = useState<

        number | null

    >(null);





    // =====================================

    // PLACEHOLDER

    // =====================================



    const placeholderOpacity =

        useRef(

            new Animated.Value(

                0.35

            )

        ).current;





    useEffect(() => {



        if (!carregando) {



            return;



        }





        const animacao =

            Animated.loop(



                Animated.sequence([



                    Animated.timing(

                        placeholderOpacity,

                        {

                            toValue: 0.8,

                            duration: 700,

                            useNativeDriver: true,

                        }

                    ),



                    Animated.timing(

                        placeholderOpacity,

                        {

                            toValue: 0.35,

                            duration: 700,

                            useNativeDriver: true,

                        }

                    ),



                ])

            );





        animacao.start();





        return () => {



            animacao.stop();



        };



    }, [

        carregando,

        placeholderOpacity,

    ]);





    // =====================================

    // BUSCAR PUBLICAÇÕES

    // =====================================



    useEffect(() => {



        let telaAtiva =

            true;





        async function carregarPublicacoes() {



            if (!token) {



                if (telaAtiva) {



                    setErro(

                        "Sessão não encontrada. Faça login novamente."

                    );



                    setCarregando(

                        false

                    );



                }





                return;



            }





            try {



                setCarregando(

                    true

                );



                setErro(

                    null

                );





                const resposta =

                    await buscarPublicacoes(

                        token

                    );





                console.log(

                    "PUBLICAÇÕES:",

                    resposta

                );





                if (

                    !resposta.success

                ) {



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



                    setCarregando(

                        false

                    );



                }



            }



        }





        carregarPublicacoes();





        return () => {



            telaAtiva =

                false;



        };



    }, [token]);





    // =====================================

    // FILTRAR PUBLICAÇÕES

    // =====================================



    const publicacoesFiltradas =

        (() => {



            let resultado =

                [...publicacoes];





            // =============================

            // MEUS POSTS

            // =============================



            if (

                filtro ===

                "Meus posts"

            ) {



                resultado =

                    resultado.filter(

                        (

                            publicacao

                        ) =>



                            publicacao.id_usuario ===

                            usuario?.id_usuario

                    );



            }





            // =============================

            // RECENTES

            // =============================



            if (

                filtro ===

                "Recentes"

            ) {



                resultado.sort(

                    (

                        a,

                        b

                    ) => {



                        const dataA =

                            new Date(

                                a.criado_em_publicacao

                            ).getTime();





                        const dataB =

                            new Date(

                                b.criado_em_publicacao

                            ).getTime();





                        return (

                            dataB -

                            dataA

                        );



                    }

                );



            }





            // =============================

            // EM ALTA

            // =============================



            if (

                filtro ===

                "Em alta"

            ) {



                resultado.sort(

                    (

                        a,

                        b

                    ) => {



                        const totalA =

                            (

                                a.curtidas_count ??

                                0

                            )

                            +

                            (

                                a.comentarios_count ??

                                0

                            );





                        const totalB =

                            (

                                b.curtidas_count ??

                                0

                            )

                            +

                            (

                                b.comentarios_count ??

                                0

                            );





                        return (

                            totalB -

                            totalA

                        );



                    }

                );



            }





            return resultado;



        })();





    // =====================================

    // CURTIR / DESCURTIR

    // =====================================



    async function alternarCurtida(

        publicacao: Publicacao

    ) {



        if (!token) {



            return;



        }





        if (

            processandoCurtida ===

            publicacao.id_publicacao

        ) {



            return;



        }





        try {



            setProcessandoCurtida(

                publicacao.id_publicacao

            );





            const jaCurtiu =

                Boolean(

                    publicacao

                        .curtido_por_mim

                );





            const resposta =

                jaCurtiu



                    ? await descurtirPublicacao(

                        token,

                        publicacao.id_publicacao

                    )



                    : await curtirPublicacao(

                        token,

                        publicacao.id_publicacao

                    );





            if (

                !resposta.success

            ) {



                throw new Error(

                    "Não foi possível atualizar a curtida."

                );



            }





            setPublicacoes(

                (

                    atuais

                ) =>



                    atuais.map(

                        (

                            item

                        ) => {



                            if (

                                item.id_publicacao !==

                                publicacao.id_publicacao

                            ) {



                                return item;



                            }





                            return {



                                ...item,



                                curtido_por_mim:

                                    resposta

                                        .data

                                        .curtido_por_mim,



                                curtidas_count:

                                    resposta

                                        .data

                                        .curtidas_count,



                            };



                        }

                    )

            );





        } catch (error) {



            console.log(

                "ERRO CURTIDA:",

                error

            );





        } finally {



            setProcessandoCurtida(

                null

            );



        }



    }





    // =====================================

    // ABRIR COMENTÁRIOS

    // =====================================



    function abrirComentarios(

        idPublicacao: number

    ) {



        setPostSelecionado(

            idPublicacao

        );





        setComentariosAberto(

            true

        );



    }





    // =====================================

    // FECHAR COMENTÁRIOS

    // =====================================



    function fecharComentarios() {



        setComentariosAberto(

            false

        );





        setPostSelecionado(

            null

        );



    }





    // =====================================

    // COMENTÁRIO ENVIADO

    // =====================================



    function comentarioEnviado(

        totalComentarios?: number

    ) {



        if (

            postSelecionado ===

            null

        ) {



            return;



        }





        setPublicacoes(

            (

                atuais

            ) =>



                atuais.map(

                    (

                        publicacao

                    ) => {



                        if (

                            publicacao.id_publicacao !==

                            postSelecionado

                        ) {



                            return publicacao;



                        }





                        return {



                            ...publicacao,



                            comentarios_count:

                                totalComentarios !==

                                    undefined



                                    ? totalComentarios



                                    : (

                                        publicacao

                                            .comentarios_count ??

                                        0

                                    ) + 1,



                        };



                    }

                )

        );



    }





    // =====================================

    // ABRIR PERFIL DO USUÁRIO

    // =====================================



    function abrirPerfilUsuario(

        idUsuario?: number

    ) {



        if (!idUsuario) {



            return;



        }



        router.push({

            pathname: "/perfil",

            params: {

                idUsuario:

                    String(idUsuario),

            },

        });



    }




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

            new Date(

                data

            );





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

                    publicacao

                        .texto_publicacao

                    ??

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

                            "Recentes",

                            "Em alta",

                            "Meus posts",

                        ].map(

                            (

                                item

                            ) => {



                                const ativo =

                                    filtro ===

                                    item;





                                return (



                                    <Pressable

                                        key={

                                            item

                                        }



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



                                            {

                                                item

                                            }



                                        </Text>



                                    </Pressable>



                                );



                            }

                        )}



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





                        {/* ================= PLACEHOLDERS ================= */}



                        {carregando && (



                            <>



                                {[1, 2, 3].map(

                                    (

                                        item

                                    ) => (



                                        <View

                                            key={

                                                item

                                            }



                                            style={

                                                homeStyle.cardPublicacao

                                            }

                                        >



                                            <Animated.View

                                                style={{

                                                    opacity:

                                                        placeholderOpacity,

                                                }}

                                            >



                                                {/* AUTOR */}



                                                <View

                                                    style={

                                                        homeStyle.skeletonHeader

                                                    }

                                                >



                                                    <View

                                                        style={

                                                            homeStyle.skeletonAvatar

                                                        }

                                                    />





                                                    <View

                                                        style={

                                                            homeStyle.skeletonAutor

                                                        }

                                                    >



                                                        <View

                                                            style={[

                                                                homeStyle.skeletonLinha,

                                                                homeStyle.skeletonNome,

                                                            ]}

                                                        />



                                                        <View

                                                            style={[

                                                                homeStyle.skeletonLinhaPequena,

                                                                homeStyle.skeletonData,

                                                            ]}

                                                        />



                                                    </View>



                                                </View>





                                                {/* TEXTO */}



                                                <View

                                                    style={[

                                                        homeStyle.skeletonLinha,

                                                        homeStyle.skeletonTexto1,

                                                    ]}

                                                />



                                                <View

                                                    style={[

                                                        homeStyle.skeletonLinha,

                                                        homeStyle.skeletonTexto2,

                                                    ]}

                                                />



                                                <View

                                                    style={[

                                                        homeStyle.skeletonLinha,

                                                        homeStyle.skeletonTexto3,

                                                    ]}

                                                />





                                                {/* IMAGEM */}



                                                <View

                                                    style={

                                                        homeStyle.skeletonImagem

                                                    }

                                                />





                                                {/* CONTADORES */}



                                                <View

                                                    style={

                                                        homeStyle.skeletonContadores

                                                    }

                                                >



                                                    <View

                                                        style={

                                                            homeStyle.skeletonContadorCurto

                                                        }

                                                    />



                                                    <View

                                                        style={

                                                            homeStyle.skeletonContadorLongo

                                                        }

                                                    />



                                                </View>





                                                {/* AÇÕES */}



                                                <View

                                                    style={

                                                        homeStyle.skeletonAcoes

                                                    }

                                                >



                                                    <View

                                                        style={

                                                            homeStyle.skeletonAcao

                                                        }

                                                    />



                                                    <View

                                                        style={

                                                            homeStyle.skeletonAcao

                                                        }

                                                    />



                                                    <View

                                                        style={

                                                            homeStyle.skeletonAcao

                                                        }

                                                    />



                                                </View>



                                            </Animated.View>



                                        </View>



                                    )

                                )}



                            </>



                        )}





                        {/* ================= ERRO ================= */}



                        {!carregando &&

                            erro && (



                                <Text

                                    style={

                                        homeStyle.semPublicacoes

                                    }

                                >



                                    {

                                        erro

                                    }



                                </Text>



                            )}





                        {/* ================= PUBLICAÇÕES ================= */}



                        {!carregando &&

                            !erro &&

                            publicacoesFiltradas.map(

                                (

                                    publicacao

                                ) => {





                                    // =============================

                                    // FOTO

                                    // =============================



                                    const fotoAutor =

                                        getUrlFotoUsuario(



                                            publicacao

                                                .usuario

                                                ?.foto_usuario

                                            ??

                                            null



                                        );





                                    // =============================

                                    // MÍDIA

                                    // =============================



                                    const midia =

                                        getUrlMidiaPublicacao(



                                            publicacao

                                                .midia_publicacao



                                        );





                                    // =============================

                                    // CURTIDA

                                    // =============================



                                    const curtido =

                                        Boolean(



                                            publicacao

                                                .curtido_por_mim



                                        );





                                    const quantidadeCurtidas =

                                        publicacao

                                            .curtidas_count

                                        ??

                                        0;





                                    const quantidadeComentarios =

                                        publicacao

                                            .comentarios_count

                                        ??

                                        0;





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



                                                {/* FOTO DO AUTOR */}



                                                <Pressable

                                                    onPress={() =>

                                                        abrirPerfilUsuario(

                                                            publicacao.usuario

                                                                ?.id_usuario

                                                        )

                                                    }

                                                >



                                                    <Image

                                                        source={

                                                            fotoAutor

                                                                ? {

                                                                    uri: fotoAutor,

                                                                }

                                                                : require(

                                                                    "@/assets/images/img/avatar.png"

                                                                )

                                                        }

                                                        style={

                                                            homeStyle.avatarPublicacao

                                                        }

                                                        resizeMode="cover"

                                                    />



                                                </Pressable>





                                                {/* NOME + DATA */}



                                                <Pressable

                                                    style={

                                                        homeStyle.autorContainer

                                                    }

                                                    onPress={() =>

                                                        abrirPerfilUsuario(

                                                            publicacao.usuario

                                                                ?.id_usuario

                                                        )

                                                    }

                                                >



                                                    <Text

                                                        style={

                                                            homeStyle.nomeAutor

                                                        }

                                                    >

                                                        {

                                                            publicacao.usuario

                                                                ?.nome_usuario

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



                                                </Pressable>



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

                                                        uri:

                                                            midia,

                                                    }}



                                                    style={

                                                        homeStyle.imagemPublicacao

                                                    }



                                                    resizeMode="cover"

                                                />



                                            )}





                                            {/* ================= CONTADORES ================= */}



                                            <View

                                                style={

                                                    homeStyle.areaContadores

                                                }

                                            >



                                                <Text

                                                    style={

                                                        homeStyle.txtContador

                                                    }

                                                >



                                                    {

                                                        quantidadeCurtidas

                                                    }{" "}



                                                    {

                                                        quantidadeCurtidas ===

                                                            1



                                                            ? "curtida"



                                                            : "curtidas"

                                                    }



                                                </Text>





                                                <Pressable

                                                    onPress={() =>

                                                        abrirComentarios(



                                                            publicacao

                                                                .id_publicacao



                                                        )

                                                    }

                                                >



                                                    <Text

                                                        style={

                                                            homeStyle.txtContador

                                                        }

                                                    >



                                                        {

                                                            quantidadeComentarios

                                                        }{" "}



                                                        {

                                                            quantidadeComentarios ===

                                                                1



                                                                ? "comentário"



                                                                : "comentários"

                                                        }



                                                    </Text>



                                                </Pressable>



                                            </View>





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



                                                    disabled={

                                                        processandoCurtida ===

                                                        publicacao.id_publicacao

                                                    }



                                                    onPress={() =>

                                                        alternarCurtida(

                                                            publicacao

                                                        )

                                                    }

                                                >



                                                    <Ionicons

                                                        name={

                                                            curtido

                                                                ? "heart"

                                                                : "heart-outline"

                                                        }



                                                        size={17}



                                                        color={

                                                            curtido

                                                                ? coresTema.destaque

                                                                : coresTema.texto

                                                        }



                                                        style={{

                                                            opacity:

                                                                curtido

                                                                    ? 1

                                                                    : 0.7,

                                                        }}

                                                    />





                                                    <Text

                                                        style={[

                                                            homeStyle.txtAcao,



                                                            curtido &&

                                                            homeStyle.txtAcaoAtivo,

                                                        ]}

                                                    >



                                                        {

                                                            curtido

                                                                ? "Curtido"

                                                                : "Curtir"

                                                        }



                                                    </Text>



                                                </Pressable>





                                                {/* COMENTAR */}



                                                <Pressable

                                                    style={

                                                        homeStyle.acao

                                                    }



                                                    onPress={() =>

                                                        abrirComentarios(



                                                            publicacao

                                                                .id_publicacao



                                                        )

                                                    }

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





                    {/* ================= MODAL COMENTÁRIOS ================= */}



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