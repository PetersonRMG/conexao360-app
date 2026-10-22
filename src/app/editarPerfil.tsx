import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/AuthContext";
import { useTema } from "@/contexts/TemaContext";
import { criarEditarPerfilStyles } from "@/styles/editarPerfilStyles";
import globalStyle from "@/styles/globalStyles";
import { buscarUsuario, getUrlFotoUsuario } from "@/services/usuarioService";
import { atualizarMeuPerfil, type DadosEdicaoPerfil } from "@/services/edicaoPerfilService";
import AjustarFotoPerfilModal from "@/components/AjustarFotoPerfilModal";

const ESTADOS_BRASIL = [
    { uf: "AC", nome: "Acre" },
    { uf: "AL", nome: "Alagoas" },
    { uf: "AP", nome: "Amapá" },
    { uf: "AM", nome: "Amazonas" },
    { uf: "BA", nome: "Bahia" },
    { uf: "CE", nome: "Ceará" },
    { uf: "DF", nome: "Distrito Federal" },
    { uf: "ES", nome: "Espírito Santo" },
    { uf: "GO", nome: "Goiás" },
    { uf: "MA", nome: "Maranhão" },
    { uf: "MT", nome: "Mato Grosso" },
    { uf: "MS", nome: "Mato Grosso do Sul" },
    { uf: "MG", nome: "Minas Gerais" },
    { uf: "PA", nome: "Pará" },
    { uf: "PB", nome: "Paraíba" },
    { uf: "PR", nome: "Paraná" },
    { uf: "PE", nome: "Pernambuco" },
    { uf: "PI", nome: "Piauí" },
    { uf: "RJ", nome: "Rio de Janeiro" },
    { uf: "RN", nome: "Rio Grande do Norte" },
    { uf: "RS", nome: "Rio Grande do Sul" },
    { uf: "RO", nome: "Rondônia" },
    { uf: "RR", nome: "Roraima" },
    { uf: "SC", nome: "Santa Catarina" },
    { uf: "SP", nome: "São Paulo" },
    { uf: "SE", nome: "Sergipe" },
    { uf: "TO", nome: "Tocantins" },
] as const;

