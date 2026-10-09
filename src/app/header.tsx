import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

import { headerStyles } from "@/styles/headerStyles";
import MenuModalScreen from "@/components/menuModal";
import { useAuth } from "@/contexts/AuthContext";
import { getUrlFotoUsuario } from "@/services/usuarioService";

type HeaderProps = {
  fotoUsuario?: string | null;
};

export default function HeaderScreen({ fotoUsuario }: HeaderProps) {
  const [modalLinkSenha, setModalLinkSenha] = useState(false);

  const { usuario } = useAuth();

  const fotoUsuarioContexto = getUrlFotoUsuario(
    usuario?.foto_usuario ?? null
  );

  const fotoExibida = fotoUsuario ?? fotoUsuarioContexto;

  return (
    <View style={headerStyles.header}>
      {/* ================= FOTO PERFIL ================= */}

      <Pressable style={headerStyles.perfil}>
        {fotoExibida ? (
          <Image
            source={{
              uri: fotoExibida,
            }}
            style={headerStyles.fotoPerfil}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("@/assets/images/img/avatar.png")}
            style={headerStyles.fotoPerfil}
            resizeMode="cover"
          />
        )}
      </Pressable>

      {/* ================= LOGO / NOME ================= */}

      <View style={headerStyles.logoContainer}>
        <Image
          source={require("@/assets/images/img/logo.svg")}
          style={headerStyles.logo}
        />

        <Text style={headerStyles.nomeProjeto}>
          Conexão 360°
        </Text>
      </View>

      {/* ================= MENU ================= */}

      <Pressable
        style={({ pressed }) => [
          headerStyles.btnMenu,
          pressed && headerStyles.btnPressed,
        ]}
        onPress={() => setModalLinkSenha(true)}
      >
        <Image
          source={require("@/assets/images/img/menu.png")}
          style={headerStyles.iconeHeader}
        />
      </Pressable>

      {/* ================= MODAL MENU ================= */}

      <MenuModalScreen
        visible={modalLinkSenha}
        onClose={() => {
          setModalLinkSenha(false);
        }}
      />
    </View>
  );
}
