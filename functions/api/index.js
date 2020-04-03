const functions = require('firebase-functions');
const express =  require('express');
const cors = require('cors');

//express stuff
const auth = (request, response, next)=>{
  if (!request.header.authorization) {
      response.status(400).send('unauthorized')
  }
  next()
}

const app = express();
app.use(cors({origin:true}));

app.get('/cat',(req,res)=>{
  res.send('cat')
});
app.use(auth);
app.get('/dog',(req,res)=>{
  res.send('dog')
});

exports.api = functions.https.onRequest(app)