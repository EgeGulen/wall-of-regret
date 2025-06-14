import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegretService } from '../../services/regret.service';
import { RegretItemComponent } from '../regret-item/regret-item';
import { RegretFormComponent } from '../regret-form/regret-form';
import { Regret, CreateRegretDto, UpdateRegretDto } from '../../models/regret.model';

/**
 * Component for displaying and managing the list of regrets.
 * This component handles the main functionality of the Wall of Regret application,
 * including displaying regrets, adding new ones, and managing edit/delete operations.
 */
@Component({
  selector: 'app-regret-list',
  imports: [CommonModule, RegretItemComponent, RegretFormComponent],
  templateUrl: './regret-list.html',
  styleUrl: './regret-list.css'
})
export class RegretListComponent implements OnInit {
  /**
   * Array of regrets to display.
   */
  regrets: Regret[] = [];

  /**
   * Loading state indicator.
   */
  loading = false;

  /**
   * Error message to display if operations fail.
   */
  error: string | null = null;

  /**
   * The regret currently being edited, if any.
   */
  editingRegret: Regret | null = null;

  /**
   * Flag to show/hide the add regret form.
   */
  showAddForm = false;

  /**
   * Constructor for RegretListComponent.
   * @param regretService - Service for regret API operations
   */
  constructor(private regretService: RegretService) {}

  /**
   * Angular lifecycle hook - component initialization.
   * Loads the initial list of regrets.
   */
  ngOnInit(): void {
    this.loadRegrets();
  }

  /**
   * Loads all regrets from the backend.
   * Sets loading state and handles errors.
   */
  loadRegrets(): void {
    this.loading = true;
    this.error = null;
    
    this.regretService.getAllRegrets().subscribe({
      next: (regrets) => {
        this.regrets = regrets;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load regrets. Please try again.';
        this.loading = false;
        console.error('Error loading regrets:', error);
      }
    });
  }

  /**
   * Handles creating a new regret.
   * @param regretData - The regret data to create
   */
  onCreateRegret(regretData: CreateRegretDto | UpdateRegretDto): void {
    // Ensure we have the required content field for creation
    if (!regretData.content) {
      this.error = 'Content is required for creating a regret.';
      return;
    }
    
    const createData: CreateRegretDto = {
      content: regretData.content,
      author: regretData.author
    };
    
    this.regretService.createRegret(createData).subscribe({
      next: (newRegret) => {
        this.regrets.unshift(newRegret); // Add to beginning of array
        this.showAddForm = false;
        this.error = null;
      },
      error: (error) => {
        this.error = 'Failed to create regret. Please try again.';
        console.error('Error creating regret:', error);
      }
    });
  }

  /**
   * Handles updating an existing regret.
   * @param regretData - The updated regret data
   */
  onUpdateRegret(regretData: UpdateRegretDto): void {
    if (!this.editingRegret) return;

    this.regretService.updateRegret(this.editingRegret.id, regretData).subscribe({
      next: (updatedRegret) => {
        const index = this.regrets.findIndex(r => r.id === updatedRegret.id);
        if (index !== -1) {
          this.regrets[index] = updatedRegret;
        }
        this.editingRegret = null;
        this.error = null;
      },
      error: (error) => {
        this.error = 'Failed to update regret. Please try again.';
        console.error('Error updating regret:', error);
      }
    });
  }

  /**
   * Handles the edit action for a regret.
   * @param regret - The regret to edit
   */
  onEditRegret(regret: Regret): void {
    this.editingRegret = regret;
    this.showAddForm = false;
  }

  /**
   * Handles the delete action for a regret.
   * @param regretId - The ID of the regret to delete
   */
  onDeleteRegret(regretId: number): void {
    this.regretService.deleteRegret(regretId).subscribe({
      next: () => {
        this.regrets = this.regrets.filter(r => r.id !== regretId);
        this.error = null;
      },
      error: (error) => {
        this.error = 'Failed to delete regret. Please try again.';
        console.error('Error deleting regret:', error);
      }
    });
  }

  /**
   * Toggles the visibility of the add regret form.
   */
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.editingRegret = null;
    }
  }

  /**
   * Cancels the current edit operation.
   */
  cancelEdit(): void {
    this.editingRegret = null;
  }

  /**
   * Cancels the add form.
   */
  cancelAdd(): void {
    this.showAddForm = false;
  }

  /**
   * TrackBy function for ngFor optimization.
   * @param index - The index of the item
   * @param regret - The regret item
   * @returns The unique identifier for tracking
   */
  trackByRegretId(index: number, regret: Regret): number {
    return regret.id;
  }
}