import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Regret {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  author: string;

  /**
   * NEW: The location from where the regret was posted.
   * Stored as a string (e.g., "City, Country" or "Lat, Lon").
   */
  @Column({ default: 'Unknown' }) // Added a default value for safety
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
