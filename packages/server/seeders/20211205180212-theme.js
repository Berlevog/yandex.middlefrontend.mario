"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("theme", [
      {
        name: "light",
        theme: "{}",
      },
      {
        name: "dark",
        theme: '{"palette": {"type": "dark", "primary": {"main": "#303030"}}}',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("theme", null, {});
  },
};
