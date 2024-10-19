'use strict'
import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../services/index.js";

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usename: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [4, 64], // Ensure usernam]e is at least 8 characters long
    },
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      len: [8, 64], // Ensure password is at least 8 characters long
    },
  },
  role: {
    type: Sequelize.ENUM('admin', 'member'),
    defaultValue: 'member',
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['username'],
    }
  ],
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
  },
});

async function hashPassword(user) {
  if (user.password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
  }
}

export default UserModel;
