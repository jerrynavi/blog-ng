import { DialogRef } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  public form: FormGroup;
  public request$?: Subscription;
  public busy$ = new BehaviorSubject(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: DialogRef<string>,
    private readonly http: HttpClient,
    private readonly toastS: ToastrService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  public get name() {
    return this.form.get('name');
  }
  public get email() {
    return this.form.get('email');
  }
  public get message() {
    return this.form.get('message');
  }

  handleSubmit() {
    const formValues = this.form.value;
    this.busy$.next(true);
    this.request$ = this.http
      .post<{ success: boolean; message: string }>(
        '/api/send-email',
        formValues,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        finalize(() => {
          this.busy$.next(false);
        }),
      )
      .subscribe({
        next: (res) => {
          this.toastS.success(res.message);
        },
        error: (err) => {
          this.toastS.error(
            err?.message || 'Something went wrong. Please try again.',
          );
        },
      });
  }

  dismiss() {
    this.dialogRef.close();
  }
}
