const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: { type: String, required: true, unique: true }
});

const categoriesList = module.exports = mongoose.model("category", categorySchema);
module.exports.getCategoryByName = (name) => {
    return new Promise((resolve, reject) => {
        categoriesList.findOne({ name }, (err, category) => {
            if (err) {
                reject(new Error(err));
            }
            else {
                resolve(category);
            }
        });
    });
};