import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-theb1rdm4n-recommends',
  templateUrl: './theb1rdm4n-recommends.component.html',
  styleUrls: ['./theb1rdm4n-recommends.component.css']
})
export class Theb1rdm4nRecommendsComponent {
  displayedColumns: string[] = ['upgrade', 'value', 'cost', 'hours', 'chance', 'mets']

  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
