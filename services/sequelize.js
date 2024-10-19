
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

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

sequelize.authenticate().then(async (db) => {
    console.log('Connection has been established successfully.');
    // Synchronize the model with the database
    sequelize.sync({ alter: true })
    .then(() => {
    console.log('Event model synced with database');
    })
    .catch((err) => {
    console.error('Error syncing Event model with database:', err);
    });
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


export default sequelize;

