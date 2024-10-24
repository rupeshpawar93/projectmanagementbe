
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
// Initialize all models
import { User, Task, Project, ProjectUser } from '../models/index.js';

config();
const __dirname = process.cwd();
const sequelize = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

const UserModel = User(sequelize, Sequelize.DataTypes);
const TaskModel = Task(sequelize, Sequelize.DataTypes);
const ProjectModel = Project(sequelize, Sequelize.DataTypes);
const ProjectUserModel = ProjectUser(sequelize, Sequelize.DataTypes);

sequelize.authenticate().then(async (db) => {
    console.log('Connection has been established successfully.');
    
    ProjectModel.belongsTo(UserModel, { foreignKey: 'created_by'});
    TaskModel.belongsTo(ProjectModel,  { foreignKey: 'project_id' , as: 'project'});
    TaskModel.belongsTo(UserModel,  { foreignKey: 'created_by'});
    TaskModel.belongsTo(UserModel,  { foreignKey: 'assigned_to', allowNull: true });
    ProjectModel.hasMany(TaskModel, {
        foreignKey: 'project_id',
        as: 'tasks',
        onDelete: 'CASCADE'
      });
    ProjectModel.belongsToMany(UserModel, { through: ProjectUserModel, foreignKey: 'project_id', onDelete: 'CASCADE' });
    UserModel.belongsToMany(ProjectModel, { through: ProjectUserModel, foreignKey: 'user_id' });

    // Synchronize the model with the database
    await sequelize.sync({ alter: true })
    console.log('Models synced with database');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


export { sequelize, UserModel, ProjectModel, TaskModel, ProjectUserModel} ;

