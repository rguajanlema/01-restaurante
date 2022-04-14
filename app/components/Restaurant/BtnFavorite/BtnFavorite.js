import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./BtnFavorite.styles";

export function BtnFavorite(props) {
  const { idRestaurant } = props;

  const addFavorite = () => {
    console.log("Andadir a favoritos");
  };
  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="heart-outline"
        color="#000"
        size={35}
        onPress={addFavorite}
      />
    </View>
  );
}
