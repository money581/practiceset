
const Sequelize=require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Group = require('./group');
const usergroup = sequelize.define('usergroup', {
  id: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
 
}); 

module.exports = usergroup;
