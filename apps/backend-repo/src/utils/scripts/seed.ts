import * as admin from 'firebase-admin';

console.log('Starting seed process...');
console.log('Setting up emulator connection...');

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
console.log('FIRESTORE_EMULATOR_HOST:', process.env.FIRESTORE_EMULATOR_HOST);

console.log('Initializing Firebase app...');
const app = admin.initializeApp({
    projectId: 'ebuddy-e0146'
});

const db = admin.firestore(app);

async function seedUsers() {
  try {
    const users = [
      {
        id: 'user1',
        totalAverageWeightRatings: 4.3,
        numberOfRents: 30,
        recentlyActive: 1738938812
      },
      {
        id: 'user2',
        totalAverageWeightRatings: 4.3,
        numberOfRents: 30,
        recentlyActive: 1738679612
      },
      {
        id: 'user3',
        totalAverageWeightRatings: 4.3,
        numberOfRents: 28,
        recentlyActive: 1738679612
      }
    ];

    console.log('Starting to seed users...');
    console.log('Connected to Firestore at:', process.env.FIRESTORE_EMULATOR_HOST);
    
    const beforeSnapshot = await db.collection('USERS').get();
    console.log('Current users in database:', beforeSnapshot.size);
    
    const batch = db.batch();
    
    for (const user of users) {
      const { id, ...userData } = user;
      console.log(`Preparing user ${id} with data:`, userData);
      const docRef = db.collection('USERS').doc(id);
      batch.set(docRef, userData);
    }

    console.log('Committing batch write...');
    await batch.commit();
    
    console.log('Verifying seeded data...');
    const afterSnapshot = await db.collection('USERS').get();
    console.log(`Total users after seeding: ${afterSnapshot.size}`);
    
    afterSnapshot.forEach(doc => {
      console.log('Seeded document:', doc.id, doc.data());
    });

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  } finally {
    console.log('Seed process completed.');
    setTimeout(() => process.exit(0), 1000);
  }
}

seedUsers().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});