import { useEffect, useRef, useState } from "react";

import { router } from "expo-router";

import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import globalStyle from "@/styles/globalStyles";

import { criarExplorarStyles } from "@/styles/explorarStyles";

import { useTema } from "@/contexts/TemaContext";

import { useAuth } from "@/contexts/AuthContext";

import { buscarUsuarios, getUrlFotoUsuario, UsuarioBusca } from "@/services/usuarioService";

import HeaderScreen from "./header";

import MenuSreen from "./menu";

function rotuloPerfil(perfil: string) {
  const perfis: Record<string, string> = {
    usuario: "Participante",

    palestrante: "Palestrante",

    administrador: "Administrador",
  };

  return perfis[perfil.toLowerCase()] ?? perfil;
}

export default function ExplorarScreen() {
  const { coresTema } = useTema();

  const { token } = useAuth();

  const styles = criarExplorarStyles(coresTema);

  // =====================================
  // BUSCA
  // =====================================

  const [busca, setBusca] = useState("");

  const [buscaAplicada, setBuscaAplicada] = useState("");

  // =====================================
  // USUÁRIOS
  // =====================================

  const [usuarios, setUsuarios] = useState<UsuarioBusca[]>([]);

  const [total, setTotal] = useState(0);

  const [paginaAtual, setPaginaAtual] = useState(1);

  const [ultimaPagina, setUltimaPagina] = useState(1);

  // =====================================
  // ESTADOS
  // =====================================

  const [carregando, setCarregando] = useState(true);

  const [carregandoMais, setCarregandoMais] = useState(false);

  const [erro, setErro] = useState<string | null>(null);

  const requisicaoAtual = useRef(0);

  // =====================================
  // DEBOUNCE DA BUSCA
  // =====================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBuscaAplicada(busca.trim());
    }, 450);

    return () => {
      clearTimeout(timeout);
    };
  }, [busca]);

  // =====================================
  // CARREGAR USUÁRIOS
  // =====================================

  async function carregarUsuarios(pagina: number, adicionar: boolean) {
    if (!token) {
      setErro("Sessão não encontrada.");

      setCarregando(false);

      return;
    }

    const idRequisicao = ++requisicaoAtual.current;

    try {
      if (adicionar) {
        setCarregandoMais(true);
      } else {
        setCarregando(true);
      }

      setErro(null);

      const resposta = await buscarUsuarios(token, buscaAplicada, pagina);

      if (idRequisicao !== requisicaoAtual.current) {
        return;
      }

      if (!resposta.success) {
        throw new Error("Não foi possível carregar os usuários.");
      }

      if (adicionar) {
        setUsuarios((atuais) => {
          const existentes = new Set(atuais.map((item) => item.id_usuario));

          const novos = resposta.data.filter((item) => !existentes.has(item.id_usuario));

          return [...atuais, ...novos];
        });
      } else {
        setUsuarios(resposta.data ?? []);
      }

      setTotal(resposta.meta.total);

      setPaginaAtual(resposta.meta.current_page);

      setUltimaPagina(resposta.meta.last_page);
    } catch (error) {
      if (idRequisicao !== requisicaoAtual.current) {
        return;
      }

      setErro(error instanceof Error ? error.message : "Não foi possível carregar os usuários.");

      if (!adicionar) {
        setUsuarios([]);

        setTotal(0);
      }
    } finally {
      if (idRequisicao === requisicaoAtual.current) {
        setCarregando(false);

        setCarregandoMais(false);
      }
    }
  }

  // =====================================
  // NOVA PESQUISA
  // =====================================

  useEffect(() => {
    carregarUsuarios(1, false);
  }, [token, buscaAplicada]);

  // =====================================
  // CARREGAR MAIS
  // =====================================

  function carregarMais() {
    if (carregando || carregandoMais || paginaAtual >= ultimaPagina) {
      return;
    }

    carregarUsuarios(paginaAtual + 1, true);
  }

  // =====================================
  // ABRIR PERFIL
  // =====================================

  function abrirPerfil(idUsuario: number) {
    router.push({
      pathname: "/perfil",

      params: {
        idUsuario: String(idUsuario),
      },
    });
  }

  // =====================================
  // CARD
  // =====================================

  function renderizarUsuario({ item }: { item: UsuarioBusca }) {
    const foto = getUrlFotoUsuario(item.foto_usuario);

    const area = item.area_atuacao_usuario?.trim() || "Área de atuação não informada";

    const estado = item.estado_usuario?.trim() || "Estado não informado";

    return (
      <Pressable
        onPress={() => abrirPerfil(item.id_usuario)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        accessibilityRole="button"
        accessibilityLabel={`Abrir perfil de ${item.nome_usuario}`}
      >
        <Image
          source={
            foto
              ? {
                  uri: foto,
                }
              : require("@/assets/images/img/avatar.png")
          }
          style={styles.avatar}
        />

        <View style={styles.dados}>
          <View style={styles.linhaNome}>
            <Text style={styles.nome} numberOfLines={1}>
              {item.nome_usuario}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.txtBadge}>{rotuloPerfil(item.perfil_usuario)}</Text>
            </View>
          </View>

          <Text style={styles.area} numberOfLines={1}>
            {area}
          </Text>

          <Text style={styles.local}>{estado}</Text>
        </View>

        <View style={styles.seta}>
          <Ionicons name="chevron-forward" size={19} color={coresTema.textoSecundario} />
        </View>
      </Pressable>
    );
  }

  // =====================================
  // TELA
  // =====================================

  return (
    <View style={globalStyle.container}>
      <View style={[globalStyle.background, styles.container]}>
        <SafeAreaView style={globalStyle.areaConteudo}>
          <HeaderScreen />

          {/* ================= TOPO ================= */}

          <View style={styles.topo}>
            <Pressable
              style={styles.btnVoltar}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Ionicons name="arrow-back" size={21} color={coresTema.destaque} />
            </Pressable>

            <View style={styles.topoTextos}>
              <Text style={styles.titulo}>Encontrar pessoas</Text>

              <Text style={styles.subtitulo}>Descubra outros membros da comunidade.</Text>
            </View>
          </View>

          {/* ================= BUSCA ================= */}

          <View style={styles.areaBusca}>
            <View style={styles.busca}>
              <Ionicons name="search-outline" size={19} color={coresTema.destaque} />

              <TextInput
                value={busca}
                onChangeText={setBusca}
                placeholder="Nome, área de atuação ou estado"
                placeholderTextColor={coresTema.textoSecundario}
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                maxLength={100}
              />

              {!!busca && (
                <Pressable style={styles.btnLimpar} onPress={() => setBusca("")}>
                  <Ionicons name="close-circle" size={19} color={coresTema.textoSecundario} />
                </Pressable>
              )}
            </View>
          </View>

          {/* ================= TÍTULO LISTA ================= */}

          {!carregando && (
            <View style={styles.areaTituloLista}>
              <Text style={styles.tituloLista}>{buscaAplicada ? "Resultados" : "Novos membros"}</Text>

              <Text style={styles.quantidade}>{total === 1 ? "1 perfil" : `${total} perfis`}</Text>
            </View>
          )}

          {/* ================= ERRO ================= */}

          {!!erro && <Text style={styles.erro}>{erro}</Text>}

          {/* ================= CARREGANDO ================= */}

          {carregando ? (
            <View style={styles.centro}>
              <ActivityIndicator size="large" color={coresTema.destaque} />

              <Text style={styles.textoVazio}>Buscando pessoas...</Text>
            </View>
          ) : (
            <FlatList
              data={usuarios}
              keyExtractor={(item) => String(item.id_usuario)}
              renderItem={renderizarUsuario}
              contentContainerStyle={styles.lista}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              onEndReached={carregarMais}
              onEndReachedThreshold={0.4}
              ListEmptyComponent={
                !erro ? (
                  <View style={styles.centro}>
                    <Ionicons name="people-outline" size={45} color={coresTema.destaque} />

                    <Text style={styles.tituloVazio}>Nenhum perfil encontrado</Text>

                    <Text style={styles.textoVazio}>Tente pesquisar por outro nome, área de atuação ou estado.</Text>
                  </View>
                ) : null
              }
              ListFooterComponent={
                carregandoMais ? (
                  <View style={styles.rodapeLista}>
                    <ActivityIndicator color={coresTema.destaque} />
                  </View>
                ) : (
                  <View style={styles.rodapeLista} />
                )
              }
            />
          )}

          <MenuSreen />
        </SafeAreaView>
      </View>
    </View>
  );
}
