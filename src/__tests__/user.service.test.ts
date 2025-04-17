import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user';

// Mock do UserRepository
jest.mock('../repository/user.repository');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword'
  };

  beforeEach(() => {
    // Resetar todos os mocks antes de cada teste
    jest.clearAllMocks();
    
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService();
    // @ts-ignore - substituindo o repository pelo mock
    userService.repository = mockUserRepository;
  });

  describe('findByEmail', () => {
    it('deve retornar um usuário quando o email existe', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      
      const result = await userService.findByEmail('john@example.com');
      
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    });

    it('deve retornar null quando o email não existe', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      
      const result = await userService.findByEmail('nonexistent@example.com');
      
      expect(result).toBeNull();
    });

    it('deve lidar com erros do repositório', async () => {
      mockUserRepository.findByEmail.mockRejectedValue(new Error('Database error'));
      
      await expect(userService.findByEmail('john@example.com'))
        .rejects.toThrow('Database error');
    });
  });

  describe('getAllUsers', () => {
    it('deve retornar uma lista de usuários', async () => {
      const users: User[] = [mockUser];
      mockUserRepository.getAllUsers.mockResolvedValue(users);
      
      const result = await userService.getAllUsers();
      
      expect(result).toEqual(users);
      expect(result.length).toBe(1);
    });

    it('deve retornar uma lista vazia quando não há usuários', async () => {
      mockUserRepository.getAllUsers.mockResolvedValue([]);
      
      const result = await userService.getAllUsers();
      
      expect(result).toEqual([]);
    });

    it('deve lidar com erros do repositório', async () => {
      mockUserRepository.getAllUsers.mockRejectedValue(new Error('Database error'));
      
      await expect(userService.getAllUsers()).rejects.toThrow('Database error');
    });
  });

  describe('getUserById', () => {
    it('deve retornar um usuário quando o ID existe', async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      
      const result = await userService.getUserById(1);
      
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1);
    });

    it('deve retornar null quando o ID não existe', async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);
      
      const result = await userService.getUserById(999);
      
      expect(result).toBeNull();
    });

    it('deve lidar com erros do repositório', async () => {
      mockUserRepository.getUserById.mockRejectedValue(new Error('Database error'));
      
      await expect(userService.getUserById(1)).rejects.toThrow('Database error');
    });
  });

  describe('createUser', () => {
    const newUserData = {
      name: 'New User',
      email: 'new@example.com',
      password: 'newpassword'
    };

    it('deve criar e retornar um novo usuário', async () => {
      const createdUser: User = { id: 2, ...newUserData };
      mockUserRepository.createUser.mockResolvedValue(createdUser);
      
      const result = await userService.createUser(newUserData);
      
      expect(result).toEqual(createdUser);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(newUserData);
    });

    it('deve lidar com erros do repositório', async () => {
      mockUserRepository.createUser.mockRejectedValue(new Error('Database error'));
      
      await expect(userService.createUser(newUserData))
        .rejects.toThrow('Database error');
    });
  });

  describe('updateUser', () => {
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    };

    it('deve atualizar e retornar o usuário atualizado', async () => {
      const updatedUser: User = { ...mockUser, ...updateData };
      mockUserRepository.updateUser.mockResolvedValue(updatedUser);
      
      const result = await userService.updateUser(1, updateData);
      
      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith(1, updateData);
    });

    it('deve retornar null quando o usuário não existe', async () => {
      mockUserRepository.updateUser.mockResolvedValue(null);
      
      const result = await userService.updateUser(999, updateData);
      
      expect(result).toBeNull();
    });

    it('deve lidar com erros do repositório', async () => {
      mockUserRepository.updateUser.mockRejectedValue(new Error('Database error'));
      
      await expect(userService.updateUser(1, updateData))
        .rejects.toThrow('Database error');
    });
  });

  describe('deleteUser', () => {
    it('deve retornar true quando o usuário é deletado com sucesso', async () => {
      mockUserRepository.deleteUser.mockResolvedValue(true);
      
      const result = await userService.deleteUser(1);
      
      expect(result).toBe(true);
      expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(1);
    });

    it('deve retornar false quando o usuário não existe', async () => {
      mockUserRepository.deleteUser.mockResolvedValue(false);
      
      const result = await userService.deleteUser(999);
      
      expect(result).toBe(false);
    });

    it('deve lidar com erros do repositório', async () => {
      mockUserRepository.deleteUser.mockRejectedValue(new Error('Database error'));
      
      await expect(userService.deleteUser(1)).rejects.toThrow('Database error');
    });
  });
});