import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";
import { getAuth, updatePassword, signOut } from "firebase/auth";

export default function ChangePasswordForm(props) {
  const { setShowModal, toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValue());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    let isSetErrors = true;
    let errorsTemp = {};
    setErrors({});

    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: !formData.password
          ? "La contrasena no puede estar vacia"
          : "",
        newPassword: !formData.newPassword
          ? "La contrasena no puede estar vacia"
          : "",
        repeatNewPassword: !formData.repeatNewPassword
          ? "La contrasena no puede estar vacia"
          : "",
      };
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        newPassword: "La contrasena no son iguales",
        repeatNewPassword: "La contrasena no son iguales",
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La contrasena tiene que ser mayor a 5 caractares.",
        repeatNewPassword: "La contrasena tiene que ser mayor a 5 caracteres.",
      };
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(async () => {
          const auth = getAuth();
          await updatePassword(auth.currentUser, formData.newPassword)
            .then(() => {
              isSetErrors = false;
              setIsLoading(false);
              setShowModal(false);
              signOut(auth);
            })
            .catch(() => {
              errorsTemp = {
                other: "Error al actualizar la contrasena.",
              };
              setIsLoading(false);
            });
        })
        .catch(() => {
          errorsTemp = {
            password: "La contrasenia no es correcta",
          };
          setIsLoading(false);
        });
    }

    isSetErrors && setErrors(errorsTemp);
  };

  return (
    <View>
      <Input
        placeholder="Contrasena actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva contrasena"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir nueva contrasena"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contrasenia"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}

function defaultValue() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
