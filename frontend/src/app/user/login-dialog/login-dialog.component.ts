import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  section: string = 'login';

  constructor() { }

  ngOnInit(): void {
  }

  changeSection() {
    this.section = this.section === 'login' ? 'register' : 'login';
  }

}
