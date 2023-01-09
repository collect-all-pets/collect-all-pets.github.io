import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-exotic-luck-calculator',
  templateUrl: './exotic-luck-calculator.component.html',
  styleUrls: ['./exotic-luck-calculator.component.css']
})
export class ExoticLuckCalculatorComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
