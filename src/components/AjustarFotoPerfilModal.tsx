import { useEffect, useMemo, useRef, useState } from "react";
import type { ImagePickerAsset } from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import {
  ActivityIndicator,
  Image,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { useTema } from "@/contexts/TemaContext";

type Posicao = { x: number; y: number };

type Props = {
  imagem: ImagePickerAsset | null;
  aoCancelar: () => void;
  aoConfirmar: (fotoAjustada: ImagePickerAsset) => Promise<void>;
};

const ZOOM_MINIMO = 1;
const ZOOM_MAXIMO = 3;
const LADO_SAIDA = 512;

function limitar(valor: number, minimo: number, maximo: number): number {
  return Math.max(minimo, Math.min(maximo, valor));
}

function calcularMedidas(larguraOriginal: number, alturaOriginal: number, tamanho: number, zoom: number) {
  const escala = Math.max(tamanho / larguraOriginal, tamanho / alturaOriginal) * zoom;
  const larguraRenderizada = larguraOriginal * escala;
  const alturaRenderizada = alturaOriginal * escala;

  return {
    escala,
    larguraRenderizada,
    alturaRenderizada,
    limiteX: Math.max(0, (larguraRenderizada - tamanho) / 2),
    limiteY: Math.max(0, (alturaRenderizada - tamanho) / 2),
  };
}

export default function AjustarFotoPerfilModal({ imagem, aoCancelar, aoConfirmar }: Props) {
  const { coresTema } = useTema();
  const { width: larguraTela, height: alturaTela } = useWindowDimensions();
  const tamanho = Math.max(170, Math.min(320, larguraTela - 48, alturaTela - 340));

  const [zoom, setZoom] = useState(1);
  const [posicao, setPosicao] = useState<Posicao>({ x: 0, y: 0 });
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const posicaoRef = useRef<Posicao>({ x: 0, y: 0 });
  const inicioArrasteRef = useRef<Posicao>({ x: 0, y: 0 });
  const metricasRef = useRef({ limiteX: 0, limiteY: 0 });
  const zoomRef = useRef(1);

  const larguraOriginal = imagem?.width ?? 0;
  const alturaOriginal = imagem?.height ?? 0;
  const dimensoesValidas = larguraOriginal > 0 && alturaOriginal > 0;

  const medidas = dimensoesValidas
    ? calcularMedidas(larguraOriginal, alturaOriginal, tamanho, zoom)
    : null;

  metricasRef.current = {
    limiteX: medidas?.limiteX ?? 0,
    limiteY: medidas?.limiteY ?? 0,
  };

  function atualizarPosicao(nova: Posicao) {
    const { limiteX, limiteY } = metricasRef.current;
    const ajustada = {
      x: limitar(nova.x, -limiteX, limiteX),
      y: limitar(nova.y, -limiteY, limiteY),
    };
    posicaoRef.current = ajustada;
    setPosicao(ajustada);
  }

  // O PanResponder funciona tanto no navegador quanto em Android/iOS.
  // Os limites ficam em refs para evitar recriar o gesto a cada movimento.
  const arraste = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      inicioArrasteRef.current = { ...posicaoRef.current };
    },
    onPanResponderMove: (_, gesto) => {
      const { limiteX, limiteY } = metricasRef.current;
      const ajustada = {
        x: limitar(inicioArrasteRef.current.x + gesto.dx, -limiteX, limiteX),
        y: limitar(inicioArrasteRef.current.y + gesto.dy, -limiteY, limiteY),
      };
      posicaoRef.current = ajustada;
      setPosicao(ajustada);
    },
    onPanResponderTerminationRequest: () => false,
  }), []);

  useEffect(() => {
    zoomRef.current = 1;
    posicaoRef.current = { x: 0, y: 0 };
    setZoom(1);
    setPosicao({ x: 0, y: 0 });
    setErro(null);
  }, [imagem?.uri]);

  function alterarZoom(delta: number) {
    if (!dimensoesValidas || processando) return;
    const proximo = limitar(Math.round((zoomRef.current + delta) * 100) / 100, ZOOM_MINIMO, ZOOM_MAXIMO);
    zoomRef.current = proximo;
    setZoom(proximo);

    const proximasMedidas = calcularMedidas(larguraOriginal, alturaOriginal, tamanho, proximo);
    metricasRef.current = {
      limiteX: proximasMedidas.limiteX,
      limiteY: proximasMedidas.limiteY,
    };
    atualizarPosicao(posicaoRef.current);
  }

  function centralizar() {
    zoomRef.current = 1;
    posicaoRef.current = { x: 0, y: 0 };
    setZoom(1);
    setPosicao({ x: 0, y: 0 });
    setErro(null);
  }

  async function confirmar() {
    if (!imagem || !dimensoesValidas || processando) return;

    try {
      setProcessando(true);
      setErro(null);

      // Converte a posição visual em coordenadas da imagem original.
      const escala = Math.max(tamanho / larguraOriginal, tamanho / alturaOriginal) * zoomRef.current;
      const lado = Math.max(1, Math.min(larguraOriginal, alturaOriginal, Math.floor(tamanho / escala)));
      const { x, y } = posicaoRef.current;
      const origemX = limitar(Math.round((larguraOriginal - lado) / 2 - x / escala), 0, larguraOriginal - lado);
      const origemY = limitar(Math.round((alturaOriginal - lado) / 2 - y / escala), 0, alturaOriginal - lado);

      const manipulador = ImageManipulator.manipulate(imagem.uri);
      manipulador.crop({ originX: origemX, originY: origemY, width: lado, height: lado });
      manipulador.resize({ width: LADO_SAIDA, height: LADO_SAIDA });
      const imagemProcessada = await manipulador.renderAsync();
      const resultado = await imagemProcessada.saveAsync({
        format: SaveFormat.JPEG,
        compress: 0.85,
      });

      // Não incluir `file` original do ImagePicker: no Web isso enviaria
      // a imagem sem o recorte, mesmo com a URI de prévia correta.
      await aoConfirmar({
        uri: resultado.uri,
        width: resultado.width,
        height: resultado.height,
        fileName: "foto-perfil-ajustada.jpg",
        mimeType: "image/jpeg",
        type: "image",
      });
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível ajustar a foto.");
    } finally {
      setProcessando(false);
    }
  }

  return (
    <Modal
      visible={!!imagem}
      transparent
      animationType="fade"
      onRequestClose={() => { if (!processando) aoCancelar(); }}
    >
      <View style={estilos.fundo}>
        <View style={estilos.painel}>
          <Text style={estilos.titulo}>Ajustar foto do perfil</Text>
          <Text style={estilos.instrucao}>Arraste a foto para centralizar o rosto. Use + e − para ajustar o zoom.</Text>

          {imagem && dimensoesValidas && medidas ? (
            <View
              {...arraste.panHandlers}
              style={[
                estilos.recorte,
                { width: tamanho, height: tamanho, borderRadius: tamanho / 2, borderColor: coresTema.destaque },
                Platform.OS === "web" ? ({ touchAction: "none", cursor: "grab" } as any) : null,
              ]}
            >
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  width: medidas.larguraRenderizada,
                  height: medidas.alturaRenderizada,
                  left: (tamanho - medidas.larguraRenderizada) / 2 + posicao.x,
                  top: (tamanho - medidas.alturaRenderizada) / 2 + posicao.y,
                }}
              >
                <Image
                  source={{ uri: imagem.uri }}
                  resizeMode="stretch"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          ) : (
            <Text style={estilos.erro}>Não foi possível identificar o tamanho da imagem selecionada.</Text>
          )}

          <View style={estilos.zoomLinha}>
            <Pressable
              style={[estilos.btnZoom, { borderColor: coresTema.destaque }]}
              onPress={() => alterarZoom(-0.25)}
              disabled={processando || zoom <= ZOOM_MINIMO}
              accessibilityRole="button"
              accessibilityLabel="Diminuir zoom"
            >
              <Text style={[estilos.zoomTexto, { color: coresTema.destaque }]}>−</Text>
            </Pressable>
            <Text style={estilos.textoZoom}>Zoom {zoom.toFixed(2)}×</Text>
            <Pressable
              style={[estilos.btnZoom, { borderColor: coresTema.destaque }]}
              onPress={() => alterarZoom(0.25)}
              disabled={processando || zoom >= ZOOM_MAXIMO}
              accessibilityRole="button"
              accessibilityLabel="Aumentar zoom"
            >
              <Text style={[estilos.zoomTexto, { color: coresTema.destaque }]}>+</Text>
            </Pressable>
          </View>

          <Pressable onPress={centralizar} disabled={processando} style={estilos.centralizar}>
            <Text style={{ color: coresTema.destaque, fontSize: 15, fontWeight: "600" }}>Centralizar novamente</Text>
          </Pressable>

          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

          <View style={estilos.botoes}>
            <Pressable
              onPress={aoCancelar}
              disabled={processando}
              style={[estilos.botao, estilos.cancelar]}
            >
              <Text style={estilos.cancelarTexto}>Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={confirmar}
              disabled={!dimensoesValidas || processando}
              style={[estilos.botao, { backgroundColor: coresTema.destaque, opacity: processando ? 0.7 : 1 }]}
            >
              {processando ? (
                <ActivityIndicator color="#161616" />
              ) : (
                <Text style={estilos.confirmarTexto}>Salvar foto</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  painel: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#171717",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
  },
  titulo: { fontSize: 20, fontWeight: "700", color: "#F6F6F6", marginBottom: 8 },
  instrucao: { fontSize: 14, color: "#C9C9C9", textAlign: "center", marginBottom: 18, lineHeight: 20 },
  recorte: { backgroundColor: "#050505", overflow: "hidden", borderWidth: 2 },
  zoomLinha: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 18 },
  btnZoom: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, justifyContent: "center", alignItems: "center" },
  zoomTexto: { fontSize: 26, fontWeight: "700", lineHeight: 30 },
  textoZoom: { color: "#F5F5F5", fontSize: 15, minWidth: 96, textAlign: "center" },
  centralizar: { marginTop: 10, paddingVertical: 8 },
  erro: { color: "#F28C8C", textAlign: "center", marginTop: 12 },
  botoes: { flexDirection: "row", gap: 12, width: "100%", marginTop: 16 },
  botao: { flex: 1, minHeight: 48, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  cancelar: { borderWidth: 1, borderColor: "#626262" },
  cancelarTexto: { color: "#F6F6F6", fontWeight: "700", fontSize: 15 },
  confirmarTexto: { color: "#161616", fontWeight: "700", fontSize: 15 },
});
