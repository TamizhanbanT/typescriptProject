import cron from "node-cron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to uploads directory
const uploadDir = path.join(__dirname, "../uploads");


cron.schedule("* * * * *", () => {
  //console.log(" Running scheduled cleanup...");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error(" Error reading uploads directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) return console.error(err);

        const now = Date.now();
        const age = now - stats.mtime.getTime();

        // Delete files older than 1 day
        if (age > 24 * 60 * 60 * 1000) {
          fs.unlink(filePath, (err) => {
            if (err) return console.error(`Failed to delete ${file}`, err);
            console.log(`🗑️ Deleted old file: ${file}`);
          });
        }
      });
    });
  });
});
