// Validate user input for a registration form before inserting it into a users table
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password);
    }
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true, // Ensures that the username only contains letters and numbers
          len: [3, 16],         // Ensures that the username is between 3 and 20 characters
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5],             // Ensures that the password is at least 5 characters long
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,        // Ensures that the email follows the email format
        },
      },
     /*zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [5],             // Ensures that the password is at least 5 characters long
          },
     }*/
     firebaseUid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;