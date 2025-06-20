import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Represents a user in the system.
 */
@Entity()
export class User {
  /**
   * Auto-generated primary key ID.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Username for login and identification (must be unique).
   */
  @Column({ unique: true })
  username: string;

  /**
   * Password of the user (stored in hashed format).
   */
  @Column()
  password: string;
}
