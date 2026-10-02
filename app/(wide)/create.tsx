import Button from "@/components/wide/Button";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import getWidth from "@/utils/getWidth";
import { supabase } from "@/utils/supabase";
import storage from "@/utils/storage";
import { useRouter } from "expo-router";
import Tooltip from "react-native-walkthrough-tooltip"
export default function WideCreate() {
    const width = getWidth()
    const [selected,setSelected] = useState(1)
    const [noteText,setNoteText] = useState("")
    const [tags,setTags] = useState([])
    const [isPublic, setPublic] = useState(true)
    const postNote = async function(){
        const id = storage.getString("id")
        await supabase.from("posts").insert({postedby:id,text:noteText,tags:tags,type:1,public:isPublic}) 
    }
    return (
    <View style={styles.container}>
        <Text style={styles.header}>Post a...</Text>
        <View style={styles.createBox}>
        <View style={styles.choiceBar}>
            
            <Pressable style={selected==1?styles.selected:styles.choiceBox} onPress={(()=>{setSelected(1)})}>
                <Text style={selected==1?styles.selectedText:styles.choiceText}>Note</Text>
            </Pressable>
            <Pressable style={selected==2?styles.selected:styles.choiceBox} onPress={(()=>{setSelected(2)})}>
                <Text style={selected==2?styles.selectedText:styles.choiceText}>Shot</Text>
            </Pressable>
            <Pressable style={selected==3?styles.selected:styles.lastChoiceBox} onPress={(()=>{setSelected(3)})}>
                <Text style={selected==3?styles.selectedText:styles.choiceText}>Clip</Text>
            </Pressable>
        </View>
        {selected==1&&(
            <View style={styles.notesContainer}>
        <View style={styles.notesLookAlike}>
        <TextInput placeholder="Speak to the world..." style={styles.notes} multiline={true} value={noteText} onChangeText={setNoteText}/>
        <Pressable style={styles.notesPost} onPress={()=>postNote()}><Text>Post</Text></Pressable>
        </View>
        </View>
    )}{selected==2&&(
            <Text style={styles.comingSoon}>Coming soon...</Text>
    )}{selected==3&&(
            <Text style={styles.comingSoon}>Coming soon...</Text>
    )}
        <Pressable style={styles.momentButton}>
            <Octicons color={"white"} name="sparkles-fill" size={width>=1225?30:60}/>
            {width>=1225&&(<Text style={styles.momentText}>Make it a <Text style={styles.bold}>Moment</Text></Text>)}
        </Pressable>
       
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    header:{
        fontFamily:"Rubik_500Medium",
        fontSize:40
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        gap:20
    },
    createBox:{
        width:"75%",
        height:"75%",
        backgroundColor:"#f2ecdf",
        borderRadius:40,
        overflow:'hidden'
    },
    choiceBar:{
        width:"100%",
        height:'10%',
        
        flexDirection:"row",
        alignItems:"center",
        borderBottomWidth:2
    },
    choiceBox:{
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth:2,
        height:"100%"
    },
    lastChoiceBox:{
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        height:"100%"
    },
    choiceText:{
    fontFamily: "Rubik_400Regular"
    },
    selected:{
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth:2,
        height:"100%",
        backgroundColor:"black"
    },
    selectedText:{
        fontFamily: "Rubik_400Regular",
        color:'white'
    },
    momentButton:{
        position:"absolute",
    
        backgroundColor:'black',
        height:90,
        bottom:32,
        right:32,
        borderRadius:45,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:10,
    },
    momentText:{
        fontFamily: "Rubik_400Regular",
    color: "white",
    fontSize: 16,
    textAlign:"right",
    padding:"7%"
    },
    bold:{
        fontFamily:"Rubik_500Medium",
        fontStyle:'italic'
    },
    notesContainer:{
        flex:1,
        alignItems:"center"
    },
    notes:{
       fontFamily:"Rubik_400Regular",
       width:"100%",
       padding:10,
       borderRadius:20,
       height:200,
       textAlign:"left",
       verticalAlign:"top",
       outlineStyle: 'none' as any,
    },
    notesLookAlike:{
        fontFamily:"Rubik_400Regular",
       width:500,
       margin:20,
       borderWidth:2,
       borderRadius:20,
       height:200,
       textAlign:"left",
       verticalAlign:"top"
    },
    notesPost:{
        position:"absolute",
        right:10,
        bottom:10,
        
        padding:10,
        borderRadius:30,
        color:"white",
        backgroundColor:"#eb6a02",
    },
    comingSoon:{
        fontFamily:"Rubik_400Regular",
        textAlign:"center",
        margin:50,
        fontSize:20
    }
})