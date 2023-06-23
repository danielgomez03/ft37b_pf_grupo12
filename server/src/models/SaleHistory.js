const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('saleHistory', {

    saleHistoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    priceAtSale: {
      type: DataTypes.FLOAT,
    },

    discountAtSale: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

  }, { timestamps: false });
};

// NOTE FOR FRONT-END IMPLEMENTATION:
// Retrieve sale history entries for a specific user
// const saleHistoryEntriesForUser = await user.getSaleHistories();

// // Retrieve sale history entries for a specific product
// const saleHistoryEntriesForProduct = await product.getSaleHistories();