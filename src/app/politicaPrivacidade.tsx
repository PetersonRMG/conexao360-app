import DocumentoLegalScreen from '@/components/DocumentoLegalScreen';
import { PRIVACIDADE, VERSAO_PRIVACIDADE } from '@/legal/documentosLegais';

export default function PoliticaPrivacidadeScreen() {
  return (
    <DocumentoLegalScreen
      titulo="Política de Privacidade"
      subtitulo="Saiba como os dados pessoais são tratados e conheça seus direitos pela LGPD."
      versao={VERSAO_PRIVACIDADE}
      secoes={PRIVACIDADE}
    />
  );
}
