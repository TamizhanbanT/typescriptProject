import express, { Request, Response, Router } from 'express';
import controller from '../controllers/memberController';

const router: Router = express.Router();

// 🔹 Create a single member
router.post('/', (req: Request, res: Response) => controller.create(req, res));

// 🔹 Bulk create members
router.post('/bulk', (req: Request, res: Response) => controller.bulkCreate(req, res));

// 🔹 Get all members
router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

// 🔹 Update member by ID
router.put('/:id', (req: Request, res: Response) => controller.update(req, res));

// 🔹 Delete member by ID
router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

export default router;
