import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import firebaseApp from "../../../utils/firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { styles } from "./InfoUser.styles";

const firestore = getFirestore(firebaseApp);

export default function InfoUser(props) {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const changeAvatar = async () => {
    const resultPermision = await Permissions.askAsync(Permissions.CAMERA);
    const resultPermisionCamera = resultPermision.permissions.camera.status;

    if (resultPermisionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes");
      } else {
        uploadImage(result.uri)
          .then(() => {
            console.log("Imagen subida");
          })
          .catch(() => {
            toastRef.current.show("Error al actualizar el avatar");
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: photoURL }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}
