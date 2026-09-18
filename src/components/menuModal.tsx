import { useState } from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    Pressable,
    Modal,
} from "react-native";

import { menuModalStyles } from "@/styles/menuModalStyles";
import globalStyle from "@/styles/globalStyles";

import SairModalScreen from "./modalSair";

import { useTema } from "@/contexts/TemaContext";


interface MenuModalProps {

    visible: boolean;

    onClose: () => void;

}


export default function MenuModalScreen({

    visible,
    onClose,

}: MenuModalProps) {


    // =========================================
    // MODAL SAIR
    // =========================================

    const [btnSair, setBtnSair] =
        useState(false);


    // =========================================
    // TEMA
    // =========================================

    const {

        tema,
        coresTema,
        alternarTema,

    } = useTema();


    // =========================================
    // NAVEGA E FECHA O MENU
    // =========================================

    const navegar = (rota: any) => {

        onClose();

        router.navigate(rota);

    };


    // =========================================
    // CONFIRMAR SAÍDA
    // =========================================

    const confirmarSaida = () => {

        // fecha confirmação
        setBtnSair(false);

        // fecha menu
        onClose();

        // volta para login
        router.replace("/");

    };


    return (

        <>

            {/* =========================================
                MODAL MENU
            ========================================= */}

            <Modal

                visible={visible}

                transparent

                animationType="fade"

                onRequestClose={onClose}

            >


                {/* =====================================
                    FUNDO DA TELA
                ===================================== */}

                <Pressable

                    style={
                        menuModalStyles.overlay
                    }

                    onPress={onClose}

                >


                    {/* =================================
                        ÁREA LIMITADA A 440px
                    ================================= */}

                    <View
                        style={
                            menuModalStyles.areaModal
                        }
                    >


                        {/* =============================
                            CAIXA DO MENU
                        ============================= */}

                        <Pressable

                            style={[

                                menuModalStyles.caixaMenu,

                                {

                                    backgroundColor:
                                        coresTema.card,

                                    borderColor:
                                        coresTema.borda,

                                },

                            ]}

                            onPress={(event) =>
                                event.stopPropagation()
                            }

                        >


                            {/* =========================
                                PARTE SUPERIOR
                            ========================= */}

                            <View>


                                {/* =====================
                                    MUDAR TEMA
                                ===================== */}

                                <Pressable

                                    onPress={() => {

                                        alternarTema();

                                    }}

                                    style={({ pressed }) => [

                                        menuModalStyles.btnMenu,

                                        pressed &&
                                        globalStyle.pressBtn,

                                    ]}

                                >


                                    <Image

                                        style={
                                            menuModalStyles.imagemMenu
                                        }

                                        source={require(
                                            "@/assets/images/img/tema.png"
                                        )}

                                    />


                                    <Text

                                        style={[

                                            menuModalStyles.iconesMenu,

                                            {

                                                color:
                                                    coresTema.texto,

                                            },

                                        ]}

                                    >

                                        {tema === "escuro"

                                            ? "Tema claro"

                                            : "Tema escuro"

                                        }

                                    </Text>


                                </Pressable>


                                {/* =====================
                                    VER PERFIL
                                ===================== */}

                                <Pressable

                                    onPress={() =>
                                        navegar("/perfil")
                                    }

                                    style={({ pressed }) => [

                                        menuModalStyles.btnMenu,

                                        pressed &&
                                        globalStyle.pressBtn,

                                    ]}

                                >


                                    <Image

                                        style={
                                            menuModalStyles.imagemMenu
                                        }

                                        source={require(
                                            "@/assets/images/img/usuario.png"
                                        )}

                                    />


                                    <Text

                                        style={[

                                            menuModalStyles.iconesMenu,

                                            {

                                                color:
                                                    coresTema.texto,

                                            },

                                        ]}

                                    >

                                        Ver perfil

                                    </Text>


                                </Pressable>


                                {/* =====================
                                    EDITAR PERFIL
                                ===================== */}

                                <Pressable

                                    onPress={() =>
                                        navegar(
                                            "/editarPerfil"
                                        )
                                    }

                                    style={({ pressed }) => [

                                        menuModalStyles.btnMenu,

                                        pressed &&
                                        globalStyle.pressBtn,

                                    ]}

                                >


                                    <Image

                                        style={
                                            menuModalStyles.imagemMenu
                                        }

                                        source={require(
                                            "@/assets/images/img/edit.png"
                                        )}

                                    />


                                    <Text

                                        style={[

                                            menuModalStyles.iconesMenu,

                                            {

                                                color:
                                                    coresTema.texto,

                                            },

                                        ]}

                                    >

                                        Editar perfil

                                    </Text>


                                </Pressable>


                            </View>


                            {/* =========================
                                PARTE INFERIOR
                            ========================= */}

                            <View>


                                {/* =====================
                                    MUDAR SENHA
                                ===================== */}

                                <Pressable

                                    onPress={() =>
                                        navegar(
                                            "/alterarSenha"
                                        )
                                    }

                                    style={({ pressed }) => [

                                        menuModalStyles.btnMenu,

                                        pressed &&
                                        globalStyle.pressBtn,

                                    ]}

                                >


                                    <Image

                                        style={
                                            menuModalStyles.imagemMenu
                                        }

                                        source={require(
                                            "@/assets/images/img/trancar.png"
                                        )}

                                    />


                                    <Text

                                        style={[

                                            menuModalStyles.iconesMenu,

                                            {

                                                color:
                                                    coresTema.texto,

                                            },

                                        ]}

                                    >

                                        Mudar senha

                                    </Text>


                                </Pressable>


                                {/* =====================
                                    EXCLUIR CONTA
                                ===================== */}

                                <Pressable

                                    onPress={() =>
                                        navegar(
                                            "/excluirConta"
                                        )
                                    }

                                    style={({ pressed }) => [

                                        menuModalStyles.btnMenu,

                                        pressed &&
                                        globalStyle.pressBtn,

                                    ]}

                                >


                                    <Image

                                        style={
                                            menuModalStyles.imagemMenu
                                        }

                                        source={require(
                                            "@/assets/images/img/excluir-conta.png"
                                        )}

                                    />


                                    <Text

                                        style={[

                                            menuModalStyles.iconesMenu,

                                            {

                                                color:
                                                    coresTema.texto,

                                            },

                                        ]}

                                    >

                                        Excluir conta

                                    </Text>


                                </Pressable>


                                {/* =====================
                                    SAIR
                                ===================== */}

                                <Pressable

                                    onPress={() => {

                                        // mantém menu aberto
                                        // abre modal de confirmação

                                        setBtnSair(true);

                                    }}

                                    style={({ pressed }) => [

                                        menuModalStyles.btnMenu,

                                        pressed &&
                                        globalStyle.pressBtn,

                                    ]}

                                >


                                    <Image

                                        style={
                                            menuModalStyles.imagemMenu
                                        }

                                        source={require(
                                            "@/assets/images/img/exit.png"
                                        )}

                                    />


                                    <Text

                                        style={[

                                            menuModalStyles.iconesMenu,

                                            {

                                                color:
                                                    coresTema.texto,

                                            },

                                        ]}

                                    >

                                        Sair

                                    </Text>


                                </Pressable>


                            </View>


                        </Pressable>


                    </View>


                </Pressable>


            </Modal>


            {/* =========================================
                MODAL CONFIRMAR SAÍDA
            ========================================= */}

            <SairModalScreen

                visible={btnSair}

                onClose={() =>
                    setBtnSair(false)
                }

                onConfirm={
                    confirmarSaida
                }

            />


        </>

    );

}