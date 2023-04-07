const express = require("express");
const router = express.Router();

const Task = require("../models/task.model");
const { generateCrudMethods } = require("../services");
const {
    validateDbId,
    validateBody,
    validateResDate,
    raiseRecord404Error,
} = require("../middlewares");
const taskCrud = generateCrudMethods(Task);

router.get("/", (req, res, next) => {
    taskCrud
        .getAll()
        .then((data) => res.send(data))
        .catch((err) => next(err));
});

router.get("/:id", validateDbId, (req, res, next) => {
    taskCrud
        .getById(req.params.id)
        .then((data) => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch((err) => next(err));
});

router.post("/", validateBody, (req, res, next) => {
    taskCrud
        .create(req.body)
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));
});

router.put("/:id", validateDbId, validateResDate, (req, res, next) => {
    taskCrud
        .update(req.params.id, req.body)
        .then((data) => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch((err) => next(err));
});

router.delete("/delete-many/:idArr", (req, res, next) => {
    taskCrud
        .multipleDelete(req.params.idArr.split(","))
        .then((data) => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch((err) => next(err));
});

router.delete("/:id", validateDbId, (req, res, next) => {
    taskCrud
        .singleDelete(req.params.id)
        .then((data) => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch((err) => next(err));
});

module.exports = router;
