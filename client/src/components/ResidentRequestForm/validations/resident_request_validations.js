import * as Yup from "yup";

export const residentRequestValidationSchema = Yup.object().shape({
  date: Yup.date().default(function () {
    return new Date();
  }),
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Type is required"),
});
