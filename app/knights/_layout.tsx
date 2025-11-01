import { KnightProvider } from "@/context/KnightContext";
import { UserProvider } from "@/context/UserContext";
import { Tabs } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function KnightsLayout() {
  return (
    <KnightProvider>
      <UserProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Tabs>
            <Tabs.Screen
              name="index"
              options={{
                headerShown: true,
                title: "Caballeros del Zodiaco",
                headerStyle: { backgroundColor: "#1a1a1a" },
                headerTintColor: "#ffffff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
            <Tabs.Screen
              name="knightsDetailsScreen"
              options={{
                headerShown: true,
                title: "Detalles del Caballero",
                headerStyle: { backgroundColor: "#1a1a1a" },
                headerTintColor: "#ffffff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
          </Tabs>
        </GestureHandlerRootView>
      </UserProvider>
    </KnightProvider>
  );
}
