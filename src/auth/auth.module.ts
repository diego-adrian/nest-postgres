import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './secret/jwt.secret';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
