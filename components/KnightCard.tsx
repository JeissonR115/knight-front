// components/KnightCard.tsx
import { Knight } from "@/services/knightApi";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface KnightCardProps {
  knight: Knight;
  onPress?: () => void;
}

const { width } = Dimensions.get("window");
const CARD_MARGIN = 16;
const CARD_WIDTH = width - CARD_MARGIN * 2;

export const KnightCard: React.FC<KnightCardProps> = ({ knight, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_WIDTH }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Imagen del caballero */}
      <Image
        source={{
          uri:
            knight.img && knight.img.length > 0
              ? knight.img
              : "https://upload.wikimedia.org/wikipedia/en/5/5e/Saint_Seiya_Pegasus_Seiya.png", // fallback
        }}
        style={[styles.image, { width: CARD_WIDTH }]}
        resizeMode="cover"
      />

      {/* Overlay oscuro */}
      <View style={styles.overlay} />

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.name}>{knight.name}</Text>
        <Text style={styles.armor}>{knight.armor} Cloth</Text>

        <View style={styles.row}>
          <Text style={styles.rank}>{knight.rank} Knight</Text>
          <View style={styles.powerBadge}>
            <Text style={styles.powerText}>{knight.power} 🔥</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    borderRadius: 16,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  image: {
    height: 400,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  armor: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rank: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "600",
  },
  powerBadge: {
    backgroundColor: "#e63946",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  powerText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
