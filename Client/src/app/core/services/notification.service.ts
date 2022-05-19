import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, action?: string): void {
    this.snackBar.open(message, action ?? 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}