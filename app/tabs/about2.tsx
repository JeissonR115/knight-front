import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
// import imagen from "../../assets/images/images.jpeg";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ABC</Text>
      <Pressable
        onPress={() => console.log("Hola mundo")}
        onLongPress={() => alert("Adios Mundo")}
        hitSlop={5000}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJt66rckJAc8ERkP3EYbzek4oMrJEEYuLTMg&s",
          }}
          style={{ width: 100, height: 100 }}
        />
      </Pressable>

      <Text style={styles.text}>Imagen descargado </Text>
      <Image source={require("@/assets/images/images.jpeg")} />
    </View>
  );
};
export default AboutScreen;
interface IStyles {
  container: ViewStyle;
  text: TextStyle;
}

const styles: IStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  hola: { color: "red" },
});
