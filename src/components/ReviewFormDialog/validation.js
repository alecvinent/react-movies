import * as Yup from 'yup';
import {Constants} from "./constants";

export const validationSchema = Yup.object({
    review: Yup.string("Enter review")
        .required("Review is required")
        .min(Constants.min, 'Too Short!')
        .max(Constants.max, 'Too Long!')
});