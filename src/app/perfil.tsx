import { useCallback, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTema } from "@/contexts/TemaContext";
import { useAuth } from "@/contexts/AuthContext";
import { criarPerfilStyles } from "@/styles/perfilStyles";
import globalStyle from "@/styles/globalStyles";
import { buscarPerfilUsuario, type PerfilData } from "@/services/perfilService";
import { buscarUsuario, getUrlFotoUsuario } from "@/services/usuarioService";
import { aceitarConexao, recusarConexao, solicitarConexao } from "@/services/conexaoesService";
import { abrirConversa } from "@/services/conversaService";
import MenuSreen from "./menu";
type Rede = "instagram" | "linkedin" | "youtube" | "tiktok" | "facebook" | "site";
type Icone = ComponentProps<typeof Ionicons>["name"];
const REDES: { campo: Rede; rotulo: string; icone: Icone }[] = [
  { campo: "instagram", rotulo: "Instagram", icone: "logo-instagram" },
  { campo: "linkedin", rotulo: "LinkedIn", icone: "logo-linkedin" },
  { campo: "youtube", rotulo: "YouTube", icone: "logo-youtube" },
  { campo: "tiktok", rotulo: "TikTok", icone: "logo-tiktok" },
  { campo: "facebook", rotulo: "Facebook", icone: "logo-facebook" },
  { campo: "site", rotulo: "Site", icone: "globe-outline" },
];
const NOMES_ESTADOS: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};
function apresentarValor(valor?: string | null): string {
  return valor?.trim() || "Não informado";
}
function nomeEstado(uf?: string | null): string {
  if (!uf) return "Não informado";
  const sigla = uf.trim().toUpperCase();
  return NOMES_ESTADOS[sigla] ? `${NOMES_ESTADOS[sigla]} (${sigla})` : uf;
}
// Constrói URLs apenas HTTP(S), aceitando tanto um link completo quanto um @usuário.
function linkDaRede(rede: Rede, valor: string): string | null {
  const texto = valor.trim();
  if (!texto) return null;
  let url = texto;
  if (/^https?:\/\//i.test(url)) {
    // Já é URL
  } else if (/^www\./i.test(url) || /^(instagram|linkedin|youtube|tiktok|facebook)\.com\//i.test(url)) {
    url = `https://${url}`;
  } else if (rede === "site") {
    url = `https://${url}`;
  } else {
    const usuario = texto.replace(/^@/, "");
    const prefixos: Record<Exclude<Rede, "site">, string> = {
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/in/",
      youtube: "https://www.youtube.com/@",
      tiktok: "https://www.tiktok.com/@",
      facebook: "https://www.facebook.com/",
    };
    url = prefixos[rede] + encodeURI(usuario.replace(/^@/, ""));
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}
function rotuloPerfil(perfil: string): string {
  const nomes: Record<string, string> = {
    usuario: "Participante",
    administrador: "Administrador(a)",
    palestrante: "Palestrante",
  };
  return nomes[perfil.toLowerCase()] ?? perfil;
}
export default function PerfilScreen() {
  const { coresTema } = useTema();
  const perfilStyles = criarPerfilStyles(coresTema);
  const { token, usuario, carregandoSessao } = useAuth();
  const params = useLocalSearchParams<{ idUsuario?: string | string[] }>();
  const idParam = Array.isArray(params.idUsuario) ? params.idUsuario[0] : params.idUsuario;
  const idUsuarioLogado = Number(usuario?.id_usuario);
  const idPerfil = idParam ? Number(idParam) : idUsuarioLogado;
  const ehProprioId = Number.isFinite(idPerfil) && idPerfil > 0 && idPerfil === idUsuarioLogado;
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [abrindoConversa, setAbrindoConversa] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [fotoAmpliada, setFotoAmpliada] = useState(false);
  const detalhes = useMemo(
    () =>
      StyleSheet.create({
        secao: {
          backgroundColor: coresTema.card,
          borderColor: coresTema.borda,
          borderWidth: 1,
          borderRadius: 16,
          paddingVertical: 16,
          paddingHorizontal: 17,
          marginTop: 14,
        },
        secaoCabecalho: {
          flexDirection: "row",
          alignItems: "center",
          gap: 9,
          marginBottom: 12,
        },
        tituloSecao: {
          color: coresTema.texto,
          fontSize: 17,
          fontWeight: "700",
        },
        texto: {
          color: coresTema.texto,
          fontSize: 14,
          lineHeight: 21,
        },
        linha: {
          paddingVertical: 11,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: coresTema.borda,
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 11,
        },
        linhaFinal: { borderBottomWidth: 0 },
        conteudoLinha: { flex: 1, gap: 4 },
        rotulo: {
          color: coresTema.textoSecundario,
          fontSize: 12,
          fontWeight: "600",
        },
        valor: {
          color: coresTema.texto,
          fontSize: 14,
          lineHeight: 21,
        },
        link: { color: coresTema.destaque },
        semValor: { color: coresTema.textoSecundario, fontStyle: "italic" },
        aviso: {
          color: coresTema.textoSecundario,
          textAlign: "center",
          paddingVertical: 18,
        },
        erro: {
          color: coresTema.texto,
          backgroundColor: coresTema.cardSecundario,
          borderColor: coresTema.borda,
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
          marginTop: 12,
          lineHeight: 20,
        },
        rodape: { height: 22 },
      }),
    [coresTema],
  );
  // Ao voltar de Editar perfil, recarrega os dados sem precisar reiniciar o app.
  useFocusEffect(
    useCallback(() => {
      if (carregandoSessao) return;
      let ativo = true;
      async function carregarPerfil() {
        if (!token) {
          setPerfil(null);
          setCarregando(false);
          setErro("Sessão não encontrada. Faça login novamente.");
          return;
        }
        if (!idPerfil || !Number.isFinite(idPerfil) || idPerfil <= 0) {
          setPerfil(null);
          setCarregando(false);
          setErro("Usuário inválido.");
          return;
        }
        try {
          setCarregando(true);
          setErro(null);
          // O endpoint público contém as informações de conexões.
          const resposta = await buscarPerfilUsuario(token, idPerfil);
          if (!resposta.success || !resposta.data) {
            throw new Error("Não foi possível carregar o perfil.");
          }
          let dados = resposta.data;
          // O endpoint do próprio usuário traz também as redes sociais e e-mail;
          // não expomos essas informações privadas no perfil de terceiros.
          if (ehProprioId) {
            const dadosProprios = await buscarUsuario(token);
            if (dadosProprios.success && dadosProprios.data) {
              dados = {
                ...dados,
                usuario: { ...dados.usuario, ...dadosProprios.data },
                status_conexao: "PROPRIO_PERFIL",
              };
            }
          }
          if (ativo) setPerfil(dados);
        } catch (error) {
          if (ativo) {
            setPerfil(null);
            setErro(error instanceof Error ? error.message : "Não foi possível carregar o perfil.");
          }
        } finally {
          if (ativo) setCarregando(false);
        }
      }
      void carregarPerfil();
      return () => {
        ativo = false;
      };
    }, [token, idPerfil, ehProprioId, carregandoSessao]),
  );
  async function conectar() {
    if (!token || !perfil || processando) return;
    try {
      setProcessando(true);
      setErro(null);
      const resposta = await solicitarConexao(token, perfil.usuario.id_usuario);
      setPerfil((atual) =>
        atual
          ? {
              ...atual,
              status_conexao: "PENDENTE_ENVIADA",
              id_conexao: resposta.data?.id_conexao ?? atual.id_conexao,
            }
          : atual,
      );
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível enviar a solicitação.");
    } finally {
      setProcessando(false);
    }
  }
  async function aceitar() {
    if (!token || !perfil?.id_conexao || processando) return;
    try {
      setProcessando(true);
      setErro(null);
      await aceitarConexao(token, perfil.id_conexao);
      setPerfil((atual) =>
        atual
          ? {
              ...atual,
              status_conexao: "CONECTADO",
              conexoes_count: atual.conexoes_count + 1,
            }
          : atual,
      );
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível aceitar a conexão.");
    } finally {
      setProcessando(false);
    }
  }
  async function recusar() {
    if (!token || !perfil?.id_conexao || processando) return;
    try {
      setProcessando(true);
      setErro(null);
      await recusarConexao(token, perfil.id_conexao);
      setPerfil((atual) =>
        atual
          ? {
              ...atual,
              status_conexao: "SEM_CONEXAO",
              id_conexao: null,
            }
          : atual,
      );
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível recusar a conexão.");
    } finally {
      setProcessando(false);
    }
  }
  async function iniciarConversa() {
    if (!token || !perfil || abrindoConversa) return;
    try {
      setAbrindoConversa(true);
      setErro(null);
      const resposta = await abrirConversa(token, perfil.usuario.id_usuario);
      if (!resposta.success || !resposta.data?.id_conversa) {
        throw new Error("Não foi possível abrir a conversa.");
      }
      router.push({
        pathname: "/conversa",
        params: { idConversa: String(resposta.data.id_conversa) },
      });
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Não foi possível abrir a conversa.");
    } finally {
      setAbrindoConversa(false);
    }
  }
  async function abrirRede(rede: Rede, valor: string) {
    const url = linkDaRede(rede, valor);
    if (!url) {
      setErro("Não foi possível abrir este endereço. Confira o link cadastrado.");
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      setErro("Não foi possível abrir o link neste dispositivo.");
    }
  }
  const meuPerfil = ehProprioId || perfil?.status_conexao === "PROPRIO_PERFIL";
  const dados = perfil?.usuario;
  const primeiroNome = dados?.nome_usuario?.trim().split(" ")[0] || "Usuário";
  const foto = getUrlFotoUsuario(dados?.foto_usuario ?? null);
  function linhaInformacao(rotulo: string, valor: string | null | undefined, icone: Icone, ultima = false) {
    const texto = apresentarValor(valor);
    return (
      <View style={[detalhes.linha, ultima && detalhes.linhaFinal]}>
        <Ionicons name={icone} color={coresTema.destaque} size={19} style={{ marginTop: 2 }} />
        <View style={detalhes.conteudoLinha}>
          <Text style={detalhes.rotulo}>{rotulo}</Text>
          <Text style={[detalhes.valor, !valor?.trim() && detalhes.semValor]}>{texto}</Text>
        </View>
      </View>
    );
  }
  function renderizarAcoes() {
    if (!perfil) return null;
    if (meuPerfil) {
      return (
        <Pressable
          style={({ pressed }) => [perfilStyles.btnAcao, pressed && perfilStyles.btnAcaoPressed]}
          onPress={() => router.push("/editarPerfil")}
          accessibilityRole="button"
          accessibilityLabel="Editar meu perfil"
        >
          <Text style={perfilStyles.txtBtnAcao}>Editar perfil</Text>
        </Pressable>
      );
    }
    if (perfil.status_conexao === "CONECTADO") {
      return (
        <>
          <Pressable style={[perfilStyles.btnAcao, perfilStyles.btnAcaoAtivo]} disabled>
            <Text style={[perfilStyles.txtBtnAcao, perfilStyles.txtBtnAcaoAtivo]}>Conectado</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [perfilStyles.btnAcao, pressed && perfilStyles.btnAcaoPressed]}
            onPress={iniciarConversa}
            disabled={abrindoConversa}
          >
            <Text style={perfilStyles.txtBtnAcao}>{abrindoConversa ? "Abrindo..." : "Mensagem"}</Text>
          </Pressable>
        </>
      );
    }
    if (perfil.status_conexao === "SEM_CONEXAO" && perfil.pode_conectar) {
      return (
        <Pressable
          style={({ pressed }) => [perfilStyles.btnAcao, pressed && perfilStyles.btnAcaoPressed]}
          onPress={conectar}
          disabled={processando}
        >
          <Text style={perfilStyles.txtBtnAcao}>{processando ? "Enviando..." : "Conectar"}</Text>
        </Pressable>
      );
    }
    if (perfil.status_conexao === "PENDENTE_ENVIADA") {
      return (
        <Pressable style={[perfilStyles.btnAcao, perfilStyles.btnAcaoAtivo]} disabled>
          <Text style={[perfilStyles.txtBtnAcao, perfilStyles.txtBtnAcaoAtivo]}>Solicitação enviada</Text>
        </Pressable>
      );
    }
    if (perfil.status_conexao === "PENDENTE_RECEBIDA") {
      return (
        <>
          <Pressable
            style={({ pressed }) => [
              perfilStyles.btnAcao,
              perfilStyles.btnAcaoAtivo,
              pressed && perfilStyles.btnAcaoPressed,
            ]}
            onPress={aceitar}
            disabled={processando}
          >
            <Text style={[perfilStyles.txtBtnAcao, perfilStyles.txtBtnAcaoAtivo]}>
              {processando ? "Processando..." : "Aceitar"}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [perfilStyles.btnAcao, pressed && perfilStyles.btnAcaoPressed]}
            onPress={recusar}
            disabled={processando}
          >
            <Text style={perfilStyles.txtBtnAcao}>Recusar</Text>
          </Pressable>
        </>
      );
    }
    return null;
  }
  const redesDisponiveisNaApi =
    !!dados && REDES.some((rede) => Object.prototype.hasOwnProperty.call(dados, `${rede.campo}_usuario`));
  const sociais = dados
    ? REDES.map(({ campo, rotulo, icone }) => ({
        campo,
        rotulo,
        icone,
        valor: dados[`${campo}_usuario` as keyof typeof dados] as string | null | undefined,
      }))
    : [];
  return (
    <View style={globalStyle.container}>
      <View style={[globalStyle.background, perfilStyles.container]}>
        <ImageBackground
          source={require("@/assets/images/img/fundoLogin.png")}
          style={perfilStyles.background}
          resizeMode="cover"
        >
          <SafeAreaView style={globalStyle.areaConteudo}>
            <View style={perfilStyles.overlay}>
              <ScrollView
                style={perfilStyles.scroll}
                contentContainerStyle={perfilStyles.scrollConteudo}
                showsVerticalScrollIndicator={false}
              >
                <View style={perfilStyles.topo}>
                  <Pressable
                    style={({ pressed }) => [perfilStyles.btnVoltar, pressed && perfilStyles.btnVoltarPressed]}
                    onPress={() => router.back()}
                    accessibilityRole="button"
                    accessibilityLabel="Voltar"
                  >
                    <Image style={perfilStyles.voltarImagem} source={require("@/assets/images/img/left.png")} />
                  </Pressable>
                  <Image source={require("@/assets/images/img/logo.svg")} style={perfilStyles.logo} />
                  <View style={perfilStyles.espacoTopo} />
                </View>
                {(carregando || carregandoSessao) && (
                  <View style={{ alignItems: "center", paddingVertical: 35, gap: 12 }}>
                    <ActivityIndicator color={coresTema.destaque} size="large" />
                    <Text style={detalhes.valor}>Carregando perfil...</Text>
                  </View>
                )}
                {!carregando && !carregandoSessao && !perfil && (
                  <View style={detalhes.secao}>
                    <Text style={detalhes.texto}>{erro || "Perfil não encontrado."}</Text>
                  </View>
                )}
                {!carregando && !carregandoSessao && perfil && dados && (
                  <>
                    <View style={perfilStyles.apresentacao}>
                      <Text style={perfilStyles.titulo}>
                        {meuPerfil ? "Olá, " : "Perfil de "}
                        <Text style={perfilStyles.tituloDourado}>
                          {primeiroNome}
                          {meuPerfil ? "!" : ""}
                        </Text>
                      </Text>
                      <Text style={perfilStyles.aviso}>
                        {meuPerfil
                          ? "Suas informações, conexões e redes sociais."
                          : "Conheça o perfil e amplie sua rede de conexões."}
                      </Text>
                    </View>
                    <View style={perfilStyles.cardPerfil}>
                      <Pressable
                        style={perfilStyles.avatarContainer}
                        onPress={() => setFotoAmpliada(true)}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel={`Visualizar foto de ${dados.nome_usuario}`}
                        accessibilityHint="Abre a foto de perfil ampliada, somente para visualização"
                      >
                        <Image
                          source={foto ? { uri: foto } : require("@/assets/images/img/avatar.png")}
                          style={perfilStyles.avatar}
                          resizeMode="cover"
                        />
                      </Pressable>
                      <Text style={perfilStyles.nome}>{dados.nome_usuario}</Text>
                      {!!dados.area_atuacao_usuario && (
                        <Text style={perfilStyles.descricao}>{dados.area_atuacao_usuario}</Text>
                      )}
                      <View style={perfilStyles.informacoes}>
                        {!!dados.estado_usuario && (
                          <View style={perfilStyles.informacaoItem}>
                            <Ionicons name="location-outline" color={coresTema.destaque} size={17} />
                            <Text style={perfilStyles.txtInfo}>{dados.estado_usuario}</Text>
                          </View>
                        )}
                        <View style={perfilStyles.informacaoItem}>
                          <Ionicons name="people-outline" color={coresTema.destaque} size={17} />
                          <Text style={perfilStyles.txtInfo}>{perfil.conexoes_count} conexões</Text>
                        </View>
                      </View>
                      <View style={perfilStyles.areaBotoes}>{renderizarAcoes()}</View>
                    </View>
                    <View style={detalhes.secao}>
                      <View style={detalhes.secaoCabecalho}>
                        <Ionicons name="person-circle-outline" size={22} color={coresTema.destaque} />
                        <Text style={detalhes.tituloSecao}>Dados do perfil</Text>
                      </View>
                      {linhaInformacao("Nome completo", dados.nome_usuario, "person-outline")}
                      {linhaInformacao("Área de atuação", dados.area_atuacao_usuario, "briefcase-outline")}
                      {linhaInformacao("Estado", nomeEstado(dados.estado_usuario), "location-outline")}
                      {linhaInformacao("Tipo de perfil", rotuloPerfil(dados.perfil_usuario), "id-card-outline", true)}
                    </View>
                    <View style={detalhes.secao}>
                      <View style={detalhes.secaoCabecalho}>
                        <Ionicons name="document-text-outline" size={22} color={coresTema.destaque} />
                        <Text style={detalhes.tituloSecao}>Sobre mim</Text>
                      </View>
                      <Text style={[detalhes.texto, !dados.sobre_usuario?.trim() && detalhes.semValor]}>
                        {apresentarValor(dados.sobre_usuario)}
                      </Text>
                    </View>
                    <View style={detalhes.secao}>
                      <View style={detalhes.secaoCabecalho}>
                        <Ionicons name="share-social-outline" size={22} color={coresTema.destaque} />
                        <Text style={detalhes.tituloSecao}>Redes sociais e site</Text>
                      </View>
                      {sociais.map((rede, i) => {
                        const informado = !!rede.valor?.trim();
                        // O próprio usuário pode ver o que falta preencher;
                        // para outros usuários mostramos apenas redes informadas.
                        if (!meuPerfil && !informado) return null;
                        return (
                          <Pressable
                            key={rede.campo}
                            style={[detalhes.linha, i === sociais.length - 1 && detalhes.linhaFinal]}
                            onPress={() => informado && abrirRede(rede.campo, rede.valor!)}
                            disabled={!informado}
                            accessibilityRole={informado ? "link" : undefined}
                            accessibilityLabel={informado ? `Abrir ${rede.rotulo}` : undefined}
                          >
                            <Ionicons name={rede.icone} color={coresTema.destaque} size={20} style={{ marginTop: 2 }} />
                            <View style={detalhes.conteudoLinha}>
                              <Text style={detalhes.rotulo}>{rede.rotulo}</Text>
                              <Text style={[detalhes.valor, informado ? detalhes.link : detalhes.semValor]}>
                                {apresentarValor(rede.valor)}
                              </Text>
                            </View>
                            {informado && <Ionicons name="open-outline" color={coresTema.textoSecundario} size={17} />}
                          </Pressable>
                        );
                      })}
                      {!meuPerfil && !sociais.some((rede) => !!rede.valor?.trim()) && (
                        <Text style={detalhes.semValor}>
                          {redesDisponiveisNaApi
                            ? "Nenhuma rede social cadastrada."
                            : "As redes sociais ainda não são disponibilizadas pela API deste perfil."}
                        </Text>
                      )}
                    </View>
                    {meuPerfil && (
                      <View style={detalhes.secao}>
                        <View style={detalhes.secaoCabecalho}>
                          <Ionicons name="shield-checkmark-outline" size={22} color={coresTema.destaque} />
                          <Text style={detalhes.tituloSecao}>Minha conta</Text>
                        </View>
                        {linhaInformacao("E-mail", dados.email_usuario, "mail-outline", true)}
                        <Text style={[detalhes.rotulo, { marginTop: 8 }]}>
                          O e-mail é exibido apenas para você. Dados de acesso e senha não são públicos.
                        </Text>
                      </View>
                    )}
                    {!!erro && <Text style={detalhes.erro}>{erro}</Text>}
                    <View style={detalhes.rodape} />
                  </>
                )}
              </ScrollView>
              <MenuSreen />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* Visualização da foto do perfil: sem controles de edição. */}
      <Modal
        visible={fotoAmpliada}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setFotoAmpliada(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.96)" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 14,
              paddingBottom: 10,
            }}
          >
            <Text numberOfLines={1} style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600", flex: 1 }}>
              {dados?.nome_usuario ?? "Foto do perfil"}
            </Text>
            <Pressable
              onPress={() => setFotoAmpliada(false)}
              accessibilityRole="button"
              accessibilityLabel="Fechar visualização da foto"
              hitSlop={10}
              style={{ minWidth: 48, minHeight: 48, alignItems: "center", justifyContent: "center" }}
            >
              <Ionicons name="close" size={30} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 12 }}>
            <Image
              source={foto ? { uri: foto } : require("@/assets/images/img/avatar.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              accessible
              accessibilityLabel={`Foto do perfil de ${dados?.nome_usuario ?? "usuário"}`}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
