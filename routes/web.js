const express = require('express');
const router = express.Router();
const path = require('path');
const webController = require('../controllers/webController')
const Validators = require('../middlewares/Validators');

router.get('/',(req,res,next) => {
  res.sendFile(path.join(__dirname,"../",'/index.html'));
})

router.post('/test',Validators.validateDate,(req,res,next) => {
    webController.getApod(req.body.date).then((result)=>{
      res.status(200)
      res.json(result)
    }).catch((error)=>{
      error.serverError ? res.status(500) : res.status(400) 
      res.json(error)
    })
})

module.exports =  router;