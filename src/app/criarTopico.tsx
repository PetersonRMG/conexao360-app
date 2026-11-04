import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { useTema } from "@/contexts/TemaContext";
import { criarEnquete } from "@/services/enqueteService";

const estilos = StyleSheet.create({
    container: { flex: 1 },
    teclado: { flex: 1 },
    conteudo: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 100 },
    topo: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 24 },
    voltar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
    titulo: { flex: 1, fontSize: 23, fontWeight: "800" },
    subtitulo: { fontSize: 14, lineHeight: 21, marginBottom: 18 },
    card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 18 },
    label: { fontSize: 16, fontWeight: "700", marginBottom: 12 },
    campo: { minHeight: 96, borderWidth: 1, borderRadius: 11, fontSize: 15, padding: 12 },
    contador: { fontSize: 12, marginTop: 8, textAlign: "right" },
    opcao: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10 },
    textoOpcao: { fontSize: 15 },
    explicacao: { fontSize: 12, lineHeight: 18, marginTop: 10 },
    erro: { fontSize: 13, marginBottom: 16, lineHeight: 19 },
    botao: { minHeight: 48, borderRadius: 11, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 9 },
    textoBotao: { fontSize: 15, fontWeight: "800" },
});

// "Tópico" é o nome da tela no app. No banco, tudo é uma enquete:
// tbl_enquetes + tbl_respostas, com Sim, Não e Outro.
export default function CriarTopicosScreen() {
    const { coresTema, tema } = useTema();
    const { token, usuario } = useAuth();
    const [pergunta, setPergunta] = useState("");
    const [publicando, setPublicando] = useState(false);
    const [erro, setErro] = useState("");

    const perfil = String(usuario?.perfil_usuario ?? "").toLowerCase();
    const podeCriar = perfil === "palestrante" || perfil === "administrador";

    async function publicar() {
        if (publicando) return;
        if (!token) {
            setErro("Sua sessão expirou. Faça login novamente.");
            return;
        }
        if (!podeCriar) {
            setErro("Somente palestrantes e administradores podem criar enquetes.");
            return;
        }
        const texto = pergunta.trim();
        if (!texto) {
            setErro("Informe a pergunta da enquete.");
            return;
        }
        if (texto.length > 80) {
            setErro("A pergunta deve ter no máximo 80 caracteres.");
            return;
        }

        try {
            setPublicando(true);
            setErro("");
            const resposta = await criarEnquete(token, texto);
            if (!resposta.success) throw new Error(resposta.message || "Não foi possível publicar.");
            // A tela Tópicos busca as mesmas enquetes que a tela Enquetes.
            router.replace("/enquetes");
        } catch (falha) {
            setErro(falha instanceof Error ? falha.message : "Falha ao publicar enquete.");
        } finally {
            setPublicando(false);
        }
    }

    return (
        <SafeAreaView style={[estilos.container, { backgroundColor: tema === "claro" ? "#FFFFFF" : coresTema.fundo }]}>
            <KeyboardAvoidingView
                style={estilos.teclado}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={estilos.conteudo}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={estilos.topo}>
                        <Pressable
                            onPress={() => router.back()}
                            style={[estilos.voltar, { backgroundColor: coresTema.cardSecundario }]}
                            accessibilityRole="button"
                            accessibilityLabel="Voltar"
                        >
                            <Ionicons name="arrow-back" size={22} color={coresTema.destaque} />
                        </Pressable>
                        <Text style={[estilos.titulo, { color: coresTema.texto }]}>Criar tópico</Text>
                    </View>

                    <Text style={[estilos.subtitulo, { color: coresTema.textoSecundario }]}>
                        O tópico será publicado como uma enquete da comunidade e aparecerá também na tela Enquetes.
                    </Text>

                    <View style={[estilos.card, { backgroundColor: coresTema.card, borderColor: coresTema.borda }]}>
                        <Text style={[estilos.label, { color: coresTema.texto }]}>Pergunta da enquete</Text>
                        <TextInput
                            value={pergunta}
                            onChangeText={(valor) => { setPergunta(valor); if (erro) setErro(""); }}
                            placeholder="Ex.: Você participaria do próximo evento?"
                            placeholderTextColor={coresTema.textoSecundario}
                            maxLength={80}
                            multiline
                            textAlignVertical="top"
                            editable={!publicando}
                            style={[estilos.campo, {
                                color: coresTema.texto,
                                borderColor: coresTema.borda,
                                backgroundColor: coresTema.input,
                            }]}
                        />
                        <Text style={[estilos.contador, { color: coresTema.textoSecundario }]}>
                            {pergunta.length}/80
                        </Text>
                    </View>

                    <View style={[estilos.card, { backgroundColor: coresTema.card, borderColor: coresTema.borda }]}>
                        <Text style={[estilos.label, { color: coresTema.texto }]}>Opções de resposta</Text>
                        {(["Sim", "Não", "Outro"] as const).map((opcao) => (
                            <View key={opcao} style={estilos.opcao}>
                                <Ionicons name="radio-button-off" size={20} color={coresTema.destaque} />
                                <Text style={[estilos.textoOpcao, { color: coresTema.texto }]}>{opcao}</Text>
                            </View>
                        ))}
                        <Text style={[estilos.explicacao, { color: coresTema.textoSecundario }]}>
                            Essas são as três respostas já utilizadas pelas enquetes do Conexão 360°.
                        </Text>
                    </View>

                    {!!erro && (
                        <Text accessibilityRole="alert" style={[estilos.erro, { color: coresTema.erro }]}>
                            {erro}
                        </Text>
                    )}

                    <Pressable
                        onPress={() => void publicar()}
                        disabled={publicando || !podeCriar}
                        accessibilityRole="button"
                        accessibilityLabel="Publicar enquete"
                        style={[estilos.botao, {
                            backgroundColor: coresTema.destaque,
                            opacity: publicando || !podeCriar ? 0.5 : 1,
                        }]}
                    >
                        {publicando ? <ActivityIndicator color={coresTema.textoSobreDestaque} /> : (
                            <Ionicons name="send" size={18} color={coresTema.textoSobreDestaque} />
                        )}
                        <Text style={[estilos.textoBotao, { color: coresTema.textoSobreDestaque }]}>
                            {publicando ? "Publicando..." : "Publicar tópico"}
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
