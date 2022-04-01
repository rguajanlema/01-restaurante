import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

import ListRestaurants from "../../components/Restaurants/ListRestaurants";
import { async } from "@firebase/util";

const auth = getAuth();
const db = getFirestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants = 10;

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    getDocs(collection(db, "restaurants")).then((snap) => {
      setTotalRestaurants(snap.size);
    });

    getAllCollection();
  }, []);

  const getAllCollection = async () => {
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
      startAfter(startRestaurants.data()),
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

  return (
    <View style={styles.viewBody}>
      <ListRestaurants restaurants={restaurants} />

      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
  },
});
