import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {Post} from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    //this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(postData);

    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.postService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

}
