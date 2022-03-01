const path = require('path');
const request = require('request')
const fs = require('fs')



var download = function(uri, filename, callback) {
  var thisFilePath = path.join(__dirname,"../","assets/nasa_pictures/"+filename+".png")
  request.head(uri, function(err, res, body) {
    var file = request(uri).pipe(fs.createWriteStream(thisFilePath))
    file.on('close', ()=>{
      callback(true)
    });
    file.on('error', function(err) {
      callback(false)
      file.end();
    });
  });
};



module.exports = {
  download:download
}