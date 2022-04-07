import React, { useState, useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
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
import { map, size } from "lodash";

import Loading from "../components/Loading";

const db = getFirestore(firebaseApp);

export default function Search(props) {
  const { navigation } = props;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  //console.log(searchResults.data());

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

  const goToRestaurant = (idRestaurant) => {
    console.log(idRestaurant);
  };

  return (
    <>
      <SearchBar
        placeholder="Busca tu restaurante..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      {!searchResults && <Loading show text="Cargando" />}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <NotFoundRestaurants />
        ) : (
          map(searchResults, (item) => {
            const data = item.data();
            console.log(data);
            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToRestaurant(data.id)}
              >
                <Avatar
                  source={
                    data.images[0]
                      ? { uri: data.images[0] }
                      : require("../../assets/img/no-image.png")
                  }
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
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
