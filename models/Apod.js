var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var APOD = new Schema({
  url: {
    required:true,
    type: String,
  },
  date: {
    required:true,
    type:Date
  },
  copyright:{
    type:String 
  },
  explanation:{
    type:String
  },
  media_type:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  }
},{timestamps: true});

var APODModel = mongoose.model('apod', APOD );

APODModel.checkDateExists = (date) =>{
  return new Promise((resolve,reject)=>{
    APODModel.findOne({date: date}, function(err,obj) { 
        if(obj){
         return resolve(obj.toObject())
        }
        resolve(null)
    });
  })
}

APODModel.saveData = (apiData) =>{
  return new Promise((resolve,reject)=>{
      var url = apiData.media_type == 'image' ? `nasa-${apiData.date}`  : apiData.url
      var apod = new APODModel({
          url:url,
          date:apiData.date,
          title:apiData.title,
          copyright:apiData.copyright,
          explanation:apiData.explanation,
          media_type:apiData.media_type
      })
      apod.save();
  })
}
module.exports = APODModel