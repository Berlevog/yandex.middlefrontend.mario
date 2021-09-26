export const ERROR_MESSAGES = {
  required: "Required field",
  min: (num: number): string => `Minimum length ${num} symbols`,
  max: (num: number): string => `Maximum length ${num} symbols`,
  email: "Invalid email format",
  password_mismatch: "Passwords do not match",
};
