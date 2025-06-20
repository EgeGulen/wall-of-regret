import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['../auth-styles.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  // Bildirim ve yükleme durumu için yeni değişkenler
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;

    // Kasıtlı olarak küçük bir gecikme ekleyerek yükleme animasyonunu görünür kılıyoruz
    setTimeout(() => {
      const { username, password } = this.loginForm.value;
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        this.showNotification('No registered user found.', 'error');
        this.isLoading = false;
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.username === username && parsedUser.password === password) {
        this.showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      } else {
        this.showNotification('Invalid credentials.', 'error');
        this.isLoading = false;
      }
    }, 500); // 0.5 saniye gecikme
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
