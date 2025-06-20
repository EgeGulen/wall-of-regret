import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

/**
 * DTO for creating a new regret.
 */
export class CreateRegretDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, { message: 'Content must not exceed 1000 characters' })
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Author name must not exceed 100 characters' })
  author?: string;

  /**
   * NEW: The location from where the regret was posted.
   * This field is now expected from the frontend.
   */
  @IsString()
  @IsNotEmpty()
  location: string;
}

/**
 * DTO for updating an existing regret.
 */
export class UpdateRegretDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
