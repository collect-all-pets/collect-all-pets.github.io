import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent {
  @Input() useSelect: boolean = true

  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
