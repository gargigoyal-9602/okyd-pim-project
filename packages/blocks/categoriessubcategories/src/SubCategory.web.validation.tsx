/**
 * Components
 */
import * as Yup from "yup";

// Validation Schema for create and update roles
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter Category Name"),
  discount: Yup.string().required("Please Enter Discount"),
  parent_categories: Yup.string()
    .nullable()
    .required("Select Parent Category"),
});
