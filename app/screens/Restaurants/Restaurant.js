import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { map } from "lodash";
import Toast from "react-native-easy-toast";
import { Rating, ListItem, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import ListReviews from "../../components/Restaurants/ListReviews";

import { firebaseApp } from "../../utils/firebase";
import {
  getFirestore,
  getDoc,
  getDocs,
  query,
  doc,
  deleteDoc,
  collection,
  addDoc,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;
const auth = getAuth(firebaseApp);

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  navigation.setOptions({ title: name });

  onAuthStateChanged(auth, (user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      getDoc(doc(db, "restaurants", id)).then((response) => {
        const data = response.data();
        data.id = response.id;
        setRestaurant(data);
        setRating(data.rating);
      });
    }, [])
  );

  useEffect(() => {
    if (userLogged && restaurant) {
      getDocs(
        query(
          collection(db, "favorites"),
          where("idRestaurant", "==", restaurant.id),
          where("idUser", "==", auth.currentUser.uid)
        )
      ).then((response) => {
        if (response.docs.length === 1) {
          setIsFavorite(true);
        }
      });
    }
  }, [userLogged, restaurant]);

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos tienes que estar logeado"
      );
    } else {
      const paylod = {
        idUser: auth.currentUser.uid,
        idRestaurant: restaurant.id,
      };
      addDoc(collection(db, "favorites"), paylod)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Restaurante añadido a favoritos");
        })
        .catch(() => {
          toastRef.current.show("Error al añadir el restaurante a favoritos");
        });
    }
  };

  const removeFavorite = () => {
    const favoriteRef = collection(db, "favorites");

    getDocs(
      query(
        favoriteRef,
        where("idRestaurant", "==", restaurant.id),
        where("idUser", "==", auth.currentUser.uid)
      )
    ).then((querySnapshot) => {
      querySnapshot.forEach((response) => {
        const idFavorite = response.id;

        deleteDoc(doc(db, "favorites", idFavorite))
          .then(() => {
            setIsFavorite(false);
            toastRef.current.show("Restaurante eliminado de favoritos");
          })
          .catch(() => {
            toastRef.current.show(
              "Error al eliminar el restaurante de favoritos"
            );
          });
      });
    });
  };

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name="heart"
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReviews navigation={navigation} idRestaurant={restaurant.id} />
      <Toast ref={toastRef} position="center" opocity={0.9} />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

function RestaurantInfo(props) {
  const { location, name, address } = props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: "111 222 333",
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: "roberto@desing.com",
      iconName: "at",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Informacion sobre el restaurante
      </Text>

      {map(listInfo, (item, index) => (
        <ListItem key={index} buttomDivider>
          <Icon name={item.iconName} type={item.iconType} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#b8b8b8",
    borderBottomWidth: 1,
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
});
