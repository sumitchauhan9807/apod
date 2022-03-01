exports.validateDate = (req,res,next)=>{
  var timestamp = Date.parse(req.body.date);
    if(timestamp) {
      if(new Date(timestamp).toJSON() > new Date().toJSON()) {
        res.status(400);
        return res.send({
          message:'Date should be a previous date'
        })
      }
      next()
      return;
    }
     res.status(400);
     return res.send({
       message:'invalid date'
     })
  }


  exports.validateJSON = (err, req, res, next) =>{
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
         res.status(400);
         res.send({
           message: "invalid json"
         })
    }
    next();
  }