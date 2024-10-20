'use strict'

import { DataTypes, Sequelize } from "sequelize";

export default (sequelize, DataTypes) => {
    const ProjectUser = sequelize.define('ProjectUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'Project',
        key: 'id',
        },
        onDelete: 'CASCADE',
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'User',
        key: 'id',
        },
        onDelete: 'CASCADE',
    },
    }, {
    timestamps: true,
    }
    );
    return ProjectUser;
}

