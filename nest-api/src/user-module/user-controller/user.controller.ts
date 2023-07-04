import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user-service/user-service';


@Controller('user')
export class UserControllerController {
    constructor(private userService: UserService) {}
  @Get('/findAll')
  findAll(): any {
    return this.userService.findAll();
  }
}
