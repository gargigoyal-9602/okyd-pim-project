/**
 * Components
 */
import * as Yup from "yup";
export declare const validationSchema: Yup.ObjectSchema<object & {
    name: string;
    discount: string;
    parent_categories: string | null;
}>;
