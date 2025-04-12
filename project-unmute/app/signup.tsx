import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Signup Screen</Text>
      <Button
        mode="contained"
        onPress={() => {
          console.log("Signup pressed");
          // Add actual signup logic later
        }}
        style={{ marginBottom: 8 }}
      >
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/login")}
      >
        Already have an account? Login
      </Button>
    </View>
  );
}
