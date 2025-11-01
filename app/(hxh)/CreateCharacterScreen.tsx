// app/(hxh)/CreateCharacterScreen.tsx
import { useHxH } from '@/context/HxHContext';
import { CreateHxHCharacterDTO } from '@/services/HxHApi';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreateCharacterScreen() {
  const { state, addCharacter } = useHxH();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateHxHCharacterDTO>({
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    img: '',
  });

  const handleChange = (field: keyof CreateHxHCharacterDTO, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!form.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    if (!form.age || !form.height || !form.weight) {
      Alert.alert('Error', 'Todos los campos numéricos son requeridos');
      return;
    }
    if (!form.img.trim()) {
      Alert.alert('Error', 'La URL de la imagen es requerida');
      return;
    }

    setLoading(true);
    try {
      const characterData = {
        ...form,
        age: (form.age),
        height: (form.height),
        weight: (form.weight),
      };

      await addCharacter(characterData);
      
      Alert.alert(
        'Éxito',
        'Personaje creado correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el personaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear Personaje</Text>
          <Text style={styles.subtitle}>Agrega un nuevo personaje a la base de datos</Text>
        </View>

        <View style={styles.form}>
          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholder="Ej: Gon Freecss"
              placeholderTextColor="#666"
            />
          </View>

          {/* Edad */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad *</Text>
            <TextInput
              style={styles.input}
              value={String(form.age)}
              onChangeText={(value) => handleChange('age', value)}
              placeholder="Ej: 12"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          {/* Altura */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura (cm) *</Text>
            <TextInput
              style={styles.input}
              value={String(form.height)}
              onChangeText={(value) => handleChange('height', value)}
              placeholder="Ej: 154"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          {/* Peso */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg) *</Text>
            <TextInput
              style={styles.input}
              value={String(form.weight)}
              onChangeText={(value) => handleChange('weight', value)}
              placeholder="Ej: 45"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          {/* Imagen */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL de la Imagen *</Text>
            <TextInput
              style={styles.input}
              value={form.img}
              onChangeText={(value) => handleChange('img', value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              placeholderTextColor="#666"
            />
          </View>

          {/* Vista previa de imagen */}
          {form.img && (
            <View style={styles.previewContainer}>
              <Text style={styles.label}>Vista Previa:</Text>
              <Image
                source={{ uri: form.img }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Crear Personaje</Text>
              )}
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5dd4b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  previewContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  submitButton: {
    backgroundColor: '#f5dd4b',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});