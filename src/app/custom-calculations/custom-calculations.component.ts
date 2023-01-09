import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";
import { GoldLevel } from "../calculator/calculator.component";

@Component({
  selector: 'app-custom-calculations',
  templateUrl: './custom-calculations.component.html',
  styleUrls: ['./custom-calculations.component.css']
})
export class CustomCalculationsComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }

  stones_to_get: number = 1000
  gold_to_get: number = 50
  gold_level: number = 1000000000

  gold_levels: GoldLevel[] = [
    {name: 'Million', 'value': 1000000},
    {name: 'Billion', 'value': 1000000000},
    {name: 'Trillion', 'value': 1000000000000}]
}
