import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./RegisterForm.styles";

import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";

const auth = getAuth();

export function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log("Formulario eviando");
      console.log(formValue);
    },
  });

  const showHidenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contrasena"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconStyle}
            onPress={showHidenPassword}
          />
        }
      />
      <Input
        placeholder="Repetir contrasena"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(text) => formik.setFieldValue("repeatpassword", text)}
        errorMessage={formik.errors.repeatpassword}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            iconStyle={styles.iconStyle}
            onPress={showHidenPassword}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={formik.onSubmit}
      />
      <Loading show text="Creando cuenta" />
    </View>
  );
}