export default function EditarPerfilScreen() {
    const { coresTema } = useTema();
    const styles = criarEditarPerfilStyles(coresTema);
    const { token, usuario, definirSessao, carregandoSessao } = useAuth();

    const [nome, setNome] = useState(usuario?.nome_usuario ?? "");
    const [area, setArea] = useState("");
    const [estado, setEstado] = useState("");
    const [sobre, setSobre] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [youtube, setYoutube] = useState("");
    const [tiktok, setTiktok] = useState("");
    const [facebook, setFacebook] = useState("");
    const [site, setSite] = useState("");
    const [email, setEmail] = useState(usuario?.email_usuario ?? "");
    const [selecionandoEstado, setSelecionandoEstado] = useState(false);
    const [fotoAtual, setFotoAtual] = useState<string | null>(
        usuario?.foto_usuario ?? null,
    );
    // Cópia dos dados já salvos, para que salvar a foto não grave alterações não confirmadas do formulário.
    const [camposPersistidos, setCamposPersistidos] = useState<DadosEdicaoPerfil | null>(null);
    const [fotoParaAjustar, setFotoParaAjustar] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [preparandoFoto, setPreparandoFoto] = useState(false);
    const urlTemporariaRef = useRef<string | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [dadosCarregados, setDadosCarregados] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;

        async function carregarDados() {
            if (carregandoSessao) {
                return;
            }
            if (!token) {
                setErro("Sessão não encontrada. Entre novamente no aplicativo.");
                setCarregando(false);
                return;
            }

            try {
                setCarregando(true);
                setErro(null);
                const resposta = await buscarUsuario(token);
                if (!ativo) return;

                if (!resposta.success) {
                    throw new Error("Não foi possível carregar seu perfil.");
                }

                const dados = resposta.data;
                setCamposPersistidos({
                    nome_usuario: dados.nome_usuario ?? "",
                    area_atuacao_usuario: dados.area_atuacao_usuario ?? "",
                    estado_usuario: dados.estado_usuario ?? "",
                    sobre_usuario: dados.sobre_usuario ?? "",
                    instagram_usuario: dados.instagram_usuario ?? "",
                    linkedin_usuario: dados.linkedin_usuario ?? "",
                    youtube_usuario: dados.youtube_usuario ?? "",
                    tiktok_usuario: dados.tiktok_usuario ?? "",
                    facebook_usuario: dados.facebook_usuario ?? "",
                    site_usuario: dados.site_usuario ?? "",
                });
                setNome(dados.nome_usuario ?? "");
                setArea(dados.area_atuacao_usuario ?? "");
                setEstado(dados.estado_usuario ?? "");
                setSobre(dados.sobre_usuario ?? "");
                setInstagram(dados.instagram_usuario ?? "");
                setLinkedin(dados.linkedin_usuario ?? "");
                setYoutube(dados.youtube_usuario ?? "");
                setTiktok(dados.tiktok_usuario ?? "");
                setFacebook(dados.facebook_usuario ?? "");
                setSite(dados.site_usuario ?? "");
                setEmail(dados.email_usuario ?? "");
                setFotoAtual(dados.foto_usuario ?? null);
                setDadosCarregados(true);
            } catch (e) {
                if (ativo) {
                    setDadosCarregados(false);
                    setErro(e instanceof Error ? e.message : "Erro ao carregar perfil.");
                }
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregarDados();
        return () => { ativo = false; };
    }, [token, carregandoSessao]);

    async function escolherFoto() {
        try {
            if (Platform.OS !== "web") {
                const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (!permissao.granted) {
                    Alert.alert("Permissão necessária", "Permita o acesso às suas fotos para escolher uma imagem.");
                    return;
                }
            }

            const selecao = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                // Usamos o mesmo editor em Web, Android e iOS.
                // O recorte nativo não funciona no navegador.
                allowsEditing: false,
                quality: 0.95,
            });

            if (!selecao.canceled && selecao.assets.length > 0) {
                const arquivo = selecao.assets[0];
                const tiposAceitos = ["image/jpeg", "image/png", "image/webp"];
                if (arquivo.mimeType && !tiposAceitos.includes(arquivo.mimeType)) {
                    setErro("Selecione uma imagem JPG, PNG ou WEBP.");
                    return;
                }
                if (arquivo.fileSize && arquivo.fileSize > 3 * 1024 * 1024) {
                    setErro("A imagem deve ter no máximo 3 MB.");
                    return;
                }
                setFotoParaAjustar(arquivo);
                setErro(null);
            }
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível selecionar a foto.");
        }
    }

    // Ao editar a foto já salva no perfil, precisamos abrir uma cópia local.
    // O ImageManipulator não deve receber uma URL HTTP diretamente.
    function liberarUrlTemporaria() {
        if (Platform.OS === "web" && urlTemporariaRef.current) {
            URL.revokeObjectURL(urlTemporariaRef.current);
            urlTemporariaRef.current = null;
        }
    }

    useEffect(() => () => {
        if (Platform.OS === "web" && urlTemporariaRef.current) {
            URL.revokeObjectURL(urlTemporariaRef.current);
            urlTemporariaRef.current = null;
        }
    }, []);

    async function ajustarFotoAtual() {
        const url = getUrlFotoUsuario(fotoAtual);
        if (!url || salvando || preparandoFoto) return;

        setPreparandoFoto(true);
        setErro(null);

        try {
            liberarUrlTemporaria();
            let uriLocal = url;

            if (/^https?:\/\//i.test(url)) {
                if (Platform.OS === "web") {
                    // A requisição exige CORS permitido se a foto estiver em outro domínio.
                    const resposta = await fetch(url);
                    if (!resposta.ok) throw new Error("Não foi possível carregar a foto atual.");
                    const blob = await resposta.blob();
                    uriLocal = URL.createObjectURL(blob);
                    urlTemporariaRef.current = uriLocal;
                } else {
                    if (!FileSystem.cacheDirectory) throw new Error("Cache de imagens indisponível.");
                    const destino = `${FileSystem.cacheDirectory}foto-atual-${Date.now()}.jpg`;
                    const download = await FileSystem.downloadAsync(url, destino);
                    if (download.status !== 200) throw new Error("Não foi possível baixar a foto atual.");
                    uriLocal = download.uri;
                }
            }

            const tamanhoFoto = await new Promise<{ width: number; height: number }>((resolve, reject) => {
                Image.getSize(
                    uriLocal,
                    (width, height) => resolve({ width, height }),
                    () => reject(new Error("Não foi possível identificar as dimensões da foto."))
                );
            });

            setFotoParaAjustar({
                uri: uriLocal,
                width: tamanhoFoto.width,
                height: tamanhoFoto.height,
                fileName: "foto-perfil-atual.jpg",
                mimeType: "image/jpeg",
                type: "image",
            });
        } catch (e) {
            liberarUrlTemporaria();
            const detalhe = e instanceof Error ? e.message : "Não foi possível abrir a foto.";
            setErro(Platform.OS === "web" && /^https?:\/\//i.test(url)
                ? `Não foi possível editar a foto atual (${detalhe}). Confira se o servidor permite CORS para imagens.`
                : detalhe);
        } finally {
            setPreparandoFoto(false);
        }
    }

    // Chamado pelo modal: o arquivo recortado é enviado imediatamente ao Laravel.
    // Enviamos os valores já persistidos para não salvar campos de texto ainda em edição.
    async function salvarFotoAjustada(imagemAjustada: ImagePicker.ImagePickerAsset): Promise<void> {
        if (!token || !usuario || !dadosCarregados || !camposPersistidos) {
            throw new Error("Não foi possível identificar a sessão ou os dados do perfil.");
        }

        const resposta = await atualizarMeuPerfil(token, camposPersistidos, imagemAjustada);
        if (!resposta.success || !resposta.data) {
            throw new Error(resposta.message ?? "Não foi possível salvar a foto.");
        }

        await definirSessao(token, { ...usuario, ...resposta.data });
        setFotoAtual(resposta.data.foto_usuario ?? null);
        setFotoParaAjustar(null);
        liberarUrlTemporaria();
        setErro(null);
    }

    async function salvar() {
        if (!token || !usuario || salvando || !dadosCarregados) return;
        if (nome.trim().length < 2) {
            setErro("Informe um nome com pelo menos dois caracteres.");
            return;
        }
        if (!estado) {
            setErro("Selecione seu estado (UF) antes de salvar.");
            return;
        }

        try {
            setSalvando(true);
            setErro(null);

            const resposta = await atualizarMeuPerfil(token, {
                nome_usuario: nome,
                area_atuacao_usuario: area,
                estado_usuario: estado,
                sobre_usuario: sobre,
                instagram_usuario: instagram,
                linkedin_usuario: linkedin,
                youtube_usuario: youtube,
                tiktok_usuario: tiktok,
                facebook_usuario: facebook,
                site_usuario: site,
            });

            if (!resposta.success || !resposta.data) {
                throw new Error(resposta.message ?? "Não foi possível salvar o perfil.");
            }

            // Atualiza imediatamente o AuthContext (incluindo o cabeçalho)
            // e persiste os novos dados usando o mecanismo já existente.
            await definirSessao(token, { ...usuario, ...resposta.data });
            router.back();
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Erro ao salvar alterações.");
        } finally {
            setSalvando(false);
        }
    }

    const fotoExibida = getUrlFotoUsuario(fotoAtual);

    function campo(
        titulo: string,
        valor: string,
        alterar: (valor: string) => void,
        opcoes?: {
            multiline?: boolean;
            maxLength?: number;
            autoCapitalize?: "none" | "sentences" | "words" | "characters";
            keyboardType?: "default" | "url";
            placeholder?: string;
        },
    ) {
        const multiline = opcoes?.multiline ?? false;
        return (
            <View style={multiline ? styles.cardDescricao : styles.cardCampo}>
                <Text style={styles.label}>{titulo}</Text>
                <TextInput
                    style={multiline ? styles.inputDescricao : styles.input}
                    value={valor}
                    onChangeText={alterar}
                    editable={!salvando}
                    placeholder={opcoes?.placeholder ?? `Digite ${titulo.toLowerCase()}`}
                    placeholderTextColor={coresTema.textoSecundario}
                    multiline={multiline}
                    textAlignVertical={multiline ? "top" : "center"}
                    maxLength={opcoes?.maxLength}
                    autoCapitalize={opcoes?.autoCapitalize ?? "sentences"}
                    keyboardType={opcoes?.keyboardType ?? "default"}
                    autoCorrect={opcoes?.keyboardType !== "url"}
                    accessibilityLabel={titulo}
                />
            </View>
        );
    }

    return (
        <View style={globalStyle.container}>
            <View style={[globalStyle.background, styles.container]}>
                <ImageBackground
                    source={require("@/assets/images/img/fundoLogin.png")}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <SafeAreaView style={globalStyle.areaConteudo}>
                        <View style={styles.overlay}>
                            <KeyboardAvoidingView
                                style={styles.keyboard}
                                behavior={Platform.OS === "ios" ? "padding" : undefined}
                            >
                                <ScrollView
                                    style={styles.scroll}
                                    contentContainerStyle={styles.scrollConteudo}
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                >
                                    <View style={styles.topo}>
                                        <Pressable
                                            style={({ pressed }) => [
                                                styles.btnVoltar,
                                                pressed && styles.btnVoltarPressed,
                                            ]}
                                            onPress={() => router.back()}
                                            disabled={salvando}
                                            accessibilityRole="button"
                                            accessibilityLabel="Voltar ao perfil"
                                        >
                                            <Image
                                                source={require("@/assets/images/img/left.png")}
                                                style={styles.voltarImagem}
                                            />
                                        </Pressable>
                                        <Image
                                            source={require("@/assets/images/img/logo.svg")}
                                            style={styles.logo}
                                        />
                                        <View style={styles.espacoTopo} />
                                    </View>

                                    <View style={styles.apresentacao}>
                                        <Text style={styles.titulo}>
                                            Editar <Text style={styles.tituloDourado}>perfil</Text>
                                        </Text>
                                        <Text style={styles.aviso}>
                                            Atualize suas informações no Conexão 360°.
                                        </Text>
                                    </View>

                                    {carregando || carregandoSessao ? (
                                        <ActivityIndicator color={coresTema.destaque} size="large" />
                                    ) : !dadosCarregados ? (
                                        <View style={styles.cardCampo}>
                                            <Text style={{ color: "#F28C8C" }}>
                                                {erro ?? "Não foi possível carregar os dados do perfil."}
                                            </Text>
                                            <Pressable onPress={() => router.back()} style={{ marginTop: 14 }}>
                                                <Text style={{ color: coresTema.destaque }}>Voltar ao perfil</Text>
                                            </Pressable>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={styles.areaAvatar}>
                                                <View style={styles.avatarContainer}>
                                                    <Image
                                                        source={fotoExibida ? { uri: fotoExibida } : require("@/assets/images/img/avatar.png")}
                                                        style={styles.avatar}
                                                    />
                                                    <Pressable
                                                        style={styles.btnEditarFoto}
                                                        onPress={escolherFoto}
                                                        disabled={salvando}
                                                        accessibilityRole="button"
                                                        accessibilityLabel="Selecionar foto do perfil"
                                                    >
                                                        <Text style={{ color: "#161616", fontWeight: "700", fontSize: 19 }}>+</Text>
                                                    </Pressable>
                                                </View>
                                                <Pressable onPress={escolherFoto} disabled={salvando}>
                                                    <Text style={{ color: coresTema.destaque, marginTop: 10 }}>
                                                        Trocar foto
                                                    </Text>
                                                </Pressable>
                                                {fotoExibida ? (
                                                    <Pressable
                                                        onPress={ajustarFotoAtual}
                                                        disabled={salvando || preparandoFoto}
                                                        accessibilityRole="button"
                                                        accessibilityLabel="Ajustar o enquadramento da foto atual"
                                                        style={{ minHeight: 38, justifyContent: "center", marginTop: 4 }}
                                                    >
                                                        {preparandoFoto ? (
                                                            <ActivityIndicator color={coresTema.destaque} size="small" />
                                                        ) : (
                                                            <Text style={{ color: coresTema.destaque, fontSize: 15, textAlign: "center" }}>
                                                                Ajustar foto atual
                                                            </Text>
                                                        )}
                                                    </Pressable>
                                                ) : null}
                                            </View>

                                            <Text style={styles.tituloGrupo}>Informações pessoais</Text>
                                            {campo("Nome completo", nome, setNome, { maxLength: 100, autoCapitalize: "words" })}
                                            {campo("Área de atuação", area, setArea, { maxLength: 150 })}
                                            <Pressable
                                                style={styles.cardCampo}
                                                onPress={() => setSelecionandoEstado(true)}
                                                disabled={salvando}
                                                accessibilityRole="button"
                                                accessibilityLabel="Selecionar estado"
                                            >
                                                <Text style={styles.label}>Estado (UF)</Text>
                                                <Text style={[
                                                    styles.input,
                                                    !estado && { color: coresTema.textoSecundario },
                                                ]}>
                                                    {estado || "Selecione seu estado"}  ▾
                                                </Text>
                                            </Pressable>
                                            {campo("Sobre mim", sobre, setSobre, { multiline: true, maxLength: 200 })}

                                            <Text style={styles.tituloGrupo}>Redes sociais e site</Text>
                                            {campo("Instagram", instagram, setInstagram, {
                                                maxLength: 255, keyboardType: "url", autoCapitalize: "none",
                                                placeholder: "@usuario ou link do perfil",
                                            })}
                                            {campo("LinkedIn", linkedin, setLinkedin, {
                                                maxLength: 255, keyboardType: "url", autoCapitalize: "none",
                                                placeholder: "Link do seu perfil",
                                            })}
                                            {campo("YouTube", youtube, setYoutube, {
                                                maxLength: 255, keyboardType: "url", autoCapitalize: "none",
                                                placeholder: "@canal ou link do canal",
                                            })}
                                            {campo("TikTok", tiktok, setTiktok, {
                                                maxLength: 255, keyboardType: "url", autoCapitalize: "none",
                                                placeholder: "@usuario ou link do perfil",
                                            })}
                                            {campo("Facebook", facebook, setFacebook, {
                                                maxLength: 255, keyboardType: "url", autoCapitalize: "none",
                                                placeholder: "Link do perfil ou página",
                                            })}
                                            {campo("Site pessoal", site, setSite, {
                                                maxLength: 255, keyboardType: "url", autoCapitalize: "none",
                                                placeholder: "https://seusite.com.br",
                                            })}

                                            <Text style={styles.tituloGrupo}>Conta</Text>
                                            <View style={styles.cardCampo}>
                                                <Text style={styles.label}>E-mail (somente leitura)</Text>
                                                <Text style={[styles.input, { color: coresTema.textoSecundario }]}>
                                                    {email}
                                                </Text>
                                            </View>

                                            {erro ? (
                                                <Text style={{ color: "#F28C8C", fontSize: 14, marginBottom: 14 }}>
                                                    {erro}
                                                </Text>
                                            ) : null}

                                            <Pressable
                                                style={({ pressed }) => ({
                                                    backgroundColor: coresTema.destaque,
                                                    borderRadius: 13,
                                                    minHeight: 50,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginTop: 8,
                                                    opacity: (pressed || salvando) ? 0.75 : 1,
                                                })}
                                                onPress={salvar}
                                                disabled={salvando || !token}
                                                accessibilityRole="button"
                                            >
                                                {salvando ? (
                                                    <ActivityIndicator color="#161616" />
                                                ) : (
                                                    <Text style={{ color: "#161616", fontWeight: "700", fontSize: 16 }}>
                                                        Salvar alterações
                                                    </Text>
                                                )}
                                            </Pressable>
                                        </>
                                    )}

                                    {erro && (carregando || carregandoSessao) ? (
                                        <Text style={{ color: "#F28C8C", marginTop: 20 }}>{erro}</Text>
                                    ) : null}
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
            <Modal
                visible={selecionandoEstado}
                transparent
                animationType="slide"
                onRequestClose={() => setSelecionandoEstado(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.75)",
                    justifyContent: "flex-end",
                }}>
                    <View style={{
                        backgroundColor: coresTema.card,
                        borderTopLeftRadius: 22,
                        borderTopRightRadius: 22,
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 30,
                        maxHeight: "75%",
                    }}>
                        <Text style={[styles.tituloGrupo, { marginBottom: 16 }]}>
                            Selecione seu estado
                        </Text>
                        <ScrollView keyboardShouldPersistTaps="handled">
                            {ESTADOS_BRASIL.map(({ uf, nome }) => (
                                <Pressable
                                    key={uf}
                                    onPress={() => {
                                        setEstado(uf);
                                        setSelecionandoEstado(false);
                                    }}
                                    style={{
                                        paddingVertical: 13,
                                        borderBottomWidth: 1,
                                        borderBottomColor: coresTema.borda,
                                    }}
                                    accessibilityRole="button"
                                >
                                    <Text style={{
                                        color: estado === uf ? coresTema.destaque : coresTema.texto,
                                        fontSize: 15,
                                    }}>
                                        {nome} ({uf})
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <Pressable
                            onPress={() => setSelecionandoEstado(false)}
                            style={{ paddingTop: 18, alignItems: "center" }}
                            accessibilityRole="button"
                        >
                            <Text style={{ color: coresTema.destaque, fontSize: 15 }}>
                                Cancelar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <AjustarFotoPerfilModal
                imagem={fotoParaAjustar}
                aoCancelar={() => {
                    setFotoParaAjustar(null);
                    liberarUrlTemporaria();
                }}
                aoConfirmar={salvarFotoAjustada}
            />
        </View>
    );
}
