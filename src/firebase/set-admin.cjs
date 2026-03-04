// const admin = require('firebase-admin');
// const serviceAccount = require('./admin.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// async function debugClaims() {
//     try {
//         const daniel = await admin.auth().getUser('h6p44CAAPRdKQ17Ybs7ejbTUiiV2');
//         const trevor = await admin.auth().getUser('2AvbTHcVteVNVJ4dijz3liqqddA2');

//         console.log('Daniel →', {
//             uid: daniel.uid,
//             email: daniel.email,
//             customClaims: daniel.customClaims || 'NO CLAIMS'
//         });

//         console.log('Trevor →', {
//             uid: trevor.uid,
//             email: trevor.email,
//             customClaims: trevor.customClaims || 'NO CLAIMS'
//         });
//     } catch (err) {
//         console.error('Error fetching users:', err);
//     }
// }

// debugClaims();

const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const adminUIDs = [
    '2AvbTHcVteVNVJ4dijz3liqqddA2',
    'h6p44CAAPRdKQ17Ybs7ejbTUiiV2'
];

Promise.all(
    adminUIDs.map(uid =>
        admin.auth().setCustomUserClaims(uid, { admin: true })
    )
)
    .then(() => {
        console.log('All admin claims set successfully!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });