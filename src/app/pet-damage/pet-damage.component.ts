import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../data.service";
import { PetType } from "../pet-type.enum";

@Component({
  selector: 'app-pet-damage',
  templateUrl: './pet-damage.component.html',
  styleUrls: ['./pet-damage.component.css']
})
export class PetDamageComponent {
  constructor(public dialog: MatDialog, public data: DataService) {
  }

  chrome() {
    return PetType.Chrome
  }

}
