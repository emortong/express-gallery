'use strict';
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config.json');

let salt = bcrypt.genSaltSync(CONFIG.saltRounds);
let newPass = bcrypt.hashSync(CONFIG.sessionPassword, salt);

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'emortong',
      password: newPass,
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      username: 'emortong'
    }]);
  }
};
