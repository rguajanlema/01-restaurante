import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValue());

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    console.log(formData);
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
      />
      <Button
        title="Cambiar contrasenia"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
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
