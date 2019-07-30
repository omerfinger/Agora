const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
    fromUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
    toUser: { type: Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, require: true },
    content: { type: String, required: true },
    create_time: { type: Date, required: true },
    isRead: { type: Boolean, required: true },
    item: { type: Schema.Types.ObjectId, ref: "item", required: true }
});

const messagesList = module.exports = mongoose.model("message", messageSchema);

module.exports.getMessagesByUsername = (username) => {
    return new Promise((resolve, reject) => {
        let query = { toUser: username };
        messagesList.find(query)
            .populate("fromUser")
            .populate("toUser").populate("item").exec((err, messages) => {
                if (err) {
                    reject(new Error(err));
                }
                else {
                    resolve(messages);
                }
            });
    });
};

module.exports.getAllMessages = (callback) => {
    return (messagesList.find().populate("fromUser").populate("toUser").populate("item").exec(callback));
} 

module.exports.getMessagesByItem = (item_id, callback) => {
    let query = { item: item_id };
    return (messagesList.find(query).populate("fromUser").populate("toUser").exec(callback));
}

module.exports.totalMessagesAmount = (username) => {
    return new Promise((resolve, reject) => {
        messagesList.getMessagesByUsername(username).then(messages => {
            resolve(messages.filter(message => (message.isRead == false)).map(msg => 1).reduce((sum, currentMsg) => sum + currentMsg));
        }).catch(reject)
    })
} 