import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-save-buttons',
  templateUrl: './save-buttons.component.html',
  styleUrls: ['./save-buttons.component.css']
})
export class SaveButtonsComponent {
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, public data: DataService) {

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {duration: 1000});
  }
}
