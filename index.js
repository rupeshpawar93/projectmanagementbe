'use strict'

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser'
import Routes from './routes/index.js'
import { configDotenv } from 'dotenv';
import { constantVariables } from './utilties/index.js';
import { verifyToken } from './middlewares/auth.js';
import { sequelize } from './services/index.js';
configDotenv();

const app = express();
const port = process.env.PORT ?? constantVariables.PORT;

// CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || constantVariables.ALLOW_CORS_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: constantVariables.ALLOW_CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    BODY_LIMIT: '100kb', // Adjust as needed
    allowedHeaders: 'Content-Type,Authorization',
};

// Middleware Initializations
app.use(cors(corsOptions))
app.use(compression());
app.use(bodyParser.json({ limit: constantVariables.BODY_LIMIT }))
app.use(bodyParser.urlencoded({ limit: constantVariables.BODY_LIMIT, extended: true }))
app.use(helmet())
app.use(verifyToken);


// Initialize Routes
Routes.init(app);

app.listen(port, () => {
    console.log(`backend service is running in port: ${port}`);
})





