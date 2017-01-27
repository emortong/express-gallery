'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn( 'Users', 'isAdmin', Sequelize.BOOLEAN );
  },

  down: function (queryInterface, Sequelize) {
   queryInterface.removeColumn( 'Users', 'isAdmin' );
  }
};
