import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

import { firebaseApp } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore(firebaseApp);

export default function ListReviews(props) {
  const { navigation, idRestaurant } = props;
  const [userLogged, setUserLoged] = useState(false);
  const [reviews, setReviews] = useState([]);

  onAuthStateChanged(auth, (user) => {
    user ? setUserLoged(true) : setUserLoged(false);
  });

  useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const reviewsData = query(
      reviewsRef,
      where("idRestaurant", "==", idRestaurant)
    );
    getDocs(reviewsData).then((snapshot) => {
      const resultView = [];
      snapshot.forEach((response) => {
        const data = response.data();
        data.id = response.id;
        resultView.push(data);
      });
      setReviews(resultView);
    });
  }, []);

  return (
    <View>
      {userLogged ? (
        <Button
          title="Escribe una opinión"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleAddReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          onPress={() =>
            navigation.navigate("add-review-restaurant", {
              idRestaurant: idRestaurant,
            })
          }
        />
      ) : (
        <View>
          <Text
            style={{ textAlign: "center", color: "#00a680", padding: 20 }}
            onPress={() => navigation.navigate("login")}
          >
            Para escribir un comentario es necesario esta logeado{" "}
            <Text style={{ fontWeight: "bold" }}>
              pulsa AQUI para iniciar seseión
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#00a680",
  },
});
