import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import { screen, db } from "../../../utils";
import { styles } from "./BtnReviewForm.styles";

export function BtnReviewForm(props) {
  const { idRestaurant } = props;
  const [hasLoagged, setHasLoagged] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLoagged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLoagged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshop) => {
        if (size(snapshop.docs) > 0) setHasReview(true);
      });
    }
  }, [hasLoagged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReviewRestaurant, {
      idRestaurant,
    });
  };

  if (hasLoagged && hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.textSendReview}>
          Ya has enviado un review a este restaurante
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLoagged ? (
        <Button
          title="Escribe una opinion"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Para escribir una opinion es necesario estar logeado{" "}
          <Text style={styles.textClick}>pulsar AQUI para iniciar sesion</Text>
        </Text>
      )}
    </View>
  );
}
