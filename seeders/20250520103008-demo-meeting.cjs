'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('meetings', [
      {
        meetingRole: 'developer',
        meetingDate: '2025-06-01',
        startTime: '10:00:00',
        endTime: '11:00:00',
      },
      {
        meetingRole: 'production',
        meetingDate: '2025-06-02',
        startTime: '14:00:00',
        endTime: '15:00:00',
      },
      {
        meetingRole: 'marketing',
        meetingDate: '2025-06-03',
        startTime: '16:00:00',
        endTime: '17:00:00',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('meetings', null, {});
  }
};
