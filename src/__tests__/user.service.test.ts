import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user';

// Mock the UserRepository with proper instance methods
jest.mock('../repository/user.repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    createUser: jest.fn().mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    }),
  })),
}));

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Create a new instance of UserService and the mock repository
    userService = new UserService();
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const userData: Omit<User, 'id'> = {
        name: 'John Doe',
        email: 'john@example.com',
        // Include other required fields as per your User entity
      };
      const expectedUser: User = {
        id: 1,
        ...userData,
      };

      // Mock the createUser method to resolve with expectedUser
      mockUserRepository.createUser.mockResolvedValue(expectedUser);

      // Act
      const result = await userService.createUser(userData);

      // Assert
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(expectedUser);
    });
  });
});