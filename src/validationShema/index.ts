import * as yup from "yup";
export const PostFormValidationSchema = yup.object({
    title: yup.string().required("Please enter title."),
    body: yup.string().required("Please enter description.")
})