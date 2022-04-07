import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import {
  InfoForm,
  UploadImagesForm,
} from "../../../components/Restaurants/AddRestaurant";
import { initialValues, validationSchema } from "./AddRestaurant.data";
import { styles } from "./AddRestaurant.styles";

export default function AddRestaurant(props) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });

  return (
    <View>
      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
