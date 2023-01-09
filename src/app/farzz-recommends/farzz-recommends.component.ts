import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-farzz-recommends',
  templateUrl: './farzz-recommends.component.html',
  styleUrls: ['./farzz-recommends.component.css']
})
export class FarzzRecommendsComponent {
  displayedColumns: string[] = ['upgrade', 'value', 'cost']

  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
