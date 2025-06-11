import db from '../models/index';

const { Meeting } = db;

export const createMeetingService = async (data: {
  meetingRole: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
}) => {
  return await Meeting.create(data);
};

export const getAllMeetingsService = async () => {
  return await Meeting.findAll();
};

export const getMeetingByRoleService = async (meetingRole: string) => {
  return await Meeting.findOne({ where: { meetingRole } });
};

export const updateMeetingByRoleService = async (
  meetingRole: string,
  updatedData: {
    meetingRole: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
  }
) => {
  const meeting = await Meeting.findOne({ where: { meetingRole } });
  if (!meeting) return null;
  await meeting.update(updatedData);
  return meeting;
};

export const deleteMeetingByRoleService = async (meetingRole: string) => {
  const meeting = await Meeting.findOne({ where: { meetingRole } });
  if (!meeting) return null;
  await meeting.destroy();
  return { message: 'Meeting deleted successfully' };
};
