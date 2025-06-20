import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['../auth-styles.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const { username, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.showNotification('Passwords do not match.', 'error');
        this.isLoading = false;
        return;
      }

      const userData = { username, password };
      localStorage.setItem('user', JSON.stringify(userData));
      
      this.showNotification('Registration successful! Redirecting to login...', 'success');
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }, 500);
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.notificationType = type;
    this.notificationMessage = message;
    setTimeout(() => {
      this.notificationMessage = null;
      this.notificationType = null;
    }, 3000);
  }
}
