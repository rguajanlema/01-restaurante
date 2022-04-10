import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//compones
import { LoadingModal } from "../../../components";
import { UserGuest } from "../UserGuest/UserGuest";
import { UserLogged } from "../UserLogged";

export function Account() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (hasLogged === null) return <LoadingModal show text="Cargando..." />;

  return hasLogged ? <UserLogged /> : <UserGuest />;
}
