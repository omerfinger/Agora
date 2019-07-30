const express = require('express');
const router = express.Router();
const item = require('../models/item');
const user = require('../models/user');
const message = require('../models/message');

router.post('/', (req, res, next) => {

        let newMessage = new message({
            fromUser: req.body.fromUser,
            toUser: req.body.toUser,
            title: req.body.title,
            content: req.body.content,
            create_time: new Date(),
            isRead: false,
            item: req.body.item
        });
        newMessage.save(err => {
            if (err) {
                console.error(err);
                res.json({ success: false, message: `Failed to create a new Message. Error: ${err}. req: ${req}` });
            }
            else {
                res.json({success:true, message: `Message Added successfully.`, message: newMessage});

                var index = -1;
                global.clients.find((client, i) =>{
                    if (client.id == req.body.toUser) {
                        index = i;
                        return true;
                    }
                });
                if (index != -1) {
                    global.io.sockets.connected[global.clients[index].socket].emit('newMessage', req.body.title);
                }
            }
        });
});

router.get('/:item_id', (req, res) => {
    message.getMessagesByItem(req.params.item_id, (err, messages) => {
        if(err) {
            res.json({success:false, message: `Failed to find messages by ID. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({ success: true, messages: messages }, null, 2));
            res.end();
        }
    })
});

router.get('/byUser/:username', (req, res) => {
    message.getMessagesByUsername(req.params.username)
        .then(messages => {
            res.write(JSON.stringify({ success: true, messages: messages }, null, 2));
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
});

router.get('/amount/:username', (req, res) => {
    message.totalMessagesAmount(req.params.username)
        .then(amount => {
            res.json({ amount });
        })
        .catch(err => {
            console.error(err);
            res.json({ amount: 0 });
        })
});

router.put('/markAsRead/:id', (req, res) => {
    message.findById({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json({ success: false, message: `Failed to find message to update. Error: ${err}` });
        }
        else {
            result.isRead = true;
            result.save((err) => {
                if (err) {
                    res.json({ success: false, message: `Failed to save updated message. Error: ${err}` });
                }
                else {
                    res.json({ success: true, message: "Message marked as read successfully." });
                }
            })
        }
    })
});

router.get('/all/all', (req, res) => {
    message.getAllMessages((err, allMessages) => {
        if (err) {
            res.json({ err });
        }
        else {
            res.json({ allMessages });
        }
    })
});


module.exports = router; 