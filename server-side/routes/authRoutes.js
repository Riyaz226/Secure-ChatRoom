import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import fs from 'fs'; // Import the fs module

import { login, logout, signup } from "../controllers/authController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = join(__dirname, '../uploads');
        // Ensure 'uploads' directory exists. If not, create it.
        fs.mkdir(uploadDir, { recursive: true }, function (err) {
            if (err) {
                console.error('Error creating upload directory:', err);
            }
            cb(null, uploadDir);
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
}

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post('/signup', upload.single('profilePic'), signup);

router.post("/login", login);
router.post("/logout", logout);

export default router;
