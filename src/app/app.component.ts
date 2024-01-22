import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  constructor(private readonly dialog: Dialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
    });
  }
}
