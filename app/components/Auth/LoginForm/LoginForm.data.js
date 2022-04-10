import * as yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return yup.object({
    email: yup
      .string()
      .email("El email no es valido")
      .required("El email es obligatorio"),
    password: yup.string().required("La contrasena es obligatoria"),
  });
}
