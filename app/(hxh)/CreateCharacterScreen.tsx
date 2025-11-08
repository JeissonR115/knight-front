// app/(hxh)/CreateCharacterScreen.tsx
import { useHxH } from '@/context/HxHContext';
import { CreateHxHCharacterDTO } from '@/services/HxHApi';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
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
    img: ''
  });
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};
  // Convierte a number cuando corresponde
  const handleChange = (field: keyof CreateHxHCharacterDTO, value: string) => {
    if (field === 'age' || field === 'height' || field === 'weight') {
      const numeric = value.replace(/[^\d.-]/g, '');
      setForm(prev => ({
        ...prev,
        [field]: numeric === '' ? 0 : Number(numeric),
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const errorMessage: string[] = [];
    
    // Validaciones
    
    if (!form.name || !form.name.trim()) {
      errorMessage.push('El nombre es requerido');
    }
    if (!form.age || !form.height || !form.weight) {
      errorMessage.push('Todos los campos numéricos son requeridos y deben ser mayores que 0');
    }
    if (!form.img || !form.img.trim()) {
      errorMessage.push('La URL de la imagen es requerida');
    }
    if (errorMessage.length > 0) {
      showAlert('Error de Validación', errorMessage.join('\n'));
      return;
    }

    setLoading(true);
    try {
      // Aseguramos que los tipos sean numbers
      const characterData: CreateHxHCharacterDTO = {
        ...form,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
      };

      // Si addCharacter retorna algo útil, puedes usarlo aquí.
      const result = await addCharacter(characterData);

      // Mostrar confirmación y navegar. Uso router.replace a la ruta de búsqueda.
      // Cambia '/(hxh)/Search' por la ruta real de tu pantalla de búsqueda.
      Alert.alert('Éxito', 'Personaje creado correctamente');
      // redirigir inmediatamente (no depender del OK)
      try {
        // intenta ir a la pantalla de búsqueda; si no existe, vuelve atrás
        router.replace('/');
      } catch (navErr) {
        router.back();
      }
    } catch (error: any) {
      const msg = error?.message ?? 'No se pudo crear el personaje';
      Alert.alert('Error', msg);
      console.error('CreateCharacter error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
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
              autoCapitalize="words"
            />
          </View>

          {/* Edad */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad *</Text>
            <TextInput
              style={styles.input}
              value={form.age ? String(form.age) : ''}
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
              value={form.height ? String(form.height) : ''}
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
              value={form.weight ? String(form.weight) : ''}
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
              autoCapitalize="none"
            />
          </View>

          {/* Vista previa de imagen */}
          {form.img ? (
            <View style={styles.previewContainer}>
              <Text style={styles.label}>Vista Previa:</Text>
              <Image
                source={{ uri: form.img }}
                style={styles.previewImage}
                resizeMode="cover"
                onError={() => {
                  // Si la imagen falla, muestra un alert ligero (opcional)
                  // No mostramos alert agresivo para no molestar al usuario
                  console.warn('Imagen no cargó:', form.img);
                }}
              />
            </View>
          ) : null}

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
              style={[styles.button, styles.submitButton, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
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
    // gap no es compatible en RN en muchas versiones, usa margin en los botones si lo necesitas
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
    marginRight: 12,
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
