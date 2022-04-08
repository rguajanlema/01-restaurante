import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./ListRestaurants.styles";

export function ListRestaurants(props) {
  const { restaurants } = props;
  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          return <Text>Restaurants...</Text>;
        }}
      />
    </View>
  );
}
