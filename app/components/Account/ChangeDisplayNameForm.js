import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre no puede estar vacio.");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual.");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };

      updateProfile(auth.currentUser, update)
        .then(() => {
          setIsLoading(false);
          setRealoadUserInfo(true);
          setShowModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={displayName || ""}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
