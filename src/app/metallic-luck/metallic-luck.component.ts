import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-metallic-luck',
  templateUrl: './metallic-luck.component.html',
  styleUrls: ['./metallic-luck.component.css']
})
export class MetallicLuckComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
