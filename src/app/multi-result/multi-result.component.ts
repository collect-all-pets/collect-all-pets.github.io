import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";

@Component({
  selector: 'app-multi-result',
  templateUrl: './multi-result.component.html',
  styleUrls: ['./multi-result.component.css']
})
export class MultiResultComponent {
  @Input() key: string | null = ""
  @Input() help: string | null = ""

  @Input() value1: string | number | null = ""
  @Input() prefix1: string | null = ""
  @Input() suffix1: string | null = ""
  @Input() smallSuffix1: boolean = false
  @Input() iconSuffix1: string = ""
  @Input() smallIconSuffix1: boolean = false

  @Input() value2: string | number | null = ""
  @Input() prefix2: string | null = ""
  @Input() suffix2: string | null = ""
  @Input() smallSuffix2: boolean = false
  @Input() parenthesis2: boolean = false
  @Input() iconSuffix2: string = ""
  @Input() smallIconSuffix2: boolean = false

  constructor(public dialog: MatDialog) {}

  showHelp() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        title: this.key,
        content: this.help,
        value1: this.value1,
        value2: this.value2,
        suffix1: this.suffix1,
        suffix2: this.suffix2
      }
    })
  }
}
