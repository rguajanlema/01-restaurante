import * as yup from "yup";

export function initialValues() {
  return {
    title: "",
    comment: "",
    rating: 3,
  };
}

export function validationSchema() {
  return yup.object({
    title: yup.string().required("El titulo es requerido"),
    comment: yup.string().required("El comentario es requerido"),
    rating: yup.number().required("La calificacion es requerida"),
  });
}
