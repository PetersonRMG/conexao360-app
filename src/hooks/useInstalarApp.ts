import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

type EventoInstalacao = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type NavegadorIOS = Navigator & { standalone?: boolean };
type JanelaPWA = Window & { __conexao360InstallPrompt?: EventoInstalacao | null };

export function useInstalarApp() {
  const [instalado, setInstalado] = useState(false);
  const [podeInstalar, setPodeInstalar] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const eventoRef = useRef<EventoInstalacao | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const modoStandalone = window.matchMedia?.("(display-mode: standalone)").matches ?? false;
    setInstalado(modoStandalone || Boolean((navigator as NavegadorIOS).standalone));
    // O prompt pode ter disparado enquanto o usuário estava na tela de Login.
    const promptAnterior = (window as JanelaPWA).__conexao360InstallPrompt;
    if (promptAnterior && !modoStandalone) {
      eventoRef.current = promptAnterior;
      setPodeInstalar(true);
    }

    function aoOferecerInstalacao(evento: Event) {
      evento.preventDefault();
      eventoRef.current = evento as EventoInstalacao;
      (window as JanelaPWA).__conexao360InstallPrompt = evento as EventoInstalacao;
      setPodeInstalar(true);
      setMensagem("");
    }
    function aoInstalar() {
      setInstalado(true);
      setPodeInstalar(false);
      eventoRef.current = null;
      (window as JanelaPWA).__conexao360InstallPrompt = null;
      setMensagem("Aplicativo instalado!");
    }
    window.addEventListener("beforeinstallprompt", aoOferecerInstalacao);
    window.addEventListener("appinstalled", aoInstalar);
    return () => {
      window.removeEventListener("beforeinstallprompt", aoOferecerInstalacao);
      window.removeEventListener("appinstalled", aoInstalar);
    };
  }, []);

  const instalar = useCallback(async () => {
    if (Platform.OS !== "web" || typeof navigator === "undefined") return;
    if (instalado) {
      setMensagem("O Conexão 360° já está instalado neste dispositivo.");
      return;
    }
    const evento = eventoRef.current;
    if (evento) {
      // É indispensável chamar prompt() diretamente após o toque do usuário.
      eventoRef.current = null;
      (window as JanelaPWA).__conexao360InstallPrompt = null;
      setPodeInstalar(false);
      try {
        await evento.prompt();
        const escolha = await evento.userChoice;
        setMensagem(
          escolha.outcome === "accepted"
            ? "Instalação solicitada. Confira seu dispositivo."
            : "Instalação cancelada. Você pode tentar pelo menu do navegador.",
        );
      } catch {
        setMensagem("O navegador não conseguiu abrir a instalação. Use o menu do navegador.");
      }
      return;
    }
    const navegador = navigator.userAgent;
    if (/iPad|iPhone|iPod/i.test(navegador)) {
      setMensagem("No iPhone: abra Compartilhar no navegador e escolha ‘Adicionar à Tela de Início’.");
    } else if (/Android/i.test(navegador)) {
      setMensagem("No Android: abra o menu ⋮ do Chrome e selecione ‘Instalar app’ ou ‘Adicionar à tela inicial’.");
    } else {
      setMensagem(
        "No computador: abra o menu do Chrome/Edge e procure ‘Instalar aplicativo’ ou ‘Instalar página como app’. Se não aparecer, a versão Web precisa ser configurada como instalável.",
      );
    }
  }, [instalado]);

  return { instalar, instalado, podeInstalar, mensagem };
}
