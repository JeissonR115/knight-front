import { Link } from "expo-router";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const AboutScreen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen 2</Text>
      <Link href="./about">Go to About screen</Link>
      <Link href="./">Go to Stack screen</Link>
    </View>
  );
};
export default AboutScreen2;
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
