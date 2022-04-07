import React from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./InfoForm.styles";

export function InfoForm(props) {
  const { formik } = props;

  return (
    <View>
      <Input
        placeholder="Nomnbre del restaurante"
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => formik.setFieldValue("address", text)}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Telefono"
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.errors.phone}
      />
      <Input
        placeholder="Email"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={(text) => formik.setFieldValue("description", text)}
        errorMessage={formik.errors.description}
      />
    </View>
  );
}
