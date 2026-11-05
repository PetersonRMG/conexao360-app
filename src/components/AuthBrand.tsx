import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { fontes } from "@/styles/variaveis";

type Props = { compact?: boolean; showAppName?: boolean };

/** Identidade original, compartilhada entre login, recuperação e cadastro. */
export default function AuthBrand({ compact = false, showAppName = false }: Props) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <Image
        source={require("@/assets/images/img/logo.svg")}
        style={[styles.logo, compact && styles.logoCompact]}
        resizeMode="contain"
        accessibilityLabel="Logo da Advocacia Exponencial"
      />
      <Text style={[styles.brand, compact && styles.brandCompact]}>
        ADVOCACIA{"\n"}E<Text style={styles.gold}>X</Text>PONENCIAL
      </Text>
      <Text style={[styles.exclusive, compact && styles.exclusiveCompact]}>REDE EXCLUSIVA</Text>
      {showAppName && (
        <Text style={styles.appName}>
          Conexão <Text style={styles.gold}>360°</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", width: "100%" },
  compact: { marginBottom: 12 },
  logo: { width: 88, height: 88, marginBottom: 6 },
  logoCompact: { width: 58, height: 58, marginBottom: 4 },
  brand: {
    color: "#FFFFFF", textAlign: "center", fontFamily: fontes.appBold,
    fontSize: 25, lineHeight: 28, letterSpacing: -0.5,
  },
  brandCompact: { fontSize: 19, lineHeight: 22 },
  exclusive: {
    color: "#F0C247", fontFamily: fontes.appMedium, fontSize: 15,
    letterSpacing: 1.8, marginTop: 8,
  },
  exclusiveCompact: { fontSize: 12, marginTop: 5 },
  appName: {
    fontFamily: fontes.appBold, color: "#FFFFFF", fontSize: 23,
    lineHeight: 29, marginTop: 12,
  },
  gold: { color: "#F0C247" },
});
