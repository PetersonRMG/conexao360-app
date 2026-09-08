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

interface MenuModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function MenuModalScreen({
    visible,
    onClose,
}: MenuModalProps) {

    const [btnSair, setBtnSair] = useState(false);


    const navegar = (rota: any) => {
        onClose();
        router.navigate(rota);
    };


    // ==============================
    // CONFIRMAR SAÍDA
    // ==============================
    const confirmarSaida = () => {

        // fecha modal "Deseja sair?"
        setBtnSair(false);

        // fecha modal do menu
        onClose();

        // volta para login
        router.replace("/");
    };


    return (
        <>

            {/* ================= MODAL MENU ================= */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={onClose}
            >

                <Pressable
                    style={menuModalStyles.overlay}
                    onPress={onClose}
                >

                    <Pressable
                        style={menuModalStyles.caixaMenu}
                        onPress={(event) => event.stopPropagation()}
                    >


                        {/* ================= PARTE SUPERIOR ================= */}
                        <View>

                            {/* MUDAR TEMA */}
                            <Pressable
                                onPress={() => {
                                    onClose();
                                }}
                                style={({ pressed }) => [
                                    menuModalStyles.btnMenu,
                                    pressed && globalStyle.pressBtn,
                                ]}
                            >

                                <Image
                                    style={menuModalStyles.imagemMenu}
                                    source={require("@/assets/images/img/tema.png")}
                                />

                                <Text style={menuModalStyles.iconesMenu}>
                                    Mudar tema
                                </Text>

                            </Pressable>


                            {/* VER PERFIL */}
                            <Pressable
                                onPress={() => navegar("/perfil")}
                                style={({ pressed }) => [
                                    menuModalStyles.btnMenu,
                                    pressed && globalStyle.pressBtn,
                                ]}
                            >

                                <Image
                                    style={menuModalStyles.imagemMenu}
                                    source={require("@/assets/images/img/usuario.png")}
                                />

                                <Text style={menuModalStyles.iconesMenu}>
                                    Ver perfil
                                </Text>

                            </Pressable>


                            {/* EDITAR PERFIL */}
                            <Pressable
                                onPress={() => navegar("/editarPerfil")}
                                style={({ pressed }) => [
                                    menuModalStyles.btnMenu,
                                    pressed && globalStyle.pressBtn,
                                ]}
                            >

                                <Image
                                    style={menuModalStyles.imagemMenu}
                                    source={require("@/assets/images/img/edit.png")}
                                />

                                <Text style={menuModalStyles.iconesMenu}>
                                    Editar perfil
                                </Text>

                            </Pressable>

                        </View>


                        {/* ================= PARTE INFERIOR ================= */}
                        <View>

                            {/* MUDAR SENHA */}
                            <Pressable
                                onPress={() => navegar("/alterarSenha")}
                                style={({ pressed }) => [
                                    menuModalStyles.btnMenu,
                                    pressed && globalStyle.pressBtn,
                                ]}
                            >

                                <Image
                                    style={menuModalStyles.imagemMenu}
                                    source={require("@/assets/images/img/trancar.png")}
                                />

                                <Text style={menuModalStyles.iconesMenu}>
                                    Mudar senha
                                </Text>

                            </Pressable>


                            {/* EXCLUIR CONTA */}
                            <Pressable
                                onPress={() => navegar("/excluirConta")}
                                style={({ pressed }) => [
                                    menuModalStyles.btnMenu,
                                    pressed && globalStyle.pressBtn,
                                ]}
                            >

                                <Image
                                    style={menuModalStyles.imagemMenu}
                                    source={require("@/assets/images/img/excluir-conta.png")}
                                />

                                <Text style={menuModalStyles.iconesMenu}>
                                    Excluir conta
                                </Text>

                            </Pressable>


                            {/* ================= SAIR ================= */}
                            <Pressable
                                onPress={() => {

                                    // NÃO FECHA O MENU
                                    // apenas abre confirmação
                                    setBtnSair(true);

                                }}
                                style={({ pressed }) => [
                                    menuModalStyles.btnMenu,
                                    pressed && globalStyle.pressBtn,
                                ]}
                            >

                                <Image
                                    style={menuModalStyles.imagemMenu}
                                    source={require("@/assets/images/img/exit.png")}
                                />

                                <Text style={menuModalStyles.iconesMenu}>
                                    Sair
                                </Text>

                            </Pressable>

                        </View>

                    </Pressable>

                </Pressable>

            </Modal>


            {/* ================= CONFIRMAÇÃO DE SAÍDA ================= */}
            <SairModalScreen
                visible={btnSair}

                // NÃO:
                // fecha somente confirmação
                onClose={() => setBtnSair(false)}

                // SIM:
                // fecha confirmação + menu + vai para login
                onConfirm={confirmarSaida}
            />

        </>
    );
}