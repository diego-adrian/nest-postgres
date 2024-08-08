import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: AuthDto) {
    const { username, password} = payload;
    const user = await this.userService.find(username, password);

    const body = { id: user.id, username: user.username, activo: user.activo, roles: user.roles };

    return {
      access_token: await this.jwtService.sign(body),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
