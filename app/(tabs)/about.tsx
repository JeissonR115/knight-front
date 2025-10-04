import { useGlobalCounter } from "@/context/GlobalCounterContext";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const [counter, setCounter] = useGlobalCounter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Text style={styles.text}>Contador: {counter}</Text>
      <button onClick={() => setCounter(counter + 1)}>Sumar</button>
      <button onClick={() => setCounter(counter - 1)}>Restar</button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
