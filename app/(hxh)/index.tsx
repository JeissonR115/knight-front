// app/(hxh)/SearchScreen.tsx
import { useHxH } from '@/context/HxHContext';
import { HxHCharacter } from '@/services/HxHApi';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function SearchScreen() {
  const { state, fetchCharacters, toggleDatabase, setFilters } = useHxH();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadAllCharacters();
  }, []);

  const loadAllCharacters = async () => {
    setIsSearching(true);
    await fetchCharacters();
    setIsSearching(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim() && !minAge && !maxAge) {
      await loadAllCharacters();
      return;
    }

    setIsSearching(true);
    
    const filters: any = {};
    if (searchTerm.trim()) filters.name = searchTerm.trim();
    if (minAge) filters.minAge = parseInt(minAge);
    if (maxAge) filters.maxAge = parseInt(maxAge);

    await fetchCharacters(filters);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setMinAge('');
    setMaxAge('');
    loadAllCharacters();
  };

  const handleCharacterPress = (character: HxHCharacter) => {
    router.push({
      pathname: "./CharacterDetailsScreen",
      params: { characterId: character.id }
    });
  };

  const renderCharacterItem = ({ item }: { item: HxHCharacter }) => (
    <TouchableOpacity
      style={styles.characterCard}
      onPress={() => handleCharacterPress(item)}
    >
      <Image source={{ uri: item.img }} style={styles.characterImage} />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterDetails}>
          Edad: {item.age} años • Altura: {item.height}cm
        </Text>
        <Text style={styles.characterDetails}>
          Peso: {item.weight}kg
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Hunter x Hunter</Text>
          <Text style={styles.subtitle}>Buscar Personajes</Text>
        </View>

        {/* Selector de Base de Datos */}
        <View style={styles.databaseSelector}>
          <Text style={styles.databaseText}>
            Usando: {state.useSQL ? 'PostgreSQL' : 'MongoDB'}
          </Text>
          <Switch
            value={state.useSQL}
            onValueChange={toggleDatabase}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={state.useSQL ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        {/* Barra de Búsqueda */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre..."
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={setSearchTerm}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          
          <View style={styles.ageFilters}>
            <TextInput
              style={[styles.ageInput, styles.ageInputLeft]}
              placeholder="Edad mínima"
              placeholderTextColor="#999"
              value={minAge}
              onChangeText={setMinAge}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.ageInput, styles.ageInputRight]}
              placeholder="Edad máxima"
              placeholderTextColor="#999"
              value={maxAge}
              onChangeText={setMaxAge}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.searchButton]}
              onPress={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Buscar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearSearch}
              disabled={isSearching}
            >
              <Text style={styles.buttonText}>Limpiar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estado de Error */}
        {state.error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{state.error}</Text>
            <TouchableOpacity onPress={loadAllCharacters}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Resultados */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>
            {state.characters.length} Personajes Encontrados
          </Text>

          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#f5dd4b" />
              <Text style={styles.loadingText}>Buscando personajes...</Text>
            </View>
          ) : state.characters.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchTerm || minAge || maxAge 
                  ? 'No se encontraron personajes con esos filtros'
                  : 'No hay personajes disponibles'
                }
              </Text>
              <TouchableOpacity onPress={loadAllCharacters}>
                <Text style={styles.retryText}>Cargar todos</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={state.characters}
              renderItem={renderCharacterItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f5dd4b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
  },
  databaseSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  databaseText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  searchSection: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  ageFilters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ageInput: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    padding: 12,
    fontSize: 16,
  },
  ageInputLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 1,
  },
  ageInputRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: '#f5dd4b',
  },
  clearButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  retryText: {
    color: '#f5dd4b',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsSection: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: '#cccccc',
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  characterInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  characterDetails: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
});