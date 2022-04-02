import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
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

  navigation.setOptions({ title: name });

  useEffect(() => {
    getDoc(doc(db, "restaurants", id)).then((response) => {
      const data = response.data();
      data.id = response.id;
      setRestaurant(data);
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
