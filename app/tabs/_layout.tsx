import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: "#62b63bff" } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarPosition: "bottom",
          tabBarStyle: { backgroundColor: "#1892b1ff" },
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="fire-hydrant" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Otra",
          tabBarPosition: "bottom",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="menu-book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about3"
        options={{
          title: "xxx",
          tabBarPosition: "bottom",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="camera" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about2"
        options={{
          title: "zxc",
          tabBarPosition: "bottom",
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="games" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
