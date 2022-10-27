import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Çok kısa!")
    .max(50, "Çok uzun!")
    .required("Zorunlu alan"),
  email: Yup.string().email("Geçersiz email").required("Zorunlu alan"),
  subject: Yup.string()
    .min(2, "Çok kısa!")
    .max(50, "Çok uzun!")
    .required("Zorunlu alan"),
  message: Yup.string()
    .min(2, "Çok kısa!")
    .max(50, "Çok uzun!")
    .required("Zorunlu alan"),
  enquiry: Yup.string().required("Seçmediniz"),
});

export default FormSchema;
