import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../config/db.js"

export const authService = {
  async signup(name, email, password) {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      const error = new Error("Email already in use")
      error.statusCode = 409
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    return { user, token }
  },

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      const error = new Error("Invalid email or password")
      error.statusCode = 401
      throw error
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password")
      error.statusCode = 401
      throw error
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    }
  },
}
