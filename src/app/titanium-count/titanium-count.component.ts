import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-titanium-count',
  templateUrl: './titanium-count.component.html',
  styleUrls: ['./titanium-count.component.css']
})
export class TitaniumCountComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
