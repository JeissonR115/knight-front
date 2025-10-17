import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PokemonData } from "../services/pokeApi";

interface Props {
  pokemon: PokemonData;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <View style={styles.result}>
      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      <Text>Altura: {pokemon.height}</Text>
      <Text>Peso: {pokemon.weight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
