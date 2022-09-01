const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Tought = db.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

// Defining relationship with User model
Tought.belongsTo(User); // An tought belongs to User
User.hasMany(Tought); // And an user has many Toughts

module.exports = Tought;
