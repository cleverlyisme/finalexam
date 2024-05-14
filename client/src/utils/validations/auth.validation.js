import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain number"),
});

export const registerValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain number"),
  fullName: yup
    .string()
    .required("Full name is required")
    .max(30, "Full name must be less than 30 characters")
    .matches(/^[a-zA-Z ]*$/, "Full name must contain only letters"),
});
