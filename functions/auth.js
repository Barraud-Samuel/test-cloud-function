const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db  = admin.firestore();

exports.createUserRecord = functions.auth.user().onCreate((user,context) =>{
  const userRef = db.doc(`users/${user.uid}`);

    return  userRef.set({
      name:user.displayName,
      cratedAt:context.timestamp,
      nickname:'samuel'
    });
});