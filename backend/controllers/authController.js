import { authService } from "../services/authService.js"

export const authController = {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body
      const { user, token } = await authService.signup(name, email, password)

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const { user, token } = await authService.login(email, password)

      res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  },
}
