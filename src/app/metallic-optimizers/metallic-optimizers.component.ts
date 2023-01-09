import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-metallic-optimizers',
  templateUrl: './metallic-optimizers.component.html',
  styleUrls: ['./metallic-optimizers.component.css']
})
export class MetallicOptimizersComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
