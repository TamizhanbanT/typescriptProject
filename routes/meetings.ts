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

// @route   POST /meetings/
// @desc    Create a new meeting
router.post('/', authenticateToken, createMeeting, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  create(req, res);
});

// @route   GET /meetings/
// @desc    Get all meetings
router.get('/', authenticateToken, getAll);

// @route   GET /meetings/:meetingRole
// @desc    Get one meeting by role
router.get('/:meetingRole', authenticateToken, getOne);

// @route   PUT /meetings/:meetingRole
// @desc    Update a meeting by role
router.put('/:meetingRole', authenticateToken, createMeeting, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  update(req, res);
});

// @route   DELETE /meetings/:meetingRole
// @desc    Delete a meeting by role
router.delete('/:meetingRole', authenticateToken, remove);

export default router;
