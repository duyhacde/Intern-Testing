const ObjectId = require("mongoose").Types.ObjectId;

const validateDbId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(400).json({
            message: `Given object id (${req.params.id}) is not valid.`,
        });
    else next();
};

const validateBody = (req, res, next) => {
    let currentDate = new Date().setHours(0, 0, 0, 0);
    let requestDate = new Date(req.body.dueDate).setHours(0, 0, 0, 0);

    if (!req.body.title)
        res.status(400).json({
            message: "Task title is required",
        });
    else if (!isNaN(requestDate) && requestDate < currentDate)
        res.status(400).json({
            message: "The expiration date must not be a past day",
        });
    else next();
};

const validateResDate = (req, res, next) => {
    let currentDate = new Date().setHours(0, 0, 0, 0);
    let requestDate = new Date(req.body.dueDate).setHours(0, 0, 0, 0);

    if (!isNaN(requestDate) && requestDate < currentDate)
        res.status(400).json({
            message: "The expiration date must not be a past day",
        });
    else next();
};

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        message: `No record with _id ${req.params.id}.`,
    });
};

const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: err });
};

module.exports = {
    errorHandler,
    validateDbId,
    validateBody,
    validateResDate,
    raiseRecord404Error,
};
