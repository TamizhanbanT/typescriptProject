import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

// Define attributes and which are optional when creating
interface MeetingAttributes {
  meetingRole: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type MeetingCreationAttributes = Optional<MeetingAttributes,  'createdAt' | 'updatedAt'>;

class Meeting extends Model<MeetingAttributes, MeetingCreationAttributes> implements MeetingAttributes {
  
  public meetingRole!: string;
  public meetingDate!: string;
  public startTime!: string;
  public endTime!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Meeting.init(
    {
      
      meetingRole: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
      },
      meetingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Meeting',
      tableName: 'Meetings',
      timestamps:false
    }
  );

  return Meeting;
};
