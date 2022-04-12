import React, { useState } from "react";
import { Image } from "react-native-elements";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { View } from "react-native";
import { size } from "lodash";
import { styles } from "./Carusel.styles";

export function Carousel(props) {
  const { arrayImages, height, width, hideDots } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => {
    return <Image style={{ width, height }} source={{ uri: item }} />;
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout={"default"}
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
