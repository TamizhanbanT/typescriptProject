import { Request, Response } from 'express';
import {
  createMeetingService,
  getAllMeetingsService,
  getMeetingByRoleService,
  updateMeetingByRoleService,
  deleteMeetingByRoleService,
} from '../services/meetingService';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const meeting = await createMeetingService(data);
    res.status(201).json(meeting);
  } catch (error: any) {
    console.error('Create Meeting Error:', error);
    res.status(500).json({ error: 'Failed to create meeting' });
  }
};

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const meetings = await getAllMeetingsService();
    res.status(200).json(meetings);
  } catch (error: any) {
    console.error('Get All Meetings Error:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingRole } = req.params;
    const meeting = await getMeetingByRoleService(meetingRole);

    if (!meeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }

    res.status(200).json(meeting);
  } catch (error: any) {
    console.error('Get Meeting Error:', error);
    res.status(500).json({ error: 'Failed to fetch meeting' });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingRole } = req.params;
    const updatedData = req.body;

    const updatedMeeting = await updateMeetingByRoleService(meetingRole, updatedData);
    if (!updatedMeeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }

    res.status(200).json(updatedMeeting);
  } catch (error: any) {
    console.error('Update Meeting Error:', error);
    res.status(500).json({ error: 'Failed to update meeting' });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { meetingRole } = req.params;

    const result = await deleteMeetingByRoleService(meetingRole);
    if (!result) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }

    res.status(200).json(result);
  } catch (error: any) {
    console.error('Delete Meeting Error:', error);
    res.status(500).json({ error: 'Failed to delete meeting' });
  }
};
