'use strict'

import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../services/index.js";
import UserModel from './user-model.js';

const ProjectModel = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  targetCompletionDate: {
    type: DataTypes.DATE,
    allowNull: true
},
}, {
  indexes: [
    {
      name: "nameIndex",
      unique: true,
      fields: ['name'],
    }
  ]
});


ProjectModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

export default ProjectModel;
