import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";

export default function AccountOptions(props) {
  const { userInfo, toastRef } = props;
  const [showModal, setShowModal] = useState(true);

  const selectedComponent = (key) => {
    console.log("Click!!");
    console.log(key);
  };
  const menuOptions = generateOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon name={menu.iconNameLeft} selectionColor={menu.iconColorLeft} />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text>Hola Mundo</Text>
      </Modal>
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displaName"),
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "alternate-email",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "settings-backup-restore",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
