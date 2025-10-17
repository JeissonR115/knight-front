import PokemonDetailCard from "@/components/PokemonDetailCard";
import { usePokemon } from "@/context/PokemonContext";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function PokemonDetail() {
  const { selectedPokemon } = usePokemon();

  if (!selectedPokemon) {
    return <Text style={styles.error}>No hay un Pokémon seleccionado</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <PokemonDetailCard pokemon={selectedPokemon} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
