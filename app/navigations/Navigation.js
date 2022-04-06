import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

//components
import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

import { screen } from "../utils";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurantsstack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
        })}
      >
        <Tab.Screen
          name={screen.restaurant.tab}
          component={RestaurantsStack}
          options={{ title: "Restaurantes", headerShown: false }}
        />
        <Tab.Screen
          name={screen.favorites.tab}
          component={FavoritesStack}
          options={{ title: "Favoritos", headerShown: false }}
        />
        <Tab.Screen
          name={screen.ranking.tab}
          component={TopRestaurantsStack}
          options={{ title: "Ranking", headerShown: false }}
        />
        <Tab.Screen
          name={screen.search.tab}
          component={SearchStack}
          options={{ title: "Buscar", headerShown: false }}
        />
        <Tab.Screen
          name={screen.account.tab}
          component={AccountStack}
          options={{ title: "Cuenta", headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case screen.restaurant.tab:
      iconName = "compass-outline";
      break;
    case screen.favorites.tab:
      iconName = "heart-outline";
      break;
    case screen.ranking.tab:
      iconName = "star-outline";
      break;
    case screen.search.tab:
      iconName = "magnify";
      break;
    case screen.account.tab:
      iconName = "home-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
