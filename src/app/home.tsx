import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import globalStyle from "@/styles/globalStyles";
import { homeStyle } from "@/styles/homeStyles";

import HeaderCreen from "./header";
import MenuSreen from "./menu";

import {
  buscarPublicacoes,
  getUrlMidiaPublicacao,
  Publicacao,
} from "@/services/publicacaoService";

import {
  buscarUsuario,
  getUrlFotoUsuario,
  Usuario,
} from "@/services/usuarioService";

 
export default function HomeScreen() {
  const params = useLocalSearchParams();

  const token =
    typeof params.token === "string"
      ? params.token
      : params.token?.[0];

  // =====================================================
  // STATES
  // =====================================================

  const [publicacoes, setPublicacoes] =
    useState<Publicacao[]>([]);

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [carregando, setCarregando] =
    useState(true);

  // =====================================================
  // FOTO DO USUÁRIO LOGADO
  // =====================================================

  const fotoUsuario = getUrlFotoUsuario(
    usuario?.foto_usuario ?? null
  );
  // =====================================================
  // CARREGAR USUÁRIO LOGADO
  // =====================================================

  async function carregarUsuario() {
    if (!token) {
      return;
    }

    try {
      const resposta = await buscarUsuario(token);

      setUsuario(resposta.data);

      console.log("USUÁRIO LOGADO:", resposta.data);
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }
  }

  // =====================================================
  // CARREGAR PUBLICAÇÕES
  // =====================================================

  async function carregarPublicacoes() {
    if (!token) {
      return;
    }

    try {
      const resposta = await buscarPublicacoes(token);

      setPublicacoes(resposta.data);

      console.log("PUBLICAÇÕES:", resposta.data);
    } catch (error) {
      console.log("Erro ao carregar publicações:", error);
    }
  }

  // =====================================================
  // CARREGAR HOME
  // =====================================================

  async function carregarHome() {
    if (!token) {
      console.log("Token não encontrado na Home");

      setCarregando(false);

      return;
    }

    try {
      await Promise.all([carregarUsuario(), carregarPublicacoes()]);
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {
    carregarHome();
  }, [token]);

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <View style={[globalStyle.container, homeStyle.container]}>
      {/* ================= HEADER ================= */}

      <HeaderCreen
    fotoUsuario={fotoUsuario}
/>

      {/* ================= BUSCA ================= */}

      <View style={homeStyle.areaBusca}>
        <View style={homeStyle.inputBusca}>
          <Image
            source={require("@/assets/images/img/search.png")}
            style={homeStyle.iconeBusca}
          />

          <TextInput
            style={homeStyle.txtBusca}
            placeholder="Buscar"
            placeholderTextColor="#888888"
          />
        </View>
      </View>

      {/* ================= FILTROS ================= */}

      <View style={homeStyle.filtros}>
        <Pressable style={homeStyle.filtroAtivo}>
          <Text style={homeStyle.txtFiltroAtivo}>Todas</Text>
        </Pressable>

        <Pressable style={homeStyle.filtro}>
          <Text style={homeStyle.txtFiltro}>Recentes</Text>
        </Pressable>

        <Pressable style={homeStyle.filtro}>
          <Text style={homeStyle.txtFiltro}>Em alta</Text>
        </Pressable>

        <Pressable style={homeStyle.filtro}>
          <Text style={homeStyle.txtFiltro}>Meus posts</Text>
        </Pressable>
      </View>

      {/* ================= CONTEÚDO ================= */}

      <ScrollView
        style={homeStyle.scroll}
        contentContainerStyle={homeStyle.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= BANNER ================= */}

        <View style={homeStyle.bannerContainer}>
          <Image
            source={require("@/assets/images/img/banner 1.png")}
            style={homeStyle.banner}
          />
        </View>

        <View style={homeStyle.indicadores}>
          <View style={homeStyle.indicadorAtivo} />

          <View style={homeStyle.indicador} />

          <View style={homeStyle.indicador} />
        </View>

        {/* ================= PUBLICAÇÕES ================= */}

        <Text style={homeStyle.tituloSecao}>Publicações</Text>

        {/* ================= CARREGANDO ================= */}

        {carregando && <ActivityIndicator size="large" />}

        {/* ================= SEM PUBLICAÇÕES ================= */}

        {!carregando && publicacoes.length === 0 && (
          <Text style={homeStyle.textoPublicacao}>
            Nenhuma publicação encontrada.
          </Text>
        )}

        {/* ================= LISTAGEM ================= */}

        {!carregando &&
          publicacoes.map((publicacao) => {
            const imagemPublicacao = getUrlMidiaPublicacao(
              publicacao.midia_publicacao,
            );

            /*
             * A foto vem do usuário que criou
             * a publicação.
             *
             * Ex:
             * tbl_usuarios.foto_usuario
             */
            const fotoAutor = getUrlFotoUsuario(
              publicacao.usuario?.foto_usuario ?? null,
            );

            return (
              <View
                key={publicacao.id_publicacao}
                style={homeStyle.cardPublicacao}
              >
                {/* ================= AUTOR ================= */}

                <View style={homeStyle.publicacaoHeader}>
                  {/* FOTO DO USUÁRIO */}

                  {fotoAutor ? (
                    <Image
                      source={{
                        uri: fotoAutor,
                      }}
                      style={homeStyle.avatarPublicacao}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/img/avatar.png")}
                      style={homeStyle.avatarPublicacao}
                    />
                  )}

                  {/* NOME / DATA */}

                  <View style={homeStyle.autorContainer}>
                    <Text style={homeStyle.nomeAutor}>
                      {publicacao.usuario?.nome_usuario ?? "Usuário"}
                    </Text>

                    <Text style={homeStyle.tempoPublicacao}>
                      {new Date(publicacao.criado_em_publicacao).toLocaleString(
                        "pt-BR",
                      )}
                    </Text>
                  </View>
                </View>

                {/* ================= TEXTO ================= */}

                {publicacao.texto_publicacao && (
                  <Text style={homeStyle.textoPublicacao}>
                    {publicacao.texto_publicacao}
                  </Text>
                )}

                {/* ================= IMAGEM PUBLICAÇÃO ================= */}

                {imagemPublicacao && (
                  <Image
                    source={{
                      uri: imagemPublicacao,
                    }}
                    style={homeStyle.imagemPublicacao}
                    resizeMode="cover"
                  />
                )}

                {/* ================= AÇÕES ================= */}

                <View style={homeStyle.acoesPublicacao}>
                  {/* CURTIR */}

                  <Pressable style={homeStyle.acao}>
                    <Image
                      source={require("@/assets/images/img/heart.png")}
                      style={homeStyle.iconeAcao}
                    />

                    <Text style={homeStyle.txtAcao}>Curtir</Text>
                  </Pressable>

                  {/* COMENTAR */}

                  <Pressable style={homeStyle.acao}>
                    <Image
                      source={require("@/assets/images/img/coment.png")}
                      style={homeStyle.iconeAcao}
                    />

                    <Text style={homeStyle.txtAcao}>Comentar</Text>
                  </Pressable>

                  {/* COMPARTILHAR */}

                  <Pressable style={homeStyle.acao}>
                    <Image
                      source={require("@/assets/images/img/share.png")}
                      style={homeStyle.iconeAcao}
                    />

                    <Text style={homeStyle.txtAcao}>Compartilhar</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {/* ================= MENU ================= */}

      <MenuSreen />
    </View>
  );
}
