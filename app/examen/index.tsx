// HomeScreen.js
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import {
    Button,
    StyleSheet,
    TextInput,
    View
} from "react-native";

export default function HomeScreen() {
  const { name, setName, lastName, setLastName } = useContext(UserContext);

  const saveData = () => {
    alert("Datos guardados en Context!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Button title="Enviar" onPress={saveData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  controls: { flexDirection: "column", marginBottom: 16, gap: 10 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 8 },
});
