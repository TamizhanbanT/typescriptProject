import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createMeeting } from '../validators/meetingValidator';
import authenticateToken from '../middleware/auth';
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from '../controllers/meetingController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: Meeting management APIs
 */

/**
 * @swagger
 * /meetings:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       422:
 *         description: Validation failed
 *       500:
 *         description: Failed to create meeting
 */
router.post('/', authenticateToken, createMeeting, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  create(req, res);
});

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Failed to fetch meetings
 */
router.get('/', authenticateToken, getAll);

/**
 * @swagger
 * /meetings/{meetingRole}:
 *   get:
 *     summary: Get a meeting by role
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingRole
 *         schema:
 *           type: string
 *         required: true
 *         description: Role of the meeting to fetch
 *     responses:
 *       200:
 *         description: Meeting details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 */
router.get('/:meetingRole', authenticateToken, getOne);

/**
 * @swagger
 * /meetings/{meetingRole}:
 *   put:
 *     summary: Update a meeting by role
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingRole
 *         schema:
 *           type: string
 *         required: true
 *         description: Role of the meeting to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *       422:
 *         description: Validation failed
 *       404:
 *         description: Meeting not found
 */
router.put('/:meetingRole', authenticateToken, createMeeting, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  update(req, res);
});

/**
 * @swagger
 * /meetings/{meetingRole}:
 *   delete:
 *     summary: Delete a meeting by role
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingRole
 *         schema:
 *           type: string
 *         required: true
 *         description: Role of the meeting to delete
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       404:
 *         description: Meeting not found
 */
router.delete('/:meetingRole', authenticateToken, remove);

export default router;
