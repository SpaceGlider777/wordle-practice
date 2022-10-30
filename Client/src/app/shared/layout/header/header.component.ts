import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PauseGameService } from 'src/app/core/services/pause-game.service';
import { RegisterDialogComponent } from '../../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService, 
    private dialog: MatDialog,
    private pauseGameService: PauseGameService,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.pauseGameService.isGamePaused = true;
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '18rem',
      data: { action: 'Register' }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.authService.register(response.username, response.password);
      }
      this.pauseGameService.isGamePaused = false;
    });
  }

  login(): void {
    this.pauseGameService.isGamePaused = true;
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '18rem',
      data: { action: 'Login' }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.authService.login(response.username, response.password);
      }
      this.pauseGameService.isGamePaused = false;
    });
  }

  isLoggedIn(): void {
    this.apiService.get('Auth/isAuthenticated').subscribe(res => console.log(res));
  }

}
