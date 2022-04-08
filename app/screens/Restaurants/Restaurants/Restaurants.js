import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";

import { db, screen } from "../../../utils";
import { styles } from "./Restaurants.styles";
import Loading from "../../../components/Loading";

export default function Restaurants(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants = 10;

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "restaurants").orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  });

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant);
  };

  return (
    <View style={styles.viewBody}>
      {!restaurants ? (
        <Loading isVisible={isVisible} text="Cargando" />
      ) : (
        <Text>Lista de restaurantes</Text>
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
