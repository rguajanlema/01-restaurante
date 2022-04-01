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
} from "firebase/firestore";

import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const auth = getAuth();
const db = getFirestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
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
      orderBy("createAt"),
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
