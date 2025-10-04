import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerStyle: { backgroundColor: "#222" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    ></Stack>
  );
};
export default RootLayout;
