const request = require('request');
const fs = require('fs');
const path = require('path');
const Helpers = require('../helpers/webHelpers'); 
const APODModel = require('../models/Apod');

const getApod = async (date) =>{ 
  date = formatDate(date) 
  var data = await APODModel.checkDateExists(date)
  if(!data) {
    console.log("no data found")
    var apiData = await getPictureFromAPI(date)
    if(apiData.error) {
      return Promise.reject({
        serverError:true,
        message:'Server Error (Third Party api error)'
       });
    }
    var fileDownloadProcess = await saveNASAImage(apiData.data)
    if(fileDownloadProcess){
      APODModel.saveData(apiData.data)
      return prepareResponse(apiData.data);
    }
    return Promise.reject({
      serverError:true,
      message:'Internal Server Error (Image not found)'
    });
  }
  data.date = formatDate(data.date)
  return prepareResponse(data)
}


const getPictureFromAPI = (date) => {
  return new Promise((resolve,reject)=>{
    request(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.NASA_API_KEY}`, function (error, response, body) {
      if(error) {
        return resolve({
          error:true,
          message : "There was an error"
        })
      }
      if(response.statusCode === 200){
        return resolve({
          error:false,
          data:JSON.parse(body)
        })
      }
      if(response.statusCode === 400){
        return resolve({
          error:true,
          message: 'there was some error'
        })
      }
    });
  })
}

const saveNASAImage = async (apiData) =>{
  console.log(apiData)
  return new Promise((resolve,reject)=>{
    if(apiData.media_type == 'image') {
      var title = `nasa-${apiData.date}`
      console.log(title,"titleishere")
      Helpers.download(apiData.url, title, function(result){
        resolve(result)
      });
    } else {
      resolve('video-notseve')
    }
  })
}



const prepareResponse = (data) =>{
  var url = data.media_type == 'image' ? `nasa-${data.date}.png`  : data.url
    return {
      url:url,
      title:data.title,
      copyright:data.copyright,
      explanation:data.explanation,
      media_type:data.media_type,
      date:formatDate(data.date)
    }
}
const formatDate = (timestamp) => {
  timestamp = new Date(timestamp)
  return `${timestamp.getFullYear()}-${(timestamp.getMonth()+1).toString().padStart(2, "0")}-${(timestamp.getDate()).toString().padStart(2, "0")}`
}

module.exports = {
  getApod:getApod
}