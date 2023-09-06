import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(body: any) {
    const user = this.usersRepository.create(body);
    return this.usersRepository.save(user);
  }

  find(email: string) {
    const user = this.usersRepository.find({ where: { email } });

    return user;
  }

  findById(id: number) {
    const user = this.usersRepository.find({ where: { id } });

    return user;
  }

  async update(id: number, body: UpdateUserDto) {
    const [user] = await this.findById(id);

    const updateUser = {
      ...user,
      ...body,
    };

    return this.usersRepository.save(updateUser);
  }
}
