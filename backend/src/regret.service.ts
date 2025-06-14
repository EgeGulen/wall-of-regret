import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regret } from './regret.entity';
import { CreateRegretDto, UpdateRegretDto } from './regret.dto';

/**
 * Service class for managing regret operations.
 * This service provides business logic for CRUD operations on regret entities.
 * It acts as an intermediary between the controller and the database repository.
 */
@Injectable()
export class RegretService {
  /**
   * Constructor for RegretService.
   * @param regretRepository - TypeORM repository for Regret entity, injected via dependency injection
   */
  constructor(
    @InjectRepository(Regret)
    private regretRepository: Repository<Regret>,
  ) {}

  /**
   * Creates a new regret entry in the database.
   * @param createRegretDto - Data transfer object containing regret information
   * @returns Promise<Regret> - The newly created regret entity
   */
  async create(createRegretDto: CreateRegretDto): Promise<Regret> {
    const regret = this.regretRepository.create(createRegretDto);
    return await this.regretRepository.save(regret);
  }

  /**
   * Retrieves all regret entries from the database.
   * Results are ordered by creation date in descending order (newest first).
   * @returns Promise<Regret[]> - Array of all regret entities
   */
  async findAll(): Promise<Regret[]> {
    return await this.regretRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Retrieves a specific regret entry by its ID.
   * @param id - The unique identifier of the regret
   * @returns Promise<Regret> - The regret entity if found
   * @throws NotFoundException - If no regret with the given ID exists
   */
  async findOne(id: number): Promise<Regret> {
    const regret = await this.regretRepository.findOne({ where: { id } });
    if (!regret) {
      throw new NotFoundException(`Regret with ID ${id} not found`);
    }
    return regret;
  }

  /**
   * Updates an existing regret entry with new information.
   * @param id - The unique identifier of the regret to update
   * @param updateRegretDto - Data transfer object containing updated regret information
   * @returns Promise<Regret> - The updated regret entity
   * @throws NotFoundException - If no regret with the given ID exists
   */
  async update(id: number, updateRegretDto: UpdateRegretDto): Promise<Regret> {
    const regret = await this.findOne(id);
    Object.assign(regret, updateRegretDto);
    return await this.regretRepository.save(regret);
  }

  /**
   * Removes a regret entry from the database.
   * @param id - The unique identifier of the regret to remove
   * @returns Promise<void>
   * @throws NotFoundException - If no regret with the given ID exists
   */
  async remove(id: number): Promise<void> {
    const regret = await this.findOne(id);
    await this.regretRepository.remove(regret);
  }
}

