import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserNotLogged } from "../components/Favorites";

export function Favorites() {
  const [hasLogged, setHasLogged] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (!hasLogged) return <UserNotLogged />;

  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
}
