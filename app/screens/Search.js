import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import firebaseApp from "../utils/firebase";
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
import { size } from "lodash";
import Loading from "../components/Loading";

const db = getFirestore(firebaseApp);

export default function Search(props) {
  const { navigation } = props;
  const [searchText, setSearchText] = useState("");
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
  }, [searchText]);

  return (
    <View>
      <SearchBar
        placeholder="Busca tu restaurante..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        containerStyle={styles.searchBar}
      />
      {size(searchResults) === 0 ? (
        <NotFoundRestaurants />
      ) : (
        <View>
          <Text>Resultado..</Text>
        </View>
      )}
    </View>
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

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
