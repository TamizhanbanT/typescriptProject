import { Request, Response } from 'express';
import db from '../models/index';

const { Member, Meeting } = db;

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for managing meeting members
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - name
 *         - meetingRole
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         meetingRole:
 *           type: string
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
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Member created successfully
 *       400:
 *         description: Validation error
 */
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, meetingRole } = req.body;

    if (!name || !meetingRole) {
      res.status(400).json({ error: 'Name and meetingRole are required' });
      return;
    }

    const meeting = await Meeting.findByPk(meetingRole);
    if (!meeting) {
      res.status(400).json({ error: `Meeting with ID '${meetingRole}' not found` });
      return;
    }

    const member = await Member.create({ name, meetingRole });
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

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
 *               $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Members created successfully
 *       400:
 *         description: Validation error
 */
const bulkCreate = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await Member.bulkCreate(req.body);
    res.status(201).json(members);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

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
 *                 $ref: '#/components/schemas/Member'
 *       500:
 *         description: Server error
 */
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Member not found
 */
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }

    await member.update(req.body);
    res.json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

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
 *         description: The member ID
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 */
const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Member.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  create,
  bulkCreate,
  getAll,
  update,
  delete: deleteMember,
};
