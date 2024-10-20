import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { UserDocument, UsersService } from 'src/users';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    const input: LoginDto = {
      email: 'mock@mock.mock',
      password: 'mock',
    };

    const user = {
      _id: new mongoose.Types.ObjectId(),
      email: input.email,
      password: input.password,
      name: 'mock',
    } as UserDocument;

    it('should login and return token', async () => {
      // Arrange
      const output = { token: 'mock' };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(output.token);

      // Act
      const result = service.login(input);

      // Assert
      await expect(result).resolves.toEqual(output);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      // Arrange
      jest
        .spyOn(usersService, 'findByEmail')
        .mockRejectedValue(new NotFoundException());

      // Act
      const result = service.login(input);

      // Assert
      await expect(result).rejects.toThrow(UnauthorizedException);
      await expect(result).rejects.toThrow('invalid credentials!');
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      // Arrange
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      // Act
      const result = service.login(input);

      // Assert
      await expect(result).rejects.toThrow(UnauthorizedException);
      await expect(result).rejects.toThrow('invalid credentials!');
    });
  });

  describe('register()', () => {
    const input: RegisterDto = {
      email: 'mock@mock.mock',
      password: 'mock',
      name: 'mock',
    };

    const user = {
      _id: new mongoose.Types.ObjectId(),
      email: input.email,
      password: input.password,
      name: 'mock',
    } as UserDocument;

    it('should register and return token', async () => {
      // Arrange
      const output = { token: 'mock' };

      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => user.password);

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(output.token);

      // Act
      const result = service.register(input);

      // Assert
      await expect(result).resolves.toEqual(output);
    });
  });

  describe('me()', () => {
    const userId = new mongoose.Types.ObjectId();

    const user = {
      _id: userId,
      id: userId.toString(),
      email: 'mock@mock.mock',
      password: 'mock',
      name: 'mock',
    } as UserDocument;

    it('should return user', async () => {
      // Arrange
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);

      // Act
      const result = service.me(user.id);

      // Assert
      await expect(result).resolves.toEqual({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      });
    });
  });

  describe('verifyToken()', () => {
    it('should return payload', async () => {
      // Arrange
      const payload = { sub: 'mock' };

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(payload);

      // Act
      const result = service.verifyToken('mock');

      // Assert
      await expect(result).resolves.toEqual(payload);
    });
  });
});
