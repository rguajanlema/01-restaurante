import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import LisTopRestaurants from "../components/Ranking/LisTopRestaurants";

import {
  collection,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { size } from "lodash";
import { db } from "../utils";

export default function TopRestaurants() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(5)
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  return (
    <View>
      <LisTopRestaurants />
    </View>
  );
}
