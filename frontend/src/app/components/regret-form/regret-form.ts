import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Regret, CreateRegretDto, UpdateRegretDto } from '../../models/regret.model';

/**
 * Component for creating and editing regrets.
 * This component provides a form interface for users to input regret data
 * with validation and handles both create and update operations.
 */
@Component({
  selector: 'app-regret-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './regret-form.html',
  styleUrl: './regret-form.css'
})
export class RegretFormComponent implements OnInit {
  /**
   * Initial data for editing an existing regret.
   * If provided, the form will be pre-populated with this data.
   */
  @Input() initialData?: Regret;

  /**
   * Event emitted when the form is submitted with valid data.
   */
  @Output() submit = new EventEmitter<CreateRegretDto | UpdateRegretDto>();

  /**
   * Event emitted when the user cancels the form.
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Reactive form group for regret data.
   */
  regretForm: FormGroup;

  /**
   * Flag indicating if the form is in edit mode.
   */
  isEditMode = false;

  /**
   * Constructor for RegretFormComponent.
   * @param formBuilder - Angular FormBuilder for creating reactive forms
   */
  constructor(private formBuilder: FormBuilder) {
    this.regretForm = this.createForm();
  }

  /**
   * Angular lifecycle hook - component initialization.
   * Sets up the form based on whether initial data is provided.
   */
  ngOnInit(): void {
    this.isEditMode = !!this.initialData;
    if (this.initialData) {
      this.regretForm.patchValue({
        content: this.initialData.content,
        author: this.initialData.author || ''
      });
    }
  }

  /**
   * Creates the reactive form with validation rules.
   * @returns FormGroup - The configured form group
   */
  private createForm(): FormGroup {
    return this.formBuilder.group({
      content: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]],
      author: ['', [
        Validators.maxLength(100)
      ]]
    });
  }

  /**
   * Handles form submission.
   * Validates the form and emits the submit event with form data.
   */
  onSubmit(): void {
    if (this.regretForm.valid) {
      const formValue = this.regretForm.value;
      const regretData = {
        content: formValue.content.trim(),
        author: formValue.author?.trim() || undefined
      };
      
      this.submit.emit(regretData);
      
      if (!this.isEditMode) {
        this.regretForm.reset();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Handles form cancellation.
   * Emits the cancel event and resets the form if not in edit mode.
   */
  onCancel(): void {
    this.cancel.emit();
    if (!this.isEditMode) {
      this.regretForm.reset();
    }
  }

  /**
   * Marks all form controls as touched to trigger validation display.
   */
  private markFormGroupTouched(): void {
    Object.keys(this.regretForm.controls).forEach(key => {
      const control = this.regretForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Gets the error message for the content field.
   * @returns Error message string or null
   */
  getContentErrorMessage(): string | null {
    const control = this.regretForm.get('content');
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Content is required';
      }
      if (control.errors['maxlength']) {
        return 'Content must not exceed 1000 characters';
      }
    }
    return null;
  }

  /**
   * Gets the error message for the author field.
   * @returns Error message string or null
   */
  getAuthorErrorMessage(): string | null {
    const control = this.regretForm.get('author');
    if (control?.errors && control.touched) {
      if (control.errors['maxlength']) {
        return 'Author name must not exceed 100 characters';
      }
    }
    return null;
  }

  /**
   * Gets the remaining character count for the content field.
   * @returns Number of remaining characters
   */
  getContentRemainingChars(): number {
    const content = this.regretForm.get('content')?.value || '';
    return 1000 - content.length;
  }
}