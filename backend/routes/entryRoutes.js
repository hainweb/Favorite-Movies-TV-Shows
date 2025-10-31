import express from "express"
import { entryController } from "../controllers/entryController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { createEntrySchema, updateEntrySchema } from "../validations/entrySchema.js"

const router = express.Router()

router.use(verifyToken)

router.post("/", validateSchema(createEntrySchema), entryController.createEntry)
router.get("/", entryController.getEntries)
router.get("/:id", entryController.getEntryById)
router.put("/:id", validateSchema(updateEntrySchema), entryController.updateEntry)
router.delete("/:id", entryController.deleteEntry)

export default router
