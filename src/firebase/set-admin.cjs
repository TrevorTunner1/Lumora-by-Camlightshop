const admin = require('firebase-admin');

const serviceAccount = require('./admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const uid = '2AvbTHcVteVNVJ4dijz3liqqddA2';  // ← from step 4

admin.auth().setCustomUserClaims(uid, { admin: true })
    .then(() => {
        console.log('Admin claim set successfully!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });