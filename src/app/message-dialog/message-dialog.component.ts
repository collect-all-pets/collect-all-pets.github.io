import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  title: string
  content: string
  raw1: string | number | null
  raw2: string | number | null
  rawSuffix1: string | null
  rawSuffix2: string | null
}

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
