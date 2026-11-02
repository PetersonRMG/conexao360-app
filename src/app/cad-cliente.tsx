import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "@/styles/globalStyles";
import { criarCadClienteStyles } from "@/styles/cadClientStyles";
import { useTema } from "@/contexts/TemaContext";
import { solicitarCodigoCadastro } from "@/services/verificacaoEmailService";
import { salvarCadastroPendente } from "@/services/cadastroPendente";
import AceiteDocumentosCadastro from "@/components/AceiteDocumentosCadastro";
export default function CadClienteScreen() {
    // =====================================
    // TEMA
    // =====================================
    const { coresTema } = useTema();
    const cadClienteStyle = criarCadClienteStyles(coresTema);
    // =====================================
    // FORMULÁRIO
    // =====================================
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [areaAtuacao, setAreaAtuacao] = useState("");
    const [estado, setEstado] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [termosAceitos, setTermosAceitos] = useState(false);
    const [confirmouPrivacidade, setConfirmouPrivacidade] = useState(false);
    const [cadastrando, setCadastrando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [feedback, setFeedback] = useState<{ tipo: "erro" | "sucesso"; texto: string } | null>(null);

    // O React Native Web não exibe Alert.alert como no Android/iOS.
    // Exibir o aviso na própria tela funciona nas três plataformas.
    function avisar(titulo: string, mensagem: string, tipo: "erro" | "sucesso" = "erro") {
        setFeedback({ tipo, texto: `${titulo}: ${mensagem}` });
        if (Platform.OS !== "web") {
            Alert.alert(titulo, mensagem);
        }
    }
    // =====================================
    // SOLICITAR CÓDIGO
    // =====================================
    async function criarConta() {
        if (cadastrando) {
            return;
        }
        setFeedback(null);
        const nomeTratado = nome.trim();
        const emailTratado = email.trim().toLowerCase();
        const areaTratada = areaAtuacao.trim();
        const estadoTratado = estado.trim().toUpperCase();
        // =================================
        // VALIDAÇÕES LOCAIS
        // =================================
        if (!nomeTratado) {
            avisar("Nome obrigatório", "Informe seu nome completo.");
            return;
        }
        if (!emailTratado) {
            avisar("E-mail obrigatório", "Informe seu e-mail.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado)) {
            avisar("E-mail inválido", "Informe um e-mail válido.");
            return;
        }
        if (!areaTratada) {
            avisar("Área de atuação", "Informe sua área de atuação.");
            return;
        }
        if (estadoTratado.length !== 2) {
            avisar("Estado inválido", "Informe a sigla do estado com 2 letras. Exemplo: SP.");
            return;
        }
        if (senha.length < 8) {
            avisar("Senha inválida", "A senha deve possuir pelo menos 8 caracteres.");
            return;
        }
        if (senha !== confirmarSenha) {
            avisar("Senhas diferentes", "A confirmação da senha não corresponde.");
            return;
        }
        if (!termosAceitos || !confirmouPrivacidade) {
            avisar("Termos de uso", "Aceite os Termos de Uso e confirme que teve acesso à Política de Privacidade.");
            return;
        }
        // =================================
        // API
        // =================================
        try {
            setCadastrando(true);
            // O envio real é feito pela API Laravel já implementada.
            await solicitarCodigoCadastro(emailTratado);

            // Mantém os dados temporariamente em memória, sem enviá-los na URL.
            salvarCadastroPendente({
                nome: nomeTratado,
                email: emailTratado,
                area_atuacao: areaTratada,
                estado: estadoTratado,
                sobre: "",
                senha,
                senha_confirmation: confirmarSenha,
                termos: termosAceitos,
            });
            router.push({ pathname: "/enviarLink", params: { modo: "cadastro" } });
        } catch (error) {
            avisar(
                "Não foi possível enviar o código",
                error instanceof Error ? error.message : "Verifique seus dados e tente novamente.",
            );
        } finally {
            setCadastrando(false);
        }
    }

    // =====================================
    // TELA
    // =====================================
    return (<View style={globalStyle.container}>

      <ImageBackground source={require("@/assets/images/img/fundoLogin.png")} style={globalStyle.background} resizeMode="stretch">

        <SafeAreaView style={cadClienteStyle.safeArea}>

          <KeyboardAvoidingView style={cadClienteStyle.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>

            <ScrollView style={cadClienteStyle.scroll} contentContainerStyle={cadClienteStyle.scrollConteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

              <View style={cadClienteStyle.conteudo}>

                {/* ================================

                            CONTEÚDO SUPERIOR

                        ================================= */}

                <View style={cadClienteStyle.conteudoTopo}>

                  <Image style={globalStyle.logoMenor} source={require("@/assets/images/img/logo.svg")}/>

                  <Text style={cadClienteStyle.subtitulo}>Criar Conta</Text>

                  <Text style={cadClienteStyle.titulo}>

                    Seja <Text style={cadClienteStyle.tituloDourado}>Exponencial</Text>

                  </Text>

                  <Text style={cadClienteStyle.inf}>Informe seus dados para fazer parte da Conexão 360°.</Text>

                </View>

                {/* ================================

                            CAMPOS

                        ================================= */}

                <View style={cadClienteStyle.cardInput}>

                  {/* NOME */}

                  <View style={cadClienteStyle.input}>

                    <Image style={cadClienteStyle.icon} source={require("@/assets/images/img/usuario.png")}/>

                    <TextInput style={cadClienteStyle.txtInput} placeholder="Nome completo" placeholderTextColor={coresPlaceholder} value={nome} onChangeText={setNome} autoCapitalize="words" autoCorrect={false} editable={!cadastrando} maxLength={100}/>

                  </View>

                  {/* E-MAIL */}

                  <View style={cadClienteStyle.input}>

                    <Image style={cadClienteStyle.icon} source={require("@/assets/images/img/e-mail.png")}/>

                    <TextInput style={cadClienteStyle.txtInput} placeholder="E-mail" placeholderTextColor={coresPlaceholder} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} editable={!cadastrando} maxLength={80}/>

                  </View>

                  {/* ÁREA DE ATUAÇÃO */}

                  <View style={cadClienteStyle.input}>

                    <Image style={cadClienteStyle.icon} source={require("@/assets/images/img/usuario.png")}/>

                    <TextInput style={cadClienteStyle.txtInput} placeholder="Área de atuação" placeholderTextColor={coresPlaceholder} value={areaAtuacao} onChangeText={setAreaAtuacao} autoCapitalize="sentences" editable={!cadastrando} maxLength={150}/>

                  </View>

                  {/* ESTADO */}

                  <View style={cadClienteStyle.input}>

                    <Image style={cadClienteStyle.icon} source={require("@/assets/images/img/usuario.png")}/>

                    <TextInput style={cadClienteStyle.txtInput} placeholder="Estado - Ex.: SP" placeholderTextColor={coresPlaceholder} value={estado} onChangeText={(texto) => setEstado(texto
            .replace(/[^a-zA-Z]/g, "")
            .toUpperCase()
            .slice(0, 2))} autoCapitalize="characters" autoCorrect={false} editable={!cadastrando} maxLength={2}/>

                  </View>

                  {/* SENHA */}

                  <View style={cadClienteStyle.input}>

                    <Image style={cadClienteStyle.icon} source={require("@/assets/images/img/trancar.png")}/>

                    <TextInput style={cadClienteStyle.txtInput} placeholder="Senha" placeholderTextColor={coresPlaceholder} value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha} autoCapitalize="none" autoCorrect={false} editable={!cadastrando} maxLength={255}/>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                      hitSlop={8}
                      onPress={() => setMostrarSenha((anterior) => !anterior)}
                      style={{ paddingHorizontal: 12, paddingVertical: 9 }}
                    >
                      <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={22} color={coresTema.textoSecundario} />
                    </Pressable>

                  </View>

                  {/* CONFIRMAR SENHA */}

                  <View style={[cadClienteStyle.input, cadClienteStyle.inputUltimo]}>

                    <Image style={cadClienteStyle.icon} source={require("@/assets/images/img/trancar.png")}/>

                    <TextInput style={cadClienteStyle.txtInput} placeholder="Confirmar senha" placeholderTextColor={coresPlaceholder} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={!mostrarConfirmacao} autoCapitalize="none" autoCorrect={false} editable={!cadastrando} maxLength={255} onSubmitEditing={criarConta}/>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={mostrarConfirmacao ? "Ocultar confirmação da senha" : "Mostrar confirmação da senha"}
                      hitSlop={8}
                      onPress={() => setMostrarConfirmacao((anterior) => !anterior)}
                      style={{ paddingHorizontal: 12, paddingVertical: 9 }}
                    >
                      <Ionicons name={mostrarConfirmacao ? "eye-off-outline" : "eye-outline"} size={22} color={coresTema.textoSecundario} />
                    </Pressable>

                  </View>

                </View>

                {/* ================================

                            TERMOS E PRIVACIDADE

                        ================================= */}



                <AceiteDocumentosCadastro aceitouTermos={termosAceitos} confirmouPrivacidade={confirmouPrivacidade} onChangeTermos={setTermosAceitos} onChangePrivacidade={setConfirmouPrivacidade} desabilitado={cadastrando}/>



                {/* ================================

                            CRIAR CONTA

                        ================================= */}

                <Pressable style={({ pressed }) => [
            cadClienteStyle.btnCriar,
            (cadastrando || !termosAceitos || !confirmouPrivacidade) && cadClienteStyle.btnCriarDesabilitado,
            pressed && !cadastrando && cadClienteStyle.btnCriarPressed,
        ]} onPress={criarConta} disabled={cadastrando || !termosAceitos || !confirmouPrivacidade}>

                  <Text style={cadClienteStyle.txtCriar}>{cadastrando ? "Enviando código..." : "Enviar código de verificação"}</Text>

                </Pressable>

                {feedback && (
                  <View
                    accessibilityRole="alert"
                    style={{
                      marginTop: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 14,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: feedback.tipo === "erro" ? "#CA6868" : coresTema.destaque,
                      backgroundColor: feedback.tipo === "erro" ? "#351F24" : "#2C2A1D",
                    }}
                  >
                    <Text style={{ color: feedback.tipo === "erro" ? "#FFD8D8" : "#F6E6BD", fontSize: 13, lineHeight: 19 }}>
                      {feedback.texto}
                    </Text>
                  </View>
                )}

                {/* ================================

                            VOLTAR AO LOGIN

                        ================================= */}

                <Pressable style={({ pressed }) => [
            cadClienteStyle.btnVoltar,
            pressed && !cadastrando && cadClienteStyle.btnVoltarPressed,
        ]} onPress={() => router.back()} disabled={cadastrando}>

                  <Text style={cadClienteStyle.txtVoltar}>Voltar ao login</Text>

                </Pressable>

              </View>

            </ScrollView>

          </KeyboardAvoidingView>

        </SafeAreaView>

      </ImageBackground>

    </View>);
}
const coresPlaceholder = "#888888";
