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
} from "firebase/firestore";

import ListRestaurants from "../../../components/Restaurants/ListRestaurants";
import { db, screen } from "../../../utils";
import { styles } from "./Restaurants.styles";

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

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    getDocs(collection(db, "restaurants")).then((snap) => {
      setTotalRestaurants(snap.size);
    });

    const resultRestaurants = [];

    const firstQuery = query(
      collection(db, "restaurants"),
      orderBy("createAt", "desc"),
      limit(limitRestaurants)
    );

    const response = await getDocs(firstQuery);

    setStartRestaurants(response.docs[response.docs.length - 1]);

    response.forEach((doc) => {
      const restaurant = doc.data();
      restaurant.id = doc.id;
      resultRestaurants.push(restaurant);
    });

    setRestaurants(resultRestaurants);
  };

  const handleLoadMore = async () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    const firstQuery = query(
      collection(db, "restaurants"),
      orderBy("createAt", "desc"),
      startAfter(startRestaurants.data().createAt),
      limit(limitRestaurants)
    );

    const response = await getDocs(firstQuery);

    if (response.docs.length > 0) {
      setStartRestaurants(response.docs[response.docs.length - 1]);
    } else {
      setIsLoading(false);
    }

    response.forEach((doc) => {
      const restaurant = doc.data();
      restaurant.id = doc.id;
      resultRestaurants.push(restaurant);
    });

    setRestaurants([...restaurants, ...resultRestaurants]);
  };
  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant);
  };

  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />

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
