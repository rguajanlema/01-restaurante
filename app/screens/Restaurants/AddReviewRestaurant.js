import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddReviewRestaurant(props) {
  const { navigation, route } = props;
  const { idRestaurant } = route.params;
  console.log(props);
  return (
    <View>
      <Text>AddReviewRestaurant</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
