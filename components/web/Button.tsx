import { Pressable, Text } from "react-native";

type Props = {
text:string
type:1|2|3
onClick:Function

}
export default function Button({text,type,onClick}:Props) {
  let color;
  switch(type){
  case 1:
  color = "#eb6a02"
  break;
  case 2:
  color=""
  break;
  case 3:
    color=""
    break;
  }
  return (
    <Pressable
      onPress={() => onClick()}
      style={{ width:"50%",backgroundColor:color, borderRadius:30}}
    >
      <Text style={{fontFamily: "Rubik_400Regular",padding:20,textAlign:"center",fontSize:20}}>{text}</Text>
    </Pressable>
  );
}
