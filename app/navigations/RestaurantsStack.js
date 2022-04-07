import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import Restaurants from "../screens/Restaurants/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant/AddRestaurant";
import Restaurant from "../screens/Restaurants/Restaurant";
import AddReviewRestaurant from "../screens/Restaurants/AddReviewRestaurant";

const Stack = createNativeStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={Restaurants}
        options={{ title: "Restaurante" }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurant}
        options={{ title: "Nuevo restaurante" }}
      />
      <Stack.Screen
        name={screen.restaurant.restaurant}
        component={Restaurant}
        options={{ title: "Restaurante" }}
      />
      <Stack.Screen
        name={screen.restaurant.addReviewRestaurant}
        component={AddReviewRestaurant}
        options={{ title: "Nuevo comentario" }}
      />
    </Stack.Navigator>
  );
}
