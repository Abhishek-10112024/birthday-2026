import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Static password - change this to your desired password
  private readonly PASSWORD = 'poornima123';
  private readonly STORAGE_KEY = 'constellation_authenticated';

  isAuthenticated = signal<boolean>(false);

  constructor() {
    // Check if already authenticated from localStorage
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'true') {
      this.isAuthenticated.set(true);
    }
  }

  login(password: string): boolean {
    if (password === this.PASSWORD) {
      this.isAuthenticated.set(true);
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.set(false);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
