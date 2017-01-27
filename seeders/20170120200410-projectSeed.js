'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Projects', [{
      link: 'www.myfinalp.com',
      description: 'My final project for devleague was a lorem ipsum noseque',
      createdAt : new Date(),
      updatedAt : new Date(),
      UserId : 1
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', [{
      link: 'www.myfinalp.com'
    }]);

  }
};