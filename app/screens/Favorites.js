import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image, Icon, Botton } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";
import { size } from "lodash";

import { firebaseApp } from "../utils/firebase";
import {
  collection,
  getDocs,
  doc,
  getFirestore,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function Favorites() {
  const [restaurants, setRestaurants] = useState(null);
  const [userLogged, setUserLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = auth.currentUser.uid;
        getDocs(
          query(collection(db, "favorites"), where("idUser", "==", idUser))
        ).then((response) => {
          const idRestaurantsArray = [];
          response.forEach((doc) => {
            idRestaurantsArray.push(doc.data().idRestaurant);
          });

          getDataRestaurant(idRestaurantsArray).then((response) => {
            const restaurants = [];
            response.forEach((info) => {
              const restaurant = info.data();
              restaurant.id = info.id;
              restaurants.push(restaurant);
            });
            setRestaurants(restaurants);
          });
        });
      }
    }, [userLogged]) //esto ejecuta cada vez que userLogged presente un cambio
  );

  const getDataRestaurant = (idRestaurantsArray) => {
    const arrayRestaurants = [];
    idRestaurantsArray.forEach((idRestaurant) => {
      const resul = getDoc(doc(db, "restaurants", idRestaurant));
      arrayRestaurants.push(resul);
    });
    return Promise.all(arrayRestaurants);
  };

  if (!restaurants) {
    return <Loading isVisible={true} text="Cargando..." />;
  } else if (size(restaurants) === 0) {
    return <NotFoundRestaurants />;
  }

  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
}

function NotFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes restaurantes en tu lista
      </Text>
    </View>
  );
}
