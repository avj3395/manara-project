import React from "react";
import { View, Text, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function NoConnection(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MaterialCommunityIcons name="wifi-off" size={50} color="black" />
      <Text>No Connection</Text>
      {/* <Button title="Reload page" onPress={props.onCheck} /> */}
    </View>
  );
}

export default NoConnection;
