import { Request, Response } from 'express'
import multer from 'multer'

// Handle single file upload
export const handleSingleUpload = (upload: multer.Multer) => {
  return (req: Request, res: Response) => {
    try {
      upload.single('file')(req, res, (err: any) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
        res.json(req.file)
      })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
}

// Handle multiple image uploads
export const handleMultipleUpload = (upload: multer.Multer) => {
  return (req: Request, res: Response) => {
    try {
      upload.array('images', 5)(req, res, (err: any) => {
        if (err) return res.status(500).json({ error: err.message })
        const files = req.files as Express.Multer.File[]
        if (!files || files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded' })
        }
        res.json(files)
      })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
}

// Handle document upload (pdf, txt, html)
export const handleDocUpload = (docsUpload: multer.Multer) => {
  return (req: Request, res: Response) => {
    try {
      docsUpload.single('doc')(req, res, (err: any) => {
        if (err) return res.status(400).json({ error: err.message })
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
        res.json(req.file)
      })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
}
