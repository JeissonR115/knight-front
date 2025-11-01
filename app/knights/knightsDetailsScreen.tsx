import { useKnight } from "@/context/KnightContext";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";


export default function KnightDetailsScreen() {
  const { selectedKnight: knight } = useKnight();

  if (!knight) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.noKnightContainer}>
          <Text style={styles.noKnightText}>
            No se ha seleccionado ningún caballero.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagen del caballero */}
        {knight.img && knight.img.length > 0 && (
          <Image
            source={{ uri: knight.img }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.name}>{knight.name}</Text>
          <Text style={styles.subtitle}>{knight.armor} Cloth</Text>

          {/* Información general */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Rango:</Text>
              <Text style={styles.value}>{knight.rank}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Poder:</Text>
              <Text style={[styles.value, styles.power]}>
                {knight.power} 🔥
              </Text>
            </View>
          </View>

  
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 350,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 24,
    fontStyle: "italic",
  },
  infoSection: {
    marginBottom: 24,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  label: {
    fontSize: 16,
    color: "#999",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    flex: 2,
  },
  power: {
    color: "#ff4444",
  },
  description: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    textAlign: "justify",
  },
  noKnightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0a0a0a",
  },
  noKnightText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});
