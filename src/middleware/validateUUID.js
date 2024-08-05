const { validate: uuidValidate } = require('uuid');

function validateUUID(req, res, next) {
    const id = req.params.id;
    if (!uuidValidate(id)) {
        return res.status(400).json({ error: '"id" must be a valid GUID' });
    }
    next();
}

module.exports = validateUUID;