"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("emoji", [
      {
        id: 1,
        name: "👍",
      },
      {
        id: 2,
        name: "👎",
      },
      {
        id: 3,
        name: "💥",
      },
      {
        id: 4,
        name: "❤",
      },
      {
        id: 5,
        name: "🥌",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("emoji", null, {});
  },
};
