import * as yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  };
}

export function validationSchema() {
  return yup.object({
    name: yup.string().required("Campo obligatorio"),
    address: yup.string().required("Campo obligatorio"),
    phone: yup.string().required("Campo obligatorio"),
    email: yup
      .string()
      .email("Campo obligatorio")
      .required("Campo obligatorio"),
    description: yup.string().required("Campo obligatorio"),
  });
}
