// import express, { Request, Response, Router } from 'express';
// import controller from '../controllers/memberController';

// const router: Router = express.Router();

// // 🔹 Create a single member
// router.post('/', (req: Request, res: Response) => controller.create(req, res));

// // 🔹 Bulk create members
// router.post('/bulk', (req: Request, res: Response) => controller.bulkCreate(req, res));

// // 🔹 Get all members
// router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

// // 🔹 Update member by ID
// router.put('/:id', (req: Request, res: Response) => controller.update(req, res));

// // 🔹 Delete member by ID
// router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

// export default router;
import express, { Request, Response, Router } from 'express';
import controller from '../controllers/memberController';

const router: Router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management APIs
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               meetingRole:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
 */
router.post('/', (req: Request, res: Response) => controller.create(req, res));

/**
 * @swagger
 * /members/bulk:
 *   post:
 *     summary: Bulk create members
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *     responses:
 *       201:
 *         description: Members created successfully
 */
router.post('/bulk', (req: Request, res: Response) => controller.bulkCreate(req, res));

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', (req: Request, res: Response) => controller.getAll(req, res));

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       404:
 *         description: Member not found
 */
router.put('/:id', (req: Request, res: Response) => controller.update(req, res));

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 */
router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

export default router;
