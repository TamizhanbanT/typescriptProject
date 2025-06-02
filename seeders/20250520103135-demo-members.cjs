'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('members', [
      // Developer Team
      { name: 'Alice Dev', meetingRole: 'developer' },
      { name: 'Bob Dev', meetingRole: 'developer' },
      { name: 'Charlie Dev', meetingRole: 'developer' },
      { name: 'Diana Dev', meetingRole: 'developer' },
      { name: 'Ethan Dev', meetingRole: 'developer' },

      // Production Team
      { name: 'Frank Prod', meetingRole: 'production' },
      { name: 'Grace Prod', meetingRole: 'production' },
      { name: 'Hank Prod', meetingRole: 'production' },
      { name: 'Ivy Prod', meetingRole: 'production' },
      { name: 'Jack Prod', meetingRole: 'production' },
      { name: 'Kelly Prod', meetingRole: 'production' },

      // Marketing Team
      { name: 'Liam Mark', meetingRole: 'marketing' },
      { name: 'Mia Mark', meetingRole: 'marketing' },
      { name: 'Nina Mark', meetingRole: 'marketing' },
      { name: 'Oscar Mark', meetingRole: 'marketing' },
      { name: 'Paul Mark', meetingRole: 'marketing' },
      { name: 'Quinn Mark', meetingRole: 'marketing' },
      { name: 'Rita Mark', meetingRole: 'marketing' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
