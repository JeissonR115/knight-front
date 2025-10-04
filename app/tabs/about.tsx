import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ABC</Text>
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
