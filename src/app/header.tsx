import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

import { headerStyles } from "@/styles/headerStyles";
import MenuModalScreen from "@/components/menuModal";

type HeaderProps = {
  fotoUsuario?: string | null;
};

export default function HeaderCreen({ fotoUsuario }: HeaderProps) {
  const [modalLinkSenha, setModalLinkSenha] = useState(false);

  return (
    <View style={headerStyles.header}>
      {/* ================= FOTO PERFIL ================= */}

      <Pressable style={headerStyles.perfil}>
        {fotoUsuario ? (
          <Image
            source={{
              uri: fotoUsuario,
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

        <Text style={headerStyles.nomeProjeto}>Conexão 360°</Text>
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
