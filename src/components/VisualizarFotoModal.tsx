import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import type { Publicacao } from "@/services/publicacaoService";
import { useTema } from "@/contexts/TemaContext";

type Props = {
  publicacao: Publicacao | null;
  imagem: string | null;
  fotoAutor?: string | null;
  dataFormatada?: string;
  curtindo?: boolean;
  aoFechar: () => void;
  aoCurtir: (publicacao: Publicacao) => void | Promise<void>;
  aoVerComentarios: (idPublicacao: number) => void;
};

export default function VisualizarPublicacaoModal({
  publicacao,
  imagem,
  fotoAutor,
  dataFormatada,
  curtindo = false,
  aoFechar,
  aoCurtir,
  aoVerComentarios,
}: Props) {
  const { coresTema } = useTema();
  const { width: largura, height: altura } = useWindowDimensions();

  const totalCurtidas = publicacao?.curtidas_count ?? 0;
  const totalComentarios = publicacao?.comentarios_count ?? 0;
  const curtido = Boolean(publicacao?.curtido_por_mim);
  const alturaImagem = Math.max(190, Math.min(altura * 0.48, largura - 30, 510));

  return (
    <Modal
      visible={!!publicacao && !!imagem}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={aoFechar}
    >
      <View style={estilos.fundo}>
        <View style={estilos.cartao}>
          <View style={estilos.cabecalho}>
            <View style={estilos.identificacao}>
              <Image
                source={fotoAutor ? { uri: fotoAutor } : require("@/assets/images/img/avatar.png")}
                style={[estilos.avatar, { borderColor: coresTema.destaque }]}
              />
              <View style={estilos.dadosAutor}>
                <Text style={estilos.nome} numberOfLines={1}>
                  {publicacao?.usuario?.nome_usuario ?? "Usuário"}
                </Text>
                {!!dataFormatada && <Text style={estilos.data}>{dataFormatada}</Text>}
              </View>
            </View>
            <Pressable
              onPress={aoFechar}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Fechar publicação ampliada"
              style={estilos.fechar}
            >
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={estilos.conteudo}
          >
            {!!imagem && (
              <Image
                source={{ uri: imagem }}
                style={[estilos.imagem, { height: alturaImagem }]}
                resizeMode="contain"
                accessibilityLabel="Imagem ampliada da publicação"
              />
            )}

            {publicacao?.texto_publicacao ? (
              <Text style={estilos.legenda}>{publicacao.texto_publicacao}</Text>
            ) : null}

            <View style={estilos.contadores}>
              <Text style={estilos.contador}>
                {totalCurtidas} {totalCurtidas === 1 ? "curtida" : "curtidas"}
              </Text>
              <Pressable
                onPress={() => {
                  if (publicacao) aoVerComentarios(publicacao.id_publicacao);
                }}
                accessibilityRole="button"
                accessibilityLabel="Ver comentários da publicação"
              >
                <Text style={estilos.contador}>
                  {totalComentarios} {totalComentarios === 1 ? "comentário" : "comentários"}
                </Text>
              </Pressable>
            </View>

            <View style={estilos.acoes}>
              <Pressable
                style={estilos.acao}
                onPress={() => { if (publicacao) void aoCurtir(publicacao); }}
                disabled={curtindo || !publicacao}
                accessibilityRole="button"
                accessibilityLabel={curtido ? "Descurtir publicação" : "Curtir publicação"}
              >
                {curtindo ? (
                  <ActivityIndicator size="small" color={coresTema.destaque} />
                ) : (
                  <Ionicons
                    name={curtido ? "heart" : "heart-outline"}
                    size={24}
                    color={curtido ? "#E94F64" : "#FFFFFF"}
                  />
                )}
                <Text style={estilos.textoAcao}>{curtido ? "Curtido" : "Curtir"}</Text>
              </Pressable>

              <Pressable
                style={estilos.acao}
                onPress={() => {
                  if (publicacao) aoVerComentarios(publicacao.id_publicacao);
                }}
                accessibilityRole="button"
                accessibilityLabel="Abrir comentários da publicação"
              >
                <Ionicons name="chatbubble-outline" size={22} color="#FFFFFF" />
                <Text style={estilos.textoAcao}>Comentários</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.94)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  cartao: {
    width: "100%",
    maxWidth: 560,
    maxHeight: "100%",
    backgroundColor: "#151515",
    borderRadius: 16,
    overflow: "hidden",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  identificacao: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 1.5 },
  dadosAutor: { flex: 1 },
  nome: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  data: { color: "#BBBBBB", fontSize: 12, marginTop: 2 },
  fechar: { padding: 5, marginLeft: 8 },
  conteudo: { paddingBottom: 14 },
  imagem: { width: "100%", backgroundColor: "#070707" },
  legenda: { color: "#F0F0F0", fontSize: 14, lineHeight: 21, paddingHorizontal: 16, paddingTop: 14 },
  contadores: {
    flexDirection: "row", justifyContent: "space-between", gap: 10,
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12,
  },
  contador: { color: "#DCDCDC", fontSize: 13, fontWeight: "600" },
  acoes: {
    flexDirection: "row", borderTopWidth: 1, borderTopColor: "#353535",
    paddingHorizontal: 16, paddingTop: 12, gap: 24,
  },
  acao: { flexDirection: "row", alignItems: "center", gap: 8, minHeight: 36 },
  textoAcao: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
});
