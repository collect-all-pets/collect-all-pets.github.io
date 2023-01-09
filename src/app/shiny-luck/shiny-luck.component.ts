import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-shiny-luck',
  templateUrl: './shiny-luck.component.html',
  styleUrls: ['./shiny-luck.component.css']
})
export class ShinyLuckComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
