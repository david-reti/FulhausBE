import * as models from '../models/index.js';
import * as util from '../util/index.js';

// Classes help to organize data with the procedures that operate on them 
// In this case, it allows for more reuse than copying functions
class AcronymController {
    static async get(req, res) {
        // Check for any validation errors
        if(!util.misc.wrapValidationError(req, res))
            return;

        // Run a query for all the acronyms on the current page, to the specified limit
        const acronyms = await util.misc.wrapError(res, async () =>
            await models.Acronym
                .find({acronym: new RegExp(req.query.search, "gi")})
                .sort({acronym: 'ascending'})
                .skip((req.query.page - 1) * req.query.limit)
        );
        if(!acronyms) return;

        // Find the URL of the next page, if there are more acronyms than the ones on the current page
        const next = acronyms.length > req.query.limit ? util.misc.formatUrlFromRequest(req) : null;
        next && next.searchParams.set('page', req.query.page + 1);
        const results = acronyms.slice(0, req.query.limit + 1);

        res.json({page: req.query.page, objects: results.length, next: next, results: results});
    }

    static async create(req, res) {
        // Check for any validation errors
        if(!util.misc.wrapValidationError(req, res, 'create'))
            return;
        
        // Create a new acronym object and attempt to save it
        if(!await util.misc.wrapError(res, async () => 
                await models.Acronym.create({acronym: req.body.acronym, definition: req.body.definition})))
                    return;
        
        res.status(201).json({message: 'Acronym created successfully'});
    }

    static async update(req, res) {
        // Check for any validation errors
        if(!util.misc.wrapValidationError(req, res, 'update'))
            return;

        // The acronym value is always provided - if the definition is also provided, add it to the updated value
        const newValue = { acronym: req.body.acronym };
        newValue.definition = req.body.definition ? req.body.definition : undefined;

        if(!await util.misc.wrapError(res, async () =>
                await models.Acronym.updateOne({acronym: req.body.acronym}, newValue)))
                    return;

        res.json({message: 'Acronym updated successfully'});
    }

    static async delete(req, res) {
        if(!util.misc.wrapValidationError(req, res, 'delete'))
            return;

        // Attempt to delete the supplied acronym
        if(!await util.misc.wrapError(res, async () =>
                await models.Acronym.deleteOne({acronym: req.body.acronym})))
                    return;

        res.json({message: 'Acronym deleted successfully'});
    }
}

export { AcronymController };
