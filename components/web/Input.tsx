import { DimensionValue, TextInput } from "react-native";

type Props = {
  placeholder: string;
  toSet: any;
  value: any;
  isSecure?: boolean;
  width?:DimensionValue;
  height?:DimensionValue
};
export default function Input({ placeholder, toSet, value, isSecure, width,height}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={toSet}
      value={value}
      style={{
        borderColor: "gray",
        borderWidth: 1,
        textAlign: "center",
        fontFamily: "Rubik_400Regular",
        color: "#252525",
        borderRadius: 30,
        width: width?width:"50%",
        height: height?height:50,
        fontSize: 20,
        gap:15
      }}
      secureTextEntry={isSecure ? true : false}
    />
  );
}
