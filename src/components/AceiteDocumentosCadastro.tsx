import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTema } from '@/contexts/TemaContext';

type Props = {
  aceitouTermos: boolean;
  confirmouPrivacidade: boolean;
  onChangeTermos: (valor: boolean) => void;
  onChangePrivacidade: (valor: boolean) => void;
  desabilitado?: boolean;
};

/** O componente não envia dados. A tela de cadastro controla os estados e a API valida o aceite. */
export default function AceiteDocumentosCadastro({
  aceitouTermos,
  confirmouPrivacidade,
  onChangeTermos,
  onChangePrivacidade,
  desabilitado = false,
}: Props) {
  const { coresTema } = useTema();

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Pressable
          onPress={() => onChangeTermos(!aceitouTermos)}
          disabled={desabilitado}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: aceitouTermos, disabled: desabilitado }}
          accessibilityLabel="Li e aceito os Termos de Uso"
          style={[styles.checkbox, { borderColor: coresTema.destaque, backgroundColor: aceitouTermos ? coresTema.destaque : 'transparent' }]}
        >
          {aceitouTermos ? <Text style={styles.check}>✓</Text> : null}
        </Pressable>
        <View style={styles.textos}>
          <Text style={[styles.explicacao, { color: coresTema.texto }]}>Li e aceito os Termos de Uso.</Text>
          <Pressable onPress={() => router.push('/termosUso')} accessibilityRole="link">
            <Text style={[styles.link, { color: coresTema.destaque }]}>Ler Termos de Uso</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.linha}>
        <Pressable
          onPress={() => onChangePrivacidade(!confirmouPrivacidade)}
          disabled={desabilitado}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: confirmouPrivacidade, disabled: desabilitado }}
          accessibilityLabel="Declaro que tive acesso à Política de Privacidade"
          style={[styles.checkbox, { borderColor: coresTema.destaque, backgroundColor: confirmouPrivacidade ? coresTema.destaque : 'transparent' }]}
        >
          {confirmouPrivacidade ? <Text style={styles.check}>✓</Text> : null}
        </Pressable>
        <View style={styles.textos}>
          <Text style={[styles.explicacao, { color: coresTema.texto }]}>Declaro que tive acesso à Política de Privacidade.</Text>
          <Pressable onPress={() => router.push('/politicaPrivacidade')} accessibilityRole="link">
            <Text style={[styles.link, { color: coresTema.destaque }]}>Ler Política de Privacidade (LGPD)</Text>
          </Pressable>
        </View>
      </View>
      <Text style={[styles.nota, { color: coresTema.textoSecundario }]}>
        A ciência da política não equivale a um consentimento genérico para o uso dos seus dados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 14, marginVertical: 12 },
  linha: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  checkbox: { height: 23, width: 23, borderWidth: 1.5, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  check: { color: '#161616', fontWeight: '900', fontSize: 15 },
  textos: { flex: 1 },
  explicacao: { fontSize: 14, lineHeight: 21 },
  link: { fontSize: 14, fontWeight: '700', marginTop: 3, paddingVertical: 3 },
  nota: { fontSize: 12, lineHeight: 18 },
});
