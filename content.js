var tabletop = require('tabletop');

var videos_url = 'https://docs.google.com/spreadsheets/d/1QrN3Tj_PIY3jMPPvYvYRC9ZXCUUj6FTCAvu_7c3GPn4/pubhtml';

var entries = {};

function onLoad(data, tabletop) {
  console.log('pulled', data.length, 'entries from google spreadhseet');
  data.forEach(function(entry) {
	entries[entry.id] = entry;
  });
}

var options = {
  key: videos_url,
  callback: onLoad,
  simpleSheet: true
};

setInterval(function() { tabletop.init(options); }, 5000);

tabletop.init(options);

module.exports = entries;



