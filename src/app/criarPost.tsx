import { useState } from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import globalStyle from "@/styles/globalStyles";
import { criarPostStyle } from "@/styles/criarPostStyles";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarPublicacao } from "@/services/publicacaoService";
import MenuSreen from "./menu";
import SeletorEmojis from "@/components/SeletorEmojis";
import { Keyboard } from "react-native";
export default function CriarPostScreen() {
    // =====================================
    // TEMA
    // =====================================
    const { coresTema } = useTema();
    const criarPostStyles = criarPostStyle(coresTema);
    // =====================================
    // AUTENTICAÇÃO
    // =====================================
    const { token } = useAuth();
    // =====================================
    // FORMULÁRIO
    // =====================================
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tags, setTags] = useState(["Negócios", "Design", "Eventos 360"]);
    const [novaTag, setNovaTag] = useState("");
    const [mostrarNovaTag, setMostrarNovaTag] = useState(false);
    const [imagemSelecionada, setImagemSelecionada] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [publicando, setPublicando] = useState(false);
    // O seletor insere emojis no campo ativo sem alterar o serviço de publicação.
    const [emojiAberto, setEmojiAberto] = useState(false);
    const [campoEmoji, setCampoEmoji] = useState<"titulo" | "descricao">("descricao");
    function alternarSeletorEmojis(campo: "titulo" | "descricao") {
        Keyboard.dismiss();
        if (emojiAberto && campoEmoji === campo) {
            setEmojiAberto(false);
            return;
        }
        setCampoEmoji(campo);
        setEmojiAberto(true);
    }
    function inserirEmoji(emoji: string) {
        if (publicando) return;
        if (campoEmoji === "titulo") {
            setTitulo((atual) => (atual.length + emoji.length <= 55 ? atual + emoji : atual));
        } else {
            setDescricao((atual) => (atual.length + emoji.length <= 150 ? atual + emoji : atual));
        }
    }
    function renderizarEmojis(campo: "titulo" | "descricao") {
        if (!emojiAberto || campoEmoji !== campo) return null;
        return (
            <SeletorEmojis
                onSelect={inserirEmoji}
                corDestaque={coresTema.destaque}
                corTexto={coresTema.texto}
                corFundo={coresTema.cardSecundario}
                corBorda={coresTema.borda}
            />
        );
    }
    // =====================================
    // ADICIONAR TAG
    // =====================================
    const adicionarTag = () => {
        const tag = novaTag.trim();
        if (!tag) {
            return;
        }
        if (tags.includes(tag)) {
            return;
        }
        setTags((current) => [...current, tag]);
        setNovaTag("");
        setMostrarNovaTag(false);
    };
    // =====================================
    // REMOVER TAG
    // =====================================
    const removerTag = (tagRemover: string) => {
        setTags((current) => current.filter((tag) => tag !== tagRemover));
    };
    // =====================================
    // SELECIONAR FOTO
    // =====================================
    async function selecionarImagem() {
        if (publicando) {
            return;
        }
        try {
            const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissao.granted) {
                Alert.alert("Permissão necessária", "Permita o acesso às fotos para selecionar uma imagem.");
                return;
            }
            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: false,
                quality: 0.85,
                allowsMultipleSelection: false,
            });
            if (resultado.canceled || !resultado.assets?.length) {
                return;
            }
            const imagem = resultado.assets[0];
            if (imagem.fileSize && imagem.fileSize > 20 * 1024 * 1024) {
                Alert.alert("Imagem muito grande", "A imagem não pode ultrapassar 20 MB.");
                return;
            }
            const mimeType = imagem.mimeType?.toLowerCase();
            if (mimeType && !["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
                Alert.alert("Formato não suportado", "Selecione uma imagem JPG, JPEG, PNG ou WEBP.");
                return;
            }
            setImagemSelecionada(imagem);
        } catch (error) {
            console.log("ERRO SELECIONAR IMAGEM:", error);
            Alert.alert("Erro", "Não foi possível selecionar a imagem.");
        }
    }
    // =====================================
    // MONTAR TEXTO DA PUBLICAÇÃO
    // =====================================
    function montarTextoPublicacao() {
        const tagsTexto = tags.length > 0 ? tags.map((tag) => `#${tag.trim().replace(/\s+/g, "")}`).join(" ") : "";
        return [titulo.trim(), descricao.trim(), tagsTexto].filter(Boolean).join("\n\n");
    }
    // =====================================
    // PUBLICAR
    // =====================================
    async function publicarPost() {
        if (publicando) {
            return;
        }
        if (!token) {
            Alert.alert("Sessão não encontrada", "Faça login novamente para publicar.");
            return;
        }
        if (!titulo.trim()) {
            Alert.alert("Título obrigatório", "Informe um título para o post.");
            return;
        }
        if (!descricao.trim()) {
            Alert.alert("Descrição obrigatória", "Informe uma descrição.");
            return;
        }
        try {
            setPublicando(true);
            const textoPublicacao = montarTextoPublicacao();
            const resposta = await criarPublicacao(token, textoPublicacao, imagemSelecionada);
            if (!resposta.success) {
                throw new Error(resposta.message || "Não foi possível criar a publicação.");
            }
            router.replace("/home");
        } catch (error) {
            console.log("ERRO CRIAR PUBLICAÇÃO:", error);
            Alert.alert("Erro ao publicar", error instanceof Error ? error.message : "Não foi possível criar a publicação.");
        } finally {
            setPublicando(false);
        }
    }
    return (
        // =========================================
        // FUNDO EXTERNO
        // =========================================
        <View style={globalStyle.container}>
            {/* =====================================
                ÁREA MOBILE - MÁXIMO 440px
            ===================================== */}
            <View style={[globalStyle.background, criarPostStyles.container]}>
                <ImageBackground
                    source={require("@/assets/images/img/fundoLogin.png")}
                    style={criarPostStyles.background}
                    resizeMode="cover"
                >
                    <SafeAreaView style={globalStyle.areaConteudo}>
                        <View style={criarPostStyles.overlay}>
                            <KeyboardAvoidingView
                                style={criarPostStyles.keyboard}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                            >
                                <ScrollView
                                    style={criarPostStyles.scroll}
                                    contentContainerStyle={criarPostStyles.scrollConteudo}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {/* =================
                                        TOPO
                                    ================= */}
                                    <View style={criarPostStyles.topo}>
                                        <Pressable
                                            style={({ pressed }) => [criarPostStyles.btnVoltar, pressed && criarPostStyles.btnVoltarPressed]}
                                            onPress={() => router.back()}
                                            disabled={publicando}
                                        >
                                            <Image style={criarPostStyles.voltarImagem} source={require("@/assets/images/img/left.png")} />
                                        </Pressable>
                                        <Image source={require("@/assets/images/img/logo.svg")} style={criarPostStyles.logo} />
                                        <View style={criarPostStyles.espacoTopo} />
                                    </View>
                                    {/* =================
                                        TÍTULO
                                    ================= */}
                                    <View style={criarPostStyles.apresentacao}>
                                        <Text style={criarPostStyles.tituloPagina}>
                                            Criar <Text style={criarPostStyles.tituloDourado}>post</Text>
                                        </Text>
                                        <Text style={criarPostStyles.aviso}>Compartilhe algo relevante no network.</Text>
                                    </View>
                                    {/* =================
                                        TÍTULO DO POST
                                    ================= */}
                                    <View style={criarPostStyles.card}>
                                        <Text style={criarPostStyles.label}>Título do post</Text>
                                        <Pressable
                                            onPress={() => alternarSeletorEmojis("titulo")}
                                            disabled={publicando}
                                            accessibilityRole="button"
                                            accessibilityLabel="Inserir emoji no título do post"
                                            style={{
                                                alignSelf: "flex-end",
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                marginBottom: 5,
                                                borderRadius: 12,
                                                borderWidth: 1,
                                                borderColor: coresTema.borda,
                                            }}
                                        >
                                            <Text style={{ color: coresTema.destaque, fontSize: 13 }}>☺ Emojis</Text>
                                        </Pressable>
                                        <TextInput
                                            value={titulo}
                                            onChangeText={setTitulo}
                                            style={criarPostStyles.input}
                                            placeholder="Digite um texto claro e objetivo"
                                            placeholderTextColor={"#777777"}
                                            maxLength={55}
                                            editable={!publicando}
                                        />
                                        <Text style={criarPostStyles.contador}>{titulo.length}/55</Text>
                                        {renderizarEmojis("titulo")}
                                    </View>
                                    {/* =================
                                        FOTO
                                    ================= */}
                                    <View style={criarPostStyles.card}>
                                        <Text style={criarPostStyles.label}>Adicione uma foto</Text>
                                        {imagemSelecionada ? (
                                            <View style={{ marginTop: 10 }}>
                                                <View
                                                    style={{
                                                        borderRadius: 14,
                                                        overflow: "hidden",
                                                        borderWidth: 1,
                                                        borderColor: coresTema.borda,
                                                        backgroundColor: coresTema.cardSecundario,
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri: imagemSelecionada.uri }}
                                                        style={{ width: "100%", height: 240 }}
                                                        resizeMode="contain"
                                                        accessibilityLabel="Pré-visualização da foto selecionada"
                                                    />
                                                </View>
                                                <Text
                                                    numberOfLines={1}
                                                    style={{ color: coresTema.textoSecundario, fontSize: 12, marginTop: 7 }}
                                                >
                                                    {imagemSelecionada.fileName ?? "Foto selecionada"}
                                                </Text>
                                                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                                                    <Pressable
                                                        onPress={selecionarImagem}
                                                        disabled={publicando}
                                                        accessibilityRole="button"
                                                        style={{
                                                            flex: 1,
                                                            paddingVertical: 11,
                                                            borderRadius: 10,
                                                            borderWidth: 1,
                                                            borderColor: coresTema.destaque,
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Text style={{ color: coresTema.destaque, fontWeight: "700" }}>Trocar foto</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        onPress={() => setImagemSelecionada(null)}
                                                        disabled={publicando}
                                                        accessibilityRole="button"
                                                        style={{
                                                            flex: 1,
                                                            paddingVertical: 11,
                                                            borderRadius: 10,
                                                            borderWidth: 1,
                                                            borderColor: coresTema.borda,
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Text style={{ color: coresTema.texto }}>Remover foto</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        ) : (
                                            <Pressable
                                                style={({ pressed }) => [
                                                    criarPostStyles.areaImagem,
                                                    pressed && criarPostStyles.areaImagemPressed,
                                                ]}
                                                onPress={selecionarImagem}
                                                disabled={publicando}
                                            >
                                                <Image
                                                    source={require("@/assets/images/img/galeria.png")}
                                                    style={criarPostStyles.iconeImagem}
                                                />
                                                <Text style={criarPostStyles.txtImagem}>
                                                        Selecione uma foto para o post
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                    {/* =================
                                        DESCRIÇÃO
                                    ================= */}
                                    <View style={criarPostStyles.card}>
                                        <Text style={criarPostStyles.label}>Descrição</Text>
                                        <Pressable
                                            onPress={() => alternarSeletorEmojis("descricao")}
                                            disabled={publicando}
                                            accessibilityRole="button"
                                            accessibilityLabel="Inserir emoji no descrição"
                                            style={{
                                                alignSelf: "flex-end",
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                marginBottom: 5,
                                                borderRadius: 12,
                                                borderWidth: 1,
                                                borderColor: coresTema.borda,
                                            }}
                                        >
                                            <Text style={{ color: coresTema.destaque, fontSize: 13 }}>☺ Emojis</Text>
                                        </Pressable>
                                        <TextInput
                                            value={descricao}
                                            onChangeText={setDescricao}
                                            style={criarPostStyles.inputDescricao}
                                            placeholder="Digite um texto claro e objetivo"
                                            placeholderTextColor={"#777777"}
                                            multiline
                                            textAlignVertical="top"
                                            maxLength={150}
                                            editable={!publicando}
                                        />
                                        <Text style={criarPostStyles.contador}>{descricao.length}/150</Text>
                                        {renderizarEmojis("descricao")}
                                    </View>
                                    {/* =================
                                        TAGS
                                    ================= */}
                                    <View style={criarPostStyles.card}>
                                        <Text style={criarPostStyles.label}>Adicione opções de tag</Text>
                                        <View style={criarPostStyles.areaTags}>
                                            {tags.map((tag) => (
                                                <Pressable
                                                    key={tag}
                                                    style={criarPostStyles.tag}
                                                    onPress={() => removerTag(tag)}
                                                    disabled={publicando}
                                                >
                                                    <Text style={criarPostStyles.txtTag}>{tag} ×</Text>
                                                </Pressable>
                                            ))}
                                            <Pressable
                                                style={criarPostStyles.btnNovaTag}
                                                onPress={() => setMostrarNovaTag((current) => !current)}
                                                disabled={publicando}
                                            >
                                                <Text style={criarPostStyles.txtNovaTag}>+ Nova</Text>
                                            </Pressable>
                                        </View>
                                        {/* =================
                                            NOVA TAG
                                        ================= */}
                                        {mostrarNovaTag && (
                                            <View style={criarPostStyles.areaNovaTag}>
                                                <TextInput
                                                    value={novaTag}
                                                    onChangeText={setNovaTag}
                                                    style={criarPostStyles.inputNovaTag}
                                                    placeholder="Nome da tag"
                                                    placeholderTextColor={"#777777"}
                                                    maxLength={30}
                                                    onSubmitEditing={adicionarTag}
                                                    editable={!publicando}
                                                />
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        criarPostStyles.btnAdicionarTag,
                                                        pressed && criarPostStyles.btnAdicionarTagPressed,
                                                    ]}
                                                    onPress={adicionarTag}
                                                    disabled={publicando}
                                                >
                                                    <Text style={criarPostStyles.txtAdicionarTag}>Adicionar</Text>
                                                </Pressable>
                                            </View>
                                        )}
                                    </View>
                                    {/* =================
                                        BOTÕES
                                    ================= */}
                                    <View style={criarPostStyles.areaBotoes}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                criarPostStyles.btnPublicar,
                                                pressed && criarPostStyles.btnPublicarPressed,
                                            ]}
                                            onPress={publicarPost}
                                            disabled={publicando}
                                        >
                                            <Text style={criarPostStyles.txtPublicar}>{publicando ? "Publicando..." : "Publicar"}</Text>
                                        </Pressable>
                                        <Pressable
                                            style={({ pressed }) => [
                                                criarPostStyles.btnCancelar,
                                                pressed && criarPostStyles.btnCancelarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                            disabled={publicando}
                                        >
                                            <Text style={criarPostStyles.txtCancelar}>Cancelar</Text>
                                        </Pressable>
                                    </View>
                                </ScrollView>
                                {/* =================
                                    FOOTER
                                ================= */}
                                <MenuSreen />
                            </KeyboardAvoidingView>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </View>
    );
}
