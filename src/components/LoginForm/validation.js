import * as Yup from 'yup';
import {Constants} from "./constants";

export const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string("Enter password")
        .required("Password is required")
        .min(Constants.min, 'Too Short!')
});