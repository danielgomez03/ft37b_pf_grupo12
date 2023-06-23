const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Rating = sequelize.define('Rating', {

    ratingId: { // naming it like this is less confusing when interacting with other id fields
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    value: { // a 0 to 5 stars rating system
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: 0,
          max: 5,
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

}, { timestamps: false });

module.exports = Rating;