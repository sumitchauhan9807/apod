const path = require('path');

const makeDir = () =>{
  var fs = require('fs');
  var dir = path.join(__dirname,"../","assets/nasa_pictures");
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}

const runBootstrapFunctions = () =>{
  return new Promise((resolve,reject)=>{
    makeDir()
    resolve()
  })
}

module.exports = {
  run:runBootstrapFunctions
}