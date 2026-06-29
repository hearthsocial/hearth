import { Slot } from "expo-router";
import { View } from "react-native";
import Sidebar from "@/components/wide/Sidebar";
import { useSegments } from "expo-router";
export default function WideLayout() {
  const segments = useSegments();
  const isAuth = segments[1] == "(auth)";
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {!isAuth && <Sidebar />}{" "}
      <View style={{ flex: 4 }}>
        <Slot />
      </View>
    </View>
  );
}
