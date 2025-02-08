import * as admin from 'firebase-admin';

const app = admin.initializeApp({
    projectId: 'ebuddy-e0146'
});

export const db = admin.firestore(app);
export const auth = admin.auth(app);