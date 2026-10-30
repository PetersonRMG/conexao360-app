import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const grupos = [
  { nome: "Rostos", itens: ["😀", "😁", "😂", "🤣", "😊", "😍", "🥰", "😘", "😎", "🤩", "🥹", "😢", "😭", "😅", "😇", "🤔", "😮", "🙃", "😴", "🤗", "😋", "😏", "😬", "🥳"] },
  { nome: "Gestos", itens: ["👍", "👎", "👏", "🙌", "🙏", "🤝", "💪", "👋", "👌", "✌️", "🫶", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤍", "💯", "🔥", "✨", "⭐", "🎉", "🎊"] },
  { nome: "Ideias", itens: ["💡", "🚀", "🎯", "📚", "🧠", "💼", "🏆", "📝", "📣", "📷", "🎨", "🌟", "🌍", "📅", "✅", "💬"] },
] as const;

type Props = {
  onSelect: (emoji: string) => void;
  corDestaque: string;
  corTexto: string;
  corFundo: string;
  corBorda: string;
};

/** Seletor de emojis local; não depende de bibliotecas ou de APIs adicionais. */
export default function SeletorEmojis({ onSelect, corDestaque, corTexto, corFundo, corBorda }: Props) {
  const [categoria, setCategoria] = useState<number>(0);

  return (
    <View style={{ backgroundColor: corFundo, borderColor: corBorda, borderWidth: 1, borderRadius: 16, marginTop: 8, padding: 10 }}>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
        {grupos.map((grupo, i) => (
          <Pressable
            key={grupo.nome}
            onPress={() => setCategoria(i)}
            accessibilityRole="button"
            accessibilityLabel={`Emojis: ${grupo.nome}`}
            style={{ flex: 1, alignItems: "center", borderRadius: 10, paddingVertical: 8, backgroundColor: categoria === i ? corBorda : "transparent" }}
          >
            <Text style={{ color: categoria === i ? corDestaque : corTexto, fontSize: 12, fontWeight: categoria === i ? "700" : "400" }}>{grupo.nome}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView style={{ maxHeight: 178 }} nestedScrollEnabled keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
          {grupos[categoria].itens.map((emoji) => (
            <Pressable
              key={emoji}
              onPress={() => onSelect(emoji)}
              accessibilityRole="button"
              accessibilityLabel={`Inserir ${emoji}`}
              style={{ width: "12.5%", minWidth: 35, height: 43, alignItems: "center", justifyContent: "center" }}
            >
              <Text style={{ fontSize: 25 }}>{emoji}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
