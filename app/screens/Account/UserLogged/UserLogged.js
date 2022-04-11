import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components";

//components
import { InfoUser, AccountOptions } from "../../../components/Account";
import { styles } from "./UserLogged.styles";

export function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  //se utiliza cuando el nombre del usuario cambiaria
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);
  const toastRef = useRef();

  //funcion auto ejecutable
  useEffect(() => {
    (async () => {
      const user = getAuth().currentUser;
      setUserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        />
      )}
      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setRealoadUserInfo={setRealoadUserInfo}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
