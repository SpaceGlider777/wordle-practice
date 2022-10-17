import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RegisterDialogComponent } from '../../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  register(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '18rem'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        const username = response.username;
        const password = response.password;

        if (username.length == 0 || password!.length == 0) {
          this.notificationService.show('Invalid user info');
          return;
        }

        this.authService.register(username, password);
      }
    });
  }

  login(): void {

  }

}
