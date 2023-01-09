import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";

@Component({
  selector: 'app-rebirth',
  templateUrl: './rebirth.component.html',
  styleUrls: ['./rebirth.component.css']
})
export class RebirthComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, public data: DataService) {
  }

  simulate() {
    this.data.rebirthSim.isRunning = true
    this.changeDetectorRef.detectChanges()
    setTimeout(() => {
      this.data.rebirthSim.simulate_all()
      this.data.rebirthSim.isRunning = false
      this.changeDetectorRef.detectChanges()
    }, 100)
  }

  _simulate() {

  }
}
