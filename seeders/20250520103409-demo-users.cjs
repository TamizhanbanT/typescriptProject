'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'john.doe@example.com',
        password: 'password123', // Use hashed password in real apps
      },
      {
        email: 'jane.smith@example.com',
        password: 'securepass456',
      },
      {
        email: 'alice.wonder@example.com',
        password: 'alicepass789',
      },
      {
        email: 'bob.builder@example.com',
        password: 'bobsecure321',
      },
      {
        email: 'eve.hacker@example.com',
        password: 'evehack654',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
