import express from "express";
import * as controllers from '../controllers/index.js';

const router = express.Router();

router.route('/acronym')
    .get(controllers.AcronymController.get)
    .post(controllers.AcronymController.create)
    .patch(controllers.AcronymController.update)
    .delete(controllers.AcronymController.delete);

export default router;
