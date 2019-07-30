const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const item = require('./item');
const userSchema = Schema({
  username: {
    type: String,
    required: false,
    unique: false
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    require: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: "item",
    default: () => {
      return [];
    },
    required: false
  }]
});

const usersList = module.exports = mongoose.model("user", userSchema);


module.exports.getAllUsers = (callback) => usersList.find().populate({
  path: 'items',
  populate: {
    path: 'category',
    model: 'category'
  }
}).exec(callback);

module.exports.getUserByMailAndPassword = (mail, password, callback) => {
  let query = {
    mail: mail,
    password: password
  };
  return (usersList.findOne(query).populate("items").exec(callback));
}

module.exports.getUserByID = (id, callback) => {
  let query = {
    _id: id
  };
  return (usersList.findOne(query).populate("items").exec(callback));
}

module.exports.editUser = (editedUser, callback) => usersList.findOneAndUpdate({
  mail: editedUser.mail
}, editedUser, {
  upsert: true,
  new: true,
  runValidators: true
}, callback);

module.exports.addUser = (newUser, callback) => newUser.save(callback);

//TODO: remove all users' items
module.exports.deleteUserByMail = (mail, callback) => {
  usersList.findOne({
    mail
  }, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      //TODO: fix removing all items by refrences
      user.items.forEach(currentItem => {
        item.remove({
          _id: currentItem._id
        });
      })
      usersList.remove({
        mail
      }, callback);
    }
  })
}


module.exports.getUsers = (usernames) => {
  return new Promise((resolve, reject) => {
    const query = {
      'username': {
        '$in': usernames
      }
    };
    usersList.find(query, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users.sort((user1, user2) => {
          let index1 = usernames.findIndex(elem => elem == user1.username);
          let index2 = usernames.findIndex(elem => elem == user2.username);
          return index1 - index2;
        }));
      }
    })
  });
}

module.exports.addItemToUser = (item, mail, callback) => {
  usersList.findOne({
    mail
  }, (err, user) => {
    if (err || !user || !user.items) {
      console.error(err);
      callback(err);
    } else {
      user.items.push(item);
      user.save(callback);
    }
  })
}
