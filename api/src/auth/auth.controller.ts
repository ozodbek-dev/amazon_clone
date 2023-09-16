import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //register endpoint
  @Post('register')
  register(@Body() user: NewUserDto): Promise<UserDetails> {
    return this.authService.register(user);
  }

  //login endpoint
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDto): Promise<{ token: string } | null> {
    console.log(user)
    return this.authService.login(user);
  }
}
