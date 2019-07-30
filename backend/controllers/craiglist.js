const express = require('express');
const craigslist = require('node-craigslist');
const router = express.Router();

let client = new craigslist.Client({
  city : 'newyork'
});

router.get('/', async (req, res) => {
  let freeItems = await client.search({maxPrice: '0', hasPic: true}, 'free');
  let shortItems = [];
  for (i = 0; i < 12; i++) {
    let x = getRndInteger(0, freeItems.length - 1);
    if (!freeItems[x]) continue;

    let detailedItem = await client.details(freeItems[x]);
    if (!detailedItem.images) continue;
    shortItems.push({
      title: detailedItem.title,
      image: detailedItem.images[0],
      url: detailedItem.url
    });
  }
  res.json(shortItems.slice(0, 5));
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

module.exports = router;
