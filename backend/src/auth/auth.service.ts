import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**
 * AuthService provides authentication-related operations such as
 * password hashing, validation, and JWT token generation.
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Hashes a plain-text password using bcrypt.
   * @param password - The user's plain-text password.
   * @returns A promise that resolves to a hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Validates a plain-text password against a hashed password.
   * @param password - The user's plain-text password.
   * @param hash - The stored hashed password.
   * @returns A promise that resolves to true if match, otherwise false.
   */
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generates a JWT token containing the user's ID and username.
   * @param payload - The user payload (id and username).
   * @returns A signed JWT token as a string.
   */
  async generateToken(payload: { id: number; username: string }): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
