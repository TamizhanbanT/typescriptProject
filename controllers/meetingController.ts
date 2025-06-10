
import { Request, Response } from 'express';
import db from '../models/index';

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: API for managing meetings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Meeting:
 *       type: object
 *       required:
 *         - meetingRole
 *         - meetingDate
 *         - startTime
 *         - endTime
 *       properties:
 *         id:
 *           type: integer
 *         meetingRole:
 *           type: string
 *         meetingDate:
 *           type: string
 *           format: date
 *         startTime:
 *           type: string
 *         endTime:
 *           type: string
 */

/**
 * @swagger
 * /meetings:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       500:
 *         description: Failed to create meeting
 */
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

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: A list of all meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Failed to fetch meetings
 */
export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const meetings = await db.Meeting.findAll();
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};

/**
 * @swagger
 * /meetings/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Meeting found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Failed to fetch meeting
 */
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

/**
 * @swagger
 * /meetings/{id}:
 *   put:
 *     summary: Update a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Failed to update meeting
 */
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

/**
 * @swagger
 * /meetings/{id}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Failed to delete meeting
 */
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


// import { Request, Response } from 'express';
// import db from '../models/index';

// // Create a new meeting
// export const create = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { meetingRole, meetingDate, startTime, endTime } = req.body;
//     const newMeeting = await db.Meeting.create({
//       meetingRole,
//       meetingDate,
//       startTime,
//       endTime,
//     });
//     res.status(201).json(newMeeting);
//   } catch (error) {
//     console.error('Error creating meeting:', error);
//     res.status(500).json({ error: 'Failed to create meeting' });
//   }
// };

// // Get all meetings
// export const getAll = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     const meetings = await db.Meeting.findAll();
//     res.status(200).json(meetings);
//   } catch (error) {
//     console.error('Error fetching meetings:', error);
//     res.status(500).json({ error: 'Failed to fetch meetings' });
//   }
// };

// // Get meeting by ID
// export const getOne = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const meeting = await db.Meeting.findByPk(id);

//     if (!meeting) {
//       res.status(404).json({ error: 'Meeting not found' });
//       return;
//     }

//     res.status(200).json(meeting);
//   } catch (error) {
//     console.error('Error fetching meeting:', error);
//     res.status(500).json({ error: 'Failed to fetch meeting' });
//   }
// };

// // Update meeting by ID
// export const update = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { meetingRole, meetingDate, startTime, endTime } = req.body;

//     const meeting = await db.Meeting.findByPk(id);
//     if (!meeting) {
//       res.status(404).json({ error: 'Meeting not found' });
//       return;
//     }

//     await meeting.update({ meetingRole, meetingDate, startTime, endTime });
//     res.status(200).json(meeting);
//   } catch (error) {
//     console.error('Error updating meeting:', error);
//     res.status(500).json({ error: 'Failed to update meeting' });
//   }
// };

// // Delete meeting by ID
// export const remove = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const meeting = await db.Meeting.findByPk(id);

//     if (!meeting) {
//       res.status(404).json({ error: 'Meeting not found' });
//       return;
//     }

//     await meeting.destroy();
//     res.status(200).json({ message: 'Meeting deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting meeting:', error);
//     res.status(500).json({ error: 'Failed to delete meeting' });
//   }
// };
