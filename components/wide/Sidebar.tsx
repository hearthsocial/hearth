import { View, Pressable, Text, StyleSheet } from "react-native";
import { useRouter, useSegments } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
export default function Sidebar() {
  const router = useRouter();
  const segments = useSegments();
  function isActiveTab(tab: string) {
    if (tab == "home") {
      return segments.length <= 1 || segments[1] == undefined;
    }
    return segments[1] == tab;
  }
  return (
    <View
      style={{
        width: 300,
        padding: 20,
        borderRightWidth: 1,
        borderColor: "#717171",
        backgroundColor: "#f2ecdf",
        paddingLeft: 30,
        justifyContent:"center",
        marginRight: 20,
        flexDirection: "column",
        rowGap: 20,
      }}
    >
    
      <Pressable onPress={() => router.push("/(wide)")} style={styles.screens}>
        {isActiveTab("home") && <View style={styles.activeIndicator}></View>}
        <Octicons name="home" size={28} color={isActiveTab("home")?"black":"#717171"}  />
        <Text style={[styles.text,{color:isActiveTab("home")?"black":"#717171"}]}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/images")}
        style={styles.screens}
      >
        {isActiveTab("images") && <View style={styles.activeIndicator}></View>}
        <Octicons name="image" size={28} color={isActiveTab("images")?"black":"#717171"}  />
        <Text style={[styles.text,{color:isActiveTab("images")?"black":"#717171"}]}>Images</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/videos")}
        style={styles.screens}
      >
        {isActiveTab("videos") && <View style={styles.activeIndicator}></View>}
        <Octicons name="device-camera-video" size={28} color={isActiveTab("videos")?"black":"#717171"}  />
        <Text style={[styles.text,{color:isActiveTab("videos")?"black":"#717171"}]}>Video</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/text")}
        style={styles.screens}
      >
        {isActiveTab("text") && <View style={styles.activeIndicator}></View>}
        <Octicons name="pencil" size={28} color={isActiveTab("text")?"black":"#717171"} />
        <Text style={[styles.text,{color:isActiveTab("text")?"black":"#717171"}]}>Text</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/clippd")}
        style={styles.screens}
      >
        {isActiveTab("clippd") && (
          <View style={styles.activeIndicator}></View>
        )}
        <Octicons name="device-camera" size={28} color={isActiveTab("clippd")?"black":"#717171"}  />
        <Text style={[styles.text,{color:isActiveTab("clipped")?"black":"#717171"}]}>Clippd</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/doorstep")}
        style={styles.screens}
      >
        {isActiveTab("doorstep") && (
          <View style={styles.activeIndicator}></View>
        )}
        <Octicons name="sign-in" size={28} color={isActiveTab("doorstep")?"black":"#717171"}  />
        <Text style={[styles.text,{color:isActiveTab("doorstep")?"black":"#717171"}]}>Doorstep</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/(wide)/create")}
        style={styles.screens}
      >
        {isActiveTab("create") && (
          <View style={styles.activeIndicator}></View>
        )}
        <Octicons name="plus" size={28} color={isActiveTab("create")?"black":"#717171"}  />
        <Text style={[styles.text,{color:isActiveTab("create")?"black":"#717171"}]}>Create</Text>
      </Pressable>
      
      </View>
    
  );
}
const styles = StyleSheet.create({
  screens: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    width: "100%",
    paddingVertical: 2,
  },
  text: {
    fontFamily: "Rubik_400Regular",
    fontSize: 20,
    textAlign: "left",
  },
  activeIndicator: {
    position: "absolute",
    left: -15,
    height: 28,
    width: 5,
    backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
