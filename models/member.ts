import { DataTypes, Model, Sequelize } from 'sequelize';

interface MemberAttributes {
  id?: number;
  name: string;
  meetingRole: string;
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  class Member extends Model<MemberAttributes> implements MemberAttributes {
    public id!: number;
    public name!: string;
    public meetingRole!: string;

    static associate(models: any) {
      Member.belongsTo(models.Meeting, {
        foreignKey: 'meetingRole',
        as: 'meeting',
      });
    }
  }

  Member.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meetingRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Member',
      tableName: 'Members', 
      timestamps:false
    }
  );

  return Member;
};
