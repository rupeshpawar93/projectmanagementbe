'use strict'

import { DataTypes, Sequelize } from "sequelize";

export default (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
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
  return Project
};
