import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../utils";
import {
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
  const navigation = useNavigation();

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
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: idRestaurant,
      },
    });
  };
  return (
    <>
      <SearchBar
        placeholder="Busca tu respuesta"
        value={searchText}
        onChangeText={(text) => setSerachText(text)}
      />

      {!searchResults && <Loading show text="Cargando" />}
      <ScrollView>
        {size(searchResults) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            const data = item.data();

            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToRestaurant(data.id)}
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
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
