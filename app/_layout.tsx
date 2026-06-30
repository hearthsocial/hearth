import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, useWindowDimensions } from "react-native";
import { supabase } from "@/utils/supabase";
import isSignedIn from "@/utils/isSignedIn";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
  Rubik_500Medium,
} from "@expo-google-fonts/rubik";
import * as SplashScreen from "expo-splash-screen";
import setUserData from "@/utils/setUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { width } = useWindowDimensions();
  //@ts-ignore
  const isInAuth = segments.includes("(auth)");
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, error] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
    Rubik_500Medium,
  });

  const [pfp, setPfp] = useState<string | null>("noprofile.jpg");
  useEffect(() => {
    const isWide = width >= 768;
    const handleRedirect = async () => {
      const targetRoot = isWide ? "(wide)" : "(mobile)";

      const signedIn = await isSignedIn();
      await setUserData();
      const pfplocal = await AsyncStorage.getItem("pfp");
      setPfp(pfplocal);
      const currentRoot = segments[0];

      let targetPath = "";

      if (!signedIn) {
        targetPath = `/${targetRoot}/(auth)/login`;
      } else {
        targetPath = `/${targetRoot}`;
      }
      const alreadyInCorrectRoot = currentRoot === targetRoot;

      if (!alreadyInCorrectRoot) {
        //@ts-ignore
        router.replace(targetPath);
      } else {
        // If root is correct but auth state is wrong, fix it
        if (!signedIn && !isInAuth) {
          //@ts-ignore
          router.replace(`/${targetRoot}/(auth)/login`);
        }

        if (signedIn && isInAuth) {
          router.replace(`/${targetRoot}`);
        }
      }

      setLoading(false);
    };

    handleRedirect();
  }, [width, segments]);

  if (loading || !fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f2ecdf" },
        headerTitle: "",
        headerShown: !isInAuth,
        headerLeft: () => (
          <Pressable style={{ borderRadius: 60, width: 40, marginLeft: 20 }}>
            <Image
              source={{
                uri: `https://irluagoptkeyvfwoqtto.supabase.co/storage/v1/object/public/pfp/${pfp}`,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#eb6a02",
              }}
            ></Image>
          </Pressable>
        ),
        headerRight: () => (
          <Pressable style={{ padding: 10, borderRadius: 12, marginRight: 20 }}>
            <Ionicons name="notifications" size={24} color="black" />
          </Pressable>
        ),
      }}
    />
  );
}
