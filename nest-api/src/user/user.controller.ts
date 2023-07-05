import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('test')
  Test(@GetUser() user: User) {
    console.log(user);
    return 'Test thoi';
  }

  @Post('get-user')
  getUser(@GetUser() user: User) {
    return '';
  }
}
