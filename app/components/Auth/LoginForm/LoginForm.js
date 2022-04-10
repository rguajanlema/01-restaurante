import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { screen } from "../../../utils";
import { styles } from "./LoginForm.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.data";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const onShowHidePassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type: "error",
          possition: "bottom",
          text: "usuario o contrasena incorrectos",
        });
      }
    },
  });

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={onShowHidePassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
