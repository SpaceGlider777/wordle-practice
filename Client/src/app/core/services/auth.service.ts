import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username?: string;

  constructor(private apiService: ApiService, private notificationService: NotificationService) { }

  register(username: string, password: string): void {
    if (this.validate(username, password)) {
      let user: User = { username, password };
      this.apiService.post('Auth/register', user).subscribe(() => {
        this.notificationService.show('Successfully registered!');
      });
    }
  }

  login(username: string, password: string): void {
    if (this.validate(username, password)) {
      let user: User = { username, password };
      this.apiService.post('Auth/login', user).subscribe(response => {
        console.log(response)
        const token: string = response.token;
        localStorage.setItem('jwt', token);
        this.username = user.username;
        this.notificationService.show('Successfully logged in!');
      });
    }
  }

  validate(username: string, password: string): boolean {
    if (username.length == 0) {
      this.notificationService.show('Please enter a username');
      return false;
    } else if (password.length < 6) {
      this.notificationService.show('Password must be atleast 6 characters');
      return false;
    }
    return true;
  }
}
