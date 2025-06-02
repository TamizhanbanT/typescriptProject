import { body } from 'express-validator';

export const createMeeting = [
  body('meetingRole').notEmpty().withMessage('Meeting role is required'),
  body('meetingDate').isDate().withMessage('Valid meeting date is required'),
  body('startTime').notEmpty().withMessage('Start time is required'),
  body('endTime').notEmpty().withMessage('End time is required'),
];
