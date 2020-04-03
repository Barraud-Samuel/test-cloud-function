const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const db  = admin.firestore();
const authEndpoint  = require('./auth.js');
const api  = require('./api/index.js');

exports.authEndpoint = authEndpoint.createUserRecord;
exports.api = api.api;

exports.helloWorld = functions.https.onRequest((request, response) => {

  const name = request.query.name;

  if (!name) {
    response.status(400).send('you must supplie a name');
  }else{
    response.send(`Hello from ${name}!`);
  }
});

