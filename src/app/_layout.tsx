import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "@expo-google-fonts/lato";

import { useEffect } from "react";

import { Stack } from "expo-router";

import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

import { TemaProvider } from "@/contexts/TemaContext";


// =========================================
// MANTÉM A SPLASH ATÉ AS FONTES CARREGAREM
// =========================================

SplashScreen.preventAutoHideAsync();


// =========================================
// FONTES
// =========================================

export const fontesCarregadas = {

  Lato_100Thin,
  Lato_100Thin_Italic,

  Lato_300Light,
  Lato_300Light_Italic,

  Lato_400Regular,
  Lato_400Regular_Italic,

  Lato_700Bold,
  Lato_700Bold_Italic,

  Lato_900Black,
  Lato_900Black_Italic,

};


export default function RootLayout() {

  const [fontsLoaded] =
    useFonts(fontesCarregadas);


  // =========================================
  // FINALIZA SPLASH
  // =========================================

  useEffect(() => {

    if (fontsLoaded) {

      SplashScreen.hideAsync();

    }

  }, [fontsLoaded]);


  // =========================================
  // AGUARDA FONTES
  // =========================================

  if (!fontsLoaded) {

    return null;

  }


  // =========================================
  // APP
  // =========================================

  return (

    <TemaProvider>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

    </TemaProvider>

  );

}