/**
 * Components
 */
import * as Yup from "yup";

// Validation Schema for create and update roles
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter Brand Name"),
  discount: Yup.number()
    .integer()
    .required("Please Enter Discount"),
});
