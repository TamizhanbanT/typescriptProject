import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

export const handleCSVUpload = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No CSV file uploaded" });
    return;
  }

  const file = req.file as Express.Multer.File;
  const results: any[] = [];

  try {
    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        const jsonFilename = file.filename.replace(/\.[^/.]+$/, "") + ".json";
        const jsonFilePath = path.join(path.dirname(file.path), jsonFilename);

        fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2), (err) => {
          if (err) {
            console.error("Failed to save JSON:", err);
            res.status(500).json({ error: "Failed to write JSON file" });
            return;
          }

          res.status(200).json({
            message: "CSV uploaded and JSON file created",
            csvFile: file.filename,
            jsonFile: jsonFilename,
            parsedData: results,
          });
        });
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
