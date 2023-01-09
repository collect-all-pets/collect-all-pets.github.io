import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-egg-breakdown',
  templateUrl: './egg-breakdown.component.html',
  styleUrls: ['./egg-breakdown.component.css']
})
export class EggBreakdownComponent {
  @Input() shinies: boolean = true
  @Input() metallics: boolean = true

  displayedColumns: string[] = ['pet', 'count']

  constructor(public dialog: MatDialog, public data: DataService) {
  }

  ngOnInit() {
    if (this.shinies) {
      this.displayedColumns.push('shinies')
    }
    if (this.metallics) {
      this.displayedColumns.push('chance', 'mets')
    }
  }


}
