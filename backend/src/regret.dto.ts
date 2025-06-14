import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new regret.
 * This class defines the structure and validation rules for incoming
 * requests to create regret entries.
 */
export class CreateRegretDto {
  /**
   * The content of the regret.
   * This field is required and must not be empty.
   * Maximum length is limited to 1000 characters.
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, { message: 'Content must not exceed 1000 characters' })
  content: string;

  /**
   * The author of the regret.
   * This field is optional and can be left empty for anonymous regrets.
   * Maximum length is limited to 100 characters.
   */
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Author name must not exceed 100 characters' })
  author?: string;
}

/**
 * Data Transfer Object (DTO) for updating an existing regret.
 * This class defines the structure and validation rules for incoming
 * requests to update regret entries. All fields are optional to allow
 * partial updates.
 */
export class UpdateRegretDto {
  /**
   * The updated content of the regret.
   * This field is optional for updates.
   * Maximum length is limited to 1000 characters.
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, { message: 'Content must not exceed 1000 characters' })
  content?: string;

  /**
   * The updated author of the regret.
   * This field is optional for updates.
   * Maximum length is limited to 100 characters.
   */
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Author name must not exceed 100 characters' })
  author?: string;
}

