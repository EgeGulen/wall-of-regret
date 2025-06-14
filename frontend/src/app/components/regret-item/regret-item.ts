import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Regret } from '../../models/regret.model';

/**
 * Component for displaying individual regret items.
 * This component shows regret content, author, and timestamps,
 * and provides actions for editing and deleting regrets.
 */
@Component({
  selector: 'app-regret-item',
  imports: [CommonModule],
  templateUrl: './regret-item.html',
  styleUrl: './regret-item.css'
})
export class RegretItemComponent {
  /**
   * The regret data to display.
   */
  @Input() regret!: Regret;

  /**
   * Event emitted when the edit button is clicked.
   */
  @Output() edit = new EventEmitter<Regret>();

  /**
   * Event emitted when the delete button is clicked.
   */
  @Output() delete = new EventEmitter<number>();

  /**
   * Handles the edit button click.
   * Emits the edit event with the regret data.
   */
  onEdit(): void {
    this.edit.emit(this.regret);
  }

  /**
   * Handles the delete button click.
   * Emits the delete event with the regret ID.
   */
  onDelete(): void {
    if (confirm('Are you sure you want to delete this regret?')) {
      this.delete.emit(this.regret.id);
    }
  }

  /**
   * Formats a date string for display.
   * @param dateString - The date string to format
   * @returns Formatted date string
   */
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}