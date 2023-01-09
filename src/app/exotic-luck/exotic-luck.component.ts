import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-exotic-luck',
  templateUrl: './exotic-luck.component.html',
  styleUrls: ['./exotic-luck.component.css']
})
export class ExoticLuckComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
