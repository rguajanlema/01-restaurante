import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { firebaseApp } from "../../utils/firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;

  const [restaurant, setRestaurant] = useState(null);

  navigation.setOptions({ title: name });

  useEffect(() => {
    getDoc(doc(db, "restaurants", id)).then((response) => {
      const data = response.data();
      data.id = response.id;
      setRestaurant(data);
    });
  }, []);

  return (
    <View>
      <Text>Restaurant info...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
