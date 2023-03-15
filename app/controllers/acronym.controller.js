import * as models from '../models/index.js';
import * as util from '../util/index.js';
import { validationResult } from 'express-validator';

// Classes help to organize data with the procedures that operate on them 
// In this case, it allows for more reuse than copying functions
class AcronymController {

    static async get(req, res) {
        // Check for any validation errors
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({ message: `Could not get acronyms`, errors: validationErrors.array() });
        }

        // Run a query for all the acronyms on the current page, to the specified limit
        const acronyms = await models.Acronym
                            .find({acronym: new RegExp(req.query.search, "gi")})
                            .sort({acronym: 'descending'})
                            .skip((req.query.page - 1) * req.query.limit);
        
        const next = acronyms.length > req.query.limit ? util.misc.formatUrlFromRequest(req) : null;
        next && next.searchParams.set('page', req.query.page + 1);
        const results = acronyms.slice(0, req.query.limit + 1);

        res.json({page: req.query.page, objects: results.length, next: next, results: results});
    }

    static async create(req, res) {

        res.send('POST acronym');
    }

    static async update(req, res) {
        res.send('PATCH acronym');
    }

    static async delete(req, res) {
        res.send('DELETE acronym');
    }
}

export { AcronymController };
