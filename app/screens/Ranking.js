import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";

import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { map, size } from "lodash";
import { db } from "../utils";
import { RestaurantRanking } from "../components/Restaurants";

export function Ranking() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(5)
    );

    onSnapshot(q, async (snapshot) => {
      let restaurantArray = [];
      for await (const item of snapshot.docs) {
        restaurantArray.push(item.data());
      }
      setRestaurants(restaurantArray);
    });
  }, []);

  return (
    <View>
      {map(restaurants, (restaurant, index) => (
        <RestaurantRanking restaurant={restaurant} index={index} />
      ))}
    </View>
  );
}
