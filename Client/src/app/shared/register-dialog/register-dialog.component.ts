import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { action: string }, 
    private dialogRef: MatDialogRef<RegisterDialogComponent>
    ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close({ username: this.username, password: this.password });
  }

}
