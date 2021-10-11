import { object, ref, SchemaOf, string } from "yup";

import { ERROR_MESSAGES } from "./validationErrors";

import { User as UserModel } from "../services/auth";

const VALIDATION = {
  login: {
    min: 3,
    max: 20,
  },
  first_name: {
    min: 3,
    max: 20,
  },
  second_name: {
    min: 3,
    max: 20,
  },
  password: {
    min: 6,
    max: 20,
  },
};

export type User = Pick<UserModel, "email" | "login" | "first_name" | "second_name" | "phone"> & { password: string };

export const UserSchema: SchemaOf<User> = object().shape({
  email: string().email(ERROR_MESSAGES.email).required(ERROR_MESSAGES.required),
  login: string()
    .min(VALIDATION.login.min, ERROR_MESSAGES.min(VALIDATION.login.min))
    .max(VALIDATION.login.max, ERROR_MESSAGES.min(VALIDATION.login.max))
    .required(ERROR_MESSAGES.required),
  first_name: string()
    .min(VALIDATION.login.min, ERROR_MESSAGES.min(VALIDATION.login.min))
    .max(VALIDATION.login.max, ERROR_MESSAGES.min(VALIDATION.login.max))
    .required(ERROR_MESSAGES.required),
  second_name: string()
    .min(VALIDATION.login.min, ERROR_MESSAGES.min(VALIDATION.login.min))
    .max(VALIDATION.login.max, ERROR_MESSAGES.min(VALIDATION.login.max))
    .required(ERROR_MESSAGES.required),
  phone: string()
    .required(ERROR_MESSAGES.required)
    .transform((value: string) => value.replace(/\D/g, ""))
    .min(11, ERROR_MESSAGES.required),
  password: string()
    .min(VALIDATION.password.min, ERROR_MESSAGES.min(VALIDATION.password.min))
    .max(VALIDATION.password.max, ERROR_MESSAGES.min(VALIDATION.password.max))
    .required(ERROR_MESSAGES.required),
  password_confirm: string()
    .oneOf([ref("password"), undefined], ERROR_MESSAGES.password_mismatch)
    .required(ERROR_MESSAGES.required),
});
