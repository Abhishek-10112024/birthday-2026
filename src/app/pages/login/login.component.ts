import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  password = '';
  error = signal<string>('');
  showPassword = signal<boolean>(false);

  onSubmit(): void {
    if (this.authService.login(this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error.set('Incorrect password');
      this.password = '';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }
}
