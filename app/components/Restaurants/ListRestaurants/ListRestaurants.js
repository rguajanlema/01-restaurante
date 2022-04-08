import React from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils";
import { styles } from "./ListRestaurants.styles";

export function ListRestaurants() {
  return (
    <View>
      <Text>ListRestaurants</Text>
    </View>
  );
}
