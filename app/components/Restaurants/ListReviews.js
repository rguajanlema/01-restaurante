import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { map } from "lodash";

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
import { screen } from "../../utils";

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
            navigation.navigate(screen.restaurant.addReviewRestaurant, {
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

      {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  );
}

function Review(props) {
  const { title, review, rating, createAt, avatarUser } = props.review;
  const createReview = new Date(createAt.seconds * 1000);

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.imagenAvatarUser}
          source={
            avatarUser
              ? { uri: avatarUser }
              : require("../../../assets/img/avatar-default.jpg")
          }
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {createReview.getDate()}/{createReview.getMonth() + 1}/
          {createReview.getFullYear()} - {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
      </View>
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
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  viewImageAvatar: {
    marginRight: 15,
  },
  imagenAvatarUser: {
    width: 50,
    height: 50,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "gray",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
