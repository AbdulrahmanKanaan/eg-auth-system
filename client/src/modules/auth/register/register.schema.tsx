import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(
        /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
        "password must contain at least 1 letter, 1 number, and 1 special character",
      )
      .required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null as any], "Passwords must match")
      .required(),
  })
  .required();

export type RegisterSchema = yup.InferType<typeof registerSchema>;
