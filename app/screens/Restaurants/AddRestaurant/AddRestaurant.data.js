import * as yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    images: [],
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
    images: yup
      .array()
      .min(1, "Se requiere una imagen camo minimo")
      .required("La imagen es requerida"),
  });
}
