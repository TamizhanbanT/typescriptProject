// services/memberService.ts
import db from '../models';

const { Member, Meeting } = db;

export const createMember = async (name: string, meetingRole: string) => {
  const meeting = await Meeting.findByPk(meetingRole);
  if (!meeting) {
    throw new Error(`Meeting with ID '${meetingRole}' not found`);
  }

  const member = await Member.create({ name, meetingRole });
  return member;
};

export const bulkCreateMembers = async (membersData: any[]) => {
  return await Member.bulkCreate(membersData);
};

export const getAllMembers = async () => {
  return await Member.findAll();
};

export const updateMember = async (id: number, updateData: any) => {
  const member = await Member.findByPk(id);
  if (!member) {
    throw new Error('Member not found');
  }
  await member.update(updateData);
  return member;
};

export const deleteMemberById = async (id: number) => {
  const deletedCount = await Member.destroy({ where: { id } });
  if (!deletedCount) {
    throw new Error('Member not found');
  }

  return deletedCount;
};
