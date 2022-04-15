import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ranking } from "../screens/Ranking";
import { screen } from "../utils";

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={Ranking}
        options={{ title: "Ranking" }}
      />
    </Stack.Navigator>
  );
}
