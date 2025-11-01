import { KnightCard } from "@/components/KnightCard";
import { useKnight } from "@/context/KnightContext";
import { Knight, fetchExternalKnights, fetchLocalKnights } from "@/services/knightApi";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [knights, setKnights] = useState<Knight[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const { setSelectedKnight } = useKnight();
  const loadLocalKnights = async () => {
    try {
      setLoading(true);
      const data = await fetchLocalKnights(searchTitle || undefined);
      setKnights(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadExternalKnights = async () => {
    try {
      setLoading(true);
      const data = await fetchExternalKnights(searchTitle || undefined);
      setKnights(data);
    } catch (error: any) {
      Alert.alert("Error Esta funcion no se a implementado (tenga paciencia)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por título..."
          value={searchTitle}
          onChangeText={setSearchTitle}
        />
        <Button title="Buscar Local" onPress={loadLocalKnights} />
        <Button title="Cargar Externa" onPress={loadExternalKnights} /> 
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#888" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {knights.map((knight, i) => (
            <KnightCard
              key={i}
              knight={knight}
              onPress={() => {
                setSelectedKnight(knight);
                router.push("./knightsDetailsScreen");
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  controls: {
    flexDirection: "column",
    marginBottom: 16,
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { alignItems: "center", paddingBottom: 20 },
});
