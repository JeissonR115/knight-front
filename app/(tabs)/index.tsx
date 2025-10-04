import Button from "@/components/Button";
import Button2 from "@/components/Button2";
import ImageViewer from "@/components/ImageViewer";
import { useGlobalCounter } from "@/context/GlobalCounterContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const PlaceholderImage = require("@/assets/images/images.jpeg");

export default function Index() {
  const [counter] = useGlobalCounter();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>

        <View style={styles.footerContainer}>
          <Button2 label="Multiplicar" />
          <Button
            theme="primary"
            label="Selecctiona img"
            onPress={pickImageAsync}
          />
          <Button label={`seleccioname`} onPress={pickImageAsync} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  imageContainer: {
    width: "100%",
    maxHeight: 400,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  footerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
  },
});
