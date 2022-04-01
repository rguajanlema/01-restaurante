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

const auth = getAuth();
const db = getFirestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const limiteRestaurants = 10;
  console.log(totalRestaurants);

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    getDocs(collection(db, "restaurants")).then((snap) => {
      setTotalRestaurants(snap.size);
    });

    const resultRestaurants = [];

    getDocs(collection(db, "restaurants")).then((response) => {
      /*query(
        response,
        orderBy("createAt", "desc"),
        limit(totalRestaurants)
      ).then((info) => {
        console.log(info.doc);
      });*/
      console.log(response.docs);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Restaurants...</Text>

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
