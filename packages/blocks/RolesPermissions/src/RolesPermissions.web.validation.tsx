/**
 * Components
 */
import * as Yup from "yup";

// Validation Schema for create and update roles
export const validationSchema = Yup.object().shape({
  roleName: Yup.string().required("Please Enter Role Name"),
});
