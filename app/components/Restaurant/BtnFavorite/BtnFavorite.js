import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { v4 as uuidv4 } from "uuid";
import { styles } from "./BtnFavorite.styles";
import { async } from "@firebase/util";

export function BtnFavorite(props) {
  const { idRestaurant } = props;
  const auth = getAuth();

  const addFavorite = async () => {
    try {
      const idFavorite = uuidv4();
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: auth.currentUser.uid,
      };

      await setDoc(doc(db, "favorites", idFavorite), data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="heart-outline"
        color="#000"
        size={35}
        onPress={addFavorite}
      />
    </View>
  );
}
