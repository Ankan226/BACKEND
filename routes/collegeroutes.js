import express from 'express';
import multer from 'multer';
import {getFilteredColleges, uploadLogo } from '../controllers/collegeController.js';

const router = express.Router();

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/search", getFilteredColleges);
router.post('/upload-logo', upload.single('logo'), uploadLogo);

export default router;