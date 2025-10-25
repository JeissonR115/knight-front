// ModalScreen.js
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ModalScreen() {
  const { name, lastName } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Ver" onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Nombre: {name}</Text>
            <Text style={styles.modalText}>Apellido: {lastName}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: "#fff" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: { fontSize: 18, marginBottom: 10 },
  closeButton: { marginTop: 10, backgroundColor: '#2196F3', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }
});
