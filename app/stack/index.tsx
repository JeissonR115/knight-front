import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/stack/about">Go to About screen</Link>
      <Link href="./about">Go to About screen</Link>
    </View>
  );
}
