import { PokemonProvider } from "@/context/PokemonContext";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PokemonProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="ghibli" options={{ headerShown: false }} />
        </Stack>
      </PokemonProvider>
    </GestureHandlerRootView>
  );
}
