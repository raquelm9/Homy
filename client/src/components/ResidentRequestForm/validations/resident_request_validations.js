import * as Yup from "yup";

export const residentRequestValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().required("Description is required"),
});
