import { FilmCard } from "@/components/FilmCard";
import { useFilm } from "@/context/FilmContext";
import { Film, fetchExternalFilms, fetchLocalFilms } from "@/services/gibliApi";
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

export default function HomeScreen() {
  const navigation = useNavigation();
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const { setSelectedFilm } = useFilm();
  const loadLocalFilms = async () => {
    try {
      setLoading(true);
      const data = await fetchLocalFilms(searchTitle || undefined);
      setFilms(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadExternalFilms = async () => {
    try {
      setLoading(true);
      const data = await fetchExternalFilms(searchTitle || undefined);
      setFilms(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
        <Button title="Buscar Local" onPress={loadLocalFilms} />
        <Button title="Cargar Externa" onPress={loadExternalFilms} />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#888" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {films.map((film, i) => (
            <FilmCard
              key={film.id}
              film={film}
              onPress={() => {
                setSelectedFilm(film);
                (navigation as any).navigate("FilmDetailsScreen");
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
