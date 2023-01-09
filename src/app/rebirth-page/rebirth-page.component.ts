import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-rebirth-page',
  templateUrl: './rebirth-page.component.html',
  styleUrls: ['./rebirth-page.component.css']
})
export class RebirthPageComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
