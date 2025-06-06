import express from "express";
import { manualCleanup } from "../controllers/cleanup.controller";

const router = express.Router();

router.get("/cleanup-now", manualCleanup); 

export default router;
