const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bootstrap = require('./helpers/bootstrap');
const Validators = require('./middlewares/Validators')
app.use(Validators.validateJSON);
app.use('/media',express.static('media'))
app.use('/assets',express.static('assets'))
var mongoose = require('mongoose');
const webRouter = require('./routes/web');


app.use('/',webRouter)
var db = mongoose.connection;
var mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_DB_PASS}@cluster0.95yz9.mongodb.net/apod_db?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then( async function() {
  console.log('connected to the mongo DB')
  await bootstrap.run()
  app.listen(3000, () => {
    console.log(`APOD app listening on port 3000`)
  })
}).catch(()=>{
  console.log("Error Starting App due to  Db connection error")
});
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
