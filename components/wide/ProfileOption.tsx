import { Pressable, Text, StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { octiconsName } from "@/utils/types";
import { useRouter, Href } from "expo-router";
type props = {
  name: string;
  icon: octiconsName;
  redirectTo: Href;
  isFirst?: boolean;
  isBold?: boolean;
  isPowerful?: boolean;
};
export default function ProfileOption({
  name,
  icon,
  redirectTo,
  isFirst,
  isBold,
  isPowerful,
}: props) {
  const router = useRouter();
  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      marginLeft: 20,
      marginTop: isFirst ? 15 : 0,
    },
    profileOptionsText: {
      marginLeft: 10,
      fontSize: 20,
      fontFamily: isBold ? "Rubik_500Medium" : "Rubik_400Regular",
      color: isPowerful ? "red" : "black",
    },
  });
  return (
    <Pressable style={styles.button} onPress={() => router.replace(redirectTo)}>
      <Octicons
        name={icon}
        size={24}
        color={isPowerful ? "red" : "black"}
      ></Octicons>
      <Text style={styles.profileOptionsText}>{name}</Text>
    </Pressable>
  );
}
