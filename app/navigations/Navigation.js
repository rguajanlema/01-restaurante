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

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
        })}
      >
        <Tab.Screen
          name="restaurantsstack"
          component={RestaurantsStack}
          options={{ title: "Restaurantes", headerShown: false }}
        />
        <Tab.Screen
          name="favoritesstack"
          component={FavoritesStack}
          options={{ title: "Favoritos", headerShown: false }}
        />
        <Tab.Screen
          name="top-restaurantsstack"
          component={TopRestaurantsStack}
          options={{ title: "Top 5", headerShown: false }}
        />
        <Tab.Screen
          name="searchstack"
          component={SearchStack}
          options={{ title: "Buscar", headerShown: false }}
        />
        <Tab.Screen
          name="accountstack"
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
    case "restaurantsstack":
      iconName = "compass-outline";
      break;
    case "favoritesstack":
      iconName = "heart-outline";
      break;
    case "top-restaurantsstack":
      iconName = "star-outline";
      break;
    case "searchstack":
      iconName = "magnify";
      break;
    case "accountstack":
      iconName = "home-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
