import { useEffect, useState } from "react";
import {
  ActivityIndicator, KeyboardAvoidingView, Modal, Platform,
  Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "@/contexts/TemaContext";

type TipoAcao = "denunciar" | "excluir";
type Props = {
  visible: boolean;
  tipo: TipoAcao;
  totalDenuncias: number;
  carregando: boolean;
  erro: string | null;
  onClose: () => void;
  onConfirm: (motivo: string, descricao: string) => void | Promise<void>;
};

const motivos = [
  "Conteúdo impróprio",
  "Assédio ou ofensa",
  "Spam ou publicidade",
  "Informação falsa",
  "Outro",
];

export default function ModalAcaoPublicacao({
  visible, tipo, totalDenuncias, carregando, erro, onClose, onConfirm,
}: Props) {
  const { coresTema } = useTema();
  const [motivo, setMotivo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [validacao, setValidacao] = useState("");
  const excluir = tipo === "excluir";

  useEffect(() => {
    if (visible) {
      setMotivo("");
      setDescricao("");
      setValidacao("");
    }
  }, [visible, tipo]);

  function confirmar() {
    if (carregando) return;
    if (!excluir && !motivo) {
      setValidacao("Selecione o motivo da denúncia.");
      return;
    }
    setValidacao("");
    void onConfirm(motivo, descricao);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={estilos.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[estilos.cartao, { backgroundColor: coresTema.card, borderColor: coresTema.borda }]}>
          <View style={estilos.cabecalho}>
            <View style={estilos.tituloLinha}>
              <Ionicons name={excluir ? "trash-outline" : "flag-outline"} size={21} color={coresTema.destaque} />
              <Text style={[estilos.titulo, { color: coresTema.texto }]}>
                {excluir ? "Excluir publicação" : "Denunciar publicação"}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              disabled={carregando}
              accessibilityLabel="Fechar"
              style={estilos.fechar}
            >
              <Ionicons name="close" size={24} color={coresTema.textoSecundario} />
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={estilos.conteudo}>
            <Text style={[estilos.explicacao, { color: coresTema.textoSecundario }]}>
              {excluir
                ? "Sua publicação deixará de aparecer para outras pessoas. O registro será preservado no sistema."
                : "Esta publicação sairá do feed após a denúncia e será analisada pela moderação."}
            </Text>
            {!excluir && (
              <>
                <Text style={[estilos.contador, { color: coresTema.destaque }]}>
                  Denúncias registradas: {totalDenuncias} de 3
                </Text>
                <Text style={[estilos.label, { color: coresTema.texto }]}>Motivo da denúncia *</Text>
                {motivos.map(item => (
                  <Pressable
                    key={item}
                    style={[estilos.motivo, {
                      backgroundColor: coresTema.cardSecundario,
                      borderColor: motivo === item ? coresTema.destaque : coresTema.borda,
                    }]}
                    disabled={carregando}
                    onPress={() => { setMotivo(item); setValidacao(""); }}
                  >
                    <Ionicons
                      name={motivo === item ? "radio-button-on" : "radio-button-off"}
                      size={19}
                      color={motivo === item ? coresTema.destaque : coresTema.textoSecundario}
                    />
                    <Text style={{ color: coresTema.texto, fontSize: 14, flexShrink: 1 }}>{item}</Text>
                  </Pressable>
                ))}
                <Text style={[estilos.label, { color: coresTema.texto }]}>Detalhes (opcional)</Text>
                <TextInput
                  multiline
                  numberOfLines={3}
                  maxLength={2000}
                  value={descricao}
                  onChangeText={setDescricao}
                  editable={!carregando}
                  placeholder="Descreva brevemente o que aconteceu..."
                  placeholderTextColor={coresTema.textoSecundario}
                  style={[estilos.descricao, {
                    backgroundColor: coresTema.cardSecundario,
                    borderColor: coresTema.borda,
                    color: coresTema.texto,
                  }]}
                  textAlignVertical="top"
                />
              </>
            )}
            {!!(erro || validacao) && (
              <Text accessibilityRole="alert" style={estilos.erro}>{erro || validacao}</Text>
            )}
          </ScrollView>
          <View style={[estilos.rodape, { borderTopColor: coresTema.borda }]}>
            <Pressable
              onPress={onClose}
              disabled={carregando}
              style={[estilos.botao, { borderColor: coresTema.borda, borderWidth: 1 }]}
            >
              <Text style={{ color: coresTema.texto, fontWeight: "600" }}>Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={confirmar}
              disabled={carregando}
              style={[estilos.botao, { backgroundColor: coresTema.destaque, opacity: carregando ? 0.6 : 1 }]}
            >
              {carregando ? <ActivityIndicator color="#171717" /> : (
                <Text style={{ color: "#171717", fontWeight: "700" }}>
                  {excluir ? "Excluir" : "Enviar denúncia"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.72)", paddingHorizontal: 16,
  },
  cartao: {
    width: "100%", maxWidth: 430, maxHeight: "86%", borderRadius: 18,
    borderWidth: 1, overflow: "hidden",
  },
  cabecalho: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10,
  },
  tituloLinha: { flexDirection: "row", gap: 9, alignItems: "center", flexShrink: 1 },
  titulo: { fontSize: 18, fontWeight: "700" },
  fechar: { padding: 4 },
  conteudo: { paddingHorizontal: 18, paddingBottom: 14 },
  explicacao: { fontSize: 14, lineHeight: 21, marginBottom: 10 },
  contador: { fontSize: 12, marginBottom: 14, fontWeight: "600" },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 9, marginTop: 5 },
  motivo: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 11,
    paddingVertical: 11, marginBottom: 7,
  },
  descricao: {
    borderWidth: 1, borderRadius: 10, padding: 11,
    minHeight: 88, fontSize: 14, marginBottom: 8,
  },
  erro: { color: "#ff8a8a", marginBottom: 8, fontSize: 13 },
  rodape: {
    flexDirection: "row", borderTopWidth: 1,
    paddingHorizontal: 16, paddingVertical: 14, gap: 10,
  },
  botao: { flex: 1, minHeight: 43, justifyContent: "center", alignItems: "center", borderRadius: 10 },
});
