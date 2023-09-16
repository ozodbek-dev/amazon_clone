import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @UseGuards(JwtGuard)
  @Get(":id")
  getUserById(@Param("id") id:string):Promise<UserDetails|null> {
    return this.userService.findById(id)
  }
}
