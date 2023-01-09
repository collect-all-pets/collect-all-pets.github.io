import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";
import { UtilService } from "../util.service";

@Component({
  selector: 'app-upgrade-tables',
  templateUrl: './upgrade-tables.component.html',
  styleUrls: ['./upgrade-tables.component.css']
})
export class UpgradeTablesComponent {
  displayedColumns: string[] = ['level', 'cost']

  constructor(public dialog: MatDialog, public data: DataService, public util: UtilService) {
  }
}
