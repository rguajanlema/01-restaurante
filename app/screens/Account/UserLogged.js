import React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default function UserLogged() {
  return (
    <View>
      <Text>UserLogged...</Text>
      <Button title="Cerrar sesión" onPress={() => signOut(auth)} />
    </View>
  );
}
