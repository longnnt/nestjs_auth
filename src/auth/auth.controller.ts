import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SerializerInterceptor } from 'src/interceptor/Serializer.interceptor';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/user/dtos/update-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(SerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  async login(@Body() body: SignInDto) {
    return await this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Patch('/:id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: number) {
    const user = await this.authService.update(id, body);

    return user;
  }
}
