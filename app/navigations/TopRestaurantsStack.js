import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurants from "../screens/TopRestaurants";
import { screen } from "../utils";

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={TopRestaurants}
        options={{ title: "Top 5" }}
      />
    </Stack.Navigator>
  );
}
