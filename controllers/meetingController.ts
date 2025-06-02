import { Request, Response } from 'express';
import db from '../models/index';

// Create a new meeting
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingRole, meetingDate, startTime, endTime } = req.body;
    const newMeeting = await db.Meeting.create({
      meetingRole,
      meetingDate,
      startTime,
      endTime,
    });
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'Failed to create meeting' });
  }
};

// Get all meetings
export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const meetings = await db.Meeting.findAll();
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};

// Get meeting by ID
export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const meeting = await db.Meeting.findByPk(id);

    if (!meeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error fetching meeting:', error);
    res.status(500).json({ error: 'Failed to fetch meeting' });
  }
};

// Update meeting by ID
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { meetingRole, meetingDate, startTime, endTime } = req.body;

    const meeting = await db.Meeting.findByPk(id);
    if (!meeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }

    await meeting.update({ meetingRole, meetingDate, startTime, endTime });
    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ error: 'Failed to update meeting' });
  }
};

// Delete meeting by ID
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const meeting = await db.Meeting.findByPk(id);

    if (!meeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }

    await meeting.destroy();
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ error: 'Failed to delete meeting' });
  }
};
