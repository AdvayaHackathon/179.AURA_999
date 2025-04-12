import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: "#222" }}>
        Welcome to Project UNMUTE!
      </Text>
      <Button mode="contained" onPress={() => router.push("/login")}>
        Get Started
      </Button>
    </View>
  );
}



