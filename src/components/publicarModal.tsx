import { router } from "expo-router";

import {
    View,
    Text,
    Image,
    Pressable,
    Modal,
} from "react-native";

import { publicarModalStyles } from "@/styles/publicarModalStyles";
import globalStyle from "@/styles/globalStyles";

interface PublicarModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function PublicarModalScreen({
    visible,
    onClose,
}: PublicarModalProps) {

    const navegar = (rota: any) => {
        onClose();
        router.navigate(rota);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >

            {/* ÁREA EXTERNA - CLICOU FORA, FECHA */}
            <Pressable
                style={publicarModalStyles.overlay}
                onPress={onClose}
            >

                {/* CAIXA DO MODAL */}
                <Pressable
                    style={publicarModalStyles.caixaMenu}
                    onPress={(event) => event.stopPropagation()}
                >

                    {/* NOVO POST */}
                    <Pressable
                        onPress={() => navegar("/criarPost")}
                        style={({ pressed }) => [
                            publicarModalStyles.btnMenu,
                            pressed && globalStyle.pressBtn,
                        ]}
                    >

                        <Image
                            style={publicarModalStyles.imagemMenu}
                            source={require("@/assets/images/img/novo-post.png")}
                        />

                        <Text style={publicarModalStyles.txtMenu}>
                            Novo Post
                        </Text>

                    </Pressable>


                    {/* NOVA ENQUETE */}
                    <Pressable
                        onPress={() => navegar("/criarTopico")}
                        style={({ pressed }) => [
                            publicarModalStyles.btnMenu,
                            pressed && globalStyle.pressBtn,
                        ]}
                    >

                        <Image
                            style={publicarModalStyles.imagemMenu}
                            source={require("@/assets/images/img/enquete.png")}
                        />

                        <Text style={publicarModalStyles.txtMenu}>
                            Nova Enquete
                        </Text>

                    </Pressable>

                </Pressable>

            </Pressable>

        </Modal>
    );
}