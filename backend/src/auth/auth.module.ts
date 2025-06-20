import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';

/**
 * AuthModule is responsible for user authentication,
 * registration, and JWT configuration.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'supersecretkey', // could swap with .env 
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
