import React from "react";
import { View, Dimensions } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageRestaurant.styles";

const widthScreen = Dimensions.get("window").width;

export function ImageRestaurant(props) {
  const { formik } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          formik.values.images[0]
            ? { uri: formik.values.images[0] }
            : require("../../../../../assets/img/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}
