import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Account } from "../screens/Account/Account";
import { Login } from "../screens/Account/Login";
import { Register } from "../screens/Account/Register";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.account}
        component={Account}
        options={{ title: "Mi cuenta" }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={Login}
        options={{ title: "Iniciar sesion" }}
      />
      <Stack.Screen
        name={screen.account.register}
        component={Register}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
}
