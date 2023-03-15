import * as config from '../config/index.js';
import { validationResult } from 'express-validator'; 

// Given an express request object, this returns a string representing the complete url of that request
const formatUrlFromRequest = req => 
    new URL(`${req.protocol}://${req.hostname}:${process.env.API_PORT || config.defaults.DEFAULT_PORT}${req.originalUrl}`);

// This function takes an existing response object and a callback to run. If an error occurs when running the callback, it will
// Catch the error, set the response status code, message and errors, then return nothing. Otherwise it returns either the 
// Result of the function that was called, or true if the callback doesn't return anything. This way, we can return from the outer
// Function if there is an error in this function
const wrapError = async (res, toRun) => {
    try {
        return (await toRun()) || true;
    } catch(error) {
        res.status(500).json({message: 'An internal error occured', errors: [ error.toString() ]});
    }
}

// This is a specialized version of the function above for validation errors - it works the same way, except it takes a request and response and is not asyncronous
const wrapValidationError = (req, res, action = 'get') => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        res.status(400).json({ message: `Could not ${action} acronyms`, errors: validationErrors.array() });
    } else {
        return true;
    }
}

export { formatUrlFromRequest, wrapError, wrapValidationError };