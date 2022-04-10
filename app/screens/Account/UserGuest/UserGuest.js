import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./UserGuest.styles";

export function UserGuest() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../../assets/img/user-guest.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de Tenedores</Text>
      <Text style={styles.description}>
        Como describirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado mas y
        comenta como ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Ver tu perfil"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={goToLogin}
        />
      </View>
    </ScrollView>
  );
}
