import { db } from '../config/firebaseConfig';
import { User, UpdateUserRequest } from '../entities/user';
import { logger } from 'firebase-functions';

export class UserRepository {
  private collection = db.collection('USERS');

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