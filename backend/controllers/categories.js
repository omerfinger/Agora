const express = require('express');
const router = express.Router();
const category = require('../models/category');

router.get('/', (req, res) => {
    category.find((err, categories) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.post('/', (req, res, next) => {
    let newCategory = new category({
        name: req.body.name
    });
    newCategory.save((err, newCategory) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.delete('/:name', (req, res, next) => {
    let name = req.params.name;
    category.deleteOne({ name: name }, err => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    })
});

module.exports = router;