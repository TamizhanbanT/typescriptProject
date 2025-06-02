import { Request, Response } from 'express';
import db from '../models/index';

const { Member } = db;

// 🔹 Create a single member
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Bulk create members
const bulkCreate = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await Member.bulkCreate(req.body);
    res.status(201).json(members);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 Get all members
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update member by ID
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

// 🔹 Delete member by ID
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
