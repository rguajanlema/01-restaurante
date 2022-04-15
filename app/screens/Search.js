import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";

import {
  getFirestore,
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { map, size } from "lodash";
import { Loading } from "../components/Shared";
import { db } from "../utils";

export function Search() {
  const [searchText, setSerachText] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })();
  }),
    [searchText];

  return (
    <>
      <SearchBar
        placeholder="Busca tu respuesta"
        value={searchText}
        onChangeText={(text) => setSerachText(text)}
      />

      {!searchResults && <Loading show text="Cargando" />}
    </>
  );
}

function NotFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}
