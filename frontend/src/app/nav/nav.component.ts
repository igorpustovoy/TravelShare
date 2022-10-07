import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../user/login-dialog/login-dialog.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Overlay} from '@angular/cdk/overlay';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public dialogOpen: boolean = false;
  public loggedIn: boolean = false;
  public username: string = '';

  constructor(public dialog: MatDialog, public overlay: Overlay) {}
  
  @HostListener('window:storage')
  onStorageChange() {
    this.setLoginStatus();
  }

  logout() {
    console.log('logout');
    localStorage.clear();
    window.dispatchEvent( new Event('storage') );
  }

  ngOnInit(): void {
    this.setLoginStatus();
    this.initScrollingAnimations();
  }

  setLoginStatus() {
    const token = localStorage.getItem('auth_token');
    // console.log(token);
    if (token) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username') as string;
    } else {
      this.loggedIn = false;
    }
  }

  initScrollingAnimations() {
    const showNav = gsap.fromTo(
      '.navbar',
      {
        opacity: 0,
        visibility: 'hidden',
        // paused: true,
      },
      {
        visibility: 'visible',
        opacity: 1,
        duration: 0.4,
      }
    );

    ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });
  }

  openLoginPanel() {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      scrollStrategy: this.overlay.scrollStrategies.block(),
      data: {},
      panelClass: 'my-custom-dialog-class',
    });

    dialogRef.afterOpened().subscribe((result) => {
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.dialogOpen = false;
      }, 300);
    });
  }
}
