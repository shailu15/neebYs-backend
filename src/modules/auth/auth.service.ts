import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: any){
    
    return this.usersService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
  const user = await this.usersService.findByEmail(loginDto.email);

  if (!user) {
    return {
      message: 'Invalid email or password',
    };
  }

  const isPasswordValid = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!isPasswordValid) {
    return {
      message: 'Invalid email or password',
    };
  }

  const payload = {
  sub: user.id,
  email: user.email,
};

const access_token = await this.jwtService.signAsync(payload);

return {
  access_token,
};
}
  
}