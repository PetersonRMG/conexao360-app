import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    Modal
} from "react-native";

import { menuModalStyles } from "@/styles/menuModalStyles";

interface MenuModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function MenuModalScreen({
    visible,
    onClose,
}: MenuModalProps){
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            
            <Pressable
                style={menuModalStyles.overlay}
                onPress={onClose}>
                <View style={menuModalStyles.caixaMenu}>
                    <Text style={menuModalStyles.iconesMenu}>Teste menu modal </Text>
                </View>
            </Pressable>

        </Modal>
    )
}