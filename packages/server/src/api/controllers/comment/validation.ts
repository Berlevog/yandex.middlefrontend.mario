import { body } from "express-validator";
import validationErrorHandler from "../validationErrorHandler";

const fieldsValidators = [
  body("title").trim().escape(),
  body("content", "Content must not be empty.").trim().escape().isLength({
    min: 1,
  }),
  body("userId", "userId must not be empty.").trim().escape().isLength({
    min: 1,
  }),
  body("threadId", "threadId must not be empty.").trim().escape().isLength({
    min: 1,
  }),
];

export default [...fieldsValidators, validationErrorHandler];
