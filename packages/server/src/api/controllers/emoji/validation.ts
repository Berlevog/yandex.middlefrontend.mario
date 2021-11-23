import { body } from "express-validator";
import validationErrorHandler from "../validationErrorHandler";

const fieldsValidators = [
  body("emojiId", "emojiId must not be empty.").trim().escape().isLength({
    min: 1,
  }),
  body("commentId", "commentId must not be empty.").trim().escape().isLength({
    min: 1,
  }),
  body("userId", "userId must not be empty.").trim().escape().isLength({
    min: 1,
  }),
];

export default [...fieldsValidators, validationErrorHandler];
