import Button from "@/components/wide/Button";
import Input from "@/components/wide/Input";
import simplifyError from "@/utils/errorSimplifier";
import isValidEmail from "@/utils/isValidEmail";
import { supabase } from "@/utils/supabase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  async function login() {
    if (!isValidEmail(email)) {
      setError("Invalid email.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!data || error) {
      setError(simplifyError(error?.message));
      return;
    }

    router.replace("/(wide)");
  }
  async function continueAsGuest() {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (!data || error || !data.user) {
      setError(simplifyError(error?.message));
    } else {
      await AsyncStorage.setMany({ username: "Guest", id: data.user.id });
      router.replace("/(wide)");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Image
          source={require("@/assets/images/hearth.svg")}
          style={styles.logo}
        />
        <Text style={styles.header}>Login</Text>
      </View>

      <Text style={styles.error}>{error}</Text>
      <View style={styles.inputBox}>
        <Input placeholder="Email" toSet={setEmail} value={email} />
        <Input
          placeholder="Password"
          toSet={setPassword}
          value={password}
          isSecure
        />
        <Button text="Login" type={1} onClick={login} />
      </View>
      <View style={styles.or}>
        <Text style={styles.orText}>—OR—</Text>
        <View style={styles.orOptionsBox}>
          <Link href="/(wide)/(auth)/signup" style={styles.orOptionText}>
            Signup
          </Link>

          <Text style={styles.separator}></Text>

          <Text style={styles.orOptionText} onPress={continueAsGuest}>
            View as Guest
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2ecdf",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  error: {
    fontFamily: "Rubik_400Regular",
    color: "red",
    textAlign: "center",
    fontSize: 20,
  },
  topBox: {
    alignItems: "center",
    margin: 20,
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Rubik_400Regular",
    fontSize: 85,
    color: "#252525",
  },
  motto: {
    fontFamily: "Rubik_400Regular",
    fontSize: 45,
    color: "#252525",
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
    color: "#252525",
    borderRadius: 40,
    width: "70%",
    height: 80,
    fontSize: 20,
  },
  inputBox: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  logo: {
    width: 250,
    height: 250,
  },
  side: {
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  separator: {
    width: 300,
  },
  or: {
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  orText: {
    fontFamily: "Rubik_400Regular",
    fontSize: 25,
    color: "#717171",
  },
  orOptionsBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  orOption: {
    padding: 40,
  },
  orOptionText: {
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
    fontSize: 20,
    color: "#eb4300",
    textDecorationLine: "underline",
  },
});
