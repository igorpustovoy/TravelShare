import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  postForm = new FormGroup(
    {
      description: new FormControl('', [Validators.required, Validators.minLength(4)]),
      image: new FormControl('', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]),
    }
  )

  addPost() {
    console.log(this.postForm.value);
  }

}
