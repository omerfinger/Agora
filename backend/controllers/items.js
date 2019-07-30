const express = require('express');
const router = express.Router();
const item = require('../models/item');
const user = require('../models/user');
const message = require('../models/message');
const category = require('../models/category');

router.get('/', (req, res) => {
    item.getAllItems((err, items) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all items. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, items: items }, null, 2));
            res.end();
        }
    });
});

router.get('/byUser/:user_id', (req, res) => {
    item.getItemsByUser(req.params.user_id, (err, items) => {
        if (err) {
            res.json({ success: false, message: `Failed to load items by user ${req.params.user_id}. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, items: items }, null, 2));
            res.end();
        }
    });
});

router.get('/search/:name-:kind-:category-:time', (req, res) => {
    category.getCategoryByName(req.params.category).then(category_id => { 
        var name = req.params.name;
        var kind = req.params.kind;
        var time = req.params.time;
        if (time == 'undefined') {
            time = {"$gte": new Date(1900, 1, 1)}
        }
        if (name == 'undefined') {
            name = "";
        }
        item.find({name: new RegExp('.*'+name+'.*', "i"),
        kind: kind,
        category: category_id,
        create_time: time
        }).populate("category").populate("username").exec((err, items) => {
            if(err){
                res.json({ success: false, message: `Failed to load searced items. Error: ${err}` });
            }
            else {
                res.write(JSON.stringify({ success: true, items: items }, null, 2));
                res.end();
            }
        });
    });  
});


router.post('/', (req, res, next) => {
    category.getCategoryByName(req.body.category).then(category => {
        let newItem = new item({
            name: req.body.name,
            description: req.body.description,
            kind: req.body.kind,
            category: category,//await category.getCategoryByName(req.body.category),
            color: req.body.color,
            create_time: req.body.create_time,
            location: req.body.location,
            username: req.body.username
        });
        let username = req.body.username;
        newItem.save(err => {
            if (err) {
                console.error(err);
                res.json({ success: false, message: `Failed to create a new item. Error: ${err}. req: ${req}` });
            }
            else {
                user.addItemToUser(newItem, username, (err) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                    else {
                        res.json({ success: true, message: "Added successfully.", item: newItem.populate("username") });
                    }
                })
            }
        });

    })
});

router.put('/:id', (req, res) => {
    item.findById({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json({ success: false, message: `Failed to find item to update. Error: ${err}` });
        }
        else {
            result.name = req.body.name;
            result.description = req.body.description;
            result.color = req.body.color;
            result.create_time = req.body.create_time;
            result.location = req.body.location;
            result.save(err => {
                if (err) {
                    res.json({ success: false, message: `Failed to save updated item. Error: ${err}` });
                }
                else {
                    res.json({ success: true, message: "Item updated successfully." });
                }
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    item.deleteOne({ _id: id }, err => {
        if (err)
            res.json({ success: false, message: `Failed to delete item. Error: ${err}` });
        else {
            message.deleteMany({item: id}, err => { if(err) {console.log(err)} });
            res.sendStatus(200);
        }    
    });
});

router.get('/itemsByCategory', (req, res) => {
    item.aggregate([
    {
        $group: {
            _id: "$category",
            count: { $sum: 1 }
        }
    }]).exec(
        (err, result) => {
            if (err) {
                next(err);
            } else {
                category.populate(result, {path: '_id'}, (err, popResult) => {
                    res.write(JSON.stringify({ data: popResult}));
                    res.end();
                })
            }
        });
})

module.exports = router;