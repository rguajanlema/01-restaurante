import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
//compones
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

const auth = getAuth();

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Text>Cargando...</Text>;

  return login ? <UserLogged /> : <UserGuest />;
}
