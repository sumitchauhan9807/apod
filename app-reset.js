require('dotenv').config()
const mongoose = require('mongoose')
const APODModel = require('./models/Apod');
const fs = require('fs');
const path = require('path');
const async = require('async');
const directory = 'assets/nasa_pictures';

var mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_DB_PASS}@cluster0.95yz9.mongodb.net/apod_db?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    resetApp();  
}).catch(()=>{
  console.log("Db connection error")
});


const resetApp = () =>{
  console.log("RESETTING APP")
  APODModel.collection.drop().then((err,obj)=>{
    console.log('ALL DOCUMENTS DELETED')
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      async.each(files,(file,callback)=>{
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
            console.log('FILE DELETED')
            callback();
          });
      }).then(()=>{
        console.log('APP FILES DELETED')
        process.exit()
      })
    });
  }).catch((error)=>{
    console.log(error)
  })
}
