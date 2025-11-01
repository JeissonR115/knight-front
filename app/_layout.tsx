import { PokemonProvider } from "@/context/PokemonContext";
import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PokemonProvider>
        <UserProvider>
        <Stack>
          <Stack.Screen name="(hxh)" options={{ headerShown: false }} />
          <Stack.Screen name="ghibli" options={{ headerShown: false }} />
          <Stack.Screen name="knights" options={{ headerShown: false }} />
        </Stack></UserProvider>
      </PokemonProvider>
    </GestureHandlerRootView>
  );
}
