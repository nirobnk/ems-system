import { Controller, Post, Body,HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() body: { email: string; password: string }) {
    return this.usersService.signup(body.email, body.password);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }
}