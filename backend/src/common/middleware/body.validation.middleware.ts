import { RequestHandler } from "express";
import { validationResult } from "express-validator"

class BodyValidationMiddleware {
    /**
     * Verify body fields using 
     * express-validator functions
     */
    verifyBodyFieldsErrors: RequestHandler = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()})
        }
        return next();
    }
}

export default new BodyValidationMiddleware();