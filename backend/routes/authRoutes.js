import express from "express"
import { authController } from "../controllers/authController.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { signupSchema, loginSchema } from "../validations/authSchema.js"

const router = express.Router()

router.post("/signup", validateSchema(signupSchema), authController.signup)
router.post("/login", validateSchema(loginSchema), authController.login)

export default router
