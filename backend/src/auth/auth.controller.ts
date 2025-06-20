import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * Handles user authentication endpoints such as login and registration.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Registers a new user.
   * @route POST /auth/register
   * @param body - Contains username and password.
   * @returns The newly created user object.
   */
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = new User();
    user.username = body.username;
    user.password = await this.authService.hashPassword(body.password);
    return await this.userRepo.save(user);
  }

  /**
   * Authenticates a user and returns a JWT token.
   * @route POST /auth/login
   * @param body - Contains username and password.
   * @returns A signed JWT token if credentials are valid.
   */
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userRepo.findOneBy({ username: body.username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await this.authService.validatePassword(body.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.authService.generateToken({
      id: user.id,
      username: user.username,
    });

    return { token };
  }
}
