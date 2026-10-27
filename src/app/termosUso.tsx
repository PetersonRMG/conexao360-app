import DocumentoLegalScreen from '@/components/DocumentoLegalScreen';
import { TERMOS, VERSAO_TERMOS } from '@/legal/documentosLegais';

export default function TermosUsoScreen() {
  return (
    <DocumentoLegalScreen
      titulo="Termos de Uso"
      subtitulo="Conheça as regras de participação e convivência no Conexão 360°."
      versao={VERSAO_TERMOS}
      secoes={TERMOS}
    />
  );
}
