const { DataTypes } = require("sequelize");
const { hashSync, genSaltSync } = require("bcrypt");

module.exports = (sequelize) => {
  const Login = sequelize.define(
    "login",
    {
      loginId: {
        // naming it like this is less confusing when interacting with other id fields
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      uniqueKeys: {
        uniqueUserLoginKey: {
          fields: ["userId", "loginId"],
        },
      },
    }
  );

  // password hashing to encrypt data through bcrypt library, with error handling
  Login.beforeCreate(async (login) => {
    try {
      const hashedPassword = await hashSync(login.password, genSaltSync(10));
      login.password = hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  });

  return Login;
};
