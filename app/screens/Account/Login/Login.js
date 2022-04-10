import React, { useRef } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import { LoginForm } from "../../../components/Auth";
import { styles } from "./Login.styles";
import { screen } from "../../../utils";

export function Login() {
  const navigation = useNavigation();
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="center"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} navigation={navigation} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text>Social Login</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  };

  return (
    <Text style={styles.textRegister}>
      Aun no tienes una cuenta?{" "}
      <Text style={styles.btnRegister} onPress={() => goToRegister}>
        Registrate
      </Text>
    </Text>
  );
}
