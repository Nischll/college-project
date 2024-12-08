import { z } from 'zod'

const nameRegex = /^[A-Z][a-z]{2,29}(?: [A-Z][a-z]{2,29})(?: [A-Z][a-z]{2,29})?$/
// const emailRegex = /^[a-zA-Z0-9_]+@ims\.np$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
;
export const baseSchema = z.object({
  username: z
  .string()
  .min(6, "username must be at least 6 characters")
  .max(20, "uername must be less than 20 characters"),
  // .regex(emailRegex, {message:"email must end with '@ims.np'"}),

  password: z
  .string()
  // .regex(passwordRegex, {message:"Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character."})
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be less than 20 characters"),
});

export const signupSchema = baseSchema.extend({
  name: z
  .string()
  .regex(nameRegex, {message:"must have at least two words, start with a capital letter"})
});