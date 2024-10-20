import { createMock } from '@golevelup/ts-jest';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model } from 'mongoose';
import { User } from './user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    email: 'mock@mock.mock',
    password: 'mock',
    name: 'mock',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: createMock() },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      // Arrange

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      jest.spyOn(userModel, 'create').mockResolvedValue(mockUser as any);

      // Act
      const result = await service.create(mockUser);

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user already exists', async () => {
      // Arrange

      jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser as any);

      // Act
      const result = service.create(mockUser);

      // Assert
      await expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findByEmail()', () => {
    it('should find a user by email', async () => {
      // Arrange

      jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser as any);

      // Act
      const result = await service.findByEmail(mockUser.email);

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user does not exist', async () => {
      // Arrange

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      // Act
      const result = service.findByEmail(mockUser.email);

      // Assert
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById()', () => {
    it('should find a user by id', async () => {
      // Arrange

      jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser as any);

      // Act
      const result = await service.findById(mockUser._id.toHexString());

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user does not exist', async () => {
      // Arrange

      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      // Act
      const result = service.findById(mockUser._id.toHexString());

      // Assert
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
