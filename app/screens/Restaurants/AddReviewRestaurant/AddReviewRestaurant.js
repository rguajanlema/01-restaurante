import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import { styles } from "./AddReviewRestaurant.styles";

export function AddReviewRestaurant(props) {
  console.log(props);

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesimo",
              "Deficiente",
              "Normal",
              "Muy bueno",
              "Excelente",
            ]}
            defaultRating={0}
            size={35}
            onFinishRating={(rating) => console.log(rating)}
          />
        </View>
        <View>
          <Input placeholder="Titulo" />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
    </View>
  );
}
