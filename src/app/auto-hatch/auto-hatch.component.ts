import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-auto-hatch',
  templateUrl: './auto-hatch.component.html',
  styleUrls: ['./auto-hatch.component.css']
})
export class AutoHatchComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
