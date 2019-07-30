import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-message-dialog',
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.css']
})
export class NewMessageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private message: string
  ) { }

}
