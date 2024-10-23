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
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      label: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      }
    });
    return Task;
}
