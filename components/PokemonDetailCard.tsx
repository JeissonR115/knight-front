import { PokemonData } from "@/services/pokeApi";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

interface Props {
  pokemon: PokemonData;
}

const defaultImage =
  // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
  "https://raw.githubusercontent.com/gist/Galadirith/baaf38c7286b568973cc50a50ff57f4d/raw/34d60cae491bc505c212398b94f12705665c12fc/pokeball.svg";

export default function PokemonDetailCard({ pokemon }: Props) {
  const [loading, setLoading] = useState(true);

  // Selecciona la imagen: prioridad a "official-artwork", luego front_default, luego imagen por defecto
  const imageUri =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    defaultImage;

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {loading && (
          <View style={styles.skeleton}>
            <ActivityIndicator size="large" color="#888" />
          </View>
        )}

        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>

      <Text style={styles.subTitle}>Tipos:</Text>
      {pokemon.types?.map((t, index) => (
        <Text key={t?.type?.name ?? index}>
          - {t?.type?.name ?? "Desconocido"}
        </Text>
      ))}

      <Text style={styles.subTitle}>Habilidades:</Text>
      {pokemon.abilities?.map((a, index) => (
        <Text key={a?.ability?.name ?? index}>
          - {a?.ability?.name ?? "Desconocido"}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  imageWrapper: {
    width: 200,
    height: 200,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  skeleton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
