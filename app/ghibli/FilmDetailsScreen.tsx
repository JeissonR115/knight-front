import { useFilm } from "@/context/FilmContext";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Define el tipo para la ruta
type FilmDetailsRouteProp = RouteProp<RootStackParamList, "FilmDetails">;

export default function FilmDetailsScreen() {
  const route = useRoute<FilmDetailsRouteProp>();
  const { selectedFilm: film } = useFilm();
  if (!film) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.noFilmContainer}>
          <Text style={styles.noFilmText}>
            No se ha seleccionado ninguna película.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagen de la película */}
        {film.image && (
          <Image
            source={{ uri: film.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.title}>{film.title}</Text>
          <Text style={styles.subtitle}>
            {film.original_title} ({film.release_date})
          </Text>

          {/* Información del director */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Director:</Text>
              <Text style={styles.value}>{film.director}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Productor:</Text>
              <Text style={styles.value}>{film.producer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Puntuación:</Text>
              <Text style={[styles.value, styles.score]}>{film.rt_score}%</Text>
            </View>
          </View>

          {/* Descripción */}
          {film.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Sinopsis</Text>
              <Text style={styles.description}>{film.description}</Text>
            </View>
          )}
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
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
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
  score: {
    color: "#00b894",
  },
  description: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    textAlign: "justify",
  },
  noFilmContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0a0a0a",
  },
  noFilmText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});
