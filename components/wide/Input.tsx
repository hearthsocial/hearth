import { DimensionValue, TextInput } from "react-native";

type Props = {
  placeholder: string;
  toSet: any;
  value: any;
  isSecure?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  isEmail?: boolean;
  noCap?: boolean;
};
export default function Input({
  placeholder,
  toSet,
  value,
  isSecure,
  width,
  height,
  isEmail,
  noCap,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={toSet}
      value={value}
      placeholderTextColor={"#252525"}
      secureTextEntry={isSecure ? true : false}
      autoCapitalize={isEmail||noCap?"none":undefined}
      keyboardType={isEmail?"email-address":undefined}
      autoComplete={isEmail?"email":undefined}
      textContentType={isEmail?"emailAddress":isSecure?"password":undefined}
      style={{
        borderColor: "gray",
        borderWidth: 1,
        textAlign: "center",
        fontFamily: "Rubik_400Regular",
        color: "#252525",
        borderRadius: 30,
        width: width ? width : "50%",
        height: height ? height : 50,
        fontSize: 20,
      }}
    />
  );
}
