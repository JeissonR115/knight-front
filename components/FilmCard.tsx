// components/FilmCard.tsx
import { Film } from "@/services/gibliApi";

import * as React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FilmCardProps {
  film: Film;
  onPress?: () => void;
}

const { width } = Dimensions.get("window");
const CARD_HORIZONTAL_MARGIN = 16;
const CARD_WIDTH = width - CARD_HORIZONTAL_MARGIN * 2; // ancho dinámico

export const FilmCard: React.FC<FilmCardProps> = ({ film, onPress }) => {
  const cleanTitle = film.title.split("||")[1] ?? film.title;

  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Imagen de la película */}
      <Image
        source={{ uri: film.image ?? "" }}
        style={[styles.image, { width: CARD_WIDTH }]}
        resizeMode="cover"
      />

      {/* Gradiente overlay */}
      <View style={styles.gradientOverlay} />

      {/* Contenido de la tarjeta */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {cleanTitle}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.directorLabel}>Director:</Text>
          <Text style={styles.directorName}>{film.director}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.yearContainer}>
            <Text style={styles.year}>{film.release_date}</Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{film.rt_score}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: 400,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "transparent",
    backgroundImage:
      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    lineHeight: 28,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  directorLabel: { fontSize: 14, color: "#cccccc", marginRight: 6 },
  directorName: { fontSize: 14, color: "#ffffff", fontWeight: "600" },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  yearContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  year: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  scoreContainer: {
    backgroundColor: "#00b894",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#00b894",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  scoreText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
