import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regret, CreateRegretDto, UpdateRegretDto } from '../models/regret.model';

/**
 * Service for handling HTTP requests to the regret API.
 * This service provides methods to perform CRUD operations on regrets
 * by communicating with the NestJS backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class RegretService {
  /**
   * Base URL for the regret API endpoints.
   * Points to the NestJS backend server.
   */
  private readonly apiUrl = 'http://localhost:3000/regrets';

  /**
   * Constructor for RegretService.
   * @param http - Angular HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves all regrets from the backend.
   * @returns Observable<Regret[]> - Observable containing array of regrets
   */
  getAllRegrets(): Observable<Regret[]> {
    return this.http.get<Regret[]>(this.apiUrl);
  }

  /**
   * Retrieves a specific regret by its ID.
   * @param id - The unique identifier of the regret
   * @returns Observable<Regret> - Observable containing the regret
   */
  getRegretById(id: number): Observable<Regret> {
    return this.http.get<Regret>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new regret.
   * @param regret - The regret data to create
   * @returns Observable<Regret> - Observable containing the created regret
   */
  createRegret(regret: CreateRegretDto): Observable<Regret> {
    return this.http.post<Regret>(this.apiUrl, regret);
  }

  /**
   * Updates an existing regret.
   * @param id - The unique identifier of the regret to update
   * @param regret - The updated regret data
   * @returns Observable<Regret> - Observable containing the updated regret
   */
  updateRegret(id: number, regret: UpdateRegretDto): Observable<Regret> {
    return this.http.patch<Regret>(`${this.apiUrl}/${id}`, regret);
  }

  /**
   * Deletes a regret.
   * @param id - The unique identifier of the regret to delete
   * @returns Observable<void> - Observable indicating completion
   */
  deleteRegret(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

