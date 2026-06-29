import Button from "@/components/wide/Button";
import Input from "@/components/wide/Input";
import simplifyError from "@/utils/errorSimplifier";
import isUsernameAvailable from "@/utils/isUsernameAvailable";
import isValidEmail from "@/utils/isValidEmail";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [usernameState, setUsernameState] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (username.length < 3) {
      setUsernameState(0);
      return;
    }

    const debounce = setTimeout(async () => {
      setUsernameState(1);
      let usernameAvailable = await isUsernameAvailable(username);

      if (usernameAvailable) {
        setUsernameState(3);
      } else {
        setUsernameState(2);
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [username]);

  async function continueAsGuest() {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (!data || error || !data.user) {
      setError(simplifyError(error?.message));
      return;
    }
    await AsyncStorage.setMany({ username: "Guest", id: data.user.id });
    router.replace("/(wide)");
  }
  async function createAccount() {
    setError("");
    if (!isValidEmail(email)) {
      setError("Invalid email.");
      return;
    }
    if (!username || !password || !secondPassword) {
      setError("Missing required fields.");
      return;
    }
    if (password !== secondPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (username.length < 4) {
      setError("Username must be longer than 3 characters.");
      return;
    }
    //TODO: add password requirements
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error || !data || data.user == null) {
      setError("Signup failed. Please try again later, or contact support.");
      return;
    }
    const userId = data.user.id;
    const { error: accError } = await supabase
      .from("accounts")
      .insert({ username: username, id: userId });
    if (accError) {
      setError("Signup failed. Please try again later, or contact support.");
    }
    await AsyncStorage.setMany({ username: username, id: userId });
    router.replace("/(wide)");
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Image
          source={require("@/assets/images/hearth.svg")}
          style={styles.logo}
        />
        <Text style={styles.header}>Signup</Text>
      </View>

      <Text style={styles.error}>{error}</Text>
      <View style={styles.inputBox}>
        <Input placeholder="Username" toSet={setUsername} value={username} />
        {usernameState == 1 && (
          <Text style={styles.waitingUsername}>Checking...</Text>
        )}
        {usernameState == 2 && username !== "" && (
          <Text style={styles.failedUsername}>
            @{username} is not available.
          </Text>
        )}
        {usernameState == 3 && username !== "" && (
          <Text style={styles.availableUsername}>
            @{username} is available!
          </Text>
        )}
        <Input placeholder="Email" toSet={setEmail} value={email} />
        <Input
          placeholder="Password"
          toSet={setPassword}
          value={password}
          isSecure
        />
        <Input
          placeholder="Confirm password"
          toSet={setSecondPassword}
          value={secondPassword}
          isSecure
        />
        <Button text="Signup" type={1} onClick={createAccount} />
      </View>
      <View style={styles.or}>
        <Text style={styles.orText}>—OR—</Text>
        <View style={styles.orOptionsBox}>
          <Text
            onPress={() => {
              router.replace("/(wide)/(auth)/login");
            }}
            style={styles.orOptionText}
          >
            Login
          </Text>
          <Text style={styles.separator}></Text>
          <Text style={styles.orOptionText} onPress={continueAsGuest}>
            View as guest
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
  header: {
    fontFamily: "Rubik_400Regular",
    fontSize: 80,
    color: "#252525",
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
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  filler: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 400,
    height: 600,
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
    flex: 0.75,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },

  orOptionText: {
    fontFamily: "Rubik_400Regular",
    fontSize: 20,
    color: "#eb4300",
    textDecorationLine: "underline",
  },
  separator: {
    width: 300,
  },
  failedUsername: {
    fontFamily: "Rubik_400Regular",
    color: "red",
    textAlign: "center",
  },
  availableUsername: {
    fontFamily: "Rubik_400Regular",
    color: "green",
    textAlign: "center",
  },
  waitingUsername: {
    fontFamily: "Rubik_400Regular",
    color: "#252525",
    textAlign: "center",
  },
});
