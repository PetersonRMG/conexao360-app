import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthBrand from "@/components/AuthBrand";
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
  return (
    <View style={cadClienteStyle.container}>
      <ImageBackground source={require("@/assets/images/img/fundoLogin.png")} style={cadClienteStyle.background} resizeMode="stretch">
        <View style={cadClienteStyle.overlay}>
          <SafeAreaView style={cadClienteStyle.safeArea}>
            <KeyboardAvoidingView style={cadClienteStyle.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
              <ScrollView style={cadClienteStyle.scroll} contentContainerStyle={cadClienteStyle.scrollConteudo} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={cadClienteStyle.conteudo}>
                  <View style={cadClienteStyle.back}>
                    <Pressable style={cadClienteStyle.backTap} onPress={() => router.replace("/")} accessibilityLabel="Voltar">
                      <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                    </Pressable>
                    <Text style={cadClienteStyle.appTitle}>Conexão <Text style={cadClienteStyle.appTitleGold}>360°</Text></Text>
                    <View style={cadClienteStyle.backSpacer} />
                  </View>
                  <AuthBrand compact />
                  <View style={cadClienteStyle.conteudoTopo}>
                    <Ionicons name="person-add-outline" size={46} color="#F0C247" style={cadClienteStyle.heroIcon} />
                    <Text style={cadClienteStyle.subtitulo}>Criar Conta</Text>
                    <Text style={cadClienteStyle.titulo}>Seja <Text style={cadClienteStyle.tituloDourado}>Exponencial</Text></Text>
                    <Text style={cadClienteStyle.inf}>Informe seus dados para fazer parte da Conexão 360°.</Text>
                  </View>
                  <View style={cadClienteStyle.cardInput} nativeID="auth-cadastro-form">
                    <View style={cadClienteStyle.input}>
                      <Ionicons name="person-outline" color="#F0C247" size={22} style={{ marginRight: 12 }} />
                      <TextInput style={cadClienteStyle.txtInput} placeholder="Nome completo" nativeID="auth-cadastro-input-nome" placeholderTextColor="#BFC0C6" value={nome} onChangeText={setNome} autoCapitalize="words" autoCorrect={false} editable={!cadastrando} maxLength={100} />
                    </View>
                    <View style={cadClienteStyle.input}>
                      <Ionicons name="mail-outline" color="#F0C247" size={22} style={{ marginRight: 12 }} />
                      <TextInput style={cadClienteStyle.txtInput} placeholder="E-mail" nativeID="auth-cadastro-input-email" placeholderTextColor="#BFC0C6" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} editable={!cadastrando} maxLength={80} />
                    </View>
                    <View style={cadClienteStyle.input}>
                      <Ionicons name="briefcase-outline" color="#F0C247" size={22} style={{ marginRight: 12 }} />
                      <TextInput style={cadClienteStyle.txtInput} placeholder="Área de atuação" nativeID="auth-cadastro-input-area" placeholderTextColor="#BFC0C6" value={areaAtuacao} onChangeText={setAreaAtuacao} autoCapitalize="sentences" editable={!cadastrando} maxLength={150} />
                    </View>
                    <View style={cadClienteStyle.input}>
                      <Ionicons name="location-outline" color="#F0C247" size={22} style={{ marginRight: 12 }} />
                      <TextInput
                        style={cadClienteStyle.txtInput} placeholder="Estado — ex.: SP" nativeID="auth-cadastro-input-estado" placeholderTextColor="#BFC0C6"
                        value={estado} onChangeText={(valor) => setEstado(valor.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2))}
                        autoCapitalize="characters" autoCorrect={false} editable={!cadastrando} maxLength={2}
                      />
                    </View>
                    <View style={cadClienteStyle.input}>
                      <Ionicons name="lock-closed-outline" color="#F0C247" size={22} style={{ marginRight: 12 }} />
                      <TextInput style={cadClienteStyle.txtInput} placeholder="Senha" nativeID="auth-cadastro-input-senha" placeholderTextColor="#BFC0C6" value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha} autoCapitalize="none" autoCorrect={false} editable={!cadastrando} maxLength={255} />
                      <Pressable style={cadClienteStyle.eyeTap} accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"} onPress={() => setMostrarSenha((anterior) => !anterior)}>
                        <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={23} color="#D5D5D8" />
                      </Pressable>
                    </View>
                    <View style={cadClienteStyle.input}>
                      <Ionicons name="lock-closed-outline" color="#F0C247" size={22} style={{ marginRight: 12 }} />
                      <TextInput style={cadClienteStyle.txtInput} placeholder="Confirmar senha" nativeID="auth-cadastro-input-confirmar-senha" placeholderTextColor="#BFC0C6" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={!mostrarConfirmacao} autoCapitalize="none" autoCorrect={false} editable={!cadastrando} maxLength={255} onSubmitEditing={criarConta} />
                      <Pressable style={cadClienteStyle.eyeTap} accessibilityLabel={mostrarConfirmacao ? "Ocultar confirmação da senha" : "Mostrar confirmação da senha"} onPress={() => setMostrarConfirmacao((anterior) => !anterior)}>
                        <Ionicons name={mostrarConfirmacao ? "eye-off-outline" : "eye-outline"} size={23} color="#D5D5D8" />
                      </Pressable>
                    </View>
                  </View>
                  <View style={cadClienteStyle.passwordInfo}>
                    <Text style={cadClienteStyle.passwordTitle}>Sua senha deve conter:</Text>
                    <Text style={cadClienteStyle.passwordBody}>✓ No mínimo 8 caracteres</Text>
                  </View>
                  <View style={cadClienteStyle.termsBox}>
                    <AceiteDocumentosCadastro
                      aceitouTermos={termosAceitos} confirmouPrivacidade={confirmouPrivacidade}
                      onChangeTermos={setTermosAceitos} onChangePrivacidade={setConfirmouPrivacidade}
                      desabilitado={cadastrando} darkOnImage
                    />
                  </View>
                  <Pressable
                    style={({ pressed }) => [cadClienteStyle.btnCriar, (cadastrando || !termosAceitos || !confirmouPrivacidade) && cadClienteStyle.btnCriarDesabilitado, pressed && !cadastrando && cadClienteStyle.btnCriarPressed]}
                    onPress={criarConta} disabled={cadastrando || !termosAceitos || !confirmouPrivacidade}
                  >
                    <Text style={cadClienteStyle.txtCriar}>{cadastrando ? "Enviando código..." : "Enviar código de verificação"}</Text>
                  </Pressable>
                  {feedback && (
                    <View accessibilityRole="alert" style={[cadClienteStyle.feedback, { borderColor: feedback.tipo === "erro" ? "#CA6868" : "#D4AF37", backgroundColor: feedback.tipo === "erro" ? "rgba(53,31,36,0.94)" : "rgba(44,42,29,0.94)" }]}>
                      <Text style={[cadClienteStyle.feedbackText, { color: feedback.tipo === "erro" ? "#FFD8D8" : "#F6E6BD" }]}>{feedback.texto}</Text>
                    </View>
                  )}
                  <Pressable style={({ pressed }) => [cadClienteStyle.btnVoltar, pressed && cadClienteStyle.btnVoltarPressed]} onPress={() => router.replace("/")} disabled={cadastrando}>
                    <Text style={cadClienteStyle.txtVoltar}>Já tem uma conta? Entrar</Text>
                  </Pressable>
                  <View style={cadClienteStyle.slogan}>
                    <Text style={cadClienteStyle.sloganTitle}>NETWORKING DE ALTO NÍVEL</Text>
                    <Text style={cadClienteStyle.sloganSubtitle}>Conhecimento <Text style={cadClienteStyle.sloganGold}>Exponencial</Text></Text>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}
