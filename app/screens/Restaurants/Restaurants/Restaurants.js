import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { db, screen } from "../../../utils";
import { styles } from "./Restaurants.styles";
import { ListRestaurants } from "../../../components/Restaurants";

export default function Restaurants(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant);
  };

  return (
    <View style={styles.viewBody}>
      {!restaurants ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
