import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Request, Response } from "express";

// ✅ Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  console.error("uploads folder not found at:", uploadDir);
} else {
  console.log("✅ uploads folder found at:", uploadDir);
}


export const manualCleanup = async (_req: Request, res: Response): Promise<void> => {
  try {
    const files = fs.readdirSync(uploadDir);

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);
      const stats = fs.statSync(filePath);
      const now = Date.now();
      const age = now - stats.mtime.getTime();

      if (age > 24 * 60 * 60 * 1000) {
        fs.unlinkSync(filePath);
        console.log(` Deleted old file: ${file}`);
      }
    });

    res.status(200).json({ message: "Manual cleanup complete" });
  } catch (error: any) {
    console.error("Cleanup error:", error);
    res.status(500).json({ error: error.message });
  }
};
