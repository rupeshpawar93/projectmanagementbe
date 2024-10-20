'use strict'

import { DataTypes, Sequelize } from "sequelize";

export default (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
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
    return Task;
}
