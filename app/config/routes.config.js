import express from "express";
import { body, query } from 'express-validator';
import * as config from '../config/index.js';
import * as controllers from '../controllers/index.js';

const routes = express.Router();

routes.route('/acronym')
    .get(
        query('search').default(config.defaults.DEFAULT_SEARCH).escape(), 
        query('page').default(config.defaults.DEFAULT_PAGE).isInt({min: 1}).toInt(), 
        query('limit').default(config.defaults.DEFAULT_RESULT_LIMIT).isInt({min: 1, max: 100}), 
        controllers.AcronymController.get)
    .post(
        body('acronym').notEmpty().escape(),
        body('definition').notEmpty().escape(),
        controllers.AcronymController.create)
    .patch(
        body('acronym').notEmpty().escape(),
        body('definition').escape(),
        controllers.AcronymController.update)
    .delete(
        body('acronym').notEmpty().escape(),
        controllers.AcronymController.delete);

export { routes };
