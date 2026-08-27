import Octicons from "@expo/vector-icons/Octicons"
import { Pressable, StyleSheet, View, Text } from "react-native"
import { ComponentProps } from "react"
import getWidth from "@/utils/getWidth"
type OcticonNameType = ComponentProps<typeof Octicons>['name']
type Props = {
    icon:OcticonNameType,
    header:number,
    explanation:string,
    undertext:string
}
export default function HomeCard({icon,header,explanation,undertext}:Props){
    const width = getWidth()
    return(
    <Pressable style={styles.box}>
          <View style={styles.iconContainer}>
           <Octicons
          name={icon}
          size={28}
          color={"black"}
          style={styles.icon}
        />
        </View>
          <Text style={styles.boxHeader}>{header}</Text>
          <Text style={styles.boxExplanation}>{explanation}</Text>
          {width>=1425&&(<Text style={styles.undertext}>{undertext}</Text>)}
        </Pressable>)
}
const styles = StyleSheet.create({
box: {
    width: "25%",
    height: 150,
    paddingTop: 20,
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent:"flex-start",
    margin: 40,
    backgroundColor: "#f2ecdf",
    borderColor: "#717171",
  },
  boxHeader: {
    fontSize: 40,
    fontFamily: "Rubik_600SemiBold",
    textAlign: "left",
  },
  boxExplanation: {
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
    textAlign: "left",
    width: "70%",
  },
  icon:{
    opacity:0.85,
  },
  iconContainer:{
    position:"absolute",
    top:16,
    right:16
  },
  undertext:{
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
    color:"#717171",
    position:"relative",
    top:10,
    
  }
})