import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

import { useTema } from "@/contexts/TemaContext";
import { criarSairModalStyles } from "@/styles/sairModalStyles";

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
    const { coresTema } = useTema();
    const styles = criarSairModalStyles(coresTema);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                {/* Toque no fundo para cancelar. */}
                <Pressable
                    style={styles.areaExterna}
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Cancelar saída"
                />

                {/* Caixa centralizada, sem animação de baixo para cima. */}
                <View style={styles.caixaSair} accessibilityViewIsModal>
                    <Pressable
                        onPress={onClose}
                        style={({ pressed }) => [
                            styles.botaoFechar,
                            pressed && styles.botaoPressionado,
                        ]}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Fechar confirmação de saída"
                    >
                        <Ionicons name="close" size={22} color={coresTema.texto} />
                    </Pressable>

                    <Text style={styles.tituloSair}>Deseja sair?</Text>
                    <Text style={styles.subtituloSair}>
                        Você será desconectado da sua conta.
                    </Text>

                    <View style={styles.btns}>
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [
                                styles.btnCancelar,
                                pressed && styles.botaoPressionado,
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel="Não, continuar conectado"
                        >
                            <Text style={styles.txtCancelar}>Não, continuar</Text>
                        </Pressable>

                        <Pressable
                            onPress={onConfirm}
                            style={({ pressed }) => [
                                styles.btnSair,
                                pressed && styles.botaoPressionado,
                            ]}
                            accessibilityRole="button"
                            accessibilityLabel="Sim, sair da conta"
                        >
                            <Text style={styles.iconesMenu}>Sim, sair</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
