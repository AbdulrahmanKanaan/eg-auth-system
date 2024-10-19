import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument, UsersService } from 'src/users';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login({ email, password }: LoginDto) {
    let user: UserDocument;

    try {
      user = await this.usersService.findByEmail(email);
    } catch (e) {
      // If the user is not found, throw an UnauthorizedException
      // We don't want to leak information about whether the user exists or not
      if (e instanceof NotFoundException) {
        throw new UnauthorizedException('invalid credentials!');
      }
      throw e;
    }

    const isPasswordMatch = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('invalid credentials!');
    }

    const payload = { sub: user.id };

    const token = await this.generateToken(payload);

    return { token };
  }

  public async register({ email, name, password }: RegisterDto) {
    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersService.create({
      email,
      name,
      password: hashedPassword,
    });

    const payload = { sub: user.id };

    const token = await this.generateToken(payload);

    return { token };
  }

  private async generateToken(payload: object): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async comparePasswords(
    password: string,
    hash: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
