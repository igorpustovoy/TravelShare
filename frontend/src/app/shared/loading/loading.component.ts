import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loadingMessage: string = 'Loading...';
  successMessage: string = 'Success!';
  errorMessage: string = 'Something went wrong...'; 
  @Input() status: 'loading' | 'success' | 'error' | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
