import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import LisTopRestaurants from "../components/Ranking/LisTopRestaurants";

import { firebaseApp } from "../utils/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default function TopRestaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const toastRef = useRef();
  console.log(restaurants);
  useEffect(() => {
    const firstQuery = query(
      collection(db, "restaurants"),
      orderBy("createAt", "desc"),
      limit(5)
    );
    getDocs(firstQuery).then((response) => {
      const restauranArray = [];
      response.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        restauranArray.push(data);
      });
      setRestaurants(restauranArray);
    });
  }, []);

  return (
    <View>
      <LisTopRestaurants restaurants={restaurants} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
