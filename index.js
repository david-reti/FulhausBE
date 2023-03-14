import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import router from './app/config/routes.js';
import * as util from './app/util/index.js'; 

// Create our express app
const app = express();

// Enable cors middleware and start using our routes
app.use(cors());
app.use(router);

(async () => {
    console.log('Starting backend...');
    await util.connectToDatabase();

    // Listen on the configured port, or 3000 by default
    app.listen(process.env.API_PORT || 3000, () => console.log('Backend Started'))
})();
