import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { RegretService } from './regret.service';
import { CreateRegretDto, UpdateRegretDto } from './regret.dto';
import { Regret } from './regret.entity';

/**
 * Controller for handling HTTP requests related to regret operations.
 * This controller defines REST API endpoints for CRUD operations on regrets.
 * It follows RESTful conventions and provides proper HTTP status codes.
 */
@Controller('regrets')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class RegretController {
  /**
   * Constructor for RegretController.
   * @param regretService - Service for regret business logic, injected via dependency injection
   */
  constructor(private readonly regretService: RegretService) {}

  /**
   * Creates a new regret entry.
   * POST /regrets
   * @param createRegretDto - Request body containing regret data
   * @returns Promise<Regret> - The newly created regret
   */
  @Post()
  async create(@Body() createRegretDto: CreateRegretDto): Promise<Regret> {
    return await this.regretService.create(createRegretDto);
  }

  /**
   * Retrieves all regret entries.
   * GET /regrets
   * @returns Promise<Regret[]> - Array of all regrets
   */
  @Get()
  async findAll(): Promise<Regret[]> {
    return await this.regretService.findAll();
  }

  /**
   * Retrieves a specific regret entry by ID.
   * GET /regrets/:id
   * @param id - The ID of the regret to retrieve
   * @returns Promise<Regret> - The requested regret
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Regret> {
    return await this.regretService.findOne(id);
  }

  /**
   * Updates an existing regret entry.
   * PATCH /regrets/:id
   * @param id - The ID of the regret to update
   * @param updateRegretDto - Request body containing updated regret data
   * @returns Promise<Regret> - The updated regret
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegretDto: UpdateRegretDto,
  ): Promise<Regret> {
    return await this.regretService.update(id, updateRegretDto);
  }

  /**
   * Deletes a regret entry.
   * DELETE /regrets/:id
   * @param id - The ID of the regret to delete
   * @returns Promise<void>
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.regretService.remove(id);
  }
}

