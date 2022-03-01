const path = require('path');
const request = require('request')
const fs = require('fs')



var download = function(uri, filename, callback) {
  var thisFilePath = path.join(__dirname,"../","assets/nasa_pictures/"+filename+".png")
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    // thisFilePath = 'https://apod.nasa.gov/apod/image/2112/LeonardSpace_Yangwang1_960_annotateddd.jpg'
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