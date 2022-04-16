import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import { db } from "../utils";
import { Loading } from "../components/Shared";
import {
  UserNotLogged,
  NotFoundRestaurants,
  RestaurantFavorite,
} from "../components/Favorites";

export function Favorites() {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, [hasLogged]);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, async (snapshot) => {
        let restaurantArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "restaurants", data.idRestaurant);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;

          restaurantArray.push(newData);
        }
        setRestaurants(restaurantArray);
      });
    }
  }, [hasLogged]);

  if (!hasLogged) return <UserNotLogged />;

  if (!restaurants) return <Loading show text="Cargando" />;

  if (size(restaurants) === 0) return <NotFoundRestaurants />;

  return (
    <ScrollView>
      {map(restaurants, (restaurant) => (
        <RestaurantFavorite key={restaurant.id} restaurant={restaurant} />
      ))}
    </ScrollView>
  );
}
