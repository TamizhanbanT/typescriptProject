import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

export const convertHtmlFileToPdf = async (req: Request, res: Response):Promise<void> => {
  if (!req.file) {
     res.status(400).json({ error: "No HTML file uploaded" });
     return
  }

  const htmlFilePath = req.file.path;
  const pdfFileName = req.file.filename.replace(".html", ".pdf");
  const pdfFilePath = path.join(path.dirname(htmlFilePath), pdfFileName);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    await page.pdf({
      path: pdfFilePath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.status(200).json({
      message: "HTML converted to PDF successfully",
      pdfFile: pdfFileName,
      pdfPath: pdfFilePath,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
