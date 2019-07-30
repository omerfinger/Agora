const express = require('express');
const craigslist = require('node-craigslist');
const router = express.Router();

let client = new craigslist.Client({
  city : 'newyork'
});

router.get('/', (req, res) => {
  client.search({maxPrice: '0'}, 'free').then((freeItems) => {
    let shortItems = [];
    for (let i = 0; i < 10; i++) {
      let x = getRndInteger(0, freeItems.length - 1);
      shortItems.push({
        title: freeItems[x].title,
        url: freeItems[x].url
      });
    }
    res.json(shortItems);
  });
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

module.exports = router;
