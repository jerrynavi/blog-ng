import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: DialogRef<string>,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  handleSubmit() {
    // @todo
  }

  dismiss() {
    this.dialogRef.close();
  }
}
