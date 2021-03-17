/**
 * Components
 */
import * as Yup from "yup";
export declare const validationSchema: Yup.ObjectSchema<object & {
    name: string;
    discount: number;
}>;
