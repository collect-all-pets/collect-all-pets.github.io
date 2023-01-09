import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-rebirth-results',
  templateUrl: './rebirth-results.component.html',
  styleUrls: ['./rebirth-results.component.css']
})
export class RebirthResultsComponent {
  displayedColumns: string[] = ['pet', 'shinies-total', 'shinies-avg', 'mets-total', 'mets-avg']

  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
