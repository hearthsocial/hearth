import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { supabase } from "@/utils/supabase";
import isSignedIn from "@/utils/isSignedIn";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import * as SplashScreen from "expo-splash-screen";
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [fontsLoaded, error] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
  });
  useEffect(() => {
    const handleRedirect = async () => {
      const isWide = width >= 768;
      const targetRoot = isWide ? "(wide)" : "(mobile)";

      const signedIn = await isSignedIn();

      const currentRoot = segments[0];

      //@ts-ignore
      const isInAuth = segments.includes("(auth)");

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

  return <Stack screenOptions={{ headerShown: false }} />;
}
