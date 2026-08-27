import { useWindowDimensions } from "react-native";

export default function getWidth(){
    const { width } = useWindowDimensions();
    return width;
}