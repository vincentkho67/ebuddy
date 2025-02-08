import { db } from '../config/firebaseConfig';
import { User, UpdateUserRequest } from '../entities/user';
import { logger } from 'firebase-functions';

export class UserRepository {
  private collection = db.collection('USERS');

  async getAllUsers(pageSize: number = 10, lastDoc?: any) {
    try {
      const countSnapshot = await this.collection.count().get();
      const total = countSnapshot.data().count;

      let query = this.collection
        .orderBy('totalAverageWeightRatings', 'desc')  
        .orderBy('numberOfRents', 'desc')              
        .orderBy('recentlyActive', 'desc')          
        .limit(pageSize);

      if (lastDoc) {
        const lastDocRef = await this.collection.doc(lastDoc).get();
        if (lastDocRef.exists) {
          query = query.startAfter(lastDocRef);
        }
      }

      const snapshot = await query.get();
      const users: User[] = [];
      
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data() as Omit<User, 'id'>
        });
      });

      const lastVisible = snapshot.docs.length > 0 ?
        snapshot.docs[snapshot.docs.length - 1].id :
        null;

      return {
        users,
        lastDoc: lastVisible,
        total
      };
    } catch (error) {
      logger.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<User | null> {
    try {
      const doc = await this.collection.doc(userId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() as Omit<User, 'id'> };
    } catch (error) {
      logger.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUser({ userId, data }: UpdateUserRequest): Promise<User> {
    try {
      await this.collection.doc(userId).update(data);
      const updated = await this.getUser(userId);
      if (!updated) throw new Error('User not found after update');
      return updated;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }
}