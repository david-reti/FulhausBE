import * as models from '../models/index.js';

// Classes help to organize data with the procedures that operate on them 
// In this case, it allows for more reuse than copying functions
class AcronymController {
    static async get(req, res) {
        res.send('GET acronym');
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
