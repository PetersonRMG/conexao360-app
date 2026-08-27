import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyles";
import MenuSreen from "./menu";
import HeaderCreen from "./header";
import { homeStyle } from "@/styles/homeStyles";

export default function HomeScreen() {

   

    return (
        <View style={[globalStyle.container, homeStyle.container]}>


            <HeaderCreen/>

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

                <Pressable style={homeStyle.filtroAtivo}>
                    <Text style={homeStyle.txtFiltroAtivo}>
                        Todas
                    </Text>
                </Pressable>

                <Pressable style={homeStyle.filtro}>
                    <Text style={homeStyle.txtFiltro}>
                        Recentes
                    </Text>
                </Pressable>

                <Pressable style={homeStyle.filtro}>
                    <Text style={homeStyle.txtFiltro}>
                        Em alta
                    </Text>
                </Pressable>

                <Pressable style={homeStyle.filtro}>
                    <Text style={homeStyle.txtFiltro}>
                        Meus posts
                    </Text>
                </Pressable>

            </View>


            {/* ================= CONTEÚDO ================= */}
            <ScrollView
                style={homeStyle.scroll}
                contentContainerStyle={homeStyle.scrollConteudo}
                showsVerticalScrollIndicator={false}
            >

                {/* ================= BANNER ================= */}
                <View style={homeStyle.bannerContainer}>

                    <Image
                        source={require("@/assets/images/img/banner 1.png")}
                        style={homeStyle.banner}
                    />

                </View>


                {/* INDICADORES DO BANNER */}
                <View style={homeStyle.indicadores}>

                    <View style={homeStyle.indicadorAtivo} />
                    <View style={homeStyle.indicador} />
                    <View style={homeStyle.indicador} />

                </View>


                {/* ================= TÍTULO ================= */}
                <Text style={homeStyle.tituloSecao}>
                    Publicações
                </Text>


                {/* ================= PUBLICAÇÃO 1 ================= */}
                <View style={homeStyle.cardPublicacao}>

                    {/* CABEÇALHO */}
                    <View style={homeStyle.publicacaoHeader}>

                        <Image
                            source={require("@/assets/images/img/avatar.png")}
                            style={homeStyle.avatarPublicacao}
                        />

                        <View style={homeStyle.autorContainer}>

                            <Text style={homeStyle.nomeAutor}>
                                Dr. Simone Baptista
                            </Text>

                            <Text style={homeStyle.tempoPublicacao}>
                                2h
                            </Text>

                        </View>

                    </View>


                    {/* TEXTO */}
                    <Text style={homeStyle.textoPublicacao}>
                        Compartilhando conhecimento, experiências e conexões
                        que fazem parte da nossa rede.
                    </Text>


                    {/* AÇÕES */}
                    <View style={homeStyle.acoesPublicacao}>

                        <Pressable style={homeStyle.acao}>

                            <Image
                                source={require("@/assets/images/img/heart.png")}
                                style={homeStyle.iconeAcao}
                            />

                            <Text style={homeStyle.txtAcao}>
                                Curtir
                            </Text>

                        </Pressable>


                        <Pressable style={homeStyle.acao}>

                            <Image
                                source={require("@/assets/images/img/coment.png")}
                                style={homeStyle.iconeAcao}
                            />

                            <Text style={homeStyle.txtAcao}>
                                Comentar
                            </Text>

                        </Pressable>


                        <Pressable style={homeStyle.acao}>

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


                {/* ================= PUBLICAÇÃO 2 ================= */}
                <View style={homeStyle.cardPublicacao}>

                    {/* CABEÇALHO */}
                    <View style={homeStyle.publicacaoHeader}>

                        <Image
                            source={require("@/assets/images/img/avatar.png")}
                            style={homeStyle.avatarPublicacao}
                        />

                        <View style={homeStyle.autorContainer}>

                            <Text style={homeStyle.nomeAutor}>
                                Dr. Simone Baptista
                            </Text>

                            <Text style={homeStyle.tempoPublicacao}>
                                3h
                            </Text>

                        </View>

                    </View>


                    {/* IMAGEM */}
                    <Image
                        source={require("@/assets/images/img/banner 1.png")}
                        style={homeStyle.imagemPublicacao}
                    />


                    {/* AÇÕES */}
                    <View style={homeStyle.acoesPublicacao}>

                        <Pressable style={homeStyle.acao}>

                            <Image
                                source={require("@/assets/images/img/heart.png")}
                                style={homeStyle.iconeAcao}
                            />

                            <Text style={homeStyle.txtAcao}>
                                Curtir
                            </Text>

                        </Pressable>


                        <Pressable style={homeStyle.acao}>

                            <Image
                                source={require("@/assets/images/img/coment.png")}
                                style={homeStyle.iconeAcao}
                            />

                            <Text style={homeStyle.txtAcao}>
                                Comentar
                            </Text>

                        </Pressable>


                        <Pressable style={homeStyle.acao}>

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

            </ScrollView>


            {/* ================= MENU INFERIOR ================= */}
            <MenuSreen/>

        </View>
    );
}