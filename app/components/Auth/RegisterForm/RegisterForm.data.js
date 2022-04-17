import * as yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatpassword: "",
  };
}

export function validationSchema() {
  return yup.object({
    email: yup
      .string()
      .email("El email no es correcto")
      .required("El email es obligatorio"),
    password: yup.string().required("La contrasena es obligatoria"),
    repeatpassword: yup
      .string()
      .required("La contrasena es obligatoria")
      .oneOf([yup.ref("password")], "Las contrasenas tienen que ser iguales"),
  });
}
