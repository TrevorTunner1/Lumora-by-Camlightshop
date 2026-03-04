const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const DANIEL_UID = 'h6p44CAAPRdKQ17Ybs7ejbTUiiV2';

async function run() {
    console.log('Setting claim...');
    await admin.auth().setCustomUserClaims(DANIEL_UID, { admin: true });

    console.log('Waiting 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const user = await admin.auth().getUser(DANIEL_UID);
    console.log('Claims after set:', user.customClaims);
}

run().catch(console.error);