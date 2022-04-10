import React, { useRef } from "react";
import { View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";

import { RegisterForm } from "../../../components/Auth";
import { styles } from "./Register.styles";

export function Register() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="center"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}
