var request = require('request');
var cheerio = require('cheerio');

const mongoose = require('mongoose');
const config = require('../config/database');
const scarping = require('../models/scarping')


// Connect mongoose to our database

mongoose.connect('mongodb+srv://shoval:Aa123456!@cluster0-z9f1w.mongodb.net/test?retryWrites=true');
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected - MongoDB');


  getProducts();


});


function getProducts() {
    request('https://newyork.craigslist.org/d/lost-found/search/laf', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            var anchors = [];
            var links = $('.result-title.hdrlnk');
            links.each(function (i, link) {
              anchors[i] = $(link).text();
              
              //console.log(anchors[i]);

                let product = new scarping({ name: anchors[i] })
                product.save()
              //if (i == 6) return false; 
            });
          }
    });
    }
