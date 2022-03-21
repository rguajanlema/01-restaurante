import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Register() {
  return (
    <View>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="center"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <Text>Register FORM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
