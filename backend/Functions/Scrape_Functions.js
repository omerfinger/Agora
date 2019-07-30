var Scrape = require('../Functions/scrape');
const AhoCorasick = require('../../../node_modules/aho-corasick-node');

module.exports = {

  createScrape: function (searchval) {
    let scrape = new Scrape({ searchval: searchval })
    scrape.save()
  },
  searchScrape: function (keywords, callback) {
    const builder = AhoCorasick.builder();
    const hits = [];
    var details = [];
    Scrape.find({}, function (err, res) {
      if (err) return console.error(err)
      else {
        var lensearch = res.length;
        keywords.forEach(k => builder.add(k));
        const ac = builder.build();
          for (var j = 0; j < lensearch; j++) {
            text = anchors[j].product
            if (ac.match(text).length != 0) {
              hits.push(ac.match(text));
              details.push( anchors[j])
            }
        }
        return callback(details)
      }
    })
  }
};
