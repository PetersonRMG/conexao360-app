import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";

import HeaderScreen from "@/app/header";
import MenuScreen from "@/app/menu";
import { galeriaStyles } from "@/styles/galeriaStyles";
import globalStyle from "@/styles/globalStyles";

const IMAGENS_BASE = Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
    source: require("@/assets/images/img/imagem.png"),
}));

export default function GaleriaScreen() {
    const [imagens] = useState(IMAGENS_BASE);

    return (
        <View style={globalStyle.containerG}>
            <HeaderScreen />

            <ScrollView contentContainerStyle={globalStyle.conteudoG}>
                <Text style={galeriaStyles.titulo}>Galeria</Text>
                <Text style={galeriaStyles.galeriaTxt}>Compartilhe os melhores </Text>
                <Text style={galeriaStyles.galeriaTxt}>momentos dos eventos</Text>

                <Pressable
                    style={galeriaStyles.btnGaleria}
                    onPress={() => alert("Botão pressionado!")}
                >
                    <Image
                        style={galeriaStyles.btnImg}
                        source={require("@/assets/images/img/olho.png")}
                    />
                    <Text style={galeriaStyles.btnTxt}>Clique Aqui</Text>
                </Pressable>

                <View style={galeriaStyles.cxPesquisa}>
                    <Image
                        style={galeriaStyles.imgPesquisa}
                        source={require("@/assets/images/img/search.png")}
                    />
                    <TextInput style={galeriaStyles.inputPesquisa} />
                </View>

                <View style={galeriaStyles.cxMenu}>
                    <Text style={galeriaStyles.txtMenu}>Todas</Text>
                    <Text style={galeriaStyles.txtMenu}>Recentes</Text>
                    <Text style={galeriaStyles.txtMenu}>Em alta</Text>
                    <Text style={galeriaStyles.txtMenu}>Meus Posts</Text>
                </View>

                <View style={galeriaStyles.cxEventos}>
                    <View style={galeriaStyles.cxBotoes}>
                        <Pressable
                            style={galeriaStyles.btnEventos}
                            onPress={() => alert("Botão pressionado!")}
                        >
                            <Text style={galeriaStyles.txtEventos}>Todos os eventos</Text>
                        </Pressable>

                        <Pressable
                            style={galeriaStyles.btnFiltro}
                            onPress={() => alert("Botão pressionado!")}
                        >
                            <Text style={galeriaStyles.txtFiltro}>Filtrar</Text>
                            <Image
                                style={galeriaStyles.btnImgFiltro}
                                source={require("@/assets/images/img/olho.png")}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={galeriaStyles.cxDestaque}>
                    <View>
                        <Text style={galeriaStyles.desTitulo}>Destaques</Text>

                        <Pressable
                            style={galeriaStyles.deSubtitulo}
                            onPress={() => alert("Botão pressionado!")}
                        >
                            <Text style={galeriaStyles.txtDestaque}>Ver todos</Text>
                        </Pressable>

                        <View style={galeriaStyles.cxImg}>

                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                nestedScrollEnabled={true}
                            >
                                {imagens.map((item) => (
                                    <View
                                        key={item.id} style={galeriaStyles.cardDestaque}>

                                        <Image
                                            style={galeriaStyles.imgDestaque}
                                            source={item.source}
                                        />

                                    </View>
                                ))}

                            </ScrollView>

                        </View>
                        <Text style={galeriaStyles.desTitulos}>Fotos Recentes</Text>
                        <View style={galeriaStyles.cxPost}>


                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                        </View>

                        <View style={galeriaStyles.cxPost}>


                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                        </View>

                        <View style={galeriaStyles.cxPost}>


                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                            <View>

                                <Image
                                    style={galeriaStyles.postImg}
                                    source={require("@/assets/images/img/imagem.png")}
                                />

                            </View>

                        </View>


                    </View>
                </View>
            </ScrollView>

            <View>
                <Text></Text>
            </View>

            <MenuScreen />
        </View>
    );
}