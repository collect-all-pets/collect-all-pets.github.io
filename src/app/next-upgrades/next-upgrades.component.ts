import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-next-upgrades',
  templateUrl: './next-upgrades.component.html',
  styleUrls: ['./next-upgrades.component.css']
})
export class NextUpgradesComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
