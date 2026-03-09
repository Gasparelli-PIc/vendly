import { View, Text } from "react-native";

export default function Dashboard() {
  return (
    <View style ={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>
      <Text style ={{fontSize: 20, fontWeight: "bold"}}>
        Dashboard
      </Text>
    </View>
  );
}