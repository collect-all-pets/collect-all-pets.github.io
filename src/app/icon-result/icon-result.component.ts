import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";

@Component({
  selector: 'app-icon-result',
  templateUrl: './icon-result.component.html',
  styleUrls: ['./icon-result.component.css']
})
export class IconResultComponent {
  @Input() key: string | null = ""
  @Input() value: string | number | null = ""
  @Input() help: string | null = ""
  @Input() prefix: string | null = ""
  @Input() suffix: string | null = ""
  @Input() smallSuffix: boolean = false
  @Input() suffixHtml: string | null = ""

  @Input() icon: string | null = ""
  @Input() iconSize: string | null = ""

  constructor(public dialog: MatDialog) {}

  showHelp() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        title: this.key,
        content: this.help
      }
    })
  }
}
