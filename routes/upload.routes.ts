import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  handleSingleUpload,
  handleMultipleUpload,
  handleDocUpload,
} from "../controllers/upload.controller";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const docsUpload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["application/pdf", "text/plain", "text/html"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .txt, and .html files are allowed"));
    }
  },
});

// Routes
router.post("/upload-single", handleSingleUpload(upload));
router.post("/upload-multiple", handleMultipleUpload(upload));
router.post("/upload-doc", handleDocUpload(docsUpload));

export default router;
