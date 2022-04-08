import React, { useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";
import {
  InfoForm,
  UploadImagesForm,
  ImageRestaurant,
} from "../../../components/Restaurants/AddRestaurant";
import { initialValues, validationSchema } from "./AddRestaurant.data";
import { styles } from "./AddRestaurant.styles";

export default function AddRestaurant() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuidv4();
        newData.createdAt = new Date();
        const myDoc = doc(db, "restaurants", newData.id);

        console.log(formValue);
        await setDoc(myDoc, newData);
        //navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />

      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
