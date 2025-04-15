import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user';

export class UserService {
  private repository = new UserRepository();

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.repository.getUserById(id);
  }

  async createUser(data: Omit<User, 'id'>): Promise<User> {
    return this.repository.createUser(data);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    return this.repository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.repository.deleteUser(id);
  }
}