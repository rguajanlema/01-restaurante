import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import firebaseApp from "../../utils/firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default function InfoUser(props) {
  const {
    userInfo: { photoURL, displayName, email },
    toastRef,
  } = props;

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
    const docuRef = doc(firestore, `avatar/${uri}`);
    const consulta = await getDoc(docuRef);
    if (consulta.exists()) {
      const infoDocu = consulta.data();
      return infoDocu.Avatar;
    } else {
      await setDoc(docuRef, uri);
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu.Avatar;
    }
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.userInfoAvatar}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/avatar-default.jpg")
        }
      >
        <Avatar.Accessory size={23} onPress={changeAvatar} />
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

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
