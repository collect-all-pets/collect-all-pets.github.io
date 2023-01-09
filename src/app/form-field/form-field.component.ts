import {
  AfterContentInit, AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  ViewChild
} from '@angular/core';
import { MatFormField, MatFormFieldControl } from "@angular/material/form-field";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
  // providers: [
  //   { provide: MatFormFieldControl, useExisting: FormFieldComponent }
  // ]
})
// export class FormFieldComponent implements AfterViewInit {
export class FormFieldComponent {
  @Input() shortHelp: string | null = null
  @Input() help: string | null = null
  @Input() label: string | null = null
  @Input() icon: string | null = null


  // beforeViewInit = true;  // Used to remove placeholder control
  // @ContentChild(MatFormFieldControl) control!: MatFormFieldControl<any>
  // @ViewChild(MatFormField) matFormField!: MatFormField
  //
  // constructor(private cdr: ChangeDetectorRef) { }
  //
  // ngAfterViewInit() {
  //   if (this.beforeViewInit) {
  //     console.log(this.matFormField)
  //     console.log(this.control)
  //     this.matFormField._control = this.control
  //     this.matFormField.color = "accent"
  //     this.beforeViewInit = false
  //     this.cdr.detectChanges()
  //   }
  // }

  // ngAfterContentInit() {
  //   this._matFormField._control = this._control;
  // }
}
