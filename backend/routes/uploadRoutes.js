import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { verifyToken } from "../middlewares/authMiddleware.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/jpg"]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only jpg, jpeg, and png files are allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

const router = express.Router()

router.post("/", verifyToken, upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" })
    }

   const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    req.body.posterUrl=fileUrl
    console.log(fileUrl);
    

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
    })
  } catch (error) {
    next(error)
  }
})

export default router
