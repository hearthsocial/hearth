import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import Octicons from "@expo/vector-icons/Octicons";
export default function Wide() {
  const [numNotifications,setNumNotifications] = useState(6)
  const [numCreatorAlerts,setNumCreatorAlerts] = useState<number|boolean>(false)
  const [numTags,setNumTags] = useState(6)
  const [numMessages,setNumMessages] = useState(6)
  const [numNewPosts,setNumNewPosts] = useState(6)
  const [clippdDone,setClippedDone] = useState(false)
  const [name,setName] = useState("")
  useEffect(()=>{
    const getData = async ()=>{
      let lname = await AsyncStorage.getItem("name")
      if(!lname){
        console.error("No local name detected.")
        lname = "Guest"
      }
      setName(lname)
    }
    getData()
  },[])
  return (
    <ScrollView
      contentContainerStyle={{
    flexGrow: 1,   
    justifyContent: "center",  
    alignItems: "center",
    width:"100%" 
  }}
    >
      
      <Text style={styles.header}>Welcome Back, <Text style={styles.bold}>{name}</Text></Text>
      <Text style={styles.while}>While you were gone...</Text>
     
      <View style={styles.boxView}>
        <View style={styles.box}>
          <Text style={styles.boxHeader}>{numNotifications}</Text>
          <Text style={styles.boxExplanation}>Notifications</Text>
          </View>
          <View style={styles.box}>
          <Text style={styles.boxHeader}>{numCreatorAlerts?numCreatorAlerts:"N/A"}</Text>
          <Text style={styles.boxExplanation}>Creator Alerts</Text>
          </View>
          <View style={styles.box}>
          <Text style={styles.boxHeader}>{numTags}</Text>
          <Text style={styles.boxExplanation}>New Tags</Text>
          </View>
          <View style={styles.box}>
          <Text style={styles.boxHeader}>{numMessages}</Text>
          <Text style={styles.boxExplanation}>New Messages</Text>
          </View>
          <View style={styles.box}>
          <Text style={styles.boxHeader}>{numNewPosts}</Text>
          <Text style={styles.boxExplanation}>New Posts</Text>
          </View>
          <View style={styles.box}>
          <Text style={styles.boxHeader}>{clippdDone?"Yes":"No"}</Text>
          <Text style={styles.boxExplanation}>{clippdDone?"Clippd has been done.":"Clippd has not been done."}</Text>
          </View>
      </View>
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
  },
  header:{
    fontFamily:"Rubik_400Regular",
    fontSize:35,
    
    justifyContent:"center"
  },
  headerBox:{
    
  },
  bold:{
    fontFamily:"Rubik_600SemiBold"
  },
  while:{
    fontSize:20,
    marginVertical:20
  },
  boxView:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    width:"100%"
  },
  box:{
    width:"27%",
    height:150,
    paddingTop:20,
    paddingLeft:20,
    borderRadius:20,
    borderWidth:2,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    margin:40,
    backgroundColor:"#f2ecdf",
   borderColor:"#717171"
  },
  boxHeader:{
    fontSize:40,
    fontFamily:"Rubik_600SemiBold",
    textAlign:"left",
  },
  boxExplanation:{
    fontSize:20,
    fontFamily:"Rubik_400Regular",
    textAlign:"left",
    width:"70%"
  }
  
});
