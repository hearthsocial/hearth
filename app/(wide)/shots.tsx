import { ScrollView, View, StyleSheet, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { useRouter } from "expo-router";
export default function WideImages() {
  const [selectedFocus, setFocus] = useState(1);
  const router = useRouter();
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View style={styles.top}>
        <Pressable onPress={() => router.replace("/(wide)/mix")}>
          <Entypo name="shuffle" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => setFocus(1)}>
          <Text style={[styles.links, selectedFocus == 1 && styles.selected]}>
            For You
          </Text>
        </Pressable>
        <Pressable onPress={() => setFocus(2)}>
          <Text style={[styles.links, selectedFocus == 2 && styles.selected]}>
            Explore
          </Text>
        </Pressable>
        <Pressable onPress={() => setFocus(3)}>
          <Text style={[styles.links, selectedFocus == 3 && styles.selected]}>
            Following
          </Text>
        </Pressable>
        <Pressable onPress={() => setFocus(4)}>
          <Text style={[styles.links, selectedFocus == 4 && styles.selected]}>
            Friends
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{}}></ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  top: {
    width: "60%",
    height: 60,
    backgroundColor: "#f2ecdf",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: "10%",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  },
  links: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
    color: "#717171",
  },
  selected: {
    color: "black",
    fontFamily: "Rubik_500Medium",
  },
});
