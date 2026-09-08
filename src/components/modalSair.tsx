import {
    View,
    Text,
    Pressable,
    Modal,
} from "react-native";

import { sairModalStyles } from "@/styles/sairModalStyles";
import globalStyle from "@/styles/globalStyles";

interface SairModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SairModalScreen({
    visible,
    onClose,
    onConfirm,
}: SairModalProps) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >

            {/* CLICAR FORA = MESMO QUE NÃO */}
            <Pressable
                style={sairModalStyles.overlay}
                onPress={onClose}
            >

                {/* BLOQUEIA CLIQUE INTERNO */}
                <Pressable
                    style={sairModalStyles.caixaSair}
                    onPress={(event) => event.stopPropagation()}
                >

                    <Text style={sairModalStyles.tituloSair}>
                        Deseja sair?
                    </Text>


                    <View style={sairModalStyles.btns}>

                        {/* SIM */}
                        <Pressable
                            onPress={onConfirm}
                            style={({ pressed }) => [
                                sairModalStyles.btnSair,
                                pressed && globalStyle.pressBtn,
                            ]}
                        >

                            <Text style={sairModalStyles.iconesMenu}>
                                Sim
                            </Text>

                        </Pressable>


                        {/* NÃO */}
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [
                                sairModalStyles.btnSair,
                                pressed && globalStyle.pressBtn,
                            ]}
                        >

                            <Text style={sairModalStyles.iconesMenu}>
                                Não
                            </Text>

                        </Pressable>

                    </View>

                </Pressable>

            </Pressable>

        </Modal>
    );
}