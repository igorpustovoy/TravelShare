import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../user/login-dialog/login-dialog.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  public dialogOpen: boolean = false;

  ngOnInit(): void {
    this.initScrollingAnimations();
  }

  initScrollingAnimations() {

    const showNav = gsap.fromTo('.navbar', { 
      opacity: 0,
      visibility: 'hidden',
      // paused: true,
    }, {
      visibility: 'visible',
      opacity: 1,
      duration: 0.4
    });
    
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() :  showNav.reverse()
      }
    });
  }

  openLoginPanel() {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {},
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterOpened().subscribe(result => {
      console.log('The dialog was opened');
      this.dialogOpen = true;
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.dialogOpen = false;
    });    
  }
}
