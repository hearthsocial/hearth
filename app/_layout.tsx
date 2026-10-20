import { RelativePathString, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, useWindowDimensions, View, Text, StyleSheet} from "react-native";
import { supabase } from "@/utils/supabase";
import isSignedIn from "@/utils/isSignedIn";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
  Rubik_500Medium,
} from "@expo-google-fonts/rubik";
import * as SplashScreen from "expo-splash-screen";
import Octicons from "@expo/vector-icons/Octicons";
import setUserData from "@/utils/setUserData";
import storage from "@/utils/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileOption from "@/components/wide/ProfileOption";
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { width } = useWindowDimensions();
  //@ts-ignore
  const isInAuth = segments.includes("(auth)");
  const [loading, setLoading] = useState(true);
  const [profileTabOpen,setTabOpen] = useState(false)
  const [fontsLoaded, error] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
    Rubik_500Medium,
  });

  const [pfp, setPfp] = useState<string | undefined>("noprofile.jpg");
  useEffect(() => {
    const isWide = width >= 768;
    const handleRedirect = async () => {
      const targetRoot = isWide ? "(wide)" : "(mobile)";

      const signedIn = await isSignedIn();
    
      const currentRoot = segments[0];

      let targetPath = `/${targetRoot}`;

      if (!signedIn) {
        targetPath = `/${targetRoot}/(auth)/login`;
      } else {
        await setUserData();
      const pfplocal = await storage.getString("pfp");
      setPfp(pfplocal);
      }
      const alreadyInCorrectRoot = currentRoot === targetRoot;

      if (!alreadyInCorrectRoot) {
        //@ts-ignore
        router.replace(targetPath);
      } else {
        // If root is correct but auth state is wrong, fix it
        if (!signedIn && !isInAuth) {
          //@ts-ignore
          router.replace(targetPath);
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
          <View>
          <Pressable style={{ borderRadius: 60, width: 40, marginLeft: 20 }} onPress={()=>profileTabOpen?router.replace("/(wide)/(profile)/profile"):setTabOpen(true)}>
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
          {profileTabOpen&&(
            <View style={{backgroundColor:"#f2f2f2",width:200,height:400,position:"absolute",marginTop:50,marginLeft:5,borderRadius:20,borderWidth:1, borderColor:"#717171",boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.18)',gap:20,}}>
              <ProfileOption name={"Profile"} icon={"person"}redirectTo={"/(wide)/(profile)/profile"} isFirst/>
              <ProfileOption name={"Settings"} icon={"gear"}redirectTo={"/(wide)/(profile)/profile"}/>
              <ProfileOption name={"Customize"} icon={"paintbrush"}redirectTo={"/(wide)/(profile)/profile"}/>
              <ProfileOption name={"Get Blaze"} icon={"flame"}redirectTo={"/(wide)/(profile)/profile"} isBold/>
              <ProfileOption name={"Log out"} icon={"sign-out"}redirectTo={"/(wide)/(profile)/profile"} isPowerful/>
          </View>)}
          </View>
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

