import { Component, Input } from '@angular/core';
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.css']
})
export class HelpButtonComponent {
  @Input() title: string | null = "Help"
  @Input() shortHelp: string | null = null
  @Input() help: string | null = null

  constructor(public dialog: MatDialog) {}

  get_tooltip(): string {
    if (this.shortHelp == null || this.shortHelp === '') {
      return 'Click for help'
    }
    return this.shortHelp
  }

  showHelp() {
    let content = "No help available for this yet :("
    if (this.help != null && this.help !== "") {
      content = this.help
    }
    this.dialog.open(MessageDialogComponent, {
      data: {
        title: this.title,
        content: content
      }
    })
  }
}
