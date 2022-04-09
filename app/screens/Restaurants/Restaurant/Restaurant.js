import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Restaurant.styles";

export default function Restaurant(props) {
  const { route } = props;
  console.log(route.params);
  return (
    <View>
      <Text>Restaurant</Text>
    </View>
  );
}
