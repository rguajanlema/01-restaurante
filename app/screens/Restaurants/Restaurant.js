import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Rating } from "react-native-elements";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";

import { firebaseApp } from "../../utils/firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);

  navigation.setOptions({ title: name });

  useEffect(() => {
    getDoc(doc(db, "restaurants", id)).then((response) => {
      const data = response.data();
      data.id = response.id;
      setRestaurant(data);
      setRating(data.rating);
    });
  }, []);

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <Carousel
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
});
