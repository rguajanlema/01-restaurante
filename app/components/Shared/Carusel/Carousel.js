import React from "react";
import { Image } from "react-native-elements";
import CarouselSnap from "react-native-snap-carousel";
import { View } from "react-native";
import { styles } from "./Carusel.styles";

export function Carousel(props) {
  const { arrayImages, height, width } = props;
  const renderItem = ({ item }) => {
    return <Image style={{ width, height }} source={{ uri: item }} />;
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout={"default"}
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </View>
  );
}
