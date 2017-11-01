const functions = require('firebase-functions');

const azureStorageAddAcount = require('./azure_storage_add_account')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.azureStorageAddAcount = functions.https.onRequest(azureStorageAddAcount)