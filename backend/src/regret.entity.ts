import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Regret entity representing a user's regret entry in the Wall of Regret application.
 * This entity stores information about individual regrets including the content,
 * author, and timestamps for creation and modification.
 */
@Entity()
export class Regret {
  /**
   * Unique identifier for the regret entry.
   * Auto-generated primary key.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The main content of the regret.
   * This field contains the actual regret text that users want to share.
   */
  @Column('text')
  content: string;

  /**
   * The name or identifier of the person who posted the regret.
   * This field is optional and can be anonymous.
   */
  @Column({ nullable: true })
  author: string;

  /**
   * Timestamp indicating when the regret was first created.
   * Automatically set when the entity is first saved to the database.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp indicating when the regret was last updated.
   * Automatically updated whenever the entity is modified.
   */
  @UpdateDateColumn()
  updatedAt: Date;
}

