import * as config from '../config/index.js';

// Given an express request object, this returns a string representing the complete url of that request
const formatUrlFromRequest = req => 
    new URL(`${req.protocol}://${req.hostname}:${process.env.API_PORT || config.defaults.DEFAULT_PORT}${req.originalUrl}`);

export { formatUrlFromRequest };