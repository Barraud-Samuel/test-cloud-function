const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./service-account");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://tuto-cloud-functions.firebaseio.com"
});

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


exports.gameCount = functions.firestore.document('users/{qsdfsd}').onCreate(async(snapshot, context)=>{
  const data = snapshot.data();
  const userRef = db.doc(`books/${data.uid}`);
  const userSnap = await userRef.get();
  const userData = userSnap.data();

  return userRef.update({
    gameCount: userData.gameCount + 1,
    testmdr: data
  });
});

exports.userTrend = functions.firestore.document(`games/{gameID}`).onUpdate((snapshot,context)=>{
  const before = snapshot.before.data();
  const after = snapshot.after.data();

  let trend;
  if (after.score >= before.score) {
    trend = 'you are improving';
  }else{
    trend = 'you are on the decline';
  }

  const userRef = db.doc(`users/${after.uid}`);
  return userRef.update({
    trend
  });
});