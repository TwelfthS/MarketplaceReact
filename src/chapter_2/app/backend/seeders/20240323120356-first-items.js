'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [{
      name: "Toy",
      description: "Very cool toy"
    }, {
      name: "Shampoo",
      description: "Nice shampoo"
    }, {
      name: "Jacket",
      description: "Black leather jacket"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
