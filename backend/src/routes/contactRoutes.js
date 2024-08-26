import express from "express"
import * as contactControllers from "../controllers/contactControllers.js"

const router = express.Router()

router.post("/",contactControllers.createContact)

router.get("/" ,contactControllers.readAllContact)

router.put("/:id", contactControllers.updateContact)

router.delete("/:id", contactControllers.deleteContact)

export default router