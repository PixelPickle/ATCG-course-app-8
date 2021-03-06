import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(postData);

    this.postsService.createAndStorePost( postData.title, postData.content );
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.fetchPosts().subscribe( (posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, (error) => {
      this.isFetching = false;
      this.error = error.message;
    } );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe( () => {
      this.loadedPosts = [];
    } );
  }

}
