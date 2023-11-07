import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  @Input() label: string;
  @Input() type: string;
  @Input() fieldId: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;

  get formControl() {
    return this.formGroup.get(this.controlName);
  }

  get showError() {
    const control = this.formControl;
    return control && control.touched && control.invalid;
  }

}
