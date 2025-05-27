import express from "express";
import multer from "multer";
import { getFilteredColleges, uploadLogo } from "../controllers/collegecontroller.js";

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.get("/search", getFilteredColleges);

// Add this route for logo upload
router.post("/upload-logo", upload.single("logo"), uploadLogo);

export default router;