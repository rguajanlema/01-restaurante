import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [imagesSelected, setImagesSelected] = useState([]);

  console.log(imagesSelected);
  const addRestaurant = () => {
    console.log(restaurantName);
    console.log(restaurantAddress);
    console.log(restaurantDescription);
  };

  return (
    <View style={styles.scrollView}>
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
      />
      <UploadImage
        toastRef={toastRef}
        imageSelect={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="Crear Restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </View>
  );
}

function FormAdd(props) {
  const { setRestaurantName, setRestaurantAddress, setRestaurantDescription } =
    props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Direccion"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImage(props) {
  const { toastRef, imagesSelect, setImagesSelected } = props;
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);

    if (resultPermissions === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los haz rechazado tienes que ir ha activarlos manualmente",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galeria sin seleccionar ninguna imagen",
          2000
        );
      } else {
        setImagesSelected([...imagesSelect, result.uri]);
      }
    }
  };
  return (
    <View style={styles.viewImagenes}>
      <Icon
        type="material-community"
        name="camera"
        color="#a7a7a7"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImagenes: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
});