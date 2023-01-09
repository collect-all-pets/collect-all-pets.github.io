import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-what-ifs',
  templateUrl: './what-ifs.component.html',
  styleUrls: ['./what-ifs.component.css']
})
export class WhatIfsComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
