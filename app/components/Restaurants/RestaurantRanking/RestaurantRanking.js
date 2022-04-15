import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Rating, Icon } from "react-native-elements";
import { styles } from "./RestaurantRanking.styles";

export function RestaurantRanking(props) {
  const { restaurant, index } = props;

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";

    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };
  return (
    <TouchableOpacity onPress={() => console.log("Go to screen")}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>
          <Rating
            imageSize={15}
            readonly
            startingValue={restaurant.ratingMedia}
          />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
