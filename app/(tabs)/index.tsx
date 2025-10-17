import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import PokemonCard from "@/components/PokemonCard";
import PokemonSuggestions from "@/components/PokemonSuggestions";
import { usePokemon } from "@/context/PokemonContext";
import {
  PokemonData,
  fetchPokemon,
  fetchPokemonLocal,
  fetchSuggestions,
} from "@/services/pokeApi";

export default function Index() {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchSource, setSearchSource] = useState<"local" | "api">("api");

  const { setSelectedPokemon } = usePokemon();

  const handleSearch = async (name?: string) => {
    const searchName = (name || pokemonName).toLowerCase();
    if (!searchName) return;

    setSearchSource("api"); // indicamos que la búsqueda es en API pública

    try {
      setError(null);
      setSuggestions([]);
      const data = await fetchPokemon(searchName);
      setPokemonData(data);
      setSelectedPokemon(data);
      console.log(data);
    } catch {
      setPokemonData(null);
      setError("Pokémon no encontrado. ¿Quizás quisiste decir?");
      const results = await fetchSuggestions(searchName);
      setSuggestions(results);
    }
  };

  const handleSearchLocal = async (name?: string) => {
    const searchName = (name || pokemonName).toLowerCase();
    if (!searchName) return;

    setSearchSource("local"); // indicamos que la búsqueda es local

    try {
      setError(null);
      setSuggestions([]);
      const data = await fetchPokemonLocal(searchName);
      console.log(data);
      if (data.length > 1) {
        setSuggestions(data.map((pokemon) => pokemon.name));
      } else if (data.length === 1) {
        setPokemonData(data[0]);
        setSelectedPokemon(data[0]);
      } else {
        setPokemonData(null);
        setError("Pokémon no encontrado en local.");
      }
    } catch {
      setPokemonData(null);
      setError("Error consultando Pokémon local.");
    }
  };

  const handleSuggestionSelect = async (name: string) => {
    setPokemonName(name);
    if (searchSource === "local") {
      await handleSearchLocal(name);
    } else {
      await handleSearch(name);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Consulta Pokémon</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre del Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
      />

      <Button title="Buscar API Publica" onPress={() => handleSearch()} />
      <Button title="Buscar API Local" onPress={() => handleSearchLocal()} />

      {error && <Text style={styles.error}>{error}</Text>}

      <PokemonSuggestions
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
      />

      {pokemonData && <PokemonCard pokemon={pokemonData} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
