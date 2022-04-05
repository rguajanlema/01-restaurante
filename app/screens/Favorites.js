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
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import {
  collection,
  getDocs,
  doc,
  getFirestore,
  query,
  where,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
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

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (restaurants?.length === 0) {
    return <NotFoundRestaurants />;
  }

  return (
    <View style={styles.viewBody}>
      {restaurants ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes</Text>
        </View>
      )}
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

function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta seccion
      </Text>
      <Button
        title="Ir al login"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
        onPress={() => navigation.navigate("account", { screen: "login" })}
      />
    </View>
  );
}

function Restaurant(props) {
  const { restaurant } = props;
  const { id, name, images } = restaurant.item;

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar Restaurante de Favoritos",
      "Estas seguro de que quieres eliminar el restaurante de favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: removeFavorite,
        },
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    const favoriteRef = collection(db, "favorites");

    getDocs(
      query(
        favoriteRef,
        where("idRestaurant", "==", id),
        where("idUser", "==", auth.currentUser.uid)
      )
    ).then((querySnapshot) => {
      querySnapshot.forEach((response) => {
        const idFavorite = response.id;

        deleteDoc(doc(db, "favorites", idFavorite))
          .then(() => {
            console.log("Eliminado");
          })
          .catch(() => {
            console.log("ERROR");
          });
      });
    });
  };

  return (
    <View style={styles.restaurant}>
      <TouchableOpacity onPress={() => console.log("hola")}>
        <Image
          resizeMode="cover"
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../assets/img/no-image.png")
          }
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            onPress={confirmRemoveFavorite}
            underlayColor="transparent"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
  },
  restaurant: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
  },
  favorite: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
  },
});
