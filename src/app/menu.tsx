import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import { menuStyles } from "@/styles/menuStyles";


export default function MenuSreen() {
    const iconePadrao = require("@/assets/images/img/e-mail.png");
    return (

        <View style={menuStyles.menuInferior}>

            {/* HOME */}
            <Pressable
                style={menuStyles.itemMenu}
                onPress={() => {
                    // Home
                }}
            >

                <Image
                    source={iconePadrao}
                    style={[
                        menuStyles.iconeMenu,
                        menuStyles.iconeMenuAtivo,
                    ]}
                />

                <Text style={menuStyles.txtMenuAtivo}>
                    Home
                </Text>

            </Pressable>


            {/* CHAT */}
            <Pressable
                style={menuStyles.itemMenu}
                onPress={() => {
                    // rota do chat futuramente
                }}
            >

                <Image
                    source={iconePadrao}
                    style={menuStyles.iconeMenu}
                />

                <Text style={menuStyles.txtMenu}>
                    Chat
                </Text>

            </Pressable>


            {/* PUBLICAR */}
            <Pressable
                style={menuStyles.itemMenu}
                onPress={() => {
                    // rota de publicação futuramente
                }}
            >

                <View style={menuStyles.btnPublicar}>

                    <Text style={menuStyles.maisPublicar}>
                        +
                    </Text>

                </View>

                <Text style={menuStyles.txtMenu}>
                    Publicar
                </Text>

            </Pressable>


            {/* EVENTOS */}
            <Pressable
                style={menuStyles.itemMenu}
                onPress={() => {
                    // rota de eventos futuramente
                }}
            >

                <Image
                    source={iconePadrao}
                    style={menuStyles.iconeMenu}
                />

                <Text style={menuStyles.txtMenu}>
                    Eventos
                </Text>

            </Pressable>


            {/* GALERIA */}
            <Pressable
                style={menuStyles.itemMenu}
                onPress={() => {
                    // rota da galeria futuramente
                }}
            >

                <Image
                    source={iconePadrao}
                    style={menuStyles.iconeMenu}
                />

                <Text style={menuStyles.txtMenu}>
                    Galeria
                </Text>

            </Pressable>

        </View>
    )
}