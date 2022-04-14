import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { styles } from "./Reviews.styles";

export function Reviews(props) {
  const { idRestaurant } = props;
  const [reviews, setReviews] = useState(null);

  useState(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", idRestaurant),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  return (
    <View>
      <Text>Reviews</Text>
    </View>
  );
}
