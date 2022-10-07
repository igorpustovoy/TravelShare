import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();
  public registrationStatus: 'loading' | 'success' | 'error' | null = null;


  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  postForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i),
    ]),
  });

  addPost() {
    this.registrationStatus = 'loading';
    console.log(this.postForm.value);
    const authorId = localStorage.getItem('userId');
    if (authorId) {
      this.postService
        .addPost({
          description: this.postForm.value.description as string,
          image: this.postForm.value.image as string,
          authorId,
        })
        .subscribe((res) => {
          if (res.status === "error") {
            this.registrationStatus = "error";
          }
          if (res.status === "ok") {
            this.registrationStatus = "success";
          }
        });
    }
  }
}
