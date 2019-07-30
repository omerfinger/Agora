const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    enum: ["Take", "Give"],
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
  color: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    required: true
  },
  location: {
    type: Object,
    require: true
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

const itemsList = module.exports = mongoose.model("item", itemSchema);

module.exports.getAllItems = (callback) => itemsList.find().populate("category").populate("username").exec(callback);

module.exports.getItemsByUser = (user_id, callback) => {
  let query = {
    username: user_id
  };
  return (itemsList.find(query).populate("category").populate("username").exec(callback));
}
