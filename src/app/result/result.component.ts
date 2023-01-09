import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() key: string | null = ""
  @Input() value: string | number | null = ""
  @Input() help: string | null = ""
  @Input() prefix: string | null = ""
  @Input() suffix: string | null = ""
  @Input() smallSuffix: boolean = false
  @Input() suffixHtml: string | null = ""
  @Input() iconSuffix: string | null = ""
  @Input() smallIconSuffix: boolean = false
  @Input() raw1: string | number | null = ""
  @Input() rawSuffix1: string | null = ""

  @Input() icon: string | null = ""
  @Input() iconSize: string | null = ""

  constructor(public dialog: MatDialog) {}

  showHelp() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        title: this.key,
        content: this.help,
        raw1: this.raw1,
        rawSuffix1: this.rawSuffix1
      }
    })
  }
}
