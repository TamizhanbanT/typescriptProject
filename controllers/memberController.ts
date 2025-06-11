
import { Request, Response } from 'express';
import * as memberService from '../services/memberService';

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, meetingRole } = req.body;

    if (!name || !meetingRole) {
      res.status(400).json({ error: 'Name and meetingRole are required' });
      return;
    }

    const member = await memberService.createMember(name, meetingRole);
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const bulkCreate = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await memberService.bulkCreateMembers(req.body);
    res.status(201).json(members);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await memberService.updateMember(Number(req.params.id), req.body);
    res.json(member);
  } catch (err: any) {
    const status = err.message === 'Member not found' ? 404 : 400;
    res.status(status).json({ error: err.message });
  }
};

const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    await memberService.deleteMemberById(Number(req.params.id));
    res.json({ message: 'Member deleted successfully' });
  } catch (err: any) {
    const status = err.message === 'Member not found' ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
};

export default {
  create,
  bulkCreate,
  getAll,
  update,
  delete: deleteMember,
};
