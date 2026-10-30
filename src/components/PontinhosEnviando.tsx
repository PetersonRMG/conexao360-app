import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

/** Exibe atividade de ENVIO local, não o estado de digitação da outra pessoa. */
export default function PontinhosEnviando({ cor = "#D6B26A" }: { cor?: string }) {
    const progresso = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animacao = Animated.loop(
            Animated.timing(progresso, {
                toValue: 3,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        );
        animacao.start();
        return () => {
            animacao.stop();
            progresso.stopAnimation();
        };
    }, [progresso]);

    return (
        <View accessibilityLabel="Mensagem sendo enviada" style={{ flexDirection: "row", alignItems: "center", gap: 4, height: 16 }}>
            {[0, 1, 2].map((indice) => (
                <Animated.View
                    key={indice}
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: cor,
                        opacity: progresso.interpolate({
                            inputRange: [0, indice + 0.1, indice + 0.65, 3],
                            outputRange: [0.32, 0.32, 1, 0.32],
                        }),
                        transform: [{
                            translateY: progresso.interpolate({
                                inputRange: [0, indice + 0.15, indice + 0.4, indice + 0.7, 3],
                                outputRange: [0, 0, -3, 0, 0],
                            }),
                        }],
                    }}
                />
            ))}
        </View>
    );
}
