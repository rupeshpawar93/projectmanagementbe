'use strict'

import bcrypt from 'bcrypt';
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../services/index.js";
import ProjectModel from './project-model.js';

const TaskModel = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  targetCompletionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
        type: Sequelize.ENUM('Not Started', 'In Progress', 'Completed'),
        defaultValue: 'Not Started',
  },
  priority: {
    type: Sequelize.ENUM('Low', 'Medium','High'),
    defaultValue: 'Low',
  },
  label: {
    type: Sequelize.ENUM('Bug', 'Feature','Enhancement'),
    defaultValue: 'Feature',
  }
});


TaskModel.belongsTo(ProjectModel,  { foreignKey: 'project_id', as: 'project' });

export default TaskModel;
