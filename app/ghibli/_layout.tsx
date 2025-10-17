// app/_layout.tsx
// import { GhibliProvider } from "@/context/GhibliContext";
import { FilmProvider } from "@/context/FilmContext";
import { Tabs } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GhibliLayout() {
  return (
    <FilmProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              headerShown: true,
              title: "Películas Ghibli",
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#ffffff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Tabs.Screen
            name="film-details"
            options={{
              headerShown: true,
              title: "Detalles de la Película",
              headerStyle: {
                backgroundColor: "#1a1a1a",
              },
              headerTintColor: "#ffffff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </FilmProvider>
  );
}
