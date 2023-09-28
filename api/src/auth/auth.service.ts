import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  async register(user: Readonly<NewUserDto>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) return null;
    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;
    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDto,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
   
    const user = await this.validateUser(email, password);
     console.log(user);
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const jwtToken = await this.jwtService.signAsync(
      { user },
      {
        secret: 'secret',
        expiresIn: '1d',
      },
    );
    return {
      token: jwtToken,
    };
  }
  async verifyJwt(jwt: string): Promise<{exp:number}> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt, {secret: 'secret'});
      return {exp}
    } catch (err) { 
      console.log(err)
      throw new HttpException("Invalid JWT", HttpStatus.UNAUTHORIZED)
    }
  }
}
