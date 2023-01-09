import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-results-info',
  templateUrl: './results-info.component.html',
  styleUrls: ['./results-info.component.css']
})
export class ResultsInfoComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
