import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import * as util from './app/util/index.js'; 
import * as config from './app/config/index.js';

// Create our express app
const app = express();

// Enable cors middleware and start using our routes
app.use(cors());
app.use(config.routes);

(async () => {
    await util.database.connectToDatabase();
    app.listen(process.env.API_PORT || config.defaults.DEFAULT_PORT, () => console.log('Backend Started'))
})();
