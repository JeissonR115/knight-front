// app/(hxh)/CharacterDetailsScreen.tsx
import { useHxH } from '@/context/HxHContext';
import { HxHCharacter } from '@/services/HxHApi';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CharacterDetailsScreen() {
  const { state } = useHxH();
  const params = useLocalSearchParams();
  const [character, setCharacter] = useState<HxHCharacter | null>(null);
  const [loading, setLoading] = useState(true);

  const characterId = params.characterId as string;

  useEffect(() => {
    if (characterId) {
      findCharacter();
    }
  }, [characterId, state.characters]);

  const findCharacter = () => {
    setLoading(true);
    const foundCharacter = state.characters.find(char => char.id === characterId);
    
    if (foundCharacter) {
      setCharacter(foundCharacter);
    }
    setLoading(false);
  };

  const calculateBMI = (height: number, weight: number): number => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidad';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f5dd4b" />
          <Text style={styles.loadingText}>Cargando personaje...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!character) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Personaje no encontrado</Text>
          <Text style={styles.errorText}>
            No se pudo cargar la información del personaje.
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const bmi = calculateBMI(character.height, character.weight);
  const bmiCategory = getBMICategory(bmi);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header con imagen */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.img }}
            style={styles.characterImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.name}>{character.name}</Text>
          
          {/* Información básica */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información Básica</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Edad:</Text>
              <Text style={styles.value}>{character.age} años</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Altura:</Text>
              <Text style={styles.value}>{character.height} cm</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Peso:</Text>
              <Text style={styles.value}>{character.weight} kg</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>IMC:</Text>
              <View style={styles.bmiContainer}>
                <Text style={styles.value}>{bmi.toFixed(1)}</Text>
                <Text style={[styles.bmiCategory, 
                  bmi < 18.5 ? styles.underweight :
                  bmi < 25 ? styles.normal :
                  bmi < 30 ? styles.overweight : styles.obese
                ]}>
                  ({bmiCategory})
                </Text>
              </View>
            </View>
          </View>

          {/* Estadísticas adicionales */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Estadísticas</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{character.age}</Text>
                <Text style={styles.statLabel}>Años</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{character.height}</Text>
                <Text style={styles.statLabel}>cm</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{character.weight}</Text>
                <Text style={styles.statLabel}>kg</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{bmi.toFixed(1)}</Text>
                <Text style={styles.statLabel}>IMC</Text>
              </View>
            </View>
          </View>

          {/* Información de la base de datos */}
          <View style={styles.databaseInfo}>
            <Text style={styles.sectionTitle}>Información Técnica</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>ID:</Text>
              <Text style={styles.value}>{character.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Base de datos:</Text>
              <Text style={styles.value}>
                {state.useSQL ? 'PostgreSQL' : 'MongoDB'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botón flotante de volver */}
      <TouchableOpacity 
        style={styles.floatingBackButton}
        onPress={() => router.back()}
      >
        <Text style={styles.floatingBackText}>← Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#cccccc',
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#f5dd4b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
  },
  characterImage: {
    width: '100%',
    height: 300,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 24,
  },
  statsSection: {
    marginBottom: 24,
  },
  databaseInfo: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5dd4b',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  bmiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bmiCategory: {
    fontSize: 14,
    fontWeight: '600',
  },
  underweight: {
    color: '#ff6b6b',
  },
  normal: {
    color: '#00b894',
  },
  overweight: {
    color: '#feca57',
  },
  obese: {
    color: '#ff6b6b',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5dd4b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  floatingBackButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  floatingBackText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});