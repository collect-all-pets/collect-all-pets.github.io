import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-egg-luck',
  templateUrl: './egg-luck.component.html',
  styleUrls: ['./egg-luck.component.css']
})
export class EggLuckComponent {
  @Input() calcifyLuck: boolean = true
  @Input() cheaperEggs: boolean = true
  @Input() title: string = "Egg / Fuse / Calcify Luck"

  constructor(public dialog: MatDialog, public data: DataService) {
  }
}
