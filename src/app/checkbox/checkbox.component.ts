import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  @Input() help: string | null = null
  @Input() shortHelp: string | null = null
  @Input() label: string | null = null
  @Input() icon: string | null = null
}
