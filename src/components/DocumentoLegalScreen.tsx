import { useTema } from '@/contexts/TemaContext';
import type { SecaoLegal } from '@/legal/documentosLegais';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  titulo: string;
  subtitulo: string;
  versao: string;
  secoes: SecaoLegal[];
};

export default function DocumentoLegalScreen({ titulo, subtitulo, versao, secoes }: Props) {
  const { coresTema } = useTema();

  return (
    <SafeAreaView style={[styles.pagina, { backgroundColor: coresTema.card }]}>
      <View style={[styles.barra, { borderBottomColor: coresTema.borda }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.voltar}
          accessibilityRole="button"
          accessibilityLabel="Voltar ao cadastro"
        >
          <Text style={[styles.voltarTexto, { color: coresTema.destaque }]}>‹ Voltar</Text>
        </Pressable>
        <Text style={[styles.marca, { color: coresTema.texto }]}>CONEXÃO 360°</Text>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.largura}>
          <Text style={[styles.titulo, { color: coresTema.texto }]}>{titulo}</Text>
          <Text style={[styles.subtitulo, { color: coresTema.textoSecundario }]}>{subtitulo}</Text>
          <View style={[styles.aviso, { borderColor: coresTema.borda }]}>
            <Text style={[styles.avisoTexto, { color: coresTema.textoSecundario }]}>
              Minuta para desenvolvimento · versão {versao}. Preencher dados do responsável,
              conferir os processos reais e submeter à revisão antes de publicar.
            </Text>
          </View>
          {secoes.map((secao, index) => (
            <View key={`${index}-${secao.titulo}`} style={styles.secao}>
              <Text style={[styles.tituloSecao, { color: coresTema.destaque }]}>{secao.titulo}</Text>
              <Text style={[styles.paragrafo, { color: coresTema.texto }]}>{secao.texto}</Text>
            </View>
          ))}
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={[styles.botao, { backgroundColor: coresTema.destaque }]}
          >
            <Text style={styles.botaoTexto}>Voltar ao cadastro</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pagina: { flex: 1 },
  barra: {
    minHeight: 58,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voltar: { paddingVertical: 12, paddingRight: 12 },
  voltarTexto: { fontWeight: '700', fontSize: 15 },
  marca: { fontWeight: '800', letterSpacing: 0.7, fontSize: 13 },
  conteudo: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 54, alignItems: 'center' },
  largura: { width: '100%', maxWidth: 740 },
  titulo: { fontSize: 28, fontWeight: '800', lineHeight: 34 },
  subtitulo: { marginTop: 9, fontSize: 15, lineHeight: 23 },
  aviso: { marginTop: 22, borderWidth: 1, borderRadius: 12, padding: 14 },
  avisoTexto: { fontSize: 13, lineHeight: 19 },
  secao: { marginTop: 28 },
  tituloSecao: { fontSize: 17, fontWeight: '700', marginBottom: 9 },
  paragrafo: { fontSize: 15, lineHeight: 24 },
  botao: { borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 36 },
  botaoTexto: { color: '#151515', fontSize: 15, fontWeight: '800' },
});
