import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

export interface GoldLevel {
  name: string
  value: number
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
