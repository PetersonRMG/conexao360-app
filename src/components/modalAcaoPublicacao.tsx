import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "@/contexts/TemaContext";
import { fontes, tipografia } from "@/styles/variaveis";

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
  visible,
  tipo,
  totalDenuncias,
  carregando,
  erro,
  onClose,
  onConfirm,
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
        <View
          style={[
            estilos.painel,
            { backgroundColor: coresTema.card, borderColor: coresTema.borda },
          ]}
        >
          <View style={estilos.cabecalho}>
            <View style={estilos.tituloLinha}>
              <View
                style={[
                  estilos.iconeFundo,
                  { backgroundColor: coresTema.cardSecundario },
                ]}
              >
                <Ionicons
                  name={excluir ? "trash-outline" : "flag-outline"}
                  size={23}
                  color={coresTema.destaque}
                />
              </View>
              <Text style={[estilos.titulo, { color: coresTema.texto }]}>
                {excluir ? "Excluir publicação" : "Denunciar publicação"}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              disabled={carregando}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
              style={estilos.fechar}
            >
              <Ionicons name="close" size={24} color={coresTema.textoSecundario} />
            </Pressable>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={estilos.conteudo}
          >
            <Text style={[estilos.explicacao, { color: coresTema.textoSecundario }]}>
              {excluir
                ? "Sua publicação deixará de aparecer para outras pessoas. O registro será preservado no sistema."
                : "Esta publicação sairá do feed após a denúncia e será analisada pela moderação."}
            </Text>

            {!excluir && (
              <>
                <View
                  style={[
                    estilos.infoDenuncia,
                    { backgroundColor: coresTema.cardSecundario },
                  ]}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color={coresTema.destaque}
                  />
                  <Text
                    style={[estilos.infoTexto, { color: coresTema.textoSecundario }]}
                  >
                    Denúncias registradas: {totalDenuncias} de 3
                  </Text>
                </View>

                <Text style={[estilos.label, { color: coresTema.texto }]}>
                  Motivo da denúncia <Text style={{ color: coresTema.destaque }}>*</Text>
                </Text>

                <View style={estilos.motivosGrupo}>
                  {motivos.map((item) => {
                    const selecionado = motivo === item;
                    return (
                      <Pressable
                        key={item}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: selecionado, disabled: carregando }}
                        disabled={carregando}
                        onPress={() => {
                          setMotivo(item);
                          setValidacao("");
                        }}
                        style={[
                          estilos.motivo,
                          {
                            backgroundColor: selecionado
                              ? coresTema.cardSecundario
                              : coresTema.card,
                            borderColor: selecionado
                              ? coresTema.destaque
                              : coresTema.borda,
                          },
                        ]}
                      >
                        <Ionicons
                          name={selecionado ? "radio-button-on" : "radio-button-off"}
                          size={22}
                          color={
                            selecionado
                              ? coresTema.destaque
                              : coresTema.textoSecundario
                          }
                        />
                        <Text style={[estilos.motivoTexto, { color: coresTema.texto }]}>
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Text style={[estilos.label, { color: coresTema.texto }]}>
                  Detalhes <Text style={[estilos.opcional, { color: coresTema.textoSecundario }]}>(opcional)</Text>
                </Text>
                <TextInput
                  multiline
                  numberOfLines={3}
                  maxLength={2000}
                  value={descricao}
                  onChangeText={setDescricao}
                  editable={!carregando}
                  placeholder="Descreva brevemente o que aconteceu..."
                  placeholderTextColor={coresTema.textoSecundario}
                  textAlignVertical="top"
                  accessibilityLabel="Detalhes da denúncia"
                  style={[
                    estilos.descricao,
                    {
                      backgroundColor: coresTema.input,
                      borderColor: coresTema.borda,
                      color: coresTema.texto,
                    },
                  ]}
                />
                <Text
                  style={[estilos.contadorCaracteres, { color: coresTema.textoSecundario }]}
                >
                  {descricao.length}/2.000
                </Text>
              </>
            )}

            {!!(erro || validacao) && (
              <View style={estilos.erroLinha}>
                <Ionicons name="alert-circle-outline" size={19} color={coresTema.erro} />
                <Text
                  accessibilityRole="alert"
                  style={[estilos.erro, { color: coresTema.erro }]}
                >
                  {erro || validacao}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={[estilos.rodape, { borderTopColor: coresTema.borda }]}>
            <Pressable
              onPress={onClose}
              disabled={carregando}
              accessibilityRole="button"
              style={[
                estilos.botao,
                estilos.botaoCancelar,
                { borderColor: coresTema.borda },
              ]}
            >
              <Text style={[estilos.textoCancelar, { color: coresTema.texto }]}>
                Cancelar
              </Text>
            </Pressable>
            <Pressable
              onPress={confirmar}
              disabled={carregando}
              accessibilityRole="button"
              style={[
                estilos.botao,
                estilos.botaoPrincipal,
                {
                  backgroundColor: coresTema.destaque,
                  opacity: carregando ? 0.65 : 1,
                },
              ]}
            >
              {carregando ? (
                <ActivityIndicator color={coresTema.textoSobreDestaque} />
              ) : (
                <Text
                  style={[
                    estilos.textoConfirmar,
                    { color: coresTema.textoSobreDestaque },
                  ]}
                >
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.64)",
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  painel: {
    width: "100%",
    maxWidth: 430,
    maxHeight: "94%",
    borderRadius: 22,
    borderWidth: 1,
    overflow: "hidden",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 8,
  },
  tituloLinha: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconeFundo: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    flexShrink: 1,
    fontFamily: fontes.appBold,
    fontSize: 20,
    lineHeight: 26,
  },
  fechar: { padding: 6, justifyContent: "center", alignItems: "center" },
  conteudo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  explicacao: {
    fontFamily: fontes.appRegular,
    fontSize: tipografia.corpo,
    lineHeight: 24,
    marginBottom: 16,
  },
  infoDenuncia: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 9,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTexto: {
    fontFamily: fontes.appMedium,
    fontSize: tipografia.legenda,
    lineHeight: 20,
    flexShrink: 1,
  },
  label: {
    fontFamily: fontes.appSemiBold,
    fontSize: tipografia.corpo,
    lineHeight: 22,
    marginBottom: 12,
  },
  motivosGrupo: { gap: 9, marginBottom: 22 },
  motivo: {
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  motivoTexto: {
    fontFamily: fontes.appMedium,
    fontSize: tipografia.corpo,
    lineHeight: 22,
    flexShrink: 1,
  },
  opcional: {
    fontFamily: fontes.appRegular,
    fontSize: tipografia.legenda,
  },
  descricao: {
    minHeight: 110,
    borderRadius: 13,
    borderWidth: 1,
    padding: 14,
    fontFamily: fontes.appRegular,
    fontSize: tipografia.corpo,
    lineHeight: 23,
  },
  contadorCaracteres: {
    fontFamily: fontes.appRegular,
    fontSize: 13,
    marginTop: 7,
    textAlign: "right",
  },
  erroLinha: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingTop: 12,
  },
  erro: {
    flex: 1,
    fontFamily: fontes.appMedium,
    fontSize: tipografia.legenda,
    lineHeight: 20,
  },
  rodape: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    gap: 12,
  },
  botao: {
    minHeight: 52,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoCancelar: { flex: 0.9, borderWidth: 1 },
  botaoPrincipal: { flex: 1.35 },
  textoCancelar: {
    fontFamily: fontes.appSemiBold,
    fontSize: tipografia.botao,
  },
  textoConfirmar: {
    fontFamily: fontes.appBold,
    fontSize: tipografia.label,
    textAlign: "center",
  },
});
