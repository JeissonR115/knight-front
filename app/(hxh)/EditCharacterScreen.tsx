// app/(hxh)/EditCharacterScreen.tsx
import { useHxH } from '@/context/HxHContext';
import { HxHCharacter, UpdateHxHCharacterDTO } from '@/services/HxHApi';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  View
} from 'react-native';

export default function EditCharacterScreen() {
  const { state, updateCharacter, deleteCharacter } = useHxH();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<HxHCharacter | null>(null);
  const [form, setForm] = useState<UpdateHxHCharacterDTO>({
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    img: '',
  });
  const showAlert = (title: string, message?: string, buttons?: any[]) => {
  if (Platform.OS === 'web') {
    // En web usamos window.alert (simple) o puedes implementar un modal custom
    if (!buttons || buttons.length === 0) {
      window.alert(`${title}\n\n${message || ''}`);
    } else {
      // window.confirm para simular botones simples (OK / Cancel)
      const ok = window.confirm(`${title}\n\n${message || ''}`);
      console.log('Alert buttons:', buttons, 'User response:', ok);
      if (ok && buttons[0]?.onPress) buttons[0].onPress();
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};

  const characterId = params.characterId as string;

  useEffect(() => {
    if (characterId) {
      const foundCharacter = state.characters.find(char => char.id === characterId);
      if (foundCharacter) {
        setCharacter(foundCharacter);
        setForm({
          name: foundCharacter.name,
          age: foundCharacter.age,
          height: foundCharacter.height,
          weight: foundCharacter.weight,
          img: foundCharacter.img,
        });
      }
    }
  }, [characterId, state.characters]);

  const handleChange = (field: keyof UpdateHxHCharacterDTO, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!character) return;

    // Validaciones
    if (!form.name?.trim()) {
      showAlert('Error', 'El nombre es requerido');
      return;
    }

    setLoading(true);
    try {
      const updateData: UpdateHxHCharacterDTO = {
        name: form.name,
        img: form.img,
      };

      // Solo agregar campos numéricos si tienen valor
      if (form.age) updateData.age = (form.age);
      if (form.height) updateData.height = (form.height);
      if (form.weight) updateData.weight = (form.weight);

      await updateCharacter(character.id, updateData);
      
      showAlert(
        'Éxito',
        'Personaje actualizado correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      showAlert('Error', 'No se pudo actualizar el personaje');
    } finally {
      setLoading(false);
    }
  };

const handleDelete = () => {
  if (!character) return;

  showAlert(
    'Eliminar Personaje',
    `¿Estás seguro de que quieres eliminar a ${character.name}? Esta acción no se puede deshacer.`,
    [
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => handleConfirmDelete(character.id),
      },
      ,
    ]
  );
};

const handleConfirmDelete = async (id: string) => {
  if (!id) return;

  setLoading(true);
  try {
      const response = await deleteCharacter(String(id));
      console.log('Delete response:', response);
      showAlert(
        'Éxito',
        'Personaje eliminado correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.push('/')
          }
        ]
      );

  } catch (error) {
    console.error('Error al eliminar personaje:', error);
    showAlert('Error', 'No se pudo eliminar el personaje');
  } finally {
    setLoading(false);
  }
};



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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Editar Personaje</Text>
          <Text style={styles.subtitle}>Modifica la información de {character.name}</Text>
        </View>

        <View style={styles.form}>
          {/* Vista previa actual */}
          <View style={styles.currentPreview}>
            <Image
              source={{ uri: character.img }}
              style={styles.currentImage}
              resizeMode="cover"
            />
            <Text style={styles.currentName}>{character.name}</Text>
          </View>

          {/* Campos del formulario (igual que Create pero con valores actuales) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={styles.input}
              value={String(form.age)}
              onChangeText={(value) => handleChange('age', value)}
              placeholder={`Actual: ${character.age}`}
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={String(form.height)}
              onChangeText={(value) => handleChange('height', value)}
              placeholder={`Actual: ${character.height}`}
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={String(form.weight)}
              onChangeText={(value) => handleChange('weight', value)}
              placeholder={`Actual: ${character.weight}`}
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL de la Imagen</Text>
            <TextInput
              style={styles.input}
              value={form.img}
              onChangeText={(value) => handleChange('img', value)}
              placeholderTextColor="#666"
            />
          </View>

          {/* Vista previa nueva imagen */}
          {form.img && form.img !== character.img && (
            <View style={styles.previewContainer}>
              <Text style={styles.label}>Nueva Vista Previa:</Text>
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
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
              disabled={loading}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>

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
                <Text style={styles.submitButtonText}>Guardar Cambios</Text>
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
  currentPreview: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  currentImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  currentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
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
    flexDirection: 'column',
    gap: 12,
    marginTop: 24,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  submitButton: {
    backgroundColor: '#f5dd4b',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
});