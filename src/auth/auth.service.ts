import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';
import { SignInDto } from './dtos/signin.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(body: CreateUserDto) {
    const { name, email, password, role } = body;

    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    // hash salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join hashed reult and the salt together
    const result = `${salt}.${hash.toString('hex')}`;

    return this.userService.create({ name, email, password: result, role });
  }

  async signin(body: SignInDto) {
    const [user] = await this.userService.find(body?.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user?.password?.split('.');

    const hash = (await scrypt(body?.password, salt, 32)) as Buffer;

    const payload = { sub: user?.id, email: user?.email, role: user?.role };

    if (storedHash === hash.toString('hex')) {
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new BadRequestException('bad information');
  }

  async update(id: number, body: UpdateUserDto) {
    if (body?.password) {
      const salt = randomBytes(8).toString('hex');

      // hash salt and password together
      const hash = (await scrypt(body?.password, salt, 32)) as Buffer;

      // join hashed reult and the salt together
      const result = `${salt}.${hash.toString('hex')}`;

      return this.userService.update(id, { ...body, password: result });
    }

    return this.userService.update(id, body);
  }
}
